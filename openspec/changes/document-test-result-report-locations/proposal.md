## Why

El README ya documenta como ejecutar pruebas y cobertura, pero despues de agregar reportes HTML detallados por caso de prueba falta dejar explicito donde se almacenan todos los resultados generados. El proyecto necesita una referencia final para que cualquier desarrollador sepa que archivos abrir despues de correr unitarias, integracion, cobertura y E2E, y para cerrar el trabajo con un ultimo push a la rama `main`.

## What Changes

- Actualizar `README.md` para indicar claramente las rutas de salida tras ejecutar pruebas.
- Distinguir entre reportes de cobertura por archivo/linea e informes detallados por caso de prueba.
- Documentar las rutas HTML generadas por backend unit, backend integration, frontend unit y Playwright E2E.
- Documentar que los reportes generados no deben versionarse y estan cubiertos por `.gitignore`.
- Agregar comandos de apertura rapida en PowerShell para los reportes principales.
- Verificar que `npm run test:coverage` genera los reportes esperados.
- Realizar el push final a `origin/main` despues de aplicar y verificar el cambio.

## Affected Modules

- **Documentation**: `README.md`, opcionalmente `docs/test-results.md`.
- **Testing reports**: rutas bajo `backend/coverage`, `frontend/coverage` y `frontend/playwright-report`.
- **OpenSpec**: capacidad de documentacion de testing/deployment.
- **Git**: push final a `origin/main`.

## Capabilities

### Modified Capabilities

- `testing-deployment`: La documentacion SHALL list the exact generated output locations for automated test results, coverage reports, detailed Jest reports, and Playwright reports.

## Non-Goals

- No se agregaran nuevas pruebas.
- No se cambiara logica de negocio.
- No se versionaran reportes generados, coverage, Playwright output ni test results.
- No se expondran credenciales ni variables secretas.
- No se eliminara la rama remota `master` salvo instruccion explicita posterior.

## Impact

- El README quedara como guia final para ejecutar pruebas y ubicar resultados.
- Los reportes graficos quedaran diferenciados entre cobertura y detalle de ejecucion.
- El repositorio remoto `main` quedara actualizado al finalizar la aplicacion del cambio.
