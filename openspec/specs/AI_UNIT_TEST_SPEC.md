# Especificación para generación automática de las pruebas unitarias

Objetivo
- Documento que describe con precisión las pruebas unitarias para que una IA pueda recrearlas exactamente.


Detalles por archivo / clase de prueba

1) AuthServiceTests.cs
- Servicios probados: AuthService.LoginAsync
- Casos de prueba:
  - LoginAsync_UserNotFound_ReturnsNull: cuando no existe usuario devolver null.
  - LoginAsync_UserInactive_ReturnsNull: usuario con Estado=false devuelve null.
  - LoginAsync_InvalidPassword_ReturnsNull: password no coincide devuelve null.
  - LoginAsync_TokenGenerationThrows_ReturnsNull: si el generador de token lanza, el resultado es null (no propaga excepción).
  - LoginAsync_Success_ReturnsTokenAndUser: caso exitoso devuelve Token y Usuario; token es "token-123" con DummyTokenGenerator.
- Test doubles:
  - InMemoryUow con implementación de IUsuarioRepository que clona entidades y permite GetByCorreoAsync/GetByIdAsync/AddAsync/Update/Delete.
  - DummyHasher: HashPassword => password + "_hash"; VerifyPassword hace la comparación simétrica.
  - DummyTokenGenerator: GenerateToken => "token-123".
  - ThrowingTokenGenerator: GenerateToken lanza excepción.

2) UsuarioServiceTests.cs
- Servicios probados: UsuarioService (CreateAsync, UpdateAsync, DeleteAsync, GetAllAsync, GetByIdAsync)
- Casos de prueba claves:
  - CreateAsync_DuplicateCorreo_Throws: si correo repetido lanza InvalidOperationException.
  - CreateAsync_Success_ReturnsDto: crea correctamente y devuelve DTO con mismo correo.
  - UpdateAsync_ChangeCorreoToExisting_Throws: al cambiar correo a uno existente lanza.
  - DeleteAsync_NotFound_ReturnsFalse: eliminar id inexistente devuelve false.
  - GetAllAsync_ReturnsAllUsuarios: devuelve lista completa.
  - UpdateAsync_WithPassword_UpdatesPasswordHash: si request incluye contraseña, PasswordHash cambia usando el hasher.
  - GetById_ReturnsDto_WhenExists: devuelve DTO con datos correctos.
  - DeleteAsync_Existing_ReturnsTrue: ahora la aplicación usa soft-delete; la prueba debe aceptar que el registro siga existiendo pero marcado como inactivo (Estado == false) o que sea null.
- Test doubles:
  - InMemoryUow con IUsuarioRepository implementado en pruebas que respeta clonación de entidades.
  - DummyHasher (mismo comportamiento que en Auth tests).

3) EquipoServiceTests.cs
- Servicios probados: EquipoService (CreateAsync, UpdateAsync, DeleteAsync, GetByIdAsync, GetAllAsync)
- Casos de prueba claves:
  - CreateAsync_DuplicateCode_Throws
  - CreateAsync_Succeeds_ReturnsDto (Estado por defecto: Disponible)
  - UpdateAsync_ParseEstadoInvalid_DefaultsToDisponible
  - UpdateAsync_ValidEstado_ParsesToEnum
  - DeleteAsync_RemovesAndReturnsTrue: actualmente DeleteAsync realiza soft-delete y marca `Active = 0` y `Estado = Mantenimiento`; la prueba acepta que el equipo sea null o que Estado==Mantenimiento.

4) PrestamoServiceTests.cs
- Servicios probados: PrestamoService (RegistrarPrestamoAsync, RegistrarDevolucionAsync, GetActiveLoansAsync, GetByIdAsync, GetAllAsync)
- Casos de prueba claves:
  - RegistrarPrestamo_SuccessfulRegistration_updatesEquipoAndReturnsDto: registra préstamo, marca equipo como Prestado y devuelve DTO con Estado Activo.
  - RegistrarPrestamo_UsuarioNotFound_ThrowsKeyNotFoundException
  - RegistrarPrestamo_UsuarioInactive_ThrowsInvalidOperationException
  - RegistrarPrestamo_UserHasThreeActiveLoans_ThrowsInvalidOperationException
  - RegistrarPrestamo_EquipoInMantenimiento_ThrowsInvalidOperationException
  - RegistrarPrestamo_EquipoAlreadyPrestado_ThrowsInvalidOperationException
  - RegistrarPrestamo_EquipoNotFound_ThrowsKeyNotFoundException
  - GetActiveLoansAsync_ReturnsOnlyActive
  - RegistrarDevolucion_AlreadyFinalized_ThrowsInvalidOperationException
  - RegistrarPrestamo_FechaDevolucionInvalid_ThrowsInvalidOperationException
  - RegistrarDevolucion_Successful_ChangesEstadoPrestamoAndEquipo
  - RegistrarDevolucion_PrestamoNotFound_ThrowsKeyNotFoundException
  - GetById_ReturnsDto_WithNavigationData: el DTO debe contener UsuarioCorreo y EquipoCodigo.
  - GetAll_ReturnsAllPrestamos
  - RegistrarPrestamo_SetsFechaPrestamoAndFechaDevolucionEsperada: FechaPrestamo set to current time window, FechaDevolucionEsperada exact match.
  - RegistrarDevolucion_SetsFechaDevolucionReal: FechaDevolucionReal set close to now.
- Test doubles:
  - InMemoryUnitOfWork con repositorios para Usuarios, Equipos, Prestamos (navegaciones simuladas mediante AttachNavigations en in-memory repo)