import React, { useState, useMemo } from 'react';
import FormDependencia from './FormDependencia';

const initialDependencias = [
  { id_dependencia: 1, dependencia: 'TH', nombre: 'Talento Humano', descripcion: 'Gestión y contratación del personal institucional.', estado: 'Activo' },
  { id_dependencia: 2, dependencia: 'CA', nombre: 'Coordinación Académica', descripcion: 'Control de procesos académicos, instructores y fichas.', estado: 'Activo' },
  { id_dependencia: 3, dependencia: 'DG', nombre: 'Dirección General', descripcion: 'Alta gerencia y toma de decisiones estructurales.', estado: 'Activo' },
  { id_dependencia: 4, dependencia: 'RF', nombre: 'Recursos Físicos', descripcion: 'Almacén, inventarios, infraestructura y planta física.', estado: 'Inactivo' },
  { id_dependencia: 5, dependencia: 'SI', nombre: 'Sistemas e Informática', descripcion: 'Soporte técnico, redes y desarrollo de software interno.', estado: 'Activo' }
];

function Dependencias() {
  const [dependencias, setDependencias] = useState(initialDependencias);
  const [successMessage, setSuccessMessage] = useState('¡Módulo de dependencias cargado con éxito!');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dependenciaAEditar, setDependenciaAEditar] = useState(null);

  const [search, setSearch] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 4;

  const handleNuevaDependenciaClick = () => {
    setDependenciaAEditar(null);
    setIsModalOpen(true);
  };

  const handleEditarClick = (dep) => {
    setDependenciaAEditar(dep);
    setIsModalOpen(true);
  };

  const handleGuardarDependencia = (datosForm) => {
    if (dependenciaAEditar) {
      setDependencias(dependencias.map(d => d.id_dependencia === datosForm.id_dependencia ? datosForm : d));
      setSuccessMessage(`Dependencia "${datosForm.nombre}" actualizada con éxito.`);
    } else {
      const nuevoId = dependencias.length > 0 ? Math.max(...dependencias.map(d => d.id_dependencia)) + 1 : 1;
      const nuevaDep = { ...datosForm, id_dependencia: nuevoId };
      setDependencias([nuevaDep, ...dependencias]);
      setSuccessMessage(`Dependencia "${datosForm.nombre}" creada con éxito.`);
    }
    setIsModalOpen(false);
    setPaginaActual(1);
  };

  const handleDelete = (id, nombre) => {
    if (window.confirm(`¿Está seguro que desea eliminar la dependencia ${nombre}?`)) {
      setDependencias(dependencias.filter(d => d.id_dependencia !== id));
      setSuccessMessage(`Dependencia "${nombre}" eliminada correctamente.`);
      setPaginaActual(1);
    }
  };

  const dependenciasFiltradas = useMemo(() => {
    return dependencias.filter((dep) => {
      const cumpleBusqueda = dep.nombre.toLowerCase().includes(search.toLowerCase()) || 
                             dep.dependencia.toLowerCase().includes(search.toLowerCase()) ||
                             dep.descripcion.toLowerCase().includes(search.toLowerCase());
      const cumpleEstado = filtroEstado === 'Todos' || dep.estado === filtroEstado;
      return cumpleBusqueda && cumpleEstado;
    });
  }, [dependencias, search, filtroEstado]);

  const totalPaginas = Math.ceil(dependenciasFiltradas.length / itemsPorPagina) || 1;
  const dependenciasPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * itemsPorPagina;
    return dependenciasFiltradas.slice(inicio, inicio + itemsPorPagina);
  }, [dependenciasFiltradas, paginaActual]);

  return (
    <div className="min-h-screen flex bg-[#f5f6f8] text-slate-800 font-sans">
      <div className="flex-1 min-w-0">
        <main className="px-4 md:px-8 py-6">

          <section className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight uppercase">Gestión de Dependencias</h1>
              <p className="text-sm text-slate-500 mt-1">Administre y controle las dependencias registradas en el sistema.</p>
            </div>
            <div>
              <button 
                type="button" 
                onClick={handleNuevaDependenciaClick}
                className="rounded-lg bg-[#2fa300] px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#248400] transition"
              >
                + Nueva Dependencia
              </button>
            </div>
          </section>

          {successMessage && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-5 py-3 text-sm text-green-800 shadow-sm flex justify-between items-center">
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage('')} className="text-green-600 font-bold ml-2">×</button>
            </div>
          )}

          <section className="mb-5 relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">🔍</span>
            <input 
              type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPaginaActual(1); }}
              placeholder="Buscar dependencia por código, nombre o descripción..."
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-600 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </section>

          <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 py-4 border-b border-slate-100">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Estado</label>
                <select value={filtroEstado} onChange={(e) => { setFiltroEstado(e.target.value); setPaginaActual(1); }} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500">
                  <option value="Todos">Todos los Estados</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Reportes rápidos</label>
                <div className="flex gap-2">
                  <button onClick={() => alert('Generando PDF...')} className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition">PDF</button>
                  <button onClick={() => alert('Generando Excel...')} className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition">Excel</button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4 text-center font-bold w-24">Acciones</th>
                    <th className="px-5 py-4 text-left font-bold">Dependencia</th>
                    <th className="px-5 py-4 text-left font-bold">Nombre</th>
                    <th className="px-5 py-4 text-left font-bold">Descripción</th>
                    <th className="px-5 py-4 text-left font-bold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dependenciasPaginados.length > 0 ? (
                    dependenciasPaginados.map((dep) => (
                      <tr key={dep.id_dependencia} className="hover:bg-slate-50/80 transition">
                        <td className="px-5 py-4 text-center border-r border-slate-50 bg-[#fafafa]/50">
                          <div className="flex items-center justify-center gap-3">
                            <button type="button" title="Editar" onClick={() => handleEditarClick(dep)} className="text-slate-400 hover:text-green-700 transition text-lg">✏️</button>
                            <button type="button" title="Eliminar" onClick={() => handleDelete(dep.id_dependencia, dep.nombre)} className="text-slate-400 hover:text-red-600 transition text-lg">🗑️</button>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-bold text-slate-800">{dep.dependencia}<div className="text-xs text-slate-400 font-normal">ID: {dep.id_dependencia}</div></td>
                        <td className="px-5 py-4 text-slate-600 font-medium">{dep.nombre}</td>
                        <td className="px-5 py-4 text-slate-500 max-w-xs truncate" title={dep.descripcion}>{dep.descripcion}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${dep.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{dep.estado}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-500">No hay dependencias registradas con esos criterios.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 text-xs text-slate-500">
              <span>Mostrando página <b>{paginaActual}</b> de <b>{totalPaginas}</b> ({dependenciasFiltradas.length} dependencias)</span>
              <div className="flex items-center gap-2">
                <button type="button" disabled={paginaActual === 1} onClick={() => setPaginaActual(p => p - 1)} className={`w-8 h-8 rounded-md flex items-center justify-center border transition ${paginaActual === 1 ? 'text-slate-300 bg-slate-50 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>‹</button>
                <span className="w-8 h-8 rounded-md bg-[#2fa300] text-white font-bold flex items-center justify-center">{paginaActual}</span>
                <button type="button" disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(p => p + 1)} className={`w-8 h-8 rounded-md flex items-center justify-center border transition ${paginaActual === totalPaginas ? 'text-slate-300 bg-slate-50 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>›</button>
              </div>
            </div>

          </section>
        </main>
      </div>

      {isModalOpen && (
        <FormDependencia 
          dependenciaEditando={dependenciaAEditar}
          onGuardar={handleGuardarDependencia}
          onCancelar={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Dependencias;