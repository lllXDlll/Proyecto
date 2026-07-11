## Why

La suite Playwright ya recrea los escenarios E2E del proyecto, pero `frontend/playwright.config.ts` siempre intenta levantar backend y frontend locales mediante `webServer`. Para validar la aplicacion desplegada en Render (`https://equipment-loan-management.onrender.com/`), las pruebas deben poder ejecutarse contra URLs remotas sin iniciar servidores locales ni requerir `DATABASE_URL` en la maquina del tester.

## What Changes

- Agregar un modo de ejecucion E2E remoto para Render usando `E2E_TARGET=render` o `E2E_BASE_URL=https://equipment-loan-management.onrender.com`.
- Configurar Playwright para omitir `webServer` local cuando el destino sea Render/remoto.
- Definir defaults de Render:
  - `E2E_BASE_URL=https://equipment-loan-management.onrender.com`
  - `E2E_API_BASE_URL=https://equipment-loan-management.onrender.com/api`
- Mantener intacto el modo local actual cuando no se solicite Render.
- Actualizar documentacion y resultados para incluir comandos manuales contra Render y reporte HTML de Playwright.
- Validar que fixtures API, login y limpieza de datos funcionen contra la API publicada.

## Affected Modules

- **Tooling**: `frontend/playwright.config.ts` y scripts npm si se agrega un alias dedicado.
- **E2E fixtures**: defaults o normalizacion de `E2E_API_BASE_URL` para entorno Render.
- **Documentation**: `PrestamosTest/docs/e2e-test-mapping.md`, `docs/test-results.md` y/o README de pruebas.
- **OpenSpec**: capacidad `testing-deployment`.

## Capabilities

### Modified Capabilities

- `testing-deployment`: La suite E2E SHALL support both local execution and remote Render execution against `https://equipment-loan-management.onrender.com/`.

## Non-Goals

- No se cambiara la logica funcional de autenticacion, usuarios, equipos o prestamos.
- No se guardaran secretos de base de datos en archivos del repositorio.
- No se reemplazara el modo local; seguira disponible para desarrollo.
- No se hara deploy nuevo a Render como parte de esta configuracion.

## Impact

- Los testers podran ejecutar E2E contra Render con variables de entorno, sin Supabase `DATABASE_URL` local.
- Las pruebas contra Render crearan datos con prefijo `e2e-` en la base de datos conectada al despliegue y los limpiaran/desactivaran segun endpoints disponibles.
- Si Render esta dormido o no responde, la suite podria tardar mas en el primer arranque; se ajustaran timeouts solo si es necesario.
