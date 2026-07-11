import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { 
  Users as UsersIcon, 
  Plus, 
  Search, 
  Edit2, 
  UserX, 
  UserCheck, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  AlertTriangle,
  Loader2 
} from 'lucide-react';

interface User {
  id: number;
  usuario: string;
  nombre: string;
  rol: string;
  activo: boolean;
}

const Users: React.FC = () => {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    usuario: '',
    password: '',
    rol: 'USUARIO',
    activo: true
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Status Confirm Modal States
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; user: User | null }>({
    isOpen: false,
    user: null
  });

  const limit = 5;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users', {
        params: { page, limit, search }
      });
      setUsers(response.data.users);
      setTotal(response.data.meta.total);
      setTotalPages(response.data.meta.totalPages);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearch('');
    setPage(1);
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({
      nombre: '',
      usuario: '',
      password: '',
      rol: 'USUARIO',
      activo: true
    });
    setFormErrors({});
    setSubmitError('');
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      nombre: user.nombre,
      usuario: user.usuario,
      password: '', // blank password unless changing it
      rol: user.rol,
      activo: user.activo
    });
    setFormErrors({});
    setSubmitError('');
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es requerido';
    if (!formData.usuario.trim()) errors.usuario = 'El nombre de usuario es requerido';
    if (!editingUser && !formData.password) errors.password = 'La contraseña es requerida';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      if (editingUser) {
        // Edit flow
        const updateData: any = {
          nombre: formData.nombre,
          usuario: formData.usuario,
          rol: formData.rol,
          activo: formData.activo
        };
        // Only update password if provided
        if (formData.password) {
          updateData.password = formData.password;
        }

        await api.put(`/users/${editingUser.id}`, updateData);
      } else {
        // Create flow
        await api.post('/users', formData);
      }

      setIsModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      console.error('Error saving user:', error);
      let errMsg = 'Error al procesar la solicitud';
      if (error.response && error.response.data && error.response.data.error) {
        errMsg = error.response.data.error;
      }
      setSubmitError(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle status flow
  const handleToggleStatusClick = (user: User) => {
    if (currentUser?.id === user.id) return; // Prevent self toggle
    setConfirmModal({
      isOpen: true,
      user
    });
  };

  const confirmToggleStatus = async () => {
    const targetUser = confirmModal.user;
    if (!targetUser) return;

    try {
      await api.put(`/users/${targetUser.id}`, {
        activo: !targetUser.activo
      });
      setConfirmModal({ isOpen: false, user: null });
      fetchUsers();
    } catch (error: any) {
      console.error('Error toggling user status:', error);
      alert(error.response?.data?.error || 'Error al cambiar estado');
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18} style={{ marginRight: '8px' }} />
          <span>Volver al Dashboard</span>
        </div>
        <div className="navbar-user">
          <span className="user-badge">{currentUser?.rol || 'ADMINISTRADOR'}</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{currentUser?.nombre}</span>
        </div>
      </nav>

      {/* Main panel */}
      <main className="main-content animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 className="welcome-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <UsersIcon size={32} style={{ color: 'var(--primary)' }} />
              <span>Gestión de Usuarios</span>
            </h2>
            <p className="welcome-desc">Administra las cuentas de usuario y los accesos de seguridad del sistema.</p>
          </div>
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={openCreateModal}>
            <Plus size={18} />
            <span>Registrar Usuario</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px' }}>
            <div className="input-wrapper" style={{ flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="Buscar usuarios por nombre o nickname..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>Buscar</button>
            {(search || searchInput) && (
              <button type="button" className="btn btn-secondary" style={{ width: 'auto' }} onClick={handleClearSearch}>Limpiar</button>
            )}
          </form>
        </div>

        {/* Users Table */}
        <div className="glass-card" style={{ overflow: 'hidden', marginBottom: '24px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <Loader2 size={36} className="spin" style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
            </div>
          ) : users.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No se encontraron usuarios registrados.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Nombre</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Usuario</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Rol</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)' }}>Estado</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '16px 24px', fontWeight: 500 }}>{user.nombre}</td>
                      <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{user.usuario}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span className="user-badge" style={{ 
                          background: user.rol === 'ADMINISTRADOR' ? 'rgba(217, 70, 239, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                          borderColor: user.rol === 'ADMINISTRADOR' ? 'rgba(217, 70, 239, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                          color: user.rol === 'ADMINISTRADOR' ? 'var(--accent)' : 'var(--primary)'
                        }}>
                          {user.rol}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '6px', 
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: user.activo ? 'var(--success)' : 'var(--error)' 
                        }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: user.activo ? 'var(--success)' : 'var(--error)' }}></span>
                          {user.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button 
                            className="btn btn-secondary" 
                            style={{ width: 'auto', padding: '6px 10px', fontSize: '0.85rem' }}
                            onClick={() => openEditModal(user)}
                          >
                            <Edit2 size={14} />
                          </button>
                          
                          <button 
                            className="btn btn-secondary" 
                            style={{ 
                              width: 'auto', 
                              padding: '6px 10px', 
                              fontSize: '0.85rem',
                              color: currentUser?.id === user.id ? 'var(--text-muted)' : (user.activo ? 'var(--error)' : 'var(--success)'),
                              cursor: currentUser?.id === user.id ? 'not-allowed' : 'pointer'
                            }}
                            disabled={currentUser?.id === user.id}
                            onClick={() => handleToggleStatusClick(user)}
                            title={currentUser?.id === user.id ? 'No puedes desactivarte a ti mismo' : (user.activo ? 'Desactivar' : 'Activar')}
                          >
                            {user.activo ? <UserX size={14} /> : <UserCheck size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Mostrando página {page} de {totalPages} ({total} usuarios en total)
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn btn-secondary" 
                style={{ width: 'auto', padding: '8px 12px' }}
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                className="btn btn-secondary" 
                style={{ width: 'auto', padding: '8px 12px' }}
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modal Dialog Form */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '32px', position: 'relative' }}>
            <button 
              style={{ position: 'absolute', right: '20px', top: '20px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>
              {editingUser ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}
            </h3>

            <form onSubmit={handleFormSubmit}>
              {submitError && (
                <div className="form-error" style={{ marginBottom: '20px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <AlertTriangle size={18} />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Nombre Completo</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  disabled={submitting}
                />
                {formErrors.nombre && <div className="form-error"><AlertTriangle size={14} />{formErrors.nombre}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Nombre de Usuario</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.usuario}
                  onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
                  disabled={submitting}
                />
                {formErrors.usuario && <div className="form-error"><AlertTriangle size={14} />{formErrors.usuario}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  {editingUser ? 'Nueva Contraseña (dejar en blanco para no cambiar)' : 'Contraseña'}
                </label>
                <input
                  type="password"
                  className="form-input"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={submitting}
                />
                {formErrors.password && <div className="form-error"><AlertTriangle size={14} />{formErrors.password}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Rol del Usuario</label>
                <select
                  className="form-input"
                  value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                  disabled={submitting}
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <option value="USUARIO">USUARIO (Prestatario)</option>
                  <option value="ADMINISTRADOR">ADMINISTRADOR (Gestor)</option>
                </select>
              </div>

              {editingUser && (
                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                  <input
                    type="checkbox"
                    id="activo-check"
                    checked={formData.activo}
                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                    disabled={submitting || currentUser?.id === editingUser.id}
                  />
                  <label htmlFor="activo-check" style={{ color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.95rem' }}>
                    Usuario Activo
                  </label>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)} disabled={submitting}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 101, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '24px', textAlign: 'center' }}>
            <AlertTriangle size={48} style={{ color: confirmModal.user?.activo ? 'var(--error)' : 'var(--success)', marginBottom: '16px' }} />
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>
              {confirmModal.user?.activo ? '¿Desactivar Usuario?' : '¿Activar Usuario?'}
            </h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
              ¿Estás seguro de que deseas {confirmModal.user?.activo ? 'desactivar' : 'activar'} a <strong>{confirmModal.user?.nombre}</strong>? 
              {confirmModal.user?.activo && ' El usuario ya no podrá ingresar al sistema.'}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setConfirmModal({ isOpen: false, user: null })}>
                Cancelar
              </button>
              <button 
                className="btn" 
                style={{ 
                  backgroundColor: confirmModal.user?.activo ? 'var(--error)' : 'var(--success)',
                  color: '#ffffff'
                }}
                onClick={confirmToggleStatus}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
