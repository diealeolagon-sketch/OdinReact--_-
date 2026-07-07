import React, { useState } from 'react';

function Radicacion() {
  // Estado para controlar todos los campos del formulario
  const [formData, setFormData] = useState({
    id_radicado: '',
    canalRecepcion: '',
    tipoRadicacion: '',
    id_tramite: '',
    id_estado: '',
    tipoDocumento: '',
    numeroIdentificacion: '',
    remitente: '',
    correo: '',
    telefono: '',
    ciudad: '',
    id_usuario: '',
    id_dependencia_responsable: '',
    prioridad: '',
    fecha_vencimiento: '',
    id_dependencia_destino: '',
    codigo_serie: '',
    codigo_subserie: '',
    tipoDocumental: '',
    confidencialidad: '',
    asunto: '',
    descripcion: '',
    numeroFolios: '',
    soporte: '',
    fechaDocumento: '',
    etiquetas: '',
    archivos: null
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [savedRadicado, setSavedRadicado] = useState(null);

  // Mocks para simular las listas del Backend (Spring Boot / API)
  const tramites = [{ id: 1, nombre: 'Derecho de Petición' }, { id: 2, nombre: 'Facturación' }];
  const estados = [{ id: 1, nombre: 'Radicado' }, { id: 2, nombre: 'En Proceso' }];
  const usuarios = [{ id: 1, nombre: 'Diego Alejandro' }, { id: 2, nombre: 'Carlos Mendoza' }];
  const dependencias = [{ id: 1, nombre: 'Sistemas' }, { id: 2, nombre: 'Gestión Humana' }];
  const series = [{ codigo: '100', nombre: 'Actas' }, { codigo: '200', nombre: 'Informes' }];
  const subseries = [{ codigo: '101', nombre: 'Actas de Comité' }, { codigo: '201', nombre: 'Informes de Gestión' }];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, archivos: e.target.files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulación de guardado exitoso
    const consecutivoGenerado = `RAD-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const fechaActual = new Date().toLocaleString();

    const resultado = {
      ...formData,
      id_radicado: Math.floor(Math.random() * 1000),
      numero_radicado: consecutivoGenerado,
      fecha_radicado: fechaActual
    };

    setSavedRadicado(resultado);
    setSuccessMsg(`Documento radicado exitosamente bajo el radicado número: ${consecutivoGenerado}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setFormData({
      id_radicado: '', canalRecepcion: '', tipoRadicacion: '', id_tramite: '', id_estado: '',
      tipoDocumento: '', numeroIdentificacion: '', remitente: '', correo: '', telefono: '', ciudad: '',
      id_usuario: '', id_dependencia_responsable: '', prioridad: '', fecha_vencimiento: '',
      id_dependencia_destino: '', codigo_serie: '', codigo_subserie: '', tipoDocumental: '',
      confidencialidad: '', asunto: '', descripcion: '', numeroFolios: '', soporte: '',
      fechaDocumento: '', etiquetas: '', archivos: null
    });
    setSuccessMsg('');
    setSavedRadicado(null);
  };

  // Clase CSS unificada para los inputs y selectores (Premium y amplios)
  const inputStyle = "w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 px-4 text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white focus:ring-4 focus:ring-green-500/5 transition-all duration-200 font-medium shadow-sm mt-2 placeholder:text-slate-400";
  const readonlyStyle = "w-full rounded-xl border border-slate-200 bg-slate-100 py-3.5 px-4 text-sm text-slate-400 outline-none font-medium mt-2 select-none";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      <main className="p-6 sm:p-8 md:p-10 max-w-[1600px] mx-auto space-y-8">
        
        {/* ENCABEZADO */}
        <section className="border-b border-slate-200/60 pb-6">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Radicación Documental</h1>
          <p className="text-sm text-slate-400 mt-1 font-medium">Registro, clasificación y asignación inicial del trámite dentro del ecosistema ODIN.</p>
        </section>

        {/* ALERTA DE EXITO */}
        {successMsg && (
          <div className="p-4 bg-green-50 border border-green-100 text-[#2fa300] rounded-xl flex items-center gap-3 text-sm font-bold animate-in fade-in duration-200 shadow-sm">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
            </svg>
            {successMsg}
          </div>
        )}

        {/* DISTRIBUCIÓN RESPONSIVA */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          
          {/* FORMS PRINCIPALES */}
          <form onSubmit={handleSubmit} className="xl:col-span-2 space-y-8">
            
            {/* SECCIÓN 1: INFORMACIÓN DEL RADICADO */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Información del Radicado</h2>
                <p className="text-xs text-slate-400 font-medium">Consecutivos y propiedades de origen</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Número de Radicado</label>
                  <input type="text" className={readonlyStyle} readOnly value={savedRadicado ? savedRadicado.numero_radicado : '(Se generará automáticamente)'} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha y Hora de Radicación</label>
                  <input type="text" className={readonlyStyle} readOnly value={savedRadicado ? savedRadicado.fecha_radicado : '(Se asignará al radicar)'} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Canal de Recepción</label>
                  <select name="canalRecepcion" required value={formData.canalRecepcion} onChange={handleChange} className={inputStyle}>
                    <option value="">Seleccione...</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Correo">Correo</option>
                    <option value="Portal Web">Portal Web</option>
                    <option value="Interno">Interno</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Radicación</label>
                  <select name="tipoRadicacion" required value={formData.tipoRadicacion} onChange={handleChange} className={inputStyle}>
                    <option value="">Seleccione...</option>
                    <option value="Entrada">Entrada</option>
                    <option value="Salida">Salida</option>
                    <option value="Interna">Interna</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trámite Relacionado</label>
                  <select name="id_tramite" required value={formData.id_tramite} onChange={handleChange} className={inputStyle}>
                    <option value="">Seleccione un trámite...</option>
                    {tramites.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estado Inicial</label>
                  <select name="id_estado" required value={formData.id_estado} onChange={handleChange} className={inputStyle}>
                    <option value="">Seleccione un estado...</option>
                    {estados.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                  </select>
                </div>
              </div>
            </section>

            {/* SECCIÓN 2: DATOS DEL SOLICITANTE */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Datos del Solicitante</h2>
                <p className="text-xs text-slate-400 font-medium">Información del remitente o peticionario</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Documento</label>
                  <select name="tipoDocumento" required value={formData.tipoDocumento} onChange={handleChange} className={inputStyle}>
                    <option value="">Seleccione...</option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="CE">Cédula de Extranjería</option>
                    <option value="NIT">NIT</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Número de Documento</label>
                  <input type="text" name="numeroIdentificacion" required placeholder="Ej: 1094000..." value={formData.numeroIdentificacion} onChange={handleChange} className={inputStyle} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nombre Completo / Razón Social</label>
                  <input type="text" name="remitente" required placeholder="Nombre del solicitante corporativo o ciudadano" value={formData.remitente} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Correo Electrónico</label>
                  <input type="email" name="correo" required placeholder="correo@ejemplo.com" value={formData.correo} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Teléfono</label>
                  <input type="text" name="telefono" placeholder="Número de contacto" value={formData.telefono} onChange={handleChange} className={inputStyle} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ciudad / Municipio</label>
                  <input type="text" name="ciudad" placeholder="Ciudad de radicación" value={formData.ciudad} onChange={handleChange} className={inputStyle} />
                </div>
              </div>
            </section>

            {/* SECCIÓN 3: ASIGNACIÓN Y CLASIFICACIÓN DOCUMENTAL */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Asignación y Clasificación Archivística</h2>
                <p className="text-xs text-slate-400 font-medium">Metadatos de la Tabla de Retención Documental (TRD)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Responsable Asignado</label>
                  <select name="id_usuario" required value={formData.id_usuario} onChange={handleChange} className={inputStyle}>
                    <option value="">Seleccione un responsable...</option>
                    {usuarios.map(u => <option key={u.id} value={u.id}>{u.nombre}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dependencia Productora/Responsable</label>
                  <select name="id_dependencia_responsable" required value={formData.id_dependencia_responsable} onChange={handleChange} className={inputStyle}>
                    <option value="">Seleccione dependencia...</option>
                    {dependencias.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prioridad del Trámite</label>
                  <select name="prioridad" required value={formData.prioridad} onChange={handleChange} className={inputStyle}>
                    <option value="">Seleccione...</option>
                    <option value="BAJA">Baja</option>
                    <option value="MEDIA">Media</option>
                    <option value="ALTA">Alta</option>
                    <option value="URGENTE">Urgente</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha Límite (Vencimiento)</label>
                  <input type="date" name="fecha_vencimiento" value={formData.fecha_vencimiento} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Serie Documental</label>
                  <select name="codigo_serie" required value={formData.codigo_serie} onChange={handleChange} className={inputStyle}>
                    <option value="">Seleccione serie...</option>
                    {series.map(s => <option key={s.codigo} value={s.codigo}>{s.codigo} - {s.nombre}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subserie Documental</label>
                  <select name="codigo_subserie" value={formData.codigo_subserie} onChange={handleChange} className={inputStyle}>
                    <option value="">Seleccione subserie...</option>
                    {subseries.map(ss => <option key={ss.codigo} value={ss.codigo}>{ss.codigo} - {ss.nombre}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo Documental específico</label>
                  <input type="text" name="tipoDocumental" placeholder="Ej: Carta, Memorando, Oficio" value={formData.tipoDocumental} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nivel de Confidencialidad</label>
                  <select name="confidencialidad" required value={formData.confidencialidad} onChange={handleChange} className={inputStyle}>
                    <option value="">Seleccione...</option>
                    <option value="Público">Público</option>
                    <option value="Interno">Interno</option>
                    <option value="Reservado">Reservado</option>
                  </select>
                </div>
              </div>
            </section>

            {/* SECCIÓN 4: CONTENIDO Y ADJUNTOS */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Contenido del Documento</h2>
                <p className="text-xs text-slate-400 font-medium">Asunto, folios y digitalización</p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Asunto</label>
                  <input type="text" name="asunto" required placeholder="Resumen corto del trámite" value={formData.asunto} onChange={handleChange} className={inputStyle} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Descripción detallada</label>
                  <textarea name="descripcion" rows="4" placeholder="Extracto o notas de radicación..." value={formData.descripcion} onChange={handleChange} className={inputStyle}></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Número de Folios</label>
                    <input type="number" name="numeroFolios" value={formData.numeroFolios} onChange={handleChange} className={inputStyle} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Soporte Originario</label>
                    <select name="soporte" value={formData.soporte} onChange={handleChange} className={inputStyle}>
                      <option value="">Seleccione...</option>
                      <option value="Digital">Digital</option>
                      <option value="Físico">Físico</option>
                      <option value="Mixto">Mixto</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fecha del Documento Físico</label>
                    <input type="date" name="fechaDocumento" value={formData.fechaDocumento} onChange={handleChange} className={inputStyle} />
                  </div>
                </div>

                {/* Dropzone estilizado premium */}
                <div className="pt-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Archivos Adjuntos</label>
                  <div className="rounded-2xl border-2 border-dashed border-green-300 bg-green-50/20 p-8 text-center transition-all hover:border-[#2fa300] hover:bg-green-50/40 relative group">
                    <p className="text-slate-600 font-semibold mb-2">📄 Arrastre los expedientes digitales o haga clic para examinar</p>
                    <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <p className="text-xs text-slate-400 font-medium">Formatos corporativos permitidos: PDF, DOCX, JPG, PNG (Máx. 25MB)</p>
                    {formData.archivos && (
                      <p className="mt-3 text-xs font-bold text-[#2fa300] bg-white px-3 py-1.5 rounded-full inline-block border border-green-100 shadow-sm">
                        {formData.archivos.length} archivo(s) seleccionado(s)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* SECCIÓN 5: LÍNEA DE SEGUIMIENTO (PREVISUALIZACIÓN) */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6 sm:p-8">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Estado Inicial en el Flujo</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="rounded-xl bg-green-50 border border-green-100 text-[#2fa300] font-bold text-center text-xs py-3.5 uppercase tracking-wider shadow-sm">Radicado</div>
                <div className="rounded-xl bg-slate-50 text-slate-400 text-center text-xs py-3.5 font-bold uppercase tracking-wider">Clasificado</div>
                <div className="rounded-xl bg-slate-50 text-slate-400 text-center text-xs py-3.5 font-bold uppercase tracking-wider">Asignado</div>
                <div className="rounded-xl bg-slate-50 text-slate-400 text-center text-xs py-3.5 font-bold uppercase tracking-wider">En Gestión</div>
                <div className="rounded-xl bg-slate-50 text-slate-400 text-center text-xs py-3.5 font-bold uppercase tracking-wider">Finalizado</div>
              </div>
            </section>

            {/* ACCIONES DEL FORMULARIO */}
            <div className="flex justify-end gap-4 pt-2">
              <button type="button" onClick={handleReset} className="rounded-xl bg-slate-200/80 px-7 py-4 text-sm font-bold text-slate-700 hover:bg-slate-300 transition-all active:scale-95 shadow-sm">
                Limpiar Formulario
              </button>
              <button type="submit" className="rounded-xl bg-[#2fa300] px-7 py-4 text-sm font-bold text-white hover:bg-[#248400] transition-all active:scale-95 shadow-lg shadow-green-200/50">
                Radicar Documento Activo
              </button>
            </div>

          </form>

          {/* ASIDE DE CONTROL / RESUMEN */}
          <aside className="space-y-6 xl:sticky xl:top-6">
            
            {/* PANEL: RESUMEN DE RADICACIÓN */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Resumen de Radicación</h3>
              <div className="text-2xl font-black text-[#2fa300] tracking-tight break-all">
                {savedRadicado ? savedRadicado.numero_radicado : '—'}
              </div>
              <dl className="mt-5 space-y-3.5 text-xs font-semibold text-slate-600 border-t border-slate-50 pt-4">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-400 uppercase tracking-wider">Solicitante</dt>
                  <dd className="text-right text-slate-800 font-bold">{formData.remitente || '—'}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-400 uppercase tracking-wider">Canal</dt>
                  <dd className="text-right text-slate-800 font-bold">{formData.canalRecepcion || '—'}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-400 uppercase tracking-wider">Serie TRD</dt>
                  <dd className="text-right text-slate-800 font-bold">{formData.codigo_serie || '—'}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-400 uppercase tracking-wider">Prioridad</dt>
                  <dd className="text-right">
                    {formData.prioridad ? (
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                        formData.prioridad === 'URGENTE' || formData.prioridad === 'ALTA' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-100 text-slate-600'
                      }`}>{formData.prioridad}</span>
                    ) : '—'}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-400 uppercase tracking-wider">Asunto</dt>
                  <dd className="text-right text-slate-500 font-medium max-w-[150px] truncate">{formData.asunto || '—'}</dd>
                </div>
              </dl>
            </div>

            {/* PANEL: ESTADO VIVO */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ciclo Vital</h3>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${
                savedRadicado ? 'bg-green-50 text-green-700 border-green-100' : 'bg-amber-50 text-amber-700 border-amber-100'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${savedRadicado ? 'bg-[#2fa300]' : 'bg-amber-500'}`}></span>
                {savedRadicado ? 'Radicado' : 'Preparando Formulario'}
              </span>
            </div>

            {/* PANEL: AUDITORÍA DE METADATOS */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,23,42,0.02)] p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Auditoría Indexada</h3>
              <div className="text-xs text-slate-500 font-semibold space-y-2.5 leading-relaxed">
                <p>ID Registro: <span className="text-slate-800 font-bold">{savedRadicado ? savedRadicado.id_radicado : '—'}</span></p>
                <p>Estampado Cronológico: <span className="text-slate-400 font-medium">{savedRadicado ? savedRadicado.fecha_radicado : '—'}</span></p>
                <p>Estructura: <span className="text-slate-800 font-bold">TRD v1.2</span></p>
              </div>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
}

export default Radicacion;