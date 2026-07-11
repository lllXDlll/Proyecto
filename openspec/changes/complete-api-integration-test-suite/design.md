## Context

Endpoints reales descubiertos:

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `GET /api/equipment`
- `POST /api/equipment`
- `PUT /api/equipment/:id`
- `POST /api/loans`
- `PUT /api/loans/:id/return`
- `GET /api/loans/active`
- `GET /api/loans/history`
- `GET /api/dashboard/summary`
- `GET /api/reports/equipment/status`
- `GET /api/reports/loans/stats`
- `GET /api/reports/loans`

El API no expone actualmente DELETE ni GET by id para usuarios/equipos/prestamos. Esos casos del requerimiento adjunto se documentaran como no aplicables a la API actual, o se cubriran indirectamente mediante listados/filtros y actualizaciones si el comportamiento existe.

## Target Structure

Usar `PrestamosTest` como raiz de QA del proyecto:

```text
PrestamosTest/
  integration/
    auth/
      auth.integration.test.ts
    users/
      users.integration.test.ts
    equipment/
      equipment.integration.test.ts
    loans/
      loans.integration.test.ts
    dashboard/
      dashboard.integration.test.ts
    reports/
      reports.integration.test.ts
    security/
      authorization.integration.test.ts
    helpers/
      postgres-container.ts
      prisma.ts
      app.ts
      auth.ts
      seed.ts
      cleanup.ts
      factories.ts
    jest.setup.ts
    jest.globalSetup.ts
    jest.globalTeardown.ts
```

Mantener o migrar `PrestamosTest/integration/api/protected-routes.test.ts` hacia `security/authorization.integration.test.ts` si evita duplicidad.

## Testcontainers Design

- Usar `testcontainers` con imagen `postgres:15-alpine`.
- Arrancar un contenedor para toda la suite de integracion.
- Construir `DATABASE_URL` dinamico con host, puerto, usuario, password y database del contenedor.
- Escribir `process.env.DATABASE_URL` antes de importar `backend/src/db` o cualquier modulo que inicialice Prisma.
- Aplicar schema con una de estas opciones, en orden preferido:
  1. `npx prisma migrate deploy --schema backend/prisma/schema.prisma`
  2. `npx prisma db push --schema backend/prisma/schema.prisma` si migrations no son adecuadas para contenedor efimero.
- Reutilizar un Prisma Client apuntando al contenedor.
- Detener contenedor en teardown global.

## Isolation

Antes de cada test:

- limpiar tablas en orden seguro: `prestamos`, `equipos`, `usuarios`;
- reiniciar identidades si PostgreSQL lo permite con `TRUNCATE ... RESTART IDENTITY CASCADE`;
- sembrar usuarios base requeridos para cada caso mediante helpers.

Los tests no dependeran del orden de ejecucion.

## Helpers

### `auth.ts`

- `createUser({ rol, activo, password })`
- `login(usuario, password)`
- `adminToken()`
- `regularToken()`
- `expiredToken()`
- `invalidToken()`

### `factories.ts`

- `buildUser()`
- `buildEquipment()`
- `buildLoan()`
- generar sufijos unicos para evitar colisiones.

### `seed.ts`

- seed minimo por test: administrador, usuario activo, usuario inactivo, equipos por estado.

### `cleanup.ts`

- truncate transaccional o secuencial.

## Coverage Plan

### Authentication

- login exitoso devuelve token y usuario.
- password invalida devuelve 401.
- usuario inexistente devuelve 401.
- usuario inactivo devuelve 401.
- payload sin usuario/password devuelve 400.
- `/auth/me` acepta JWT valido y rechaza JWT faltante/invalido/expirado.

### Users

- `POST /api/users` crea usuario admin-only.
- rechaza duplicado.
- rechaza campos requeridos faltantes.
- `GET /api/users` pagina y filtra por nombre/usuario.
- `PUT /api/users/:id` actualiza datos y estado.
- rechaza id invalido/no encontrado.
- rechaza auto-desactivacion admin.
- rechaza acceso sin JWT y con rol no admin.

### Equipment

- `POST /api/equipment` crea equipo disponible.
- rechaza codigo duplicado.
- rechaza nombre/codigo faltante.
- `GET /api/equipment` pagina, filtra por busqueda y estado.
- rechaza estado de filtro invalido.
- `PUT /api/equipment/:id` actualiza nombre, descripcion, codigo y estado.
- rechaza estado invalido, id invalido, no encontrado y codigo duplicado.
- valida reglas de rol admin para crear/actualizar.

### Loans

- `POST /api/loans` crea prestamo y cambia equipo a `PRESTADO`.
- rechaza usuario inexistente o inactivo.
- rechaza equipo inexistente o no disponible.
- rechaza fecha invalida.
- `PUT /api/loans/:id/return` devuelve prestamo y cambia equipo a `DISPONIBLE`.
- rechaza devolucion repetida, id invalido y prestamo no encontrado.
- `GET /api/loans/active` lista solo activos con paginacion/busqueda.
- `GET /api/loans/history` lista historial con filtros por estado, usuario, equipo y fechas.

### Dashboard

- `GET /api/dashboard/summary` requiere JWT.
- calcula totales de equipos por estado.
- calcula total de usuarios.
- calcula prestamos activos/devueltos/total.

### Reports

- `GET /api/reports/equipment/status` requiere JWT y permite rol usuario para reporte de equipos.
- valida filtro de estado y paginacion.
- `GET /api/reports/loans/stats` requiere admin.
- valida rangos de fechas.
- `GET /api/reports/loans` requiere admin y filtra por estado, usuario, equipo y fechas.
- cubre resultados vacios e invalid parameters.

### Security

- 401 sin JWT en rutas protegidas.
- 401 con JWT invalido.
- 401 con JWT expirado.
- 403 con rol no autorizado en rutas admin-only.
- rutas publicas como health y login no requieren JWT.

## Assertions

Cada test debe validar:

- status HTTP;
- schema de respuesta esperado;
- valores importantes;
- headers cuando aplique;
- estado real en PostgreSQL mediante Prisma;
- efectos laterales como cambio de estado de equipo/prestamo.

## Scripts

Agregar en `backend/package.json`:

```json
{
  "test:integration": "jest --runInBand --config jest.integration.config.js",
  "test:integration:watch": "jest --watch --config jest.integration.config.js",
  "test:integration:coverage": "jest --coverage --config jest.integration.config.js"
}
```

La raiz del repo puede delegar:

```json
{
  "test:integration": "npm --prefix backend run test:integration"
}
```

## Verification

- `npm.cmd --prefix backend run test:integration`
- `npm.cmd --prefix backend run test:integration:coverage`
- `npx.cmd openspec validate complete-api-integration-test-suite --strict`

Si Docker no esta disponible, documentar el bloqueo explicitamente en `docs/test-results.md`.
