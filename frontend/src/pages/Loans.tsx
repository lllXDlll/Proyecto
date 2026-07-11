import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import {
  AlertTriangle,
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  History,
  Loader2,
  Plus,
  Search,
  X
} from 'lucide-react';

interface User {
  id: number;
  usuario: string;
  nombre: string;
  activo: boolean;
}

interface Equipment {
  id: number;
  nombre: string;
  codigoInventario: string;
  estado: string;
}

interface Loan {
  id: number;
  estado: 'ACTIVO' | 'DEVUELTO';
  fechaPrestamo: string;
  fechaDevolucionPrevista: string | null;
  fechaDevolucionReal: string | null;
  observacionesPrestamo: string | null;
  observacionesDevolucion: string | null;
  usuario: User;
  equipo: Equipment;
}

const emptyLoanForm = {
  usuarioId: '',
  equipoId: '',
  fechaDevolucionPrevista: '',
  observacionesPrestamo: ''
};

const Loans: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState<'active' | 'history'>('active');
  const [loans, setLoans] = useState<Loan[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [availableEquipment, setAvailableEquipment] = useState<Equipment[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState('');

  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [loanForm, setLoanForm] = useState(emptyLoanForm);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [returnModal, setReturnModal] = useState<{ isOpen: boolean; loan: Loan | null; notes: string }>({
    isOpen: false,
    loan: null,
    notes: ''
  });

  const limit = 5;

  const fetchLoans = async () => {
    setLoading(true);
    setListError('');

    try {
      const endpoint = tab === 'active' ? '/loans/active' : '/loans/history';
      const response = await api.get(endpoint, {
        params: {
          page,
          limit,
          search,
          estado: tab === 'history' ? statusFilter || undefined : undefined,
          from: tab === 'history' ? from || undefined : undefined,
          to: tab === 'history' ? to || undefined : undefined
        }
      });

      setLoans(response.data.loans);
      setTotal(response.data.meta.total);
      setTotalPages(Math.max(response.data.meta.totalPages, 1));
    } catch (error: any) {
      console.error('Error fetching loans:', error);
      setListError(error.response?.data?.error || 'No se pudieron cargar los prestamos');
    } finally {
      setLoading(false);
    }
  };

  const fetchFormData = async () => {
    try {
      const [usersResponse, equipmentResponse] = await Promise.all([
        api.get('/users', { params: { page: 1, limit: 100 } }),
        api.get('/equipment', { params: { page: 1, limit: 100, estado: 'DISPONIBLE' } })
      ]);

      setUsers(usersResponse.data.users.filter((item: User) => item.activo));
      setAvailableEquipment(equipmentResponse.data.equipment);
    } catch (error) {
      console.error('Error fetching loan form data:', error);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, [tab, page, search, statusFilter, from, to]);

  useEffect(() => {
    fetchFormData();
  }, []);

  const resetFilters = () => {
    setSearch('');
    setSearchInput('');
    setStatusFilter('');
    setFrom('');
    setTo('');
    setPage(1);
  };

  const openLoanModal = () => {
    setLoanForm(emptyLoanForm);
    setFormErrors({});
    setSubmitError('');
    fetchFormData();
    setIsLoanModalOpen(true);
  };

  const validateLoanForm = () => {
    const errors: { [key: string]: string } = {};
    if (!loanForm.usuarioId) errors.usuarioId = 'Selecciona un usuario';
    if (!loanForm.equipoId) errors.equipoId = 'Selecciona un equipo disponible';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitLoan = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateLoanForm()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      await api.post('/loans', {
        usuarioId: Number(loanForm.usuarioId),
        equipoId: Number(loanForm.equipoId),
        fechaDevolucionPrevista: loanForm.fechaDevolucionPrevista || undefined,
        observacionesPrestamo: loanForm.observacionesPrestamo
      });

      setIsLoanModalOpen(false);
      fetchLoans();
      fetchFormData();
    } catch (error: any) {
      setSubmitError(error.response?.data?.error || 'Error al registrar el prestamo');
    } finally {
      setSubmitting(false);
    }
  };

  const submitReturn = async () => {
    if (!returnModal.loan) return;

    try {
      await api.put(`/loans/${returnModal.loan.id}/return`, {
        observacionesDevolucion: returnModal.notes
      });

      setReturnModal({ isOpen: false, loan: null, notes: '' });
      fetchLoans();
      fetchFormData();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error al registrar la devolucion');
    }
  };

  const formatDate = (value: string | null) => {
    if (!value) return 'Sin fecha';
    return new Date(value).toLocaleDateString('es-PE');
  };

  return (
    <div className="dashboard-layout">
      <nav className="navbar">
        <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18} style={{ marginRight: '8px' }} />
          <span>Volver al Dashboard</span>
        </div>
        <div className="navbar-user">
          <span className="user-badge">{user?.rol || 'ADMINISTRADOR'}</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{user?.nombre}</span>
        </div>
      </nav>

      <main className="main-content animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
          <div>
            <h2 className="welcome-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CalendarClock size={32} style={{ color: 'var(--primary)' }} />
              <span>Gestion de Prestamos</span>
            </h2>
            <p className="welcome-desc">Registra prestamos, procesa devoluciones y consulta el historial operativo.</p>
          </div>
          <button className="btn btn-primary" style={{ width: 'auto' }} onClick={openLoanModal}>
            <Plus size={18} />
            <span>Registrar Prestamo</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button className={`btn ${tab === 'active' ? 'btn-primary' : 'btn-secondary'}`} style={{ width: 'auto' }} onClick={() => { setTab('active'); setPage(1); }}>
            <ClipboardList size={16} />
            <span>Activos</span>
          </button>
          <button className={`btn ${tab === 'history' ? 'btn-primary' : 'btn-secondary'}`} style={{ width: 'auto' }} onClick={() => { setTab('history'); setPage(1); }}>
            <History size={16} />
            <span>Historial</span>
          </button>
        </div>

        <div className="glass-card" style={{ padding: '20px', marginBottom: '24px' }}>
          <form onSubmit={(event) => { event.preventDefault(); setSearch(searchInput); setPage(1); }} style={{ display: 'grid', gridTemplateColumns: tab === 'history' ? 'minmax(220px, 1fr) 160px 150px 150px auto auto' : 'minmax(220px, 1fr) auto auto', gap: '12px', alignItems: 'center' }}>
            <div className="input-wrapper">
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input className="form-input" style={{ paddingLeft: '42px' }} placeholder="Buscar usuario, equipo o codigo..." value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
            </div>
            {tab === 'history' && (
              <>
                <select className="form-input" style={{ background: 'var(--bg-secondary)' }} value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }}>
                  <option value="">Todos</option>
                  <option value="ACTIVO">Activo</option>
                  <option value="DEVUELTO">Devuelto</option>
                </select>
                <input className="form-input" type="date" value={from} onChange={(event) => { setFrom(event.target.value); setPage(1); }} />
                <input className="form-input" type="date" value={to} onChange={(event) => { setTo(event.target.value); setPage(1); }} />
              </>
            )}
            <button type="submit" className="btn btn-primary" style={{ width: 'auto' }}>Buscar</button>
            {(search || searchInput || statusFilter || from || to) && <button type="button" className="btn btn-secondary" style={{ width: 'auto' }} onClick={resetFilters}>Limpiar</button>}
          </form>
        </div>

        {listError && <div className="form-error" style={{ marginBottom: '20px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}><AlertTriangle size={18} />{listError}</div>}

        <div className="glass-card" style={{ overflow: 'hidden', marginBottom: '24px' }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
              <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
            </div>
          ) : loans.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>No se encontraron prestamos.</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>Usuario</th>
                    <th style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>Equipo</th>
                    <th style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>Prestamo</th>
                    <th style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>Devolucion prevista</th>
                    <th style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>Estado</th>
                    {tab === 'active' && <th style={{ padding: '16px 18px', color: 'var(--text-secondary)', textAlign: 'right' }}>Acciones</th>}
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr key={loan.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '16px 18px' }}>
                        <strong>{loan.usuario.nombre}</strong>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{loan.usuario.usuario}</div>
                      </td>
                      <td style={{ padding: '16px 18px' }}>
                        <strong>{loan.equipo.nombre}</strong>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{loan.equipo.codigoInventario}</div>
                      </td>
                      <td style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>{formatDate(loan.fechaPrestamo)}</td>
                      <td style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>{formatDate(loan.fechaDevolucionPrevista)}</td>
                      <td style={{ padding: '16px 18px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: loan.estado === 'ACTIVO' ? 'var(--warning)' : 'var(--success)' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: loan.estado === 'ACTIVO' ? 'var(--warning)' : 'var(--success)' }}></span>
                          {loan.estado === 'ACTIVO' ? 'Activo' : 'Devuelto'}
                        </span>
                      </td>
                      {tab === 'active' && (
                        <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                          <button className="btn btn-secondary" style={{ width: 'auto', padding: '6px 10px', color: 'var(--success)' }} onClick={() => setReturnModal({ isOpen: true, loan, notes: '' })}>
                            <CheckCircle2 size={14} />
                            <span>Devolver</span>
                          </button>
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
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Mostrando pagina {page} de {totalPages} ({total} prestamos en total)</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 12px' }} disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}><ChevronLeft size={16} /></button>
              <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 12px' }} disabled={page === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}><ChevronRight size={16} /></button>
            </div>
          </div>
        )}
      </main>

      {isLoanModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '560px', padding: '32px', position: 'relative' }}>
            <button style={{ position: 'absolute', right: '20px', top: '20px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setIsLoanModalOpen(false)}><X size={20} /></button>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>Registrar Prestamo</h3>
            <form onSubmit={submitLoan}>
              {submitError && <div className="form-error" style={{ marginBottom: '20px', padding: '10px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}><AlertTriangle size={18} />{submitError}</div>}
              <div className="form-group">
                <label className="form-label">Usuario</label>
                <select className="form-input" style={{ background: 'var(--bg-secondary)' }} value={loanForm.usuarioId} onChange={(event) => setLoanForm({ ...loanForm, usuarioId: event.target.value })}>
                  <option value="">Selecciona usuario activo</option>
                  {users.map((item) => <option key={item.id} value={item.id}>{item.nombre} ({item.usuario})</option>)}
                </select>
                {formErrors.usuarioId && <div className="form-error"><AlertTriangle size={14} />{formErrors.usuarioId}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Equipo disponible</label>
                <select className="form-input" style={{ background: 'var(--bg-secondary)' }} value={loanForm.equipoId} onChange={(event) => setLoanForm({ ...loanForm, equipoId: event.target.value })}>
                  <option value="">Selecciona equipo disponible</option>
                  {availableEquipment.map((item) => <option key={item.id} value={item.id}>{item.nombre} ({item.codigoInventario})</option>)}
                </select>
                {formErrors.equipoId && <div className="form-error"><AlertTriangle size={14} />{formErrors.equipoId}</div>}
              </div>
              <div className="form-group">
                <label className="form-label">Fecha de devolucion prevista</label>
                <input className="form-input" type="date" value={loanForm.fechaDevolucionPrevista} onChange={(event) => setLoanForm({ ...loanForm, fechaDevolucionPrevista: event.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Observaciones</label>
                <textarea className="form-input" rows={3} value={loanForm.observacionesPrestamo} onChange={(event) => setLoanForm({ ...loanForm, observacionesPrestamo: event.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsLoanModalOpen(false)} disabled={submitting}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Guardando...' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {returnModal.isOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 101, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '430px', padding: '24px', textAlign: 'center' }}>
            <CheckCircle2 size={48} style={{ color: 'var(--success)', marginBottom: '16px' }} />
            <h4 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>Registrar Devolucion</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.95rem' }}>
              Confirma la devolucion de <strong>{returnModal.loan?.equipo.nombre}</strong>.
            </p>
            <textarea className="form-input" rows={3} placeholder="Observaciones de devolucion" value={returnModal.notes} onChange={(event) => setReturnModal({ ...returnModal, notes: event.target.value })} />
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button className="btn btn-secondary" onClick={() => setReturnModal({ isOpen: false, loan: null, notes: '' })}>Cancelar</button>
              <button className="btn" style={{ backgroundColor: 'var(--success)', color: '#ffffff' }} onClick={submitReturn}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;
