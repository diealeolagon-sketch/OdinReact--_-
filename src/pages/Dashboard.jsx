import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

// Registrar componentes de Chart.js necesarios para React
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard() {
  // Mock de datos (En producción vendrán de tus estados o Fetch/Axios del Backend)
  const stats = {
    totalRadicados: 124,
    pendientes: 32,
    finalizados: 78,
    vencidos: 14,
    enTramite: 10,
    rechazados: 4
  };

  const ultimosRadicados = [
    { numero_radicado: "RAD-2026-001", asunto: "Solicitud de Patrocinio Etapa Práctica", id_estado: 1, fecha_radicado: "2026-07-06" },
    { numero_radicado: "RAD-2026-002", asunto: "Actualización de Manuales Técnicos ODIN", id_estado: 2, fecha_radicado: "2026-07-05" },
    { numero_radicado: "RAD-2026-003", asunto: "Auditoría de Dependencias Internas", id_estado: 3, fecha_radicado: "2026-07-04" },
  ];

  // CONFIGURACIÓN DE LOS GRÁFICOS (Estilo Premium Minimalista)
  const chartLabels = ['Pendientes', 'En Trámite', 'Finalizados', 'Rechazados', 'Vencidos'];
  const chartColors = ['#f59e0b', '#3b82f6', '#2fa300', '#ef4444', '#991b1b'];

  const doughnutData = {
    labels: chartLabels,
    datasets: [{
      data: [stats.pendientes, stats.enTramite, stats.finalizados, stats.rechazados, stats.vencidos],
      backgroundColor: chartColors,
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const barData = {
    labels: chartLabels,
    datasets: [{
      label: 'Cantidad de Radicados',
      data: [stats.pendientes, stats.enTramite, stats.finalizados, stats.rechazados, stats.vencidos],
      backgroundColor: chartColors,
      borderRadius: 8,
      barThickness: 28,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          font: { family: 'Inter', size: 12, weight: '500' },
          padding: 20,
          color: '#64748b'
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      
      {/* CONTENEDOR PRINCIPAL (Espacio amplio y adaptativo) */}
      <main className="p-6 sm:p-8 md:p-10 max-w-[1600px] mx-auto space-y-10">
        
        {/* ENCABEZADO CINEMÁTICO */}
        <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Dashboard</h1>
            <p className="text-sm text-slate-400 mt-1 font-medium">Resumen general y analíticas del sistema ODIN</p>
          </div>
          {/* Badge de estado del sistema */}
          <div className="flex items-center gap-2 self-start sm:self-center bg-green-50 border border-green-100 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#2fa300] animate-pulse"></span>
            <span className="text-xs font-bold text-[#2fa300] uppercase tracking-wider">Sistema En Línea</span>
          </div>
        </section>

        {/* METRICAS / TARJETAS EXPANDIDAS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Tarjeta: Total */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.03)] flex items-center justify-between group hover:shadow-[0_15px_40px_rgba(15,23,42,0.06)] transition-all duration-300">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Total Radicados</p>
              <h2 className="text-4xl font-black text-slate-900">{stats.totalRadicados}</h2>
            </div>
            <div className="p-3.5 bg-slate-50 text-slate-500 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9z" />
              </svg>
            </div>
          </div>

          {/* Tarjeta: Pendientes */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.03)] flex items-center justify-between group hover:shadow-[0_15px_40px_rgba(15,23,42,0.06)] transition-all duration-300">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Pendientes</p>
              <h2 className="text-4xl font-black text-amber-500">{stats.pendientes}</h2>
            </div>
            <div className="p-3.5 bg-amber-50 text-amber-500 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              </svg>
            </div>
          </div>

          {/* Tarjeta: Finalizados */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.03)] flex items-center justify-between group hover:shadow-[0_15px_40px_rgba(15,23,42,0.06)] transition-all duration-300">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Finalizados</p>
              <h2 className="text-4xl font-black text-[#2fa300]">{stats.finalizados}</h2>
            </div>
            <div className="p-3.5 bg-green-50 text-[#2fa300] rounded-xl group-hover:bg-[#2fa300] group-hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
              </svg>
            </div>
          </div>

          {/* Tarjeta: Vencidos */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.03)] flex items-center justify-between group hover:shadow-[0_15px_40px_rgba(15,23,42,0.06)] transition-all duration-300">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Vencidos</p>
              <h2 className="text-4xl font-black text-rose-600">{stats.vencidos}</h2>
            </div>
            <div className="p-3.5 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
              </svg>
            </div>
          </div>

        </section>

        {/* ANALÍTICA / SECCIÓN DE GRÁFICOS */}
        <section className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          
          {/* Dona - Ocupa 2 de 5 columnas */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6 xl:col-span-2 flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="font-bold text-slate-900 text-lg tracking-tight">Estado de Radicados</h3>
              <p className="text-xs text-slate-400 font-medium">Segmentación porcentual</p>
            </div>
            <div className="h-64 relative flex items-center justify-center">
              <Doughnut data={doughnutData} options={chartOptions} />
            </div>
          </div>

          {/* Barras - Ocupa 3 de 5 columnas */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6 xl:col-span-3 flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="font-bold text-slate-900 text-lg tracking-tight">Distribución General</h3>
              <p className="text-xs text-slate-400 font-medium">Volumen absoluto por estado</p>
            </div>
            <div className="h-64">
              <Bar 
                data={barData} 
                options={{
                  ...chartOptions,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 } } },
                    y: { border: { dash: [4, 4] }, grid: { color: '#f1f5f9' }, ticks: { font: { family: 'Inter', size: 11 } } }
                  }
                }} 
              />
            </div>
          </div>

        </section>

        {/* TABLA DE ÚLTIMOS RADICADOS */}
        <section>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="font-bold text-slate-900 text-lg tracking-tight">Últimos Radicados</h3>
              <p className="text-xs text-slate-400 font-medium">Actividad reciente en el flujo documental</p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold uppercase text-slate-400 tracking-wider">
                    <th className="py-4 px-6">Número de Radicado</th>
                    <th className="py-4 px-6">Asunto</th>
                    <th className="py-4 px-6">Estado</th>
                    <th className="py-4 px-6">Fecha de Radicación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {ultimosRadicados.length > 0 ? (
                    ultimosRadicados.map((r, index) => (
                      <tr key={index} className="hover:bg-slate-50/80 transition-colors duration-150">
                        <td className="py-4 px-6 font-semibold text-slate-900">{r.numero_radicado}</td>
                        <td className="py-4 px-6 max-w-xs truncate text-slate-600">{r.asunto}</td>
                        <td className="py-4 px-6">
                          {r.id_estado === 1 && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pendiente
                            </span>
                          )}
                          {r.id_estado === 2 && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> En Proceso
                            </span>
                          )}
                          {r.id_estado === 3 && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
                              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Finalizado
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-slate-400">{r.fecha_radicado}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-8 text-center text-slate-400 font-medium" colSpan="4">
                        No hay radicados registrados en el sistema.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Dashboard;