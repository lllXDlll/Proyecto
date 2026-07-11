## Why

El proyecto actualmente tiene una cobertura de integracion minima en `PrestamosTest/integration/api/protected-routes.test.ts`, pero el API ya expone modulos completos de autenticacion, usuarios, equipos, prestamos, dashboard y reportes. El requerimiento adjunto pide una suite de integracion real con Jest + Supertest + Prisma + PostgreSQL en Testcontainers, sin mocks y sin SQLite, para validar endpoints, reglas de negocio, autorizacion y efectos reales en base de datos.

## What Changes

- Crear infraestructura reusable de integracion con Testcontainers para iniciar PostgreSQL una vez por suite.
- Configurar `DATABASE_URL` dinamico y preparar el esquema de Prisma con `prisma migrate deploy` o `prisma db push`.
- Agregar helpers compartidos para Prisma test client, app Supertest, seed, cleanup, usuarios, auth/JWT, equipos y prestamos.
- Reorganizar/ampliar `PrestamosTest/integration` por dominio: `auth`, `users`, `equipment`, `loans`, `dashboard`, `reports`, `security`.
- Cubrir todos los endpoints reales definidos en `backend/src/app.ts` y `backend/src/routes`.
- Agregar scripts `test:integration`, `test:integration:watch` y `test:integration:coverage` cuando falten.
- Documentar ejecucion, dependencias Docker/Testcontainers, cobertura lograda y limitaciones de endpoints no implementados.

## Affected Modules

- **Testing**: Jest, Supertest, Testcontainers, helpers de integracion y estructura `PrestamosTest/integration`.
- **Backend tooling**: `backend/package.json`, `backend/jest.config.js`, posible config Jest dedicada para integracion.
- **Database**: Prisma migrations/test schema ejecutados en PostgreSQL efimero de Testcontainers.
- **Documentation**: `PrestamosTest/docs` y `docs/test-results.md`.
- **OpenSpec**: `testing-deployment` y `prestamos-test-organization`.

## Capabilities

### Modified Capabilities

- `testing-deployment`: La capa de integracion SHALL validate the REST API against a real PostgreSQL Testcontainer without Prisma/database mocks.
- `prestamos-test-organization`: Las pruebas de integracion SHALL live under `PrestamosTest/integration` with shared helpers and domain-oriented suites.

## Non-Goals

- No se crearan pruebas unitarias.
- No se usara SQLite.
- No se mockeara Prisma, repositorios ni la base de datos.
- No se reescribira la aplicacion ni sus endpoints productivos.
- No se implementaran endpoints inexistentes como DELETE o GET by id salvo que se propongan en un cambio funcional separado.
- No se dependera de Supabase, Render ni una base de datos compartida para integracion local/CI.

## Impact

- Requiere Docker disponible para ejecutar Testcontainers.
- Aumentara el tiempo de `npm run test:integration` por arranque de contenedor y preparacion de schema.
- La suite validara estado real en DB, efectos laterales y reglas de autorizacion con JWT.
- Los tests seran independientes mediante cleanup/truncate entre casos.
