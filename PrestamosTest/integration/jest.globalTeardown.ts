import fs from 'fs';

export default async function globalTeardown() {
  await (globalThis as any).__INTEGRATION_POSTGRES_CONTAINER__?.stop();
  fs.rmSync('C:/tmp/proyecto-integration-env.json', { force: true });
}
