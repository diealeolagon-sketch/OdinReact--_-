import React, { useState, useMemo } from 'react';
import FormRol from './FormRol';

const initialRoles = [
  { id_rol: 1, nombre: 'Administrador General', rol: 'Administrador', estado: 'Activo' },
  { id_rol: 2, nombre: 'Editor de Contenido', rol: 'Editor', estado: 'Activo' },
  { id_rol: 3, nombre: 'Consultor Operativo', rol: 'Consulta', estado: 'Activo' },
  { id_rol: 4, nombre: 'Auditor Externo', rol: 'Consulta', estado: 'Inactivo' },
  { id_rol: 5, nombre: 'Superusuario Técnico', rol: 'Administrador', estado: 'Activo' }
];

function Roles() {
  const [roles, setRoles] = useState(initialRoles);
  const [successMessage, setSuccessMessage] = useState('¡Módulo de roles cargado con éxito!');

  // Estados de Modales y Formularios
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rolAEditar, setRolAEditar] = useState(null);

  // Estados de Filtros y Paginación
  const [search, setSearch] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 4;

  const handleNuevoRolClick = () => {
    setRolAEditar(null);
    setIsModalOpen(true);
  };

  const handleEditarClick = (rol) => {
    setRolAEditar(rol);
    setIsModalOpen(true);
  };

  const handleGuardarRol = (datosForm) => {
    if (rolAEditar) {
      setRoles(roles.map(r => r.id_rol === datosForm.id_rol ? datosForm : r));
      setSuccessMessage(`Rol "${datosForm.nombre}" actualizado con éxito.`);
    } else {
      const nuevoId = roles.length > 0 ? Math.max(...roles.map(r => r.id_rol)) + 1 : 1;
      const nuevoRol = { ...datosForm, id_rol: nuevoId };
      setRoles([nuevoRol, ...roles]);
      setSuccessMessage(`Rol "${datosForm.nombre}" creado con éxito.`);
    }
    setIsModalOpen(false);
    setPaginaActual(1);
  };

  const handleDelete = (id, nombre) => {
    if (window.confirm(`¿Está seguro que desea eliminar el rol ${nombre}?`)) {
      setRoles(roles.filter(r => r.id_rol !== id));
      setSuccessMessage(`Rol "${nombre}" eliminado correctamente.`);
      setPaginaActual(1);
    }
  };

  // Filtrado lógico
  const rolesFiltrados = useMemo(() => {
    return roles.filter((r) => {
      const cumpleBusqueda = r.nombre.toLowerCase().includes(search.toLowerCase()) || 
                             r.rol.toLowerCase().includes(search.toLowerCase());
      const cumpleEstado = filtroEstado === 'Todos' || r.estado === filtroEstado;
      return cumpleBusqueda && cumpleEstado;
    });
  }, [roles, search, filtroEstado]);

  // Paginación lógica
  const totalPaginas = Math.ceil(rolesFiltrados.length / itemsPorPagina) || 1;
  const rolesPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * itemsPorPagina;
    return rolesFiltrados.slice(inicio, inicio + itemsPorPagina);
  }, [rolesFiltrados, paginaActual]);

  return (
    <div className="min-h-screen flex bg-[#f5f6f8] text-slate-800 font-sans">
      <div className="flex-1 min-w-0">
        <main className="px-4 md:px-8 py-6">

          {/* Encabezado */}
          <section className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight uppercase">Gestión de Roles</h1>
              <p className="text-sm text-slate-500 mt-1">Administre y controle los roles registrados en el sistema.</p>
            </div>
            <div>
              <button 
                type="button" 
                onClick={handleNuevoRolClick}
                className="rounded-lg bg-[#2fa300] px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#248400] transition"
              >
                + Nuevo Rol
              </button>
            </div>
          </section>

          {/* Alertas */}
          {successMessage && (
            <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-5 py-3 text-sm text-green-800 shadow-sm flex justify-between items-center">
              <span>{successMessage}</span>
              <button onClick={() => setSuccessMessage('')} className="text-green-600 font-bold ml-2">×</button>
            </div>
          )}

          {/* Buscador */}
          <section className="mb-5 relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-slate-400">🔍</span>
            <input 
              type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPaginaActual(1); }}
              placeholder="Buscar por nombre o tipo de rol..."
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-600 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </section>

          {/* Card Principal */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            
            {/* Filtros */}
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
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Exportar</label>
                <div className="flex gap-2">
                  <button onClick={() => alert('Exportando a PDF...')} className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition">PDF</button>
                  <button onClick={() => alert('Exportando a Excel...')} className="flex-1 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition">Excel</button>
                </div>
              </div>
            </div>

            {/* Tabla con Acciones Reubicadas a la Izquierda */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4 text-center font-bold w-24">Acciones</th>
                    <th className="px-5 py-4 text-left font-bold">ID</th>
                    <th className="px-5 py-4 text-left font-bold">Nombre</th>
                    <th className="px-5 py-4 text-left font-bold">Tipo de Rol</th>
                    <th className="px-5 py-4 text-left font-bold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rolesPaginados.length > 0 ? (
                    rolesPaginados.map((r) => (
                      <tr key={r.id_rol} className="hover:bg-slate-50/80 transition">
                        {/* ACCIONES (Columna 1) */}
                        <td className="px-5 py-4 text-center border-r border-slate-50 bg-[#fafafa]/50">
                          <div className="flex items-center justify-center gap-3">
                            <button type="button" title="Editar" onClick={() => handleEditarClick(r)} className="text-slate-400 hover:text-green-700 transition text-lg">✏️</button>
                            <button type="button" title="Eliminar" onClick={() => handleDelete(r.id_rol, r.nombre)} className="text-slate-400 hover:text-red-600 transition text-lg">🗑️</button>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-medium text-slate-400">#{r.id_rol}</td>
                        <td className="px-5 py-4 font-bold text-slate-800">{r.nombre}</td>
                        <td className="px-5 py-4 text-slate-600">
                          <span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                            {r.rol}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${r.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{r.estado}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="px-6 py-10 text-center text-slate-500">No hay roles registrados con esos criterios.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación Dinámica */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 text-xs text-slate-500">
              <span>Mostrando página <b>{paginaActual}</b> de <b>{totalPaginas}</b> ({rolesFiltrados.length} roles)</span>
              <div className="flex items-center gap-2">
                <button type="button" disabled={paginaActual === 1} onClick={() => setPaginaActual(p => p - 1)} className={`w-8 h-8 rounded-md flex items-center justify-center border transition ${paginaActual === 1 ? 'text-slate-300 bg-slate-50 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>‹</button>
                <span className="w-8 h-8 rounded-md bg-[#2fa300] text-white font-bold flex items-center justify-center">{paginaActual}</span>
                <button type="button" disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(p => p + 1)} className={`w-8 h-8 rounded-md flex items-center justify-center border transition ${paginaActual === totalPaginas ? 'text-slate-300 bg-slate-50 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>›</button>
              </div>
            </div>

          </section>
        </main>
      </div>

      {/* Renderizado del Formulario */}
      {isModalOpen && (
        <FormRol 
          rolEditando={rolAEditar}
          onGuardar={handleGuardarRol}
          onCancelar={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Roles;