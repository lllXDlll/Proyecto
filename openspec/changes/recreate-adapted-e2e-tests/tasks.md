## 1. Discovery and Mapping

- [x] 1.1 Revisar los formularios reales de Login, Users, Equipment y Loans para confirmar labels, placeholders, botones y rutas. (E2E)
- [x] 1.2 Documentar el mapeo desde `AI_TEST_SPEC.md` hacia `PrestamosTest/docs/e2e-test-mapping.md`. (QA)
- [x] 1.3 Identificar controles que requieran `data-testid` por falta de selector accesible estable. (Frontend)

## 2. E2E Infrastructure

- [x] 2.1 Crear Page Objects para Login, Dashboard, Users, Equipment y Loans. (Playwright)
- [x] 2.2 Crear fixtures HTTP para login, request autorizado, usuarios, equipos y prestamos. (Playwright/API)
- [x] 2.3 Crear helper de datos unicos con prefijos `e2e-` y timestamp. (Playwright)
- [x] 2.4 Ajustar `frontend/playwright.config.ts` para exponer `E2E_API_BASE_URL` si hace falta sin romper `E2E_BASE_URL`. (Tooling)

## 3. Auth Scenarios

- [x] 3.1 Implementar login exitoso con `admin/admin123` o variables `E2E_ADMIN_*`. (AI_TEST_SPEC #1)
- [x] 3.2 Implementar password incorrecta sin token y permaneciendo en login. (AI_TEST_SPEC #2)
- [x] 3.3 Implementar usuario inexistente sin token y error visible. (AI_TEST_SPEC #3)
- [x] 3.4 Implementar submit vacio y validacion de campos obligatorios. (AI_TEST_SPEC #4)

## 4. Management Scenarios

- [x] 4.1 Implementar CRUD/alta UI de usuarios con verificacion en listado y cleanup por API cuando sea posible. (AI_TEST_SPEC #5)
- [x] 4.2 Implementar CRUD/alta UI de equipos con verificacion en listado y cleanup por API cuando sea posible. (AI_TEST_SPEC #6)
- [x] 4.3 Implementar flujo integrado de prestamo y devolucion con fixtures API para preparar datos. (AI_TEST_SPEC #7)

## 5. Documentation and Verification

- [x] 5.1 Actualizar `docs/test-results.md` con comando `npm run test:e2e`, fecha y resultado. (QA)
- [x] 5.2 Ejecutar `npm run test:e2e` desde la raiz del proyecto. (Verification)
- [x] 5.3 Corregir defectos bloqueantes encontrados por la suite nueva. (Bugfix)
- [x] 5.4 Validar el cambio OpenSpec. (OpenSpec)
