import React, { useState } from 'react';
import RecuperarPassword from './RecuperarPassword';

function Login() {
  const [vista, setVista] = useState('login'); // 'login' o 'recuperar'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recordarme, setRecordarme] = useState(false);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    // Flujo de autenticación
    alert(`Iniciando sesión con: ${email}`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#eff6ff] to-[#e8f5e9] p-4 relative overflow-hidden font-sans">
      
      {/* Círculos decorativos abstractos de fondo (Efecto Llamativo) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-green-300/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-25%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-300/20 blur-3xl pointer-events-none"></div>

      {vista === 'login' ? (
        /* TARJETA DE LOGIN PRINCIPAL */
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-100 p-8 transition-all duration-300">
          
          {/* LOGO INSTITUCIONAL DEL SENA (IMAGEN OFICIAL) */}
          <div className="flex justify-center mb-6">
            <img 
              src="https://www.sena.edu.co/Style%20Library/alayout/images/logoSena.png" 
              alt="Logo SENA" 
              className="w-24 h-24 object-contain filter drop-shadow-sm"
            />
          </div>

          {/* Encabezado */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Sistema ODIN</h1>
            <p className="text-xs text-slate-500 mt-1">Ingresa tus credenciales para acceder a la plataforma corporativa.</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmitLogin} className="space-y-4">
            
            {/* INPUT CORREO */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Correo Electrónico</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">📧</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@sena.edu.co"
                  className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white transition shadow-sm"
                />
              </div>
            </div>

            {/* INPUT CONTRASEÑA */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase">Contraseña</label>
                <button
                  type="button"
                  onClick={() => setVista('recuperar')}
                  className="text-xs font-semibold text-[#2fa300] hover:text-[#248400] transition"
                >
                  ¿La olvidaste?
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">🔒</span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white transition shadow-sm"
                />
              </div>
            </div>

            {/* RECORDARME */}
            <div className="flex items-center pt-1">
              <input
                id="recordarme"
                type="checkbox"
                checked={recordarme}
                onChange={(e) => setRecordarme(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#2fa300] focus:ring-[#2fa300]"
              />
              <label htmlFor="recordarme" className="ml-2 text-xs font-medium text-slate-600 select-none">
                Mantener sesión activa en este dispositivo
              </label>
            </div>

            {/* BOTÓN INGRESAR */}
            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl bg-[#2fa300] text-sm font-bold text-white shadow-lg shadow-green-100 hover:bg-[#248400] hover:shadow-xl transition transform active:scale-[0.98]"
            >
              Iniciar Sesión
            </button>

          </form>

          {/* Pie del Login */}
          <div className="text-center mt-6 text-[11px] text-slate-400">
            Servicio Nacional de Aprendizaje SENA &copy; 2026 <br /> Todos los derechos reservados.
          </div>

        </div>
      ) : (
        /* RENDERIZADO DEL COMPONENTE DE RECUPERACIÓN */
        <RecuperarPassword onVolverAlLogin={() => setVista('login')} />
      )}

    </div>
  );
}

export default Login;