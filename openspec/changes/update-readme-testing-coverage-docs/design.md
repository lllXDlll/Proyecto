## Current State

Scripts reales relevantes:

Root:

- `npm run build`
- `npm start`
- `npm test`
- `npm run test:integration`
- `npm run test:e2e`
- `npm run test:e2e:render`
- `npm run migrate:deploy`

Backend:

- `npm --prefix backend test`
- `npm --prefix backend run test:unit`
- `npm --prefix backend run test:integration`
- `npm --prefix backend run test:integration:watch`
- `npm --prefix backend run test:integration:coverage`

Frontend:

- `npm --prefix frontend test`
- `npm --prefix frontend run test:e2e`
- `npm --prefix frontend run test:e2e:render`

Missing or incomplete:

- Root scripts for `test:unit`, `test:unit:coverage`, `test:coverage`.
- Backend unit coverage and watch scripts.
- Frontend unit coverage/watch scripts.
- Dedicated coverage output directories to avoid overwrites.
- README sections for Testcontainers workflow and HTML coverage reports.

## Documentation Structure

Update `README.md` with:

```md
## Pruebas del proyecto
### Requisitos para ejecutar las pruebas
### Instalacion de dependencias
### Configuracion del entorno de pruebas
### Ejecutar pruebas unitarias
### Ejecutar pruebas de integracion
### Ejecutar pruebas end-to-end
### Ejecutar pruebas contra un despliegue propio
### Cobertura de codigo
### Ver el reporte grafico de cobertura
### Umbrales de cobertura
### Orden recomendado de ejecucion
### Solucion de problemas frecuentes
### Advertencias de seguridad para pruebas
```

Keep existing installation, deployment, OpenSpec and project overview sections, but remove contradictory older testing snippets if replaced by the new testing section.

## Scripts Plan

Root scripts should delegate:

```json
{
  "test:unit": "npm --prefix backend run test:unit && npm --prefix frontend test",
  "test:unit:coverage": "npm --prefix backend run test:unit:coverage && npm --prefix frontend run test:coverage",
  "test:integration": "npm --prefix backend run test:integration",
  "test:integration:coverage": "npm --prefix backend run test:integration:coverage",
  "test:coverage": "npm run test:unit:coverage && npm run test:integration:coverage"
}
```

Backend scripts:

```json
{
  "test:unit:watch": "jest --watch ../PrestamosTest/unit/backend",
  "test:unit:coverage": "jest --coverage --coverageDirectory coverage/unit ../PrestamosTest/unit/backend"
}
```

Integration coverage should output to `backend/coverage/integration`.

Frontend scripts:

```json
{
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage --coverageDirectory coverage/unit"
}
```

Only add these after confirming they run.

## Coverage Configuration

Backend unit Jest:

- exclude `src/generated/**`, compiled output, test files and config files.
- coverage output: `backend/coverage/unit`.

Backend integration Jest:

- already covers controllers/routes/middlewares.
- output should become `backend/coverage/integration`.
- reporters should include `text`, `html`, `lcov`.
- thresholds should be realistic. Current integration coverage:
  - statements 90.97
  - branches 81.81
  - functions 100
  - lines 90.48

Use conservative initial thresholds if adding thresholds:

```js
global: {
  statements: 70,
  branches: 60,
  functions: 70,
  lines: 70
}
```

Frontend coverage should exclude Vite generated/build artifacts and output to `frontend/coverage/unit`.

## Environment Documentation

Safe variables:

- `NODE_ENV=test`: set by integration setup.
- `JWT_SECRET`: optional for tests, defaults to integration safe secret.
- `DATABASE_URL`: dynamically created by Testcontainers for integration. Do not set it to production.
- `E2E_TARGET=render`: optional for Playwright against Render.
- `E2E_BASE_URL`, `E2E_API_BASE_URL`, `E2E_ADMIN_USER`, `E2E_ADMIN_PASSWORD`: optional Playwright overrides.
- `API_BASE_URL`, `K6_USER`, `K6_PASSWORD`, `K6_VUS`, `K6_DURATION`: k6 only.

If adding `backend/.env.test.example`, include placeholders only and state that integration tests do not require manual `DATABASE_URL`.

## External Deployment Testing

Current safe external mode is Playwright E2E against Render using:

- `E2E_TARGET=render`
- `npm run test:e2e:render`

The API integration suite currently uses `request(app)` + Testcontainers and does not implement an external API mode. README must state this clearly instead of inventing `TEST_API_BASE_URL`.

## Validation

Minimum validation for apply:

- `npm --prefix backend run test:unit`
- `npm --prefix frontend test`
- `npm --prefix backend run test:integration`
- `npm --prefix backend run test:integration:coverage`
- new unit coverage commands if added
- check HTML report paths exist
- `npx.cmd openspec validate update-readme-testing-coverage-docs --strict`

If Docker is unavailable, document blocker; do not replace Testcontainers with mocks.
