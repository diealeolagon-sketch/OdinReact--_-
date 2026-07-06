import React, { useState, useEffect } from 'react';

function FormRol({ rolEditando, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    rol: 'Consulta',
    estado: 'Activo'
  });

  useEffect(() => {
    if (rolEditando) {
      setFormData(rolEditando);
    } else {
      setFormData({
        nombre: '',
        rol: 'Consulta',
        estado: 'Activo'
      });
    }
  }, [rolEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.rol) {
      alert('Por favor, rellene los campos obligatorios (*)');
      return;
    }
    onGuardar(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Cabecera */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 uppercase">
            {rolEditando ? '✏️ Editar Rol' : '➕ Nuevo Rol'}
          </h3>
          <button type="button" onClick={onCancelar} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
        </div>

        {/* Cuerpo */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Nombre descriptivo del Rol */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre del Rol *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Administrador de Sistemas, Consultor Básico"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
              required
            />
          </div>

          {/* Tipo de Rol */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipo de Rol *</label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
            >
              <option value="Administrador">Administrador</option>
              <option value="Editor">Editor</option>
              <option value="Consulta">Consulta</option>
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
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          {/* Botones de Acción */}
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
              {rolEditando ? 'Actualizar' : 'Guardar Rol'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FormRol;