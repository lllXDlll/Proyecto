## Context

`AI_UNIT_TEST_SPEC.md` describe pruebas unitarias para una arquitectura C# con servicios como `AuthService`, `UsuarioService`, `EquipoService` y `PrestamoService`. El proyecto actual usa Express, TypeScript, Prisma, JWT, React, Jest, Supertest, Playwright y k6. Por lo tanto, las pruebas deben recrear los mismos casos de negocio, pero adaptadas a los artefactos reales del proyecto.

## Target Folder Structure

La nueva carpeta raiz sera:

```text
PrestamosTest/
  unit/
    backend/
      auth/
      usuarios/
      equipos/
      prestamos/
      dashboard-reportes/
    frontend/
      auth/
      forms/
      guards/
  integration/
    api/
      auth/
      usuarios/
      equipos/
      prestamos/
      dashboard-reportes/
  e2e/
    login/
    usuarios/
    equipos/
    prestamos/
    reportes/
  load/
    api/
  fixtures/
  helpers/
  docs/
```

## Test Mapping from `AI_UNIT_TEST_SPEC.md`

### AuthServiceTests.cs -> Jest backend auth unit tests

Adaptar a:

- `backend/src/controllers/auth.controller.ts`
- `backend/src/middlewares/auth.middleware.ts`
- helpers/doubles para usuario, password hasher y token generator cuando sea necesario.

Casos recreados:

- usuario no encontrado.
- usuario inactivo.
- password invalida.
- error al generar token.
- login exitoso con token y datos de usuario.

### UsuarioServiceTests.cs -> Jest backend user tests

Adaptar a:

- `backend/src/controllers/user.controller.ts`
- reglas de usuario existentes: duplicado, creacion, actualizacion, soft-disable y consulta.

Casos recreados:

- usuario duplicado.
- creacion exitosa.
- actualizar usuario con nombre de usuario existente.
- eliminar/desactivar inexistente.
- listar usuarios.
- actualizar password si el proyecto soporta el campo en controlador o documentar brecha.
- obtener por id si existe endpoint/helper disponible o cubrirlo mediante repositorio/helper de prueba.
- soft-delete aceptando registro inactivo.

### EquipoServiceTests.cs -> Jest backend equipment tests

Adaptar a:

- `backend/src/controllers/equipment.controller.ts`
- validaciones de codigo inventario, estado y soft-delete/status.

Casos recreados:

- codigo duplicado.
- creacion exitosa con estado `DISPONIBLE`.
- estado invalido rechazado o normalizado segun comportamiento del proyecto.
- estado valido aplicado.
- desactivacion/estado `INACTIVO` o `MANTENIMIENTO` segun flujo implementado.

### PrestamoServiceTests.cs -> Jest backend loan tests

Adaptar a:

- `backend/src/controllers/loan.controller.ts`
- Prisma transactions mocked or in-memory helpers.

Casos recreados:

- registro exitoso actualiza equipo a `PRESTADO`.
- usuario no encontrado.
- usuario inactivo.
- usuario con limite de prestamos activos si se agrega la regla o documentar brecha.
- equipo en mantenimiento.
- equipo ya prestado.
- equipo no encontrado.
- listar solo prestamos activos.
- devolucion ya finalizada.
- fecha de devolucion invalida.
- devolucion exitosa cambia prestamo a `DEVUELTO` y equipo a `DISPONIBLE`.
- prestamo no encontrado.
- obtener por id con datos relacionados.
- listar todos los prestamos.
- fechas de prestamo/devolucion dentro de ventana esperada.

## Tooling Design

- Jest backend debe leer pruebas desde `PrestamosTest/unit/backend` y `PrestamosTest/integration/api`.
- Jest frontend debe leer pruebas desde `PrestamosTest/unit/frontend`.
- Playwright debe leer pruebas desde `PrestamosTest/e2e`.
- k6 debe leer scripts desde `PrestamosTest/load`.
- Fixtures compartidos y test doubles deben vivir en `PrestamosTest/fixtures` y `PrestamosTest/helpers`.

## Validation Rules

- No deben quedar pruebas activas fuera de `PrestamosTest` salvo archivos de setup tecnico estrictamente requeridos por herramientas.
- Los scripts npm deben ejecutar las suites desde `PrestamosTest`.
- Las pruebas recreadas deben cubrir los nombres/casos de negocio del documento fuente, aunque los nombres de archivo sean `.test.ts` en vez de `.cs`.
- Las brechas entre la especificacion C# y el sistema actual deben documentarse en `PrestamosTest/docs/unit-test-mapping.md`.
- Las pruebas deben pasar o documentar explicitamente si un caso queda pendiente por funcionalidad inexistente.

## Security Considerations

- Fixtures no deben incluir secretos reales.
- Tokens de prueba deben usar secretos locales/dummy.
- Datos de prueba no deben apuntar a Supabase produccion.
- E2E y carga deben usar credenciales de prueba configurables por variables de entorno.
