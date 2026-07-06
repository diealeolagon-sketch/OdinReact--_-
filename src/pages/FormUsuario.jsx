import React, { useState, useEffect } from 'react';

function FormUsuario({ usuarioEditando, onGuardar, onCancelar, listaDependencias }) {
  // Estado inicial del formulario (vacío para nuevo, lleno si se va a editar)
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    id_dependencia: '',
    id_rol: 'Consulta',
    estado: 'done',
    num_identificacion: '',
    tipo_identificacion: 'CC',
    telefono: ''
  });

  // Si cambia el usuario a editar (o si es nuevo), actualizamos los campos
  useEffect(() => {
    if (usuarioEditando) {
      setFormData(usuarioEditando);
    } else {
      setFormData({
        nombre: '',
        correo: '',
        id_dependencia: listaDependencias[1] || '', // Toma la primera dependencia real si existe
        id_rol: 'Consulta',
        estado: 'done',
        num_identificacion: '',
        tipo_identificacion: 'CC',
        telefono: ''
      });
    }
  }, [usuarioEditando, listaDependencias]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones básicas
    if (!formData.nombre || !formData.correo || !formData.num_identificacion) {
      alert('Por favor, rellene los campos obligatorios (*)');
      return;
    }
    onGuardar(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Cabecera del Formulario */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 uppercase">
            {usuarioEditando ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}
          </h3>
          <button 
            type="button" 
            onClick={onCancelar}
            className="text-slate-400 hover:text-slate-600 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tipo de Identificación */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipo ID *</label>
              <select
                name="tipo_identificacion"
                value={formData.tipo_identificacion}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
              >
                <option value="CC">CC (Cédula)</option>
                <option value="CE">CE (Extranjería)</option>
                <option value="NIT">NIT</option>
              </select>
            </div>

            {/* Número de Identificación */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Número ID *</label>
              <input
                type="text"
                name="num_identificacion"
                value={formData.num_identificacion}
                onChange={handleChange}
                placeholder="Ej. 10203040"
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
                required
              />
            </div>
          </div>

          {/* Nombre Completo */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre Completo *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
              required
            />
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Correo Electrónico *</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="usuario@sena.edu.co"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Teléfono */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono || ''}
                onChange={handleChange}
                placeholder="3000000000"
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
              />
            </div>

            {/* Rol */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rol del Sistema</label>
              <select
                name="id_rol"
                value={formData.id_rol}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
              >
                <option value="Administrador">Administrador</option>
                <option value="Editor">Editor</option>
                <option value="Consulta">Consulta</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dependencia */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Dependencia</label>
              <select
                name="id_dependencia"
                value={formData.id_dependencia}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
              >
                {listaDependencias.filter(d => d !== 'Todos').map((dep, idx) => (
                  <option key={idx} value={dep}>{dep}</option>
                ))}
              </select>
            </div>

            {/* Estado */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Estado</label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
              >
                <option value="done">Activo</option>
                <option value="progress">Invitado</option>
                <option value="pending">Inactivo</option>
              </select>
            </div>
          </div>

          {/* Botones de Acción del Formulario */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancelar}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-[#2fa300] px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#248400] transition"
            >
              {usuarioEditando ? 'Actualizar' : 'Guardar Usuario'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FormUsuario;