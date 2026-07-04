import { MdNotifications, MdPerson } from 'react-icons/md'
import odinLogo from '../../assets/odin-logo-white.png'

function Header({ title = 'ODIN' }) {
  return (
    <header className="h-24 bg-odin-green text-white md:h-[120px]">
      <div className="grid h-full grid-cols-[120px_1fr_96px] items-center px-8 md:grid-cols-[141px_1fr_217px] md:px-[55px]">
        <img
          alt="Odin"
          className="h-[64px] w-[120px] object-cover md:h-[75px] md:w-[141px]"
          src={odinLogo}
        />
        <h1 className="justify-self-center font-inter text-[28px] font-extrabold leading-none tracking-normal md:text-[35px]">
          {title}
        </h1>
        <div className="flex items-center justify-end gap-6 md:gap-[34px] md:pr-[21px]">
          <button
            aria-label="Notificaciones"
            className="grid size-8 place-items-center text-white transition-opacity hover:opacity-80"
            type="button"
          >
            <MdNotifications className="size-6" />
          </button>
          <button
            aria-label="Perfil de usuario"
            className="grid size-8 place-items-center text-white transition-opacity hover:opacity-80"
            type="button"
          >
            <MdPerson className="size-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
