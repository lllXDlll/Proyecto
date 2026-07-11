# AI Unit Test Mapping

Este documento adapta `openspec/specs/AI_UNIT_TEST_SPEC.md` desde su formato C# original al stack real del proyecto: Express, TypeScript, Prisma, React, Jest, Supertest, Playwright y k6.

## AuthServiceTests.cs

Archivo equivalente:

- `PrestamosTest/unit/backend/auth/auth.controller.test.ts`
- `PrestamosTest/unit/backend/auth/auth.middleware.test.ts`

Casos recreados:

- `LoginAsync_UserNotFound_ReturnsNull`: adaptado a HTTP 401.
- `LoginAsync_UserInactive_ReturnsNull`: adaptado a HTTP 401.
- `LoginAsync_InvalidPassword_ReturnsNull`: adaptado a HTTP 401.
- `LoginAsync_TokenGenerationThrows_ReturnsNull`: adaptado a HTTP 500 porque el controlador Express normaliza el error.
- `LoginAsync_Success_ReturnsTokenAndUser`: valida token `token-123` y datos de usuario.

## UsuarioServiceTests.cs

Archivo equivalente:

- `PrestamosTest/unit/backend/usuarios/user.controller.test.ts`

Casos recreados/adaptados:

- `CreateAsync_DuplicateCorreo_Throws`: adaptado a usuario duplicado con HTTP 400.
- `CreateAsync_Success_ReturnsDto`: valida DTO de salida.
- `UpdateAsync_ChangeCorreoToExisting_Throws`: adaptado a `usuario` duplicado.
- `DeleteAsync_NotFound_ReturnsFalse`: adaptado a update/soft-disable no encontrado con HTTP 404.
- `GetAllAsync_ReturnsAllUsuarios`: valida listado paginado.
- `DeleteAsync_Existing_ReturnsTrue`: adaptado a `activo=false`.

Brecha documentada:

- `UpdateAsync_WithPassword_UpdatesPasswordHash` no aplica al controlador actual porque `updateUser` no actualiza password.
- `GetById_ReturnsDto_WhenExists` no aplica como endpoint/controlador independiente en el proyecto actual.

## EquipoServiceTests.cs

Archivo equivalente:

- `PrestamosTest/unit/backend/equipos/equipment.controller.test.ts`

Casos recreados/adaptados:

- `CreateAsync_DuplicateCode_Throws`: codigo inventario duplicado con HTTP 409.
- `CreateAsync_Succeeds_ReturnsDto`: crea con estado `DISPONIBLE`.
- `UpdateAsync_ParseEstadoInvalid_DefaultsToDisponible`: adaptado a validacion estricta con HTTP 400.
- `UpdateAsync_ValidEstado_ParsesToEnum`: acepta estado valido normalizado.
- `DeleteAsync_RemovesAndReturnsTrue`: adaptado a cambio de estado soft-delete (`INACTIVO`).

## PrestamoServiceTests.cs

Archivo equivalente:

- `PrestamosTest/unit/backend/prestamos/loan.controller.test.ts`

Casos recreados/adaptados:

- `RegistrarPrestamo_SuccessfulRegistration_updatesEquipoAndReturnsDto`.
- `RegistrarPrestamo_UsuarioNotFound_ThrowsKeyNotFoundException`.
- `RegistrarPrestamo_UsuarioInactive_ThrowsInvalidOperationException`.
- `RegistrarPrestamo_EquipoInMantenimiento_ThrowsInvalidOperationException`.
- `RegistrarPrestamo_EquipoAlreadyPrestado_ThrowsInvalidOperationException`.
- `RegistrarPrestamo_EquipoNotFound_ThrowsKeyNotFoundException`.
- `GetActiveLoansAsync_ReturnsOnlyActive`.
- `RegistrarDevolucion_AlreadyFinalized_ThrowsInvalidOperationException`.
- `RegistrarPrestamo_FechaDevolucionInvalid_ThrowsInvalidOperationException`.
- `RegistrarDevolucion_Successful_ChangesEstadoPrestamoAndEquipo`.
- `RegistrarDevolucion_PrestamoNotFound_ThrowsKeyNotFoundException`.
- `GetAll_ReturnsAllPrestamos`.

Brechas documentadas:

- `RegistrarPrestamo_UserHasThreeActiveLoans_ThrowsInvalidOperationException` no existe como regla de negocio en el backend actual.
- `GetById_ReturnsDto_WithNavigationData` no existe como endpoint independiente; la informacion relacionada se valida en listados/historial.
- Las aserciones exactas de ventanas de tiempo se cubren parcialmente validando que se envie `fechaDevolucionReal` al actualizar devolucion.

## Otras suites preservadas

- Integracion API: `PrestamosTest/integration/api/protected-routes.test.ts`
- Frontend auth: `PrestamosTest/unit/frontend/auth/AuthContext.test.tsx`
- Frontend guards: `PrestamosTest/unit/frontend/guards/route-guards.test.tsx`
- E2E: `PrestamosTest/e2e/main-flows.spec.ts`
- Load: `PrestamosTest/load/api/main-api.k6.js`
