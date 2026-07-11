## Why

`openspec/specs/AI_TEST_SPEC.md` describe una suite Playwright generada para una aplicacion previa servida desde `http://localhost:5100`, con selectores y estructura `e2e-playwright`. El proyecto actual usa React + Vite en `http://127.0.0.1:5173`, Express en `http://localhost:3000/api`, credenciales seed `admin/admin123`, y ejecuta Playwright desde `frontend/playwright.config.ts` contra `PrestamosTest/e2e`.

La suite E2E existente solo valida login y navegacion principal. Se necesita recrear los escenarios propuestos por `AI_TEST_SPEC.md`, pero adaptados a las rutas, datos, API, componentes y convenciones reales de este repositorio.

## What Changes

- Reemplazar o ampliar `PrestamosTest/e2e/main-flows.spec.ts` con escenarios Playwright separados por dominio.
- Agregar Page Objects para login, dashboard, usuarios, equipos y prestamos/devoluciones usando selectores robustos basados en roles, labels, placeholders y texto visible actual.
- Agregar fixtures HTTP para autenticacion, preparacion y limpieza de usuarios, equipos y prestamos contra `http://localhost:3000/api`.
- Cubrir los escenarios de `AI_TEST_SPEC.md`: login exitoso, credenciales invalidas, validacion de login, CRUD usuarios, CRUD equipos, prestamo y devolucion integrada.
- Actualizar la documentacion de pruebas para explicar el mapeo desde la especificacion original hacia esta arquitectura Node/React.
- Mantener `frontend/playwright.config.ts` como punto de ejecucion, con `testDir: '../PrestamosTest/e2e'` y variables de entorno configurables.

## Affected Modules

- **E2E**: `PrestamosTest/e2e`, Page Objects y fixtures Playwright.
- **Frontend**: se podran agregar `data-testid` o atributos accesibles puntuales si algun control critico no es seleccionable de forma estable.
- **Backend/API**: uso de endpoints reales para fixtures y limpieza de datos.
- **Documentation**: mapeo E2E desde `AI_TEST_SPEC.md` y comandos de ejecucion.
- **Tooling**: scripts npm existentes `test:e2e` y configuracion Playwright.

## Capabilities

### Modified Capabilities

- `testing-deployment`: La suite E2E SHALL recreate the test scenarios from `AI_TEST_SPEC.md`, adapted to the current Express/React implementation and centralized under `PrestamosTest/e2e`.
- `prestamos-test-organization`: La carpeta `PrestamosTest` SHALL include reusable Playwright page objects, fixtures, and documentation for the recreated E2E suite.

## Non-Goals

- No se recreara una carpeta externa `e2e-playwright` ni una app .NET.
- No se cambiara la arquitectura de frontend/backend para coincidir con la especificacion antigua.
- No se apuntara a datos de produccion ni a Supabase real por defecto.
- No se agregaran escenarios fuera de autenticacion, usuarios, equipos, prestamos/devoluciones y navegacion critica.

## Impact

- Aumenta la cobertura E2E de flujos criticos antes del despliegue.
- Las pruebas dependeran de datos seed o fixtures configurables, especialmente `E2E_ADMIN_USER` y `E2E_ADMIN_PASSWORD`.
- Algunos componentes podrian necesitar atributos accesibles estables para evitar pruebas fragiles.
- La ejecucion E2E levantara backend y frontend mediante la configuracion Playwright actual.
