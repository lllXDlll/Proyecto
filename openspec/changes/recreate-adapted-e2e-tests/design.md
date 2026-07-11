## Context

`AI_TEST_SPEC.md` asume:

- host unificado `http://localhost:5100`;
- login por correo `admin@local.test`;
- carpeta `e2e-playwright`;
- selectores como `#login-form`, `#app-container`, `#view-title`, `#btn-new-user`.

Este proyecto actualmente usa:

- backend Express en `http://localhost:3000/api`;
- frontend Vite en `http://127.0.0.1:5173`;
- Playwright configurado en `frontend/playwright.config.ts`;
- suite E2E en `PrestamosTest/e2e`;
- credenciales seed `admin/admin123`;
- almacenamiento de sesion con `localStorage.token` y `localStorage.usuario`.

La recreacion debe preservar los objetivos de negocio del documento fuente, no sus rutas ni selectores obsoletos.

## Target E2E Structure

```text
PrestamosTest/
  e2e/
    auth/
      login.spec.ts
    usuarios/
      usuarios-crud.spec.ts
    equipos/
      equipos-crud.spec.ts
    prestamos/
      prestamos-devoluciones.spec.ts
    pages/
      LoginPage.ts
      DashboardPage.ts
      UsersPage.ts
      EquipmentPage.ts
      LoansPage.ts
    fixtures/
      apiClient.ts
      authFixture.ts
      userFixture.ts
      equipmentFixture.ts
      loanFixture.ts
    utils/
      testData.ts
```

Si se prefiere una migracion incremental, los specs pueden empezar en `main-flows.spec.ts`, pero los Page Objects y fixtures deben quedar separados para mantener la suite.

## Environment

- `E2E_BASE_URL`: frontend, default `http://127.0.0.1:5173`.
- `E2E_API_BASE_URL`: API, default `http://localhost:3000/api`.
- `E2E_ADMIN_USER`: default `admin`.
- `E2E_ADMIN_PASSWORD`: default `admin123`.

Playwright seguira levantando:

- `npm.cmd --prefix ../backend run dev`, esperado en `/api/health`;
- `npm.cmd run dev -- --host 127.0.0.1`, esperado en `http://127.0.0.1:5173`.

## Scenario Mapping

### 1. Autenticacion - inicio de sesion exitoso

Adaptar a:

- navegar a `/login`;
- llenar input de usuario por placeholder `/usuario/i`;
- llenar password por placeholder `/contrase/i`;
- pulsar boton `/ingresar|login/i`;
- esperar URL `/dashboard`;
- verificar `localStorage.token`;
- verificar contenido visible del dashboard, como `LoanManager` o resumen operativo.

### 2. Autenticacion - password incorrecta

Adaptar a:

- usar usuario seed valido y password invalida;
- verificar permanencia en `/login`;
- verificar que `localStorage.token` no existe;
- verificar mensaje visible de error si la UI lo expone.

### 3. Autenticacion - usuario inexistente

Adaptar a:

- usar username aleatorio inexistente;
- verificar permanencia en `/login`;
- verificar ausencia de token;
- verificar error de autenticacion visible.

### 4. Validacion campos obligatorios de login

Adaptar a:

- enviar formulario vacio;
- verificar permanencia en `/login`;
- verificar que no existe token;
- preferir validaciones nativas o mensajes visibles si existen.

### 5. CRUD Usuarios por UI

Adaptar a:

- autenticar como administrador;
- navegar a `/usuarios` o desde dashboard al modulo usuarios;
- abrir formulario de nuevo usuario;
- crear usuario con username timestamp, nombre, rol y password valida;
- verificar que aparece en la tabla/lista;
- limpiar por API si el backend permite desactivar/eliminar, o documentar limitacion.

### 6. CRUD Equipos por UI

Adaptar a:

- autenticar como administrador;
- navegar a `/equipos` o modulo inventario;
- crear equipo con codigo de inventario timestamp, nombre, tipo/modelo/estado segun formulario real;
- verificar que aparece en listado;
- limpiar por API si existe endpoint de eliminacion/desactivacion.

### 7. Prestamo / Devolucion integrado

Adaptar a:

- crear por fixtures API un usuario activo y equipo disponible;
- autenticar UI como administrador;
- registrar prestamo desde modulo prestamos o crear prestamo por fixture si el formulario requiere datos complejos;
- verificar prestamo activo en listado o dashboard;
- ejecutar devolucion desde UI;
- verificar estado `DEVUELTO` y equipo disponible mediante UI o API.

## Fixture Design

Los fixtures deben usar `request` de Playwright o `APIRequestContext`:

- `loginAsAdmin()` obtiene JWT desde `/auth/login`.
- `authorizedRequest()` agrega `Authorization: Bearer <token>`.
- `createTestUser()` genera datos unicos con timestamp.
- `createTestEquipment()` genera codigo unico con timestamp.
- `createTestLoan()` usa ids reales creados previamente.
- `cleanup()` intenta revertir en orden: prestamo/devolucion, equipo, usuario.

Cuando el backend no exponga borrado fisico, el cleanup debe usar endpoints existentes de desactivacion o marcar el dato con prefijo `e2e-` para facilitar limpieza manual.

## Selector Strategy

Prioridad de selectores:

1. roles accesibles (`getByRole`);
2. labels (`getByLabel`);
3. placeholders;
4. texto visible especifico;
5. `data-testid` solo cuando la UI no tenga una forma accesible estable.

Si se agregan `data-testid`, deben ser pocos y ligados a acciones criticas como abrir modal, guardar formulario, confirmar devolucion o ubicar filas por codigo.

## Reliability Rules

- Cada test debe crear datos unicos para evitar colisiones.
- Las pruebas no deben depender del orden global de ejecucion.
- Las esperas deben basarse en URL, respuesta API, estado visible o filas esperadas, no en sleeps fijos.
- Los flujos destructivos deben limpiar sus propios datos cuando sea viable.
- Las credenciales y URLs deben venir de variables de entorno con defaults locales seguros.

## Documentation

Crear o actualizar:

- `PrestamosTest/docs/e2e-test-mapping.md`: mapeo de cada escenario de `AI_TEST_SPEC.md` hacia spec/Page Object/fixture real.
- `docs/test-results.md`: comando usado, fecha, resultado y brechas si algun caso queda pendiente.
