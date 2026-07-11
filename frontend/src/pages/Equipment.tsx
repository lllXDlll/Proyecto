import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Laptop,
  Loader2,
  Plus,
  Search,
  SlidersHorizontal,
  X,
  XCircle
} from 'lucide-react';

type EquipmentStatus = 'DISPONIBLE' | 'INACTIVO' | 'PRESTADO' | 'MANTENIMIENTO';

interface EquipmentItem {
  id: number;
  nombre: string;
  descripcion: string | null;
  codigoInventario: string;
  estado: EquipmentStatus;
  fechaCreacion: string;
  fechaActualizacion: string;
}

const emptyForm = {
  nombre: '',
  descripcion: '',
  codigoInventario: '',
  estado: 'DISPONIBLE' as EquipmentStatus
};

const Equipment: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.rol === 'ADMINISTRADOR';

  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [estado, setEstado] = useState('');
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<EquipmentItem | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; item: EquipmentItem | null }>({
    isOpen: false,
    item: null
  });

  const limit = 5;

  const fetchEquipment = async () => {
    setLoading(true);
    setListError('');

    try {
      const response = await api.get('/equipment', {
        params: { page, limit, search, estado: estado || undefined }
      });

      setEquipment(response.data.equipment);
      setTotal(response.data.meta.total);
      setTotalPages(Math.max(response.data.meta.totalPages, 1));
    } catch (error: any) {
      console.error('Error fetching equipment:', error);
      setListError(error.response?.data?.error || 'No se pudo cargar el inventario');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, [page, search, estado]);

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch('');
    setSearchInput('');
    setEstado('');
    setPage(1);
  };

  const openCreateModal = () => {
    setEditingEquipment(null);
    setFormData(emptyForm);
    setFormErrors({});
    setSubmitError('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: EquipmentItem) => {
    setEditingEquipment(item);
    setFormData({
      nombre: item.nombre,
      descripcion: item.descripcion || '',
      codigoInventario: item.codigoInventario,
      estado: item.estado
    });
    setFormErrors({});
    setSubmitError('');
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.nombre.trim()) errors.nombre = 'El nombre es requerido';
    if (!formData.codigoInventario.trim()) errors.codigoInventario = 'El codigo de inventario es requerido';
    if (!['DISPONIBLE', 'INACTIVO', 'PRESTADO', 'MANTENIMIENTO'].includes(formData.estado)) errors.estado = 'Estado invalido';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        codigoInventario: formData.codigoInventario,
        estado: formData.estado
      };

      if (editingEquipment) {
        await api.put(`/equipment/${editingEquipment.id}`, payload);
      } else {
        await api.post('/equipment', payload);
      }

      setIsModalOpen(false);
      fetchEquipment();
    } catch (error: any) {
      console.error('Error saving equipment:', error);
      setSubmitError(error.response?.data?.error || 'Error al guardar el equipo');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmToggleStatus = async () => {
    const item = confirmModal.item;
    if (!item) return;

    const nextStatus: EquipmentStatus = item.estado === 'INACTIVO' ? 'DISPONIBLE' : 'INACTIVO';

    try {
      await api.put(`/equipment/${item.id}`, { estado: nextStatus });
      setConfirmModal({ isOpen: false, item: null });
      fetchEquipment();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error al cambiar estado');
    }
  };

  const formatDate = (value: string) => new Date(value).toLocaleDateString('es-PE');

  return (
    <div className="dashboard-layout">
      <nav className="navbar">
        <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18} style={{ marginRight: '8px' }} />
          <span>Volver al Dashboard</span>
        </div>
        <div className="navbar-user">
          <span className="user-badge">{user?.rol || 'USUARIO'}</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{user?.nombre}</span>
        </div>
      </nav>

      <main className="main-content animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div>
            <h2 className="welcome-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Laptop size={32} style={{ color: 'var(--primary)' }} />
              <span>Inventario de Equipos</span>
            </h2>
            <p className="welcome-desc">Consulta disponibilidad y administra los activos registrados para prestamos.</p>
          </div>
          {isAdmin && (
            <button className="btn btn-primary" style={{ width: 'auto' }} onClick={openCreateModal}>
              <Plus size={18} />
              <span>Registrar Equipo</span>
            </button>
          )}
        </div>

        <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1fr) 220px auto auto', gap: '12px', alignItems: 'center' }}>
            <div className="input-wrapper">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input type="text" className="form-input" style={{ paddingLeft: '42px' }} placeholder="Buscar por nombre o codigo..." value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
            </div>
            <div className="input-wrapper">
              <SlidersHorizontal size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <select className="form-input" style={{ paddingLeft: '42px', background: 'var(--bg-secondary)' }} value={estado} onChange={(event) => { setEstado(event.target.value); setPage(1); }}>
                <option value="">Todos los estados</option>
                <option value="DISPONIBLE">Disponible</option>
                <option value="PRESTADO">Prestado</option>
                <option value="MANTENIMIENTO">Mantenimiento</option>
                <option value="INACTIVO">Inactivo</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>Buscar</button>
            {(search || searchInput || estado) && <button type="button" className="btn btn-secondary" style={{ width: 'auto' }} onClick={handleClearFilters}>Limpiar</button>}
          </form>
        </div>

        {listError && (
          <div className="form-error" style={{ marginBottom: '20px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <AlertTriangle size={18} />
            <span>{listError}</span>
          </div>
        )}

        <div className="glass-card" style={{ overflow: 'hidden', marginBottom: '24px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
            </div>
          ) : equipment.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>No se encontraron equipos registrados.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-secondary)' }}>Equipo</th>
                    <th style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-secondary)' }}>Codigo</th>
                    <th style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-secondary)' }}>Descripcion</th>
                    <th style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-secondary)' }}>Estado</th>
                    <th style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-secondary)' }}>Creacion</th>
                    {isAdmin && <th style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right' }}>Acciones</th>}
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 600 }}>{item.nombre}</td>
                      <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{item.codigoInventario}</td>
                      <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', maxWidth: '280px' }}>{item.descripcion || 'Sin descripcion'}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 600, color: item.estado === 'DISPONIBLE' ? 'var(--success)' : item.estado === 'PRESTADO' ? 'var(--warning)' : item.estado === 'MANTENIMIENTO' ? 'var(--primary)' : 'var(--error)' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.estado === 'DISPONIBLE' ? 'var(--success)' : item.estado === 'PRESTADO' ? 'var(--warning)' : item.estado === 'MANTENIMIENTO' ? 'var(--primary)' : 'var(--error)' }}></span>
                          {item.estado === 'DISPONIBLE' ? 'Disponible' : item.estado === 'PRESTADO' ? 'Prestado' : item.estado === 'MANTENIMIENTO' ? 'Mantenimiento' : 'Inactivo'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{formatDate(item.fechaCreacion)}</td>
                      {isAdmin && (
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button className="btn btn-secondary" style={{ width: 'auto', padding: '6px 10px' }} onClick={() => openEditModal(item)} title="Editar"><Edit2 size={14} /></button>
                            <button className="btn btn-secondary" style={{ width: 'auto', padding: '6px 10px', color: item.estado === 'DISPONIBLE' ? 'var(--error)' : 'var(--success)' }} disabled={item.estado === 'PRESTADO'} onClick={() => setConfirmModal({ isOpen: true, item })} title={item.estado === 'PRESTADO' ? 'Equipo prestado' : item.estado === 'DISPONIBLE' ? 'Desactivar' : 'Activar'}>
                              {item.estado === 'DISPONIBLE' ? <XCircle size={14} /> : <CheckCircle2 size={14} />}
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Mostrando pagina {page} de {totalPages} ({total} equipos en total)</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 12px' }} disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}><ChevronLeft size={16} /></button>
              <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 12px' }} disabled={page === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </main>

      {isModalOpen && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '560px', padding: '32px', position: 'relative' }}>
            <button style={{ position: 'absolute', right: '20px', top: '20px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>{editingEquipment ? 'Editar Equipo' : 'Registrar Equipo'}</h3>
            <form onSubmit={handleFormSubmit}>
              {submitError && <div className="form-error" style={{ marginBottom: '20px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}><AlertTriangle size={18} /><span>{submitError}</span></div>}
              <div className="form-group">
                <label className="form-label">Nombre del Equipo</label>
                <input className="form-input" value={formData.nombre} onChange={(event) => setFormData({ ...formData, nombre: event.target.value })} disabled={submitting} />
                {formErrors.nombre && <div className="form-error"><AlertTriangle size={14} />{formErrors.nombre}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Codigo de Inventario</label>
                <input className="form-input" value={formData.codigoInventario} onChange={(event) => setFormData({ ...formData, codigoInventario: event.target.value })} disabled={submitting} />
                {formErrors.codigoInventario && <div className="form-error"><AlertTriangle size={14} />{formErrors.codigoInventario}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Descripcion</label>
                <textarea className="form-input" rows={3} value={formData.descripcion} onChange={(event) => setFormData({ ...formData, descripcion: event.target.value })} disabled={submitting} />
              </div>
              {editingEquipment && (
                <div className="form-group">
                  <label className="form-label">Estado</label>
                  <select className="form-input" style={{ background: 'var(--bg-secondary)' }} value={formData.estado} onChange={(event) => setFormData({ ...formData, estado: event.target.value as EquipmentStatus })} disabled={submitting}>
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="PRESTADO">Prestado</option>
                    <option value="MANTENIMIENTO">Mantenimiento</option>
                    <option value="INACTIVO">Inactivo</option>
                  </select>
                  {formErrors.estado && <div className="form-error"><AlertTriangle size={14} />{formErrors.estado}</div>}
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)} disabled={submitting}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Guardando...' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmModal.isOpen && isAdmin && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 101, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '420px', padding: '24px', textAlign: 'center' }}>
            <AlertTriangle size={48} style={{ color: confirmModal.item?.estado === 'DISPONIBLE' ? 'var(--error)' : 'var(--success)', marginBottom: '16px' }} />
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>{confirmModal.item?.estado === 'DISPONIBLE' ? 'Desactivar Equipo' : 'Activar Equipo'}</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>Confirma el cambio de estado para <strong>{confirmModal.item?.nombre}</strong>. El registro seguira visible en el inventario.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setConfirmModal({ isOpen: false, item: null })}>Cancelar</button>
              <button className="btn" style={{ backgroundColor: confirmModal.item?.estado === 'DISPONIBLE' ? 'var(--error)' : 'var(--success)', color: '#ffffff' }} onClick={confirmToggleStatus}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;
