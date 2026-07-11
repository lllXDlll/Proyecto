import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const POSTGRES_USER = 'postgres';
const POSTGRES_PASSWORD = 'postgres';
const POSTGRES_DB = 'loan_management_test';
const ENV_FILE = 'C:/tmp/proyecto-integration-env.json';

export default async function globalSetup() {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'integration-test-secret';
  process.env.TESTCONTAINERS_RYUK_DISABLED = 'true';
  const { GenericContainer, Wait } = require('../../backend/node_modules/testcontainers');

  console.log('[integration] Starting PostgreSQL Testcontainer...');
  const container = await new GenericContainer('postgres:15-alpine')
    .withEnvironment({
      POSTGRES_USER,
      POSTGRES_PASSWORD,
      POSTGRES_DB
    })
    .withExposedPorts(5432)
    .withWaitStrategy(Wait.forLogMessage(/database system is ready to accept connections/))
    .start();

  const host = container.getHost();
  const port = container.getMappedPort(5432);
  const databaseUrl = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${host}:${port}/${POSTGRES_DB}?schema=public`;

  process.env.DATABASE_URL = databaseUrl;
  fs.writeFileSync(ENV_FILE, JSON.stringify({ DATABASE_URL: databaseUrl, JWT_SECRET: process.env.JWT_SECRET }), 'utf8');
  (globalThis as any).__INTEGRATION_POSTGRES_CONTAINER__ = container;
  (globalThis as any).__INTEGRATION_DATABASE_URL__ = databaseUrl;

  const backendDir = path.resolve(__dirname, '../../backend');
  const command = process.platform === 'win32' ? 'cmd.exe' : 'npx';
  const args = process.platform === 'win32'
    ? ['/c', 'npx.cmd', 'prisma', 'db', 'push', '--schema', 'prisma/schema.prisma', '--skip-generate']
    : ['prisma', 'db', 'push', '--schema', 'prisma/schema.prisma', '--skip-generate'];

  console.log('[integration] Applying Prisma schema to Testcontainer...');
  execFileSync(command, args, {
    cwd: backendDir,
    env: { ...process.env, DATABASE_URL: databaseUrl },
    stdio: 'inherit'
  });
  console.log('[integration] PostgreSQL Testcontainer is ready.');
}

declare global {
  // eslint-disable-next-line no-var
  var __INTEGRATION_POSTGRES_CONTAINER__: any;
  // eslint-disable-next-line no-var
  var __INTEGRATION_DATABASE_URL__: string | undefined;
}
