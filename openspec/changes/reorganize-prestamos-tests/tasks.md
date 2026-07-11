## 1. Test Organization

- [x] 1.1 Crear carpeta raiz `PrestamosTest`. (QA)
- [x] 1.2 Crear subcarpetas `unit`, `integration`, `e2e`, `load`, `fixtures`, `helpers` y `docs`. (QA)
- [x] 1.3 Mover o recrear pruebas backend existentes desde `backend/tests` hacia `PrestamosTest`. (QA)
- [x] 1.4 Mover o recrear pruebas frontend existentes desde `frontend/src/**/*.test.tsx` hacia `PrestamosTest`. (QA)
- [x] 1.5 Mover pruebas Playwright desde `frontend/e2e` hacia `PrestamosTest/e2e`. (QA)
- [x] 1.6 Mover scripts k6 desde `tests/load` hacia `PrestamosTest/load`. (QA)

## 2. Backend Unit Tests

- [x] 2.1 Recrear pruebas equivalentes a `AuthServiceTests.cs` para autenticacion/JWT en Jest. (AI_UNIT_TEST_SPEC)
- [x] 2.2 Recrear pruebas equivalentes a `UsuarioServiceTests.cs` para reglas de usuarios. (AI_UNIT_TEST_SPEC)
- [x] 2.3 Recrear pruebas equivalentes a `EquipoServiceTests.cs` para reglas de equipos. (AI_UNIT_TEST_SPEC)
- [x] 2.4 Recrear pruebas equivalentes a `PrestamoServiceTests.cs` para reglas de prestamos/devoluciones. (AI_UNIT_TEST_SPEC)
- [x] 2.5 Crear helpers in-memory y test doubles para repositorios/Prisma cuando convenga aislar logica. (AI_UNIT_TEST_SPEC)

## 3. Frontend Unit Tests

- [x] 3.1 Reubicar prueba de `AuthContext` en `PrestamosTest/unit/frontend/auth`. (QA)
- [x] 3.2 Agregar pruebas para guards de rutas protegidas y administrativas. (QA)
- [x] 3.3 Agregar pruebas para validacion de formularios criticos cuando sea viable sin reestructurar UI. (QA)

## 4. Integration, E2E, and Load

- [x] 4.1 Reubicar pruebas Supertest en `PrestamosTest/integration/api`. (QA)
- [x] 4.2 Reubicar pruebas Playwright en `PrestamosTest/e2e`. (QA)
- [x] 4.3 Reubicar script k6 en `PrestamosTest/load/api`. (QA)
- [x] 4.4 Ajustar configuraciones de Jest, Playwright y scripts npm para apuntar a `PrestamosTest`. (QA)

## 5. Documentation

- [x] 5.1 Crear `PrestamosTest/docs/unit-test-mapping.md` con el mapeo desde `AI_UNIT_TEST_SPEC.md` hacia pruebas TypeScript. (QA)
- [x] 5.2 Documentar casos recreados, casos adaptados y brechas por diferencias entre C# y Express/Prisma. (QA)
- [x] 5.3 Actualizar `docs/test-results.md` con la nueva ubicacion de suites. (QA)

## 6. Verification

- [x] 6.1 Ejecutar pruebas unitarias backend desde `PrestamosTest`. (QA)
- [x] 6.2 Ejecutar pruebas unitarias frontend desde `PrestamosTest`. (QA)
- [x] 6.3 Ejecutar pruebas de integracion desde `PrestamosTest`. (QA)
- [x] 6.4 Ejecutar pruebas E2E desde `PrestamosTest`. (QA)
- [x] 6.5 Validar build backend/frontend despues de la reorganizacion. (QA)
- [x] 6.6 Validar OpenSpec del cambio. (QA)
