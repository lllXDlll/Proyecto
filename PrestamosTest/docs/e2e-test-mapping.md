# E2E Test Mapping

Este documento mapea `openspec/specs/AI_TEST_SPEC.md` a la suite Playwright real del proyecto React/Express.

## Entorno adaptado

- Frontend: `E2E_BASE_URL` o `http://127.0.0.1:5173`.
- API fixtures: `E2E_API_BASE_URL` o `http://localhost:3000/api`.
- Render: `E2E_TARGET=render` usa `https://equipment-loan-management.onrender.com` y `https://equipment-loan-management.onrender.com/api` sin levantar servidores locales.
- Admin seed: `E2E_ADMIN_USER` / `E2E_ADMIN_PASSWORD`, defaults `admin/admin123`.
- Configuracion: `frontend/playwright.config.ts`.
- Ubicacion: `PrestamosTest/e2e`.

## Escenarios

| AI_TEST_SPEC.md | Implementacion adaptada |
| --- | --- |
| 1. Login exitoso | `PrestamosTest/e2e/auth/login.spec.ts` valida `/login`, redireccion a `/dashboard` y token en `localStorage`. |
| 2. Password incorrecta | `login.spec.ts` valida permanencia en login, error visible y ausencia de token. |
| 3. Usuario inexistente | `login.spec.ts` usa username unico inexistente y valida ausencia de token. |
| 4. Campos obligatorios login | `login.spec.ts` envia formulario vacio y valida mensajes requeridos. |
| 5. CRUD Usuarios UI | `usuarios/usuarios-crud.spec.ts` crea usuario desde UI, busca el registro y lo desactiva por API. |
| 6. CRUD Equipos UI | `equipos/equipos-crud.spec.ts` crea equipo desde UI, busca el registro y lo marca inactivo por API. |
| 7. Prestamo / Devolucion | `prestamos/prestamos-devoluciones.spec.ts` prepara usuario/equipo por API, registra prestamo desde UI, devuelve desde UI y confirma historial. |

## Adaptaciones relevantes

- La especificacion original usaba host unificado `http://localhost:5100`; aqui frontend y API corren en puertos separados durante desarrollo.
- La especificacion original usaba correo `admin@local.test`; este proyecto usa `usuario` con seed `admin`.
- No hay endpoints DELETE para usuarios/equipos. La limpieza E2E desactiva usuarios y marca equipos como `INACTIVO`.
- Los modales actuales no tienen todos los labels asociados a inputs. Los Page Objects acotan locators dentro del modal para mantener estabilidad sin cambiar UI productiva.
- Para ejecutar contra Render no se requiere `DATABASE_URL` local; las pruebas usan la aplicacion/API desplegada como objetivo remoto.

## Comandos Render

Desde la raiz del proyecto:

```powershell
npm.cmd run test:e2e:render
```

Modo visible:

```powershell
$env:E2E_TARGET='render'
npm.cmd --prefix frontend run test:e2e -- --headed
```

Modo interactivo:

```powershell
cd frontend
$env:E2E_TARGET='render'
npx.cmd playwright test --ui
```

Reporte HTML:

```powershell
cd frontend
npx.cmd playwright show-report
```
