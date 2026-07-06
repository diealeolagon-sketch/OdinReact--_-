import React, { useState, useMemo } from 'react';
import FormUsuario from './FormUsuario'; // Importamos el componente del formulario separado

const initialUsuarios = [
  { id_usuario: 1, nombre: 'María Fernanda Gómez', correo: 'mgomez@sena.edu.co', id_dependencia: 'Talento Humano', id_rol: 'Administrador', estado: 'done', num_identificacion: '10203040', tipo_identificacion: 'CC', telefono: '3001234567' },
  { id_usuario: 2, nombre: 'Carlos Andrés Ruiz', correo: 'caruiz@sena.edu.co', id_dependencia: 'Coordinación Académica', id_rol: 'Editor', estado: 'progress', num_identificacion: '50607080', tipo_identificacion: 'CE', telefono: '3159876543' },
  { id_usuario: 3, nombre: 'Laura Daniela Pérez', correo: 'ldperez@sena.edu.co', id_dependencia: 'Dirección General', id_rol: 'Consulta', estado: 'done', num_identificacion: '90102030', tipo_identificacion: 'CC', telefono: '3114561234' },
  { id_usuario: 4, nombre: 'Jorge Iván Salazar', correo: 'jisalazar@sena.edu.co', id_dependencia: 'Recursos Físicos', id_rol: 'Editor', estado: 'pending', num_identificacion: '80402010', tipo_identificacion: 'NIT', telefono: '3207654321' },
];

const ESTADO_LABEL = { pending: 'Inactivo', progress: 'Invitado', done: 'Activo' };

