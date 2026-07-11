## Why

El proyecto ya cuenta con pruebas iniciales distribuidas entre `backend/tests`, `frontend/src`, `frontend/e2e` y `tests/load`, pero la especificacion `openspec/specs/AI_UNIT_TEST_SPEC.md` define un conjunto mas amplio de pruebas unitarias criticas para autenticacion, usuarios, equipos y prestamos. Esta propuesta reorganiza y amplia las pruebas para que sean mas faciles de mantener, ejecutar y auditar.

## What Changes

- Crear una carpeta raiz `PrestamosTest` para agrupar todos los archivos de pruebas del proyecto.
- Crear subcarpetas por tipo de prueba: `unit`, `integration`, `e2e`, `load`, `fixtures`, `helpers` y `docs`.
- Recrear en Jest/TypeScript las pruebas unitarias descritas en `AI_UNIT_TEST_SPEC.md`, adaptandolas al stack actual Express/Prisma/React.
- Migrar o reubicar las pruebas existentes hacia la nueva estructura `PrestamosTest`.
- Actualizar scripts de `package.json`, configuraciones de Jest/Playwright/k6 y documentacion para apuntar a la nueva organizacion.
- Mantener la separacion conceptual entre pruebas unitarias, integracion, end-to-end y carga.

## Affected Modules

- **Testing**: nueva organizacion centralizada en `PrestamosTest`.
- **Backend**: pruebas unitarias e integracion para autenticacion, usuarios, equipos, prestamos, dashboard y reportes.
- **Frontend**: pruebas unitarias de contexto/componentes y pruebas E2E de flujos principales.
- **Tooling**: Jest, Supertest, Playwright, k6 y scripts npm.
- **Documentation**: resultados, instrucciones de ejecucion y mapeo desde `AI_UNIT_TEST_SPEC.md`.

## Capabilities

### New Capabilities

- `prestamos-test-organization`: Centralizar y recrear las pruebas del sistema de prestamos en una estructura mantenible basada en `PrestamosTest`.

### Modified Capabilities

- `testing-deployment`: Los scripts y documentacion de pruebas SHALL usar la carpeta `PrestamosTest` como ubicacion principal de suites y artefactos de prueba.

## Non-Goals

- No se agregan nuevos modulos de negocio.
- No se reescribe la arquitectura productiva para simular servicios C# inexistentes.
- No se implementan pruebas de componentes no relacionados con autenticacion, usuarios, equipos, prestamos, dashboard/reportes o flujos principales.
- No se ejecuta despliegue productivo como parte de esta reorganizacion.

## Impact

- Las pruebas existentes se moveran o recrearan bajo `PrestamosTest`.
- Los comandos de prueba cambiaran para apuntar a la nueva estructura.
- Las pruebas unitarias del documento C# se adaptaran al dominio actual usando funciones, controladores, middlewares, helpers e in-memory doubles en TypeScript.
- El proyecto tendra una estructura de QA mas clara para unit, integration, e2e, load, fixtures, helpers y docs.
