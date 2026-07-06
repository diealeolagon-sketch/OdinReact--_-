import React, { useState } from 'react';

function RecuperarPassword({ onVolverAlLogin }) {
  // paso 1: 'correo', paso 2: 'codigo'
  const [paso, setPaso] = useState('correo');
  const [correo, setCorreo] = useState('');
  const [formData, setFormData] = useState({
    codigo: '',
    nuevaPassword: '',
    confirmarPassword: ''
  });

  const handleEnviarCorreo = (e) => {
    e.preventDefault();
    if (!correo) return alert('Por favor, ingresa tu correo institucional.');
    
    // Simulación de envío de código
    alert(`Código de verificación enviado a: ${correo}`);
    setPaso('codigo');
  };

  const handleRestablecer = (e) => {
    e.preventDefault();
    if (formData.nuevaPassword !== formData.confirmarPassword) {
      return alert('Las contraseñas no coinciden.');
    }
    alert('¡Contraseña restablecida con éxito!');
    onVolverAlLogin();
  };

  return (
    <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* LOGO SENA */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-[#2fa300] rounded-xl flex items-center justify-center p-3 shadow-md shadow-green-100">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
            <path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45 45-20.1 45-45S74.9 5 50 5zm0 15c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm-15 48c0-5 4-9 9-9h12c5 0 9 4 9 9v7H35v-7zm30-19c0 1.7-1.3 3-3 3H38c-1.7 0-3-1.3-3-3v-4c0-1.7 1.3-3 3-3h24c1.7 0 3 1.3 3 3v4z"/>
          </svg>
        </div>
      </div>

      {paso === 'correo' ? (
        /* PANTALLA 1: SOLICITAR CORREO */
        <form onSubmit={handleEnviarCorreo} className="space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">¿Olvidaste tu contraseña?</h2>
            <p className="text-xs text-slate-500 mt-1">Ingresa tu correo y te enviaremos un código para restablecerla.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Correo Electrónico</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">📧</span>
              <input
                type="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tu_usuario@sena.edu.co"
                className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#2fa300] text-sm font-bold text-white shadow-md shadow-green-100 hover:bg-[#248400] transition transform active:scale-[0.98]"
          >
            Enviar Código de Verificación
          </button>
        </form>
      ) : (
        /* PANTALLA 2: INTRODUCIR CÓDIGO Y NUEVA PASWORD */
        <form onSubmit={handleRestablecer} className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Restablecer Contraseña</h2>
            <p className="text-xs text-slate-500 mt-1">Ingresa el código enviado a tu correo y tu nueva clave de seguridad.</p>
          </div>

          {/* Código */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Código de Verificación</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">🔑</span>
              <input
                type="text"
                required
                maxLength="6"
                placeholder="Ej. 123456"
                value={formData.codigo}
                onChange={(e) => setFormData({...formData, codigo: e.target.value})}
                className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 pl-10 pr-4 text-sm font-mono tracking-widest text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Nueva Contraseña */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Nueva Contraseña</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">🔒</span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.nuevaPassword}
                onChange={(e) => setFormData({...formData, nuevaPassword: e.target.value})}
                className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Confirmar Contraseña</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">🛡️</span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.confirmarPassword}
                onChange={(e) => setFormData({...formData, confirmarPassword: e.target.value})}
                className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-2 rounded-xl bg-[#2fa300] text-sm font-bold text-white shadow-md shadow-green-100 hover:bg-[#248400] transition transform active:scale-[0.98]"
          >
            Restablecer Contraseña
          </button>
        </form>
      )}

      {/* BOTÓN VOLVER */}
      <div className="text-center mt-5 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onVolverAlLogin}
          className="text-xs font-bold text-[#2fa300] hover:text-[#248400] transition"
        >
          ← Volver al inicio de sesión
        </button>
      </div>

    </div>
  );
}

export default RecuperarPassword;