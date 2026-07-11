import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../../../../frontend/src/context/AuthContext';
import ProtectedRoute from '../../../../frontend/src/components/ProtectedRoute';
import AdminRoute from '../../../../frontend/src/components/AdminRoute';

describe('route guards', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects unauthenticated users away from protected routes', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<span>login-page</span>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<span>dashboard-page</span>} />
            </Route>
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('login-page')).toBeInTheDocument();
  });

  it('redirects non-admin users away from admin routes', async () => {
    localStorage.setItem('token', 'token');
    localStorage.setItem('usuario', JSON.stringify({ id: 1, usuario: 'user', nombre: 'User', rol: 'USUARIO' }));

    render(
      <MemoryRouter initialEntries={['/users']}>
        <AuthProvider>
          <Routes>
            <Route path="/dashboard" element={<span>dashboard-page</span>} />
            <Route element={<AdminRoute />}>
              <Route path="/users" element={<span>admin-page</span>} />
            </Route>
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByText('dashboard-page')).toBeInTheDocument();
  });
});
