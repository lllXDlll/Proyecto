import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../../../frontend/src/context/AuthContext';

const Probe = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="auth">{String(isAuthenticated)}</span>
      <span data-testid="name">{user?.nombre || 'none'}</span>
      <button onClick={() => login('token-123', { id: 1, usuario: 'admin', nombre: 'Admin', rol: 'ADMINISTRADOR' })}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and clears authenticated user state', async () => {
    render(
      <AuthProvider>
        <Probe />
      </AuthProvider>
    );

    await waitFor(() => expect(screen.getByTestId('auth')).toHaveTextContent('false'));

    fireEvent.click(screen.getByText('login'));

    await waitFor(() => expect(screen.getByTestId('auth')).toHaveTextContent('true'));
    expect(screen.getByTestId('name')).toHaveTextContent('Admin');
    expect(localStorage.getItem('token')).toBe('token-123');

    fireEvent.click(screen.getByText('logout'));

    await waitFor(() => expect(screen.getByTestId('auth')).toHaveTextContent('false'));
    expect(localStorage.getItem('token')).toBeNull();
  });
});
