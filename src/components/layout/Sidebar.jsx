import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';


// Relaciona cada ruta con su identificador de menú, para resaltar
// automáticamente la opción activa según la URL actual.
const ROUTE_TO_MENU = {
  '/view/dashboard': 'dashboard',
  '/view/usuarios': 'usuarios',
  '/view/roles': 'roles',
  '/view/dependencias': 'dependencias',
  '/view/radicados': 'radicacion_Documental',
  '/view/estados': 'consulta',
  '/view/series': 'series',
  '/view/subseries': 'subseries',
  '/view/tramites': 'tramites',
};

export default function Sidebar({ activeMenu: activeMenuProp }) {
  const { pathname } = useLocation();
  // Si no se pasa activeMenu por props, se calcula a partir de la URL actual
  const activeMenu = activeMenuProp ?? ROUTE_TO_MENU[pathname];

  // Estados para controlar qué dropdown está abierto
  const [isUsuariosOpen, setIsUsuariosOpen] = useState(false);
  const [isConsultaOpen, setIsConsultaOpen] = useState(false);

  // Efecto para abrir automáticamente el dropdown correcto según el menú activo
  useEffect(() => {
    if (activeMenu === 'usuarios' || activeMenu === 'roles') {
      setIsUsuariosOpen(true);
    }
    if (activeMenu === 'consulta' || activeMenu === 'series' || activeMenu === 'subseries') {
      setIsConsultaOpen(true);
    }
  }, [activeMenu]);

  // Estilos base usando las variables semánticas de styleguide.css
  const sidebarStyle = {
    backgroundColor: 'var(--blanco-neutro)',
    borderRight: '1px solid var(--border)',
    fontFamily: '"Inter", Helvetica, sans-serif'
  };

  const logoIconStyle = {
    backgroundColor: 'var(--verde-oscuro)',
    boxShadow: '0 4px 6px -1px rgba(0, 120, 50, 0.2)'
  };

  // Función para manejar las clases y estilos activos dinámicamente
  const getLinkProps = (menuName) => {
    const baseClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-sm";
    
    if (activeMenu === menuName) {
      return {
        className: `${baseClass} font-semibold`,
        style: { 
          backgroundColor: '#EAF8DE', // Tono claro equivalente a tu clase .progress en style.css
          color: 'var(--verde-oscuro)' 
        }
      };
    }
    return {
      className: `${baseClass} text-slate-600 hover:bg-slate-50 hover:text-slate-900`,
      style: {}
    };
  };

  const getSubLinkProps = (menuName) => {
    const baseClass = "block px-2 py-2 rounded-md transition text-[13px]";
    
    if (activeMenu === menuName) {
      return {
        className: `${baseClass} font-semibold`,
        style: { color: 'var(--verde-oscuro)' }
      };
    }
    return {
      className: `${baseClass} text-slate-600 hover:text-slate-900`,
      style: {}
    };
  };

  return (
    <div 
      id="main-sidebar" 
      className="w-64 min-h-screen flex flex-col"
      style={sidebarStyle}
    >
      {/* LOGO */}
      <div className="h-16 flex items-center justify-center border-b px-6" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2.5 w-full">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
            style={logoIconStyle}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ color: 'var(--azul-oscuro)' }}>ODIN</span>
        </div>
      </div>

      {/* MENU DE NAVEGACIÓN */}
      <nav className="flex-1 px-3 py-4 space-y-1 font-medium">
        
        {/* INICIO */}
        <Link to="/view/dashboard" {...getLinkProps('dashboard')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 opacity-75 group-hover:opacity-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span>Panel de Inicio</span>
        </Link>

        {/* DESPLEGABLE: CONTROL DE ACCESO */}
        <div className="dropdown-container">
          <button 
            onClick={() => setIsUsuariosOpen(!isUsuariosOpen)}
            type="button"
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 focus:outline-none group text-sm"
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 opacity-75 group-hover:opacity-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
              <span>Control de Acceso</span>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" 
              className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200"
              style={{ transform: isUsuariosOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* Submenú de Usuarios */}
          <div 
            className={`${isUsuariosOpen ? '' : 'hidden'} pl-11 pr-2 py-1 space-y-1 rounded-lg mt-0.5 border`}
            style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
          >
            <Link to="/view/usuarios" {...getSubLinkProps('usuarios')}>
              Gestión de Usuarios
            </Link>
            <Link to="/view/roles" {...getSubLinkProps('roles')}>
              Roles y Permisos
            </Link>
          </div>
        </div>

        {/* DEPENDENCIAS */}
        <Link to="/view/dependencias" {...getLinkProps('dependencias')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 opacity-75 group-hover:opacity-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v14.25M21.621 15.75H18.75m-.75-12h2.25m-.75 3h1.5m-1.5 3h1.5m-1.5 3H18.75M13.5 3.75h.008v.008H13.5V3.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM13.5 7.5h.008v.008H13.5V7.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21V5.25A2.25 2.25 0 0 0 8.25 3H4.5A2.25 2.25 0 0 0 2.25 5.25V21h8.25ZM10.5 21h7.5V10.5a2.25 2.25 0 0 0-2.25-2.25h-5.25V21Z" />
          </svg>
          <span>Dependencias</span>
        </Link>

        {/* RADICACIÓN */}
        <Link to="/view/radicacion" {...getLinkProps('radicacion_Documental')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 opacity-75 group-hover:opacity-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>
          <span>Radicación de Documentos</span>
        </Link>

        {/* DESPLEGABLE: GESTIÓN DOCUMENTAL */}
        <div className="dropdown-container">
          <button 
            onClick={() => setIsConsultaOpen(!isConsultaOpen)}
            type="button"
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 focus:outline-none group text-sm"
          >
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 opacity-75 group-hover:opacity-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              <span>Gestión Documental</span>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" 
              className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200"
              style={{ transform: isConsultaOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {/* Submenú de Gestión Documental */}
          <div 
            className={`${isConsultaOpen ? '' : 'hidden'} pl-11 pr-2 py-1 space-y-1 rounded-lg mt-0.5 border`}
            style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
          >
            <Link to="/view/consulta" {...getSubLinkProps('consulta')}>
              Consulta y Seguimiento
            </Link>
            <Link to="/view/series" {...getSubLinkProps('series')}>
              Series Documentales
            </Link>
            <Link to="/view/subseries" {...getSubLinkProps('subseries')}>
              Subseries Documentales
            </Link>
          </div>
        </div>

        {/* TRÁMITES */}
        <Link to="/view/tramites" {...getLinkProps('tramites')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 opacity-75 group-hover:opacity-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.827m11.379-8.16 1.15-.827M8.14 21.27l.707-1.03m7.45-.808.707-1.03M12 3v1.5m0 15V21m-4.743-10 1.41-.513m11.379 8.16-1.15-.827m-9.33 1.03-.707-1.03" />
          </svg>
          <span>Gestión de Trámites</span>
        </Link>

        {/* REPORTES */}
        <Link to="/view/reportes" {...getLinkProps('reportes')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 opacity-75 group-hover:opacity-100">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.625c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 3 18.75v-5.625ZM13.5 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v10.125c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 13.5 18.75V8.625ZM8.25 4.125C8.25 3.504 8.754 3 9.375 3h2.25c.621 0 1.125.504 1.125 1.125v14.625c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 0 1 8.25 18.75V4.125Z" />
          </svg>
          <span>Reportes y Estadísticas</span>
        </Link>

      </nav>
    </div>
  );
}