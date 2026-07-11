## 1. README Documentation

- [x] 1.1 Revisar la seccion actual `## Pruebas del proyecto`.
- [x] 1.2 Agregar una subseccion de ubicacion de resultados generados.
- [x] 1.3 Documentar reportes detallados de Jest:
  - `backend/coverage/unit/test-report.html`
  - `backend/coverage/integration/test-report.html`
  - `frontend/coverage/unit/test-report.html`
- [x] 1.4 Documentar reportes de cobertura:
  - `backend/coverage/unit/index.html`
  - `backend/coverage/integration/index.html`
  - `frontend/coverage/unit/index.html`
- [x] 1.5 Documentar reporte E2E de Playwright:
  - `frontend/playwright-report/index.html`
- [x] 1.6 Documentar que las carpetas generadas estan ignoradas por Git.

## 2. Verification

- [x] 2.1 Ejecutar `npm run test:coverage`.
- [x] 2.2 Verificar que existen los HTML detallados y de cobertura.
- [x] 2.3 Validar el cambio OpenSpec con `npx openspec validate document-test-result-report-locations --strict`.

## 3. Final Git Push

- [x] 3.1 Revisar cambios que se incluiran en el commit final.
- [x] 3.2 Crear commit final sobre `main` sin incluir reportes generados, `.env`, `node_modules` ni `dist`.
- [x] 3.3 Hacer push a `origin/main`.
- [x] 3.4 Confirmar commit remoto final.
