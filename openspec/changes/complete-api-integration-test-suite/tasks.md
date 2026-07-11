## 1. API Discovery

- [x] 1.1 Enumerar rutas reales desde `backend/src/app.ts` y `backend/src/routes`. (QA)
- [x] 1.2 Mapear request/response models desde controladores y Prisma schema. (QA)
- [x] 1.3 Documentar endpoints no implementados del requerimiento adjunto, como DELETE y GET by id, como no aplicables. (QA)

## 2. Testcontainers Infrastructure

- [x] 2.1 Instalar/configurar dependencias `testcontainers` y tipos necesarios. (Tooling)
- [x] 2.2 Crear Jest config dedicada para integracion con global setup/teardown. (Tooling)
- [x] 2.3 Crear `postgres-container.ts` para iniciar PostgreSQL una vez por suite. (Integration)
- [x] 2.4 Configurar `DATABASE_URL` dinamico antes de importar app/Prisma. (Integration)
- [x] 2.5 Aplicar schema con Prisma migrate deploy o db push sobre el contenedor. (Integration)
- [x] 2.6 Detener contenedor y desconectar Prisma en teardown global. (Integration)

## 3. Shared Helpers

- [x] 3.1 Crear helper de Prisma test client. (Integration)
- [x] 3.2 Crear helper Supertest app import-safe. (Integration)
- [x] 3.3 Crear helpers de auth: crear usuario, login, admin token, regular token, invalid token, expired token. (Integration)
- [x] 3.4 Crear factories de usuarios, equipos y prestamos con datos unicos. (Integration)
- [x] 3.5 Crear seed minimo por test y cleanup/truncate entre tests. (Integration)

## 4. Authentication and Security Tests

- [x] 4.1 Cubrir login exitoso, credenciales invalidas, usuario inactivo y campos faltantes. (Auth)
- [x] 4.2 Cubrir `/api/auth/me` con JWT valido, faltante, invalido y expirado. (Auth)
- [x] 4.3 Cubrir 401 en rutas protegidas sin JWT. (Security)
- [x] 4.4 Cubrir 403 para rol no admin en rutas admin-only. (Security)

## 5. Domain Integration Tests

- [x] 5.1 Cubrir usuarios: create, list, pagination, search, update, duplicate, not found, validation, authorization. (Users)
- [x] 5.2 Cubrir equipos: create, duplicate code, list, filters, pagination, update, invalid status, not found, authorization. (Equipment)
- [x] 5.3 Cubrir prestamos: create, unavailable equipment, inactive user, invalid ids, return, repeated return, active list, history filters. (Loans)
- [x] 5.4 Cubrir dashboard summary con conteos reales. (Dashboard)
- [x] 5.5 Cubrir reportes de equipos, estadisticas de prestamos y reporte de prestamos con filtros y parametros invalidos. (Reports)

## 6. Scripts and Documentation

- [x] 6.1 Agregar scripts `test:integration`, `test:integration:watch`, `test:integration:coverage`. (Tooling)
- [x] 6.2 Documentar requisito Docker/Testcontainers y comandos de ejecucion. (Docs)
- [x] 6.3 Actualizar `docs/test-results.md` con resultado o bloqueo por Docker. (Docs)
- [x] 6.4 Documentar cobertura de endpoints y brechas no aplicables. (Docs)

## 7. Verification

- [x] 7.1 Ejecutar `npm.cmd --prefix backend run test:integration`. (Verification)
- [x] 7.2 Ejecutar `npm.cmd --prefix backend run test:integration:coverage`. (Verification)
- [x] 7.3 Confirmar que las pruebas no dependen de Supabase/Render ni de una DB local compartida. (Verification)
- [ ] 7.4 Validar OpenSpec del cambio. (OpenSpec)
