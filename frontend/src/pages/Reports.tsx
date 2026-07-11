import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { AlertTriangle, ArrowLeft, BarChart3, ChevronLeft, ChevronRight, FileText, Loader2, Search } from 'lucide-react';

interface Equipment {
  id: number;
  nombre: string;
  descripcion: string | null;
  codigoInventario: string;
  estado: string;
}

interface Loan {
  id: number;
  estado: string;
  fechaPrestamo: string;
  fechaDevolucionPrevista: string | null;
  fechaDevolucionReal: string | null;
  usuario: {
    id: number;
    usuario: string;
    nombre: string;
  };
  equipo: {
    id: number;
    nombre: string;
    codigoInventario: string;
    estado: string;
  };
}

interface LoanStats {
  total: number;
  active: number;
  completed: number;
}

const Reports: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.rol === 'ADMINISTRADOR';

  const [equipmentStatus, setEquipmentStatus] = useState('');
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [equipmentCounts, setEquipmentCounts] = useState<Record<string, number>>({});
  const [equipmentPage, setEquipmentPage] = useState(1);
  const [equipmentTotalPages, setEquipmentTotalPages] = useState(1);
  const [equipmentLoading, setEquipmentLoading] = useState(false);

  const [stats, setStats] = useState<LoanStats>({ total: 0, active: 0, completed: 0 });
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loanStatus, setLoanStatus] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [equipoId, setEquipoId] = useState('');
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loanPage, setLoanPage] = useState(1);
  const [loanTotalPages, setLoanTotalPages] = useState(1);
  const [loanLoading, setLoanLoading] = useState(false);
  const [error, setError] = useState('');

  const limit = 5;

  const fetchEquipmentStatus = async () => {
    setEquipmentLoading(true);
    setError('');
    try {
      const response = await api.get('/reports/equipment/status', {
        params: { page: equipmentPage, limit, estado: equipmentStatus || undefined }
      });
      setEquipmentCounts(response.data.byStatus);
      setEquipment(response.data.equipment);
      setEquipmentTotalPages(Math.max(response.data.meta.totalPages, 1));
    } catch (err: any) {
      setError(err.response?.data?.error || 'No se pudo cargar la consulta de equipos');
    } finally {
      setEquipmentLoading(false);
    }
  };

  const fetchLoanStats = async () => {
    if (!isAdmin) return;
    try {
      const response = await api.get('/reports/loans/stats', {
        params: { from: from || undefined, to: to || undefined }
      });
      setStats(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'No se pudieron cargar las estadisticas');
    }
  };

  const fetchLoanReport = async () => {
    if (!isAdmin) return;
    setLoanLoading(true);
    setError('');
    try {
      const response = await api.get('/reports/loans', {
        params: {
          page: loanPage,
          limit,
          estado: loanStatus || undefined,
          usuarioId: usuarioId || undefined,
          equipoId: equipoId || undefined,
          from: from || undefined,
          to: to || undefined
        }
      });
      setLoans(response.data.loans);
      setLoanTotalPages(Math.max(response.data.meta.totalPages, 1));
    } catch (err: any) {
      setError(err.response?.data?.error || 'No se pudo cargar el reporte de prestamos');
    } finally {
      setLoanLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipmentStatus();
  }, [equipmentPage, equipmentStatus]);

  useEffect(() => {
    fetchLoanStats();
    fetchLoanReport();
  }, [loanPage]);

  const applyLoanFilters = (event: React.FormEvent) => {
    event.preventDefault();
    setLoanPage(1);
    fetchLoanStats();
    fetchLoanReport();
  };

  const formatDate = (value: string | null) => {
    if (!value) return 'Sin fecha';
    return new Date(value).toLocaleDateString('es-PE');
  };

  const statusColor = (status: string) => {
    if (status === 'DISPONIBLE' || status === 'DEVUELTO') return 'var(--success)';
    if (status === 'PRESTADO' || status === 'ACTIVO') return 'var(--warning)';
    if (status === 'MANTENIMIENTO') return 'var(--primary)';
    return 'var(--error)';
  };

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
        <div style={{ marginBottom: '28px' }}>
          <h2 className="welcome-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BarChart3 size={32} style={{ color: 'var(--primary)' }} />
            <span>Reportes y Estadisticas</span>
          </h2>
          <p className="welcome-desc">Consulta el estado del inventario y la actividad de prestamos.</p>
        </div>

        {error && <div className="form-error" style={{ marginBottom: '20px', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}><AlertTriangle size={18} />{error}</div>}

        <section className="glass-card" style={{ padding: '20px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', gap: '12px', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Equipos por Estado</h3>
            <select className="form-input" style={{ width: '220px', background: 'var(--bg-secondary)' }} value={equipmentStatus} onChange={(event) => { setEquipmentStatus(event.target.value); setEquipmentPage(1); }}>
              <option value="">Todos los estados</option>
              <option value="DISPONIBLE">Disponible</option>
              <option value="PRESTADO">Prestado</option>
              <option value="MANTENIMIENTO">Mantenimiento</option>
              <option value="INACTIVO">Inactivo</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '18px' }}>
            {['DISPONIBLE', 'PRESTADO', 'MANTENIMIENTO', 'INACTIVO'].map((status) => (
              <div key={status} className="info-card" style={{ padding: '16px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{status}</span>
                <strong style={{ color: statusColor(status), fontSize: '1.5rem' }}>{equipmentCounts?.[status] || 0}</strong>
              </div>
            ))}
          </div>
          {equipmentLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '32px' }}><Loader2 size={30} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} /></div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Equipo</th>
                    <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Codigo</th>
                    <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px' }}>{item.nombre}</td>
                      <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{item.codigoInventario}</td>
                      <td style={{ padding: '12px', color: statusColor(item.estado), fontWeight: 600 }}>{item.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {equipmentTotalPages > 1 && <Pagination page={equipmentPage} totalPages={equipmentTotalPages} onPrev={() => setEquipmentPage((current) => Math.max(1, current - 1))} onNext={() => setEquipmentPage((current) => Math.min(equipmentTotalPages, current + 1))} />}
        </section>

        {isAdmin ? (
          <section className="glass-card" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.25rem', marginBottom: '18px' }}><FileText size={20} />Reporte de Prestamos</h3>
            <form onSubmit={applyLoanFilters} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '18px' }}>
              <input className="form-input" placeholder="Usuario ID" value={usuarioId} onChange={(event) => setUsuarioId(event.target.value)} />
              <input className="form-input" placeholder="Equipo ID" value={equipoId} onChange={(event) => setEquipoId(event.target.value)} />
              <select className="form-input" style={{ background: 'var(--bg-secondary)' }} value={loanStatus} onChange={(event) => setLoanStatus(event.target.value)}>
                <option value="">Todos</option>
                <option value="ACTIVO">Activo</option>
                <option value="DEVUELTO">Devuelto</option>
              </select>
              <input className="form-input" type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
              <input className="form-input" type="date" value={to} onChange={(event) => setTo(event.target.value)} />
              <button className="btn btn-primary" type="submit"><Search size={16} />Filtrar</button>
            </form>

            <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: '18px' }}>
              <StatCard label="Total" value={stats.total} />
              <StatCard label="Activos" value={stats.active} color="var(--warning)" />
              <StatCard label="Completados" value={stats.completed} color="var(--success)" />
            </div>

            {loanLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '32px' }}><Loader2 size={30} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} /></div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Usuario</th>
                      <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Equipo</th>
                      <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Prestamo</th>
                      <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Devolucion</th>
                      <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans.map((loan) => (
                      <tr key={loan.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px' }}>{loan.usuario.nombre}<div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{loan.usuario.usuario}</div></td>
                        <td style={{ padding: '12px' }}>{loan.equipo.nombre}<div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{loan.equipo.codigoInventario}</div></td>
                        <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{formatDate(loan.fechaPrestamo)}</td>
                        <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{formatDate(loan.fechaDevolucionReal || loan.fechaDevolucionPrevista)}</td>
                        <td style={{ padding: '12px', color: statusColor(loan.estado), fontWeight: 600 }}>{loan.estado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {loanTotalPages > 1 && <Pagination page={loanPage} totalPages={loanTotalPages} onPrev={() => setLoanPage((current) => Math.max(1, current - 1))} onNext={() => setLoanPage((current) => Math.min(loanTotalPages, current + 1))} />}
          </section>
        ) : (
          <div className="glass-card" style={{ padding: '24px', color: 'var(--text-secondary)' }}>
            Las estadisticas detalladas y reportes de prestamos estan disponibles solo para administradores.
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ label, value, color = 'var(--primary)' }: { label: string; value: number; color?: string }) => (
  <div className="info-card" style={{ padding: '16px' }}>
    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</span>
    <strong style={{ color, fontSize: '1.5rem' }}>{value}</strong>
  </div>
);

const Pagination = ({ page, totalPages, onPrev, onNext }: { page: number; totalPages: number; onPrev: () => void; onNext: () => void }) => (
  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px', marginTop: '16px' }}>
    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pagina {page} de {totalPages}</span>
    <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 12px' }} disabled={page === 1} onClick={onPrev}><ChevronLeft size={16} /></button>
    <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 12px' }} disabled={page === totalPages} onClick={onNext}><ChevronRight size={16} /></button>
  </div>
);

export default Reports;
