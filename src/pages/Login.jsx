import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80", 
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80", 
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
];

function Login() {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recordarme, setRecordarme] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Estados para recuperación de contraseña
  const [pasoRecuperar, setPasoRecuperar] = useState('correo'); 
  const [correoRecuperar, setCorreoRecuperar] = useState('');
  const [tokenData, setTokenData] = useState({ codigo: '', nuevaPassword: '', confirmarPassword: '' });

  // Estado del Slider e inicialización del Router
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (email === 'diealeolagon@gmail.com' && password === '12345678') {
      navigate('/view/dashboard');
    } else {
      setErrorMsg('Las credenciales ingresadas no son válidas.');
    }
  };

  const handleEnviarCorreo = (e) => {
    e.preventDefault();
    alert(`Código de seguridad despachado a: ${correoRecuperar}`);
    setPasoRecuperar('codigo');
  };

  const handleRestablecer = (e) => {
    e.preventDefault();
    if (tokenData.nuevaPassword !== tokenData.confirmarPassword) {
      return alert('Las contraseñas no coinciden.');
    }
    alert('¡Contraseña restablecida con éxito!');
    setIsLogin(true);
    setPasoRecuperar('correo');
  };

  return (
    <div className="min-h-screen w-screen bg-[#f8fafc] font-sans overflow-hidden flex justify-center items-center p-0 relative select-none">
      
      {/* CONTENEDOR MAESTRO */}
      <div className="w-full h-full min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">
        
        {/* ================= FORMULARIO 1: LOGIN ================= */}
        <div className={`flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 bg-gradient-to-br from-[#f4f7fa] to-[#eff6ff] relative transition-all duration-700 ${!isLogin ? 'lg:opacity-20 lg:blur-sm pointer-events-none' : 'opacity-100'}`}>
          <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-green-300/10 blur-3xl pointer-events-none"></div>
          
          <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-100 p-8 md:p-10 z-10 transform transition-transform duration-500">
            <div className="flex justify-center mb-5">
              <img src="https://www.sena.edu.co/Style%20Library/alayout/images/logoSena.png" alt="SENA" className="w-20 h-20 object-contain filter drop-shadow-sm" />
            </div>

            <div className="text-center mb-6">
              <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Sistema ODIN</h1>
              <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide">Plataforma Corporativa de Gestión Documental</p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in duration-200">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmitLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Correo Electrónico</label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-[#2fa300] transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <input
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="usuario@sena.edu.co"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white focus:ring-4 focus:ring-green-500/5 transition-all duration-300 shadow-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Contraseña</label>
                  <button type="button" onClick={() => setIsLogin(false)} className="text-xs font-bold text-[#2fa300] hover:text-[#248400] transition-colors">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-[#2fa300] transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white focus:ring-4 focus:ring-green-500/5 transition-all duration-300 shadow-sm"
                  />
                </div>
              </div>

              <div className="flex items-center pt-1">
                <input id="recordarme" type="checkbox" checked={recordarme} onChange={(e) => setRecordarme(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-[#2fa300] focus:ring-[#2fa300] cursor-pointer" />
                <label htmlFor="recordarme" className="ml-2 text-xs font-semibold text-slate-500 select-none cursor-pointer">Mantener sesión activa</label>
              </div>

              <button type="submit" className="w-full py-3.5 mt-2 rounded-xl bg-[#2fa300] text-sm font-bold text-white shadow-lg shadow-green-200/50 hover:bg-[#248400] hover:shadow-xl hover:shadow-green-300/30 transition-all duration-300 transform active:scale-[0.99]">
                Ingresar al Sistema
              </button>
            </form>
          </div>
        </div>

        {/* ================= FORMULARIO 2: RECUPERAR ================= */}
        <div className={`flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 bg-gradient-to-br from-[#f4f7fa] to-[#f0fdf4] relative transition-all duration-700 ${isLogin ? 'lg:opacity-20 lg:blur-sm pointer-events-none' : 'opacity-100'}`}>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-300/10 blur-3xl pointer-events-none"></div>
          
          <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-100 p-8 md:p-10 z-10">
            <div className="flex justify-center mb-5">
              <img src="https://www.sena.edu.co/Style%20Library/alayout/images/logoSena.png" alt="SENA" className="w-20 h-20 object-contain filter drop-shadow-sm" />
            </div>

            {pasoRecuperar === 'correo' ? (
              <form onSubmit={handleEnviarCorreo} className="space-y-5">
                <div className="text-center mb-2">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">¿Clave Olvidada?</h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Introduce tu correo institucional para recuperar el acceso.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Correo Electrónico</label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-[#2fa300] transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <input
                      type="email" required value={correoRecuperar} onChange={(e) => setCorreoRecuperar(e.target.value)} placeholder="tu_usuario@sena.edu.co"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white focus:ring-4 focus:ring-green-500/5 transition-all duration-300 shadow-sm"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#2fa300] text-sm font-bold text-white shadow-lg shadow-green-200/50 hover:bg-[#248400] transition-all duration-300 transform active:scale-[0.99]">
                  Obtener Código Seguro
                </button>
              </form>
            ) : (
              <form onSubmit={handleRestablecer} className="space-y-4">
                <div className="text-center mb-2">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Verificación</h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Ingresa el token de seguridad y tu nueva clave.</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Código Recibido</label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-[#2fa300] transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
                      </svg>
                    </span>
                    <input type="text" required maxLength="6" placeholder="• • • • • •" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-center tracking-[0.25em] font-mono text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white focus:ring-4 focus:ring-green-500/5 transition-all shadow-sm" value={tokenData.codigo} onChange={(e) => setTokenData({...tokenData, codigo: e.target.value})}/>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Nueva Contraseña</label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-[#2fa300] transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input type="password" required placeholder="••••••••" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white focus:ring-4 focus:ring-green-500/5 transition-all duration-300 shadow-sm" value={tokenData.nuevaPassword} onChange={(e) => setTokenData({...tokenData, nuevaPassword: e.target.value})}/>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Confirmar Contraseña</label>
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-[#2fa300] transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </span>
                    <input type="password" required placeholder="••••••••" className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm text-slate-700 outline-none focus:border-[#2fa300] focus:bg-white focus:ring-4 focus:ring-green-500/5 transition-all duration-300 shadow-sm" value={tokenData.confirmarPassword} onChange={(e) => setTokenData({...tokenData, confirmarPassword: e.target.value})}/>
                  </div>
                </div>
                <button type="submit" className="w-full py-3.5 mt-2 rounded-xl bg-[#2fa300] text-sm font-bold text-white transition transform active:scale-[0.99] shadow-lg shadow-green-200/50 hover:bg-[#248400]">
                  Actualizar Contraseña
                </button>
              </form>
            )}

            <div className="text-center mt-6 pt-4 border-t border-slate-100">
              <button type="button" onClick={() => { setIsLogin(true); setPasoRecuperar('correo'); }} className="text-xs font-bold text-[#2fa300] hover:text-[#248400] transition-colors">
                ← Regresar al inicio de sesión
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PANEL CORTINA FLOTANTE (SLIDER AUTOMÁTICO ASINCRÓNICO)
            ========================================================================= */}
        <div 
          className={`hidden lg:block absolute top-0 bottom-0 w-1/2 bg-slate-950 z-30 transition-transform duration-[950ms] cubic-bezier(0.4, 0, 0.2, 1) shadow-[0_0_60px_rgba(0,0,0,0.35)] pointer-events-none ${
            isLogin ? 'left-0 translate-x-full' : 'left-0 translate-x-0'
          }`}
        >
          {BACKGROUND_IMAGES.map((imgUrl, index) => (
            <div
              key={imgUrl}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === imageIndex ? "opacity-45 scale-105" : "opacity-0 scale-100"
              } transform motion-safe:transition-all motion-safe:duration-[6000ms]`}
              style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />

          <div className="absolute bottom-20 left-16 right-16 z-20 text-white space-y-4 pointer-events-auto">
            <span className="inline-block bg-[#2fa300] text-white font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
              {isLogin ? 'Innovación Institucional' : 'Seguridad Avanzada'}
            </span>
            
            <div className="h-20 relative overflow-hidden w-full">
              <h2 className={`text-4xl font-black uppercase tracking-tight leading-none text-white drop-shadow-md transition-all duration-700 ease-in-out absolute inset-0 ${isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
                Control Eficiente y <br/> Gestión Documental.
              </h2>
              <h2 className={`text-4xl font-black uppercase tracking-tight leading-none text-white drop-shadow-md transition-all duration-700 ease-in-out absolute inset-0 ${!isLogin ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Protección de <br/> Credenciales.
              </h2>
            </div>

            <p className="text-slate-300 text-sm max-w-sm font-light leading-relaxed h-12 transition-all duration-500">
              {isLogin 
                ? 'Optimiza la organización de dependencias, roles y trámites con la infraestructura digital avanzada de ODIN.'
                : 'El proceso está protegido de extremo a extremo. Sigue las instrucciones para restablecer tu contraseña corporativa.'}
            </p>
          </div>

          <div className="absolute bottom-8 left-16 z-20 flex gap-2">
            {BACKGROUND_IMAGES.map((_, idx) => (
              <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === imageIndex ? 'w-6 bg-[#2fa300]' : 'w-2 bg-white/30'}`} />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;