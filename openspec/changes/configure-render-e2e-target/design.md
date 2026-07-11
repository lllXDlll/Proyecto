## Context

La configuracion actual:

```ts
webServer: [
  {
    command: 'npm.cmd --prefix ../backend run dev',
    url: 'http://localhost:3000/api/health'
  },
  {
    command: 'npm.cmd run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173'
  }
]
```

Este comportamiento es correcto para desarrollo local, pero bloquea ejecuciones remotas porque Playwright intenta iniciar servicios locales aunque `E2E_BASE_URL` apunte a Render.

## Target Behavior

### Local mode

Default cuando no se define `E2E_TARGET=render` ni `E2E_BASE_URL` remoto:

- frontend: `http://127.0.0.1:5173`
- API fixtures: `http://localhost:3000/api`
- Playwright levanta backend y frontend locales con `webServer`.

### Render mode

Activado con cualquiera de estas opciones:

- `E2E_TARGET=render`
- `E2E_BASE_URL` empieza con `https://equipment-loan-management.onrender.com`
- `E2E_SKIP_WEBSERVER=true`

Comportamiento:

- frontend: `https://equipment-loan-management.onrender.com`
- API fixtures: `https://equipment-loan-management.onrender.com/api`
- Playwright no define `webServer`, por lo que no levanta backend/frontend locales.
- No se requiere `DATABASE_URL` local.

## Proposed Configuration

En `frontend/playwright.config.ts`:

- calcular `target` desde env vars;
- normalizar `baseURL`;
- calcular `apiBaseURL` solo para documentacion/config metadata si se necesita;
- construir `webServer` condicionalmente:

```ts
const renderBaseURL = 'https://equipment-loan-management.onrender.com';
const localBaseURL = 'http://127.0.0.1:5173';
const explicitBaseURL = process.env.E2E_BASE_URL;
const isRenderTarget =
  process.env.E2E_TARGET === 'render' ||
  process.env.E2E_SKIP_WEBSERVER === 'true' ||
  explicitBaseURL?.startsWith(renderBaseURL);

const baseURL = explicitBaseURL || (isRenderTarget ? renderBaseURL : localBaseURL);

export default defineConfig({
  webServer: isRenderTarget ? undefined : localWebServers,
  use: { baseURL, trace: 'retain-on-failure' }
});
```

En `PrestamosTest/e2e/fixtures/apiClient.ts`:

- default API local se mantiene para modo local;
- cuando `E2E_TARGET=render` y no hay `E2E_API_BASE_URL`, usar `https://equipment-loan-management.onrender.com/api`;
- permitir override explicito con `E2E_API_BASE_URL`.

## Commands

### Render headless

```powershell
cd C:\Users\mladi\OneDrive\Desktop\proyecto
$env:E2E_TARGET='render'
npm.cmd --prefix frontend run test:e2e
```

### Render headed

```powershell
cd C:\Users\mladi\OneDrive\Desktop\proyecto
$env:E2E_TARGET='render'
npm.cmd --prefix frontend run test:e2e -- --headed
```

### Render UI

```powershell
cd C:\Users\mladi\OneDrive\Desktop\proyecto\frontend
$env:E2E_TARGET='render'
npx.cmd playwright test --ui
```

### Explicit URLs

```powershell
$env:E2E_BASE_URL='https://equipment-loan-management.onrender.com'
$env:E2E_API_BASE_URL='https://equipment-loan-management.onrender.com/api'
npm.cmd --prefix frontend run test:e2e
```

## Reliability Rules

- Render mode MUST NOT start local web servers.
- Render mode MUST use HTTPS URLs for UI and API.
- Tests MUST continue to generate unique `e2e-` data.
- Cleanup behavior MUST remain best-effort through public API endpoints.
- Local mode MUST remain unchanged for developers.

## Security

- Do not commit `DATABASE_URL`, Supabase passwords, JWT secrets, or Render secrets.
- Render E2E uses the deployed app/API as a black-box target.
- Admin credentials remain configurable via `E2E_ADMIN_USER` and `E2E_ADMIN_PASSWORD`.
