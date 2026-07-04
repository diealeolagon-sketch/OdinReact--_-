import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Roles from './pages/Roles.jsx'
import Dependencias from './pages/Dependencias.jsx'
import Usuarios from './pages/Usuarios.jsx'
import Radicacion from './pages/Radicacion.jsx'
import Consulta from './pages/Consulta.jsx'
import Series from './pages/Series.jsx'
import Subseries from './pages/Subseries.jsx'
import Tramites from './pages/Tramites.jsx'
import Reportes from './pages/Reportes.jsx'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1" style={{ backgroundColor: 'var(--bg)' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/view/dashboard" replace />} />
            <Route path="/view/dashboard" element={<Dashboard />} />
            <Route path="/view/usuarios" element={<Usuarios />} />
            <Route path="/view/roles" element={<Roles />} />
            <Route path="/view/dependencias" element={<Dependencias />} />
            <Route path="/view/radicacion" element={<Radicacion />} />
            <Route path="/view/consulta" element={<Consulta />} />
            <Route path="/view/series" element={<Series />} />
            <Route path="/view/subseries" element={<Subseries />} />
            <Route path="/view/tramites" element={<Tramites />} />
            <Route path="/view/reportes" element={<Reportes />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
