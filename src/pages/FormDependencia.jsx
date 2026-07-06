import React, { useState, useEffect } from 'react';

function FormDependencia({ dependenciaEditando, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    dependencia: '',
    nombre: '',
    descripcion: '',
    estado: 'Activo'
  });

  useEffect(() => {
    if (dependenciaEditando) {
      setFormData(dependenciaEditando);
    } else {
      setFormData({
        dependencia: '',
        nombre: '',
        descripcion: '',
        estado: 'Activo'
      });
    }
  }, [dependenciaEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.dependencia || !formData.nombre) {
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
            {dependenciaEditando ? '✏️ Editar Dependencia' : '➕ Nueva Dependencia'}
          </h3>
          <button type="button" onClick={onCancelar} className="text-slate-400 hover:text-slate-600 text-xl font-bold">×</button>
        </div>

        {/* Cuerpo del Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Código / Sigla de la Dependencia */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Código / Sigla Dependencia *</label>
            <input
              type="text"
              name="dependencia"
              value={formData.dependencia}
              onChange={handleChange}
              placeholder="Ej. TH, ADMI, COOR"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
              required
            />
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nombre Completo *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Talento Humano"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Escriba una descripción corta..."
              rows="3"
              className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-green-500 resize-none"
            />
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
              {dependenciaEditando ? 'Actualizar' : 'Guardar Dependencia'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FormDependencia;