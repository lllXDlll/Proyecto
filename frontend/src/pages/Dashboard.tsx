import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { LogOut, LayoutGrid, Laptop, CalendarClock, Users, BarChart3, FileText, Loader2 } from 'lucide-react';

interface DashboardSummary {
  equipment: {
    total: number;
    byStatus: Record<string, number>;
  };
  users: {
    total: number;
  };
  loans: {
    total: number;
    active: number;
    completed: number;
  };
}

const emptySummary: DashboardSummary = {
  equipment: {
    total: 0,
    byStatus: {
      DISPONIBLE: 0,
      PRESTADO: 0,
      MANTENIMIENTO: 0,
      INACTIVO: 0
    }
  },
  users: { total: 0 },
  loans: { total: 0, active: 0, completed: 0 }
};

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<DashboardSummary>(emptySummary);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await api.get('/dashboard/summary');
        setSummary(response.data);
      } catch (error) {
        console.error('Error loading dashboard summary:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const statusCount = (status: string) => summary.equipment.byStatus?.[status] || 0;

  return (
    <div className="dashboard-layout">
      <nav className="navbar">
        <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <LayoutGrid size={24} />
          <span>LoanManager</span>
        </div>

        <div className="navbar-user">
          <button className="btn btn-secondary" style={{ width: 'auto', padding: '6px 12px', fontSize: '0.9rem' }} onClick={() => navigate('/equipment')}>
            <Laptop size={16} />
            <span>Inventario</span>
          </button>
          <button className="btn btn-secondary" style={{ width: 'auto', padding: '6px 12px', fontSize: '0.9rem' }} onClick={() => navigate('/reports')}>
            <BarChart3 size={16} />
            <span>Reportes</span>
          </button>
          {user?.rol === 'ADMINISTRADOR' && (
            <>
              <button className="btn btn-secondary" style={{ width: 'auto', padding: '6px 12px', fontSize: '0.9rem' }} onClick={() => navigate('/loans')}>
                <CalendarClock size={16} />
                <span>Prestamos</span>
              </button>
              <button className="btn btn-secondary" style={{ width: 'auto', padding: '6px 12px', fontSize: '0.9rem', marginRight: '12px' }} onClick={() => navigate('/users')}>
                <Users size={16} />
                <span>Gestionar Usuarios</span>
              </button>
            </>
          )}
          <span className="user-badge">{user?.rol || 'USUARIO'}</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{user?.nombre || 'Usuario'}</span>
          <button className="btn-logout" onClick={logout}>
            <LogOut size={16} />
            <span>Cerrar sesion</span>
          </button>
        </div>
      </nav>

      <main className="main-content">
        <section className="welcome-section animate-fade-in">
          <h2 className="welcome-title">Bienvenido de nuevo, {user?.nombre}</h2>
          <p className="welcome-desc">Resumen operativo actual del sistema de prestamos de equipos.</p>
        </section>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px' }}>
            <Loader2 size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary)' }} />
          </div>
        ) : (
          <div className="grid-cards animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="info-card">
              <div className="info-card-header"><Laptop size={20} /><span>Total de Equipos</span></div>
              <p className="welcome-title" style={{ fontSize: '2rem', marginBottom: 0 }}>{summary.equipment.total}</p>
              <p className="info-card-body">Inventario registrado actualmente.</p>
            </div>

            <div className="info-card">
              <div className="info-card-header"><BarChart3 size={20} /><span>Equipos por Estado</span></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', color: 'var(--text-secondary)' }}>
                <span>Disponibles: <strong style={{ color: 'var(--success)' }}>{statusCount('DISPONIBLE')}</strong></span>
                <span>Prestados: <strong style={{ color: 'var(--warning)' }}>{statusCount('PRESTADO')}</strong></span>
                <span>Mantenimiento: <strong style={{ color: 'var(--primary)' }}>{statusCount('MANTENIMIENTO')}</strong></span>
                <span>Inactivos: <strong style={{ color: 'var(--error)' }}>{statusCount('INACTIVO')}</strong></span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-card-header"><Users size={20} /><span>Usuarios Registrados</span></div>
              <p className="welcome-title" style={{ fontSize: '2rem', marginBottom: 0 }}>{summary.users.total}</p>
              <p className="info-card-body">Cuentas existentes en el sistema.</p>
            </div>

            <div className="info-card">
              <div className="info-card-header"><CalendarClock size={20} /><span>Prestamos Activos</span></div>
              <p className="welcome-title" style={{ fontSize: '2rem', marginBottom: 0 }}>{summary.loans.active}</p>
              <p className="info-card-body">Equipos actualmente prestados.</p>
            </div>

            <div className="info-card">
              <div className="info-card-header"><FileText size={20} /><span>Prestamos Completados</span></div>
              <p className="welcome-title" style={{ fontSize: '2rem', marginBottom: 0 }}>{summary.loans.completed}</p>
              <p className="info-card-body">Prestamos devueltos historicamente.</p>
            </div>

            <div className="info-card">
              <div className="info-card-header"><ClipboardIcon /><span>Total de Prestamos</span></div>
              <p className="welcome-title" style={{ fontSize: '2rem', marginBottom: 0 }}>{summary.loans.total}</p>
              <p className="info-card-body">Actividad acumulada del modulo de prestamos.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const ClipboardIcon = () => <FileText size={20} />;

export default Dashboard;
