import Header from '../components/layout/Header.jsx'

// Datos de ejemplo. Reemplazar con datos reales del backend.
const kpis = [
  { label: 'Radicados Hoy', value: '48', tone: 'green' },
  { label: 'Pendientes', value: '12', tone: 'yellow' },
  { label: 'Vencidos', value: '3', tone: 'red' },
  { label: 'En Trámite', value: '27', tone: 'blue' },
  { label: 'Completados (mes)', value: '156', tone: 'green' },
]

const radicados = [
  { id: 'RAD-2026-0148', asunto: 'Solicitud de certificación', dependencia: 'Talento Humano', estado: 'pending', prioridad: 'high' },
  { id: 'RAD-2026-0147', asunto: 'PQRS - Aprendiz', dependencia: 'Coordinación Académica', estado: 'progress', prioridad: 'medium' },
  { id: 'RAD-2026-0146', asunto: 'Convenio interinstitucional', dependencia: 'Dirección General', estado: 'done', prioridad: 'low' },
  { id: 'RAD-2026-0145', asunto: 'Solicitud de equipos', dependencia: 'Recursos Físicos', estado: 'pending', prioridad: 'medium' },
]

const ESTADO_LABEL = { pending: 'Pendiente', progress: 'En trámite', done: 'Finalizado' }
const PRIORIDAD_LABEL = { high: 'Alta', medium: 'Media', low: 'Baja' }

function Dashboard() {
  return (
    <div>
      {/* Cada página trae su propio header, ya que no todas comparten el mismo */}
      <Header title="Panel de Inicio" />

      <div className="p-6 md:p-8">
        <Hero />

        {/* KPIs */}
        <section className="kpis mb-5">
          {kpis.map((kpi) => (
            <div key={kpi.label} className={`kpi ${kpi.tone}`}>
              <small>{kpi.label}</small>
              <h2 style={{ color: 'var(--azul-oscuro)' }}>{kpi.value}</h2>
            </div>
          ))}
        </section>

        <section className="content">
          {/* Tabla de radicados recientes */}
          <div className="table-card">
            <div className="mass" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: 'var(--azul-oscuro)' }}>Radicados Recientes</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Radicado</th>
                  <th>Asunto</th>
                  <th>Dependencia</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {radicados.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.asunto}</td>
                    <td>{r.dependencia}</td>
                    <td>
                      <span className={`priority ${r.prioridad}`}></span>
                      {PRIORIDAD_LABEL[r.prioridad]}
                    </td>
                    <td>
                      <span className={`status ${r.estado}`}>{ESTADO_LABEL[r.estado]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Panel de alertas */}
          <div className="detail">
            <div className="block">
              <h3 style={{ color: 'var(--azul-oscuro)', marginBottom: '14px' }}>Alertas</h3>
              <div className="alert">
                <div className="notice red">3 radicados vencidos requieren atención inmediata.</div>
                <div className="notice yellow">12 radicados pendientes de asignación.</div>
                <div className="notice green">156 procesos completados este mes.</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard
