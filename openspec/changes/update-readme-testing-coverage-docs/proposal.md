## Why

El README actual describe el proyecto y comandos generales, pero quedo atrasado frente a la infraestructura reciente de pruebas: E2E contra Render, integracion con PostgreSQL Testcontainers, cobertura de Jest/Istanbul, scripts nuevos y documentacion de problemas como `mime.getType` y JWT expirado. El adjunto solicita que el README raiz permita a otro desarrollador clonar, instalar, configurar, ejecutar pruebas y abrir reportes graficos de cobertura sin explicaciones adicionales.

## What Changes

- Actualizar `README.md` preservando la documentacion util existente.
- Agregar una seccion principal `## Pruebas del proyecto`.
- Documentar requisitos reales: Node.js `>=20.19.0 <22`, Render `NODE_VERSION=20.19.5`, npm, Git y Docker para Testcontainers.
- Documentar instalacion reproducible con `npm ci`/`npm --prefix ... ci --include=dev --include=optional` segun scripts reales.
- Documentar variables de entorno de pruebas sin exponer secretos reales.
- Agregar o ajustar scripts de unit, integration, coverage y watch donde sean compatibles con el proyecto.
- Configurar salidas de cobertura separadas para evitar sobrescribir reportes unitarios e integracion.
- Documentar comandos para ejecutar unitarias, integracion Testcontainers, E2E local, E2E Render y k6.
- Documentar como abrir reportes HTML de coverage y Playwright.
- Agregar troubleshooting verificado para Docker/Testcontainers, Prisma schema, `mime.getType`, JWT expirado, open handles y aislamiento.
- Actualizar `.gitignore` y/o ejemplos `.env.test.example` solo si falta algun patron o plantilla segura.

## Affected Modules

- **Documentation**: `README.md`, posiblemente `docs/test-results.md` y `PrestamosTest/docs`.
- **Tooling**: root/backend/frontend `package.json` scripts de pruebas y cobertura.
- **Jest**: coverage reporters, coverage directories and thresholds if needed.
- **Environment examples**: safe `.env.test.example` if useful.
- **OpenSpec**: testing documentation capability.

## Capabilities

### Modified Capabilities

- `testing-deployment`: La documentacion del proyecto SHALL provide complete, accurate, reproducible test and coverage instructions for unit, integration, E2E, Render E2E, and load testing.

## Non-Goals

- No se agregaran pruebas nuevas salvo scripts/config necesarios para ejecutar o medir cobertura.
- No se expondran credenciales reales, URLs con passwords ni secretos.
- No se cambiara la logica productiva de backend/frontend.
- No se documentara un modo externo de integracion API si no se implementa de forma segura.
- No se borrara documentacion vigente que siga siendo correcta.

## Impact

- Desarrolladores tendran comandos claros para pruebas y cobertura.
- La cobertura generara reportes HTML/lcov en rutas documentadas.
- Los scripts root podran delegar a backend/frontend sin comandos largos.
- El README quedara sincronizado con `PrestamosTest`, Testcontainers y Playwright Render.