function Usuarios() {
  const [usuarios, setUsuarios] = useState(initialUsuarios);
  const [successMessage, setSuccessMessage] = useState('¡Módulo de usuarios cargado con éxito!');

  // --- NUEVOS ESTADOS PARA MANEJAR EL FORMULARIO ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);

  // Estados de Filtros y Paginación
  const [search, setSearch] = useState('');
  const [filtroTipoId, setFiltroTipoId] = useState('Todos');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [filtroDependencia, setFiltroDependencia] = useState('Todos');
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 4;

  // Lista de dependencias únicas estáticas/dinámicas
  const listaDependencias = useMemo(() => {
    return ['Todos', 'Talento Humano', 'Coordinación Académica', 'Dirección General', 'Recursos Físicos', 'Sistemas e Informática'];
  }, []);

  // Abrir formulario para agregar uno NUEVO
  const handleNuevoUsuarioClick = () => {
    setUsuarioAEditar(null); // Asegura que está vacío
    setIsModalOpen(true);
  };

  // Abrir formulario para EDITAR un usuario presionado
  const handleEditarClick = (usuario) => {
    setUsuarioAEditar(usuario); // Pasa los datos del usuario de la fila
    setIsModalOpen(true);
  };

  // Guardar (Tanto creación como edición)
  const handleGuardarUsuario = (datosForm) => {
    if (usuarioAEditar) {
      // EDICIÓN: Mapeamos y reemplazamos el registro modificado
      setUsuarios(usuarios.map(u => u.id_usuario === datosForm.id_usuario ? datosForm : u));
      setSuccessMessage(`Usuario "${datosForm.nombre}" actualizado con éxito.`);
    } else {
      // CREACIÓN: Generamos un ID ficticio nuevo
      const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id_usuario)) + 1 : 1;
      const nuevoUsuario = { ...datosForm, id_usuario: nuevoId };
      setUsuarios([nuevoUsuario, ...usuarios]);
      setSuccessMessage(`Usuario "${datosForm.nombre}" creado con éxito.`);
    }
    setIsModalOpen(false);
    setPaginaActual(1);
  };

  const handleDelete = (id, nombre) => {
    if (window.confirm(`¿Está seguro que desea eliminar al usuario ${nombre}?`)) {
      setUsuarios(usuarios.filter(u => u.id_usuario !== id));
      setSuccessMessage(`Usuario ${nombre} eliminado correctamente.`);
      setPaginaActual(1);
    }
  };

  // Filtrado y Paginación lógicos
  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) => {
      const cumpleBusqueda = usuario.nombre.toLowerCase().includes(search.toLowerCase()) || 
                             usuario.correo.toLowerCase().includes(search.toLowerCase()) || 
                             usuario.num_identificacion.includes(search);
      const cumpleTipoId = filtroTipoId === 'Todos' || usuario.tipo_identificacion === filtroTipoId;
      const cumpleEstado = filtroEstado === 'Todos' || usuario.estado === filtroEstado;
      const cumpleDependencia = filtroDependencia === 'Todos' || usuario.id_dependencia === filtroDependencia;
      return cumpleBusqueda && cumpleTipoId && cumpleEstado && cumpleDependencia;
    });
  }, [usuarios, search, filtroTipoId, filtroEstado, filtroDependencia]);

  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina) || 1;
  const usuariosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * usuariosPorPagina;
    return usuariosFiltrados.slice(inicio, inicio + usuariosPorPagina);
  }, [usuariosFiltrados, paginaActual]);

  return (
    <div className="min-h-screen flex bg-[#f5f6f8] text-slate-800 font-sans">
      <div className="flex-1 min-w-0">
        <main className="px-4 md:px-8 py-6">

          {/* Encabezado */}
          <section className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight uppercase">Gestión de Usuarios</h1>
              <p className="text-sm text-slate-500 mt-1">Administración de cuentas, roles, permisos y seguridad del sistema.</p>
            </div>
            <div>
              <button 
                type="button"
                onClick={handleNuevoUsuarioClick}
                className="rounded-lg bg-[#2fa300] px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#248400] transition"
              >
                + Nuevo Usuario
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
              placeholder="Buscar por nombre, correo o número de identificación..."
              className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-600 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </section>

          {/* Tabla y Filtros */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            
            {/* Selectores de filtros */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5 py-4 border-b border-slate-100">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tipo de identificación</label>
                <select value={filtroTipoId} onChange={(e) => { setFiltroTipoId(e.target.value); setPaginaActual(1); }} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500">
                  <option value="Todos">Todos los tipos</option><option value="CC">CC</option><option value="CE">CE</option><option value="NIT">NIT</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Estado</label>
                <select value={filtroEstado} onChange={(e) => { setFiltroEstado(e.target.value); setPaginaActual(1); }} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500">
                  <option value="Todos">Todos los Estados</option><option value="done">Activo</option><option value="progress">Invitado</option><option value="pending">Inactivo</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Dependencia</label>
                <select value={filtroDependencia} onChange={(e) => { setFiltroDependencia(e.target.value); setPaginaActual(1); }} className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500">
                  {listaDependencias.map((dep, idx) => (<option key={idx} value={dep}>{dep === 'Todos' ? 'Todas las dependencias' : dep}</option>))}
                </select>
              </div>
            </div>

            {/* Tabla con Acciones a la izquierda */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-[#fafafa] border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4 text-center font-bold w-24">Acciones</th>
                    <th className="px-5 py-4 text-left font-bold">Usuario</th>
                    <th className="px-5 py-4 text-left font-bold">Identificación</th>
                    <th className="px-5 py-4 text-left font-bold">Rol</th>
                    <th className="px-5 py-4 text-left font-bold">Dependencia</th>
                    <th className="px-5 py-4 text-left font-bold">Contacto</th>
                    <th className="px-5 py-4 text-left font-bold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usuariosPaginados.length > 0 ? (
                    usuariosPaginados.map((usuario) => (
                      <tr key={usuario.id_usuario} className="hover:bg-slate-50/80 transition">
                        {/* BOTONES IZQUIERDA */}
                        <td className="px-5 py-4 text-center border-r border-slate-50 bg-[#fafafa]/50">
                          <div className="flex items-center justify-center gap-3">
                            <button type="button" title="Editar" onClick={() => handleEditarClick(usuario)} className="text-slate-400 hover:text-green-700 transition text-lg">✏️</button>
                            <button type="button" title="Eliminar" onClick={() => handleDelete(usuario.id_usuario, usuario.nombre)} className="text-slate-400 hover:text-red-600 transition text-lg">🗑️</button>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-bold text-slate-800">{usuario.nombre}<div className="text-xs text-slate-400 font-normal">ID: {usuario.id_usuario}</div></td>
                        <td className="px-5 py-4">{usuario.num_identificacion}<div className="text-xs text-slate-400">{usuario.tipo_identificacion}</div></td>
                        <td className="px-5 py-4"><span className="inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{usuario.id_rol}</span></td>
                        <td className="px-5 py-4 text-slate-600">{usuario.id_dependencia}</td>
                        <td className="px-5 py-4">{usuario.correo}<div className="text-xs text-slate-400">{usuario.telefono}</div></td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${usuario.estado === 'done' ? 'bg-green-100 text-green-700' : usuario.estado === 'progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{ESTADO_LABEL[usuario.estado]}</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="7" className="px-6 py-10 text-center text-slate-500">Ningún usuario coincide con los criterios.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100 text-xs text-slate-500">
              <span>Mostrando página <b>{paginaActual}</b> de <b>{totalPaginas}</b> ({usuariosFiltrados.length} usuarios)</span>
              <div className="flex items-center gap-2">
                <button type="button" disabled={paginaActual === 1} onClick={() => setPaginaActual(p => p - 1)} className={`w-8 h-8 rounded-md flex items-center justify-center border transition ${paginaActual === 1 ? 'text-slate-300 bg-slate-50 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>‹</button>
                <span className="w-8 h-8 rounded-md bg-[#2fa300] text-white font-bold flex items-center justify-center">{paginaActual}</span>
                <button type="button" disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual(p => p + 1)} className={`w-8 h-8 rounded-md flex items-center justify-center border transition ${paginaActual === totalPaginas ? 'text-slate-300 bg-slate-50 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>›</button>
              </div>
            </div>

          </section>
        </main>
      </div>

      {/* RENDERIZADO DEL MODAL DEL FORMULARIO SEPARADO */}
      {isModalOpen && (
        <FormUsuario 
          usuarioEditando={usuarioAEditar}
          listaDependencias={listaDependencias}
          onGuardar={handleGuardarUsuario}
          onCancelar={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Usuarios;