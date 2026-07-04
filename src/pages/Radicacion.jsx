// Datos de ejemplo. Reemplazar con datos reales del backend.
const usuarios = [
  { id: 1, nombre: 'María Fernanda Gómez', correo: 'mgomez@sena.edu.co', dependencia: 'Talento Humano', rol: 'Administrador', estado: 'done' },
  { id: 2, nombre: 'Carlos Andrés Ruiz', correo: 'caruiz@sena.edu.co', dependencia: 'Coordinación Académica', rol: 'Editor', estado: 'progress' },
  { id: 3, nombre: 'Laura Daniela Pérez', correo: 'ldperez@sena.edu.co', dependencia: 'Dirección General', rol: 'Consulta', estado: 'done' },
  { id: 4, nombre: 'Jorge Iván Salazar', correo: 'jisalazar@sena.edu.co', dependencia: 'Recursos Físicos', rol: 'Editor', estado: 'pending' },
]

const ESTADO_LABEL = { pending: 'Inactivo', progress: 'Invitado', done: 'Activo' }

function Radicacion() {
  return (
    <div className="p-6 md:p-8">
      <div className="header">
        <div>
          <h2 style={{ color: 'var(--azul-oscuro)' }}>Radicación de Documentos</h2>
          <p>Administra las cuentas, roles y permisos de acceso a ODIN</p>
        </div>
        <div className="header-actions">
          <button className="primary" type="button">Nuevo Documento</button>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Dependencia</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{u.dependencia}</td>
                <td>{u.rol}</td>
                <td>
                  <span className={`status ${u.estado}`}>{ESTADO_LABEL[u.estado]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Radicacion
