import { NavLink } from 'react-router-dom'
import '../Style/dropdown.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'


const NavBar = () => {
  return (
    <nav className='flex justify-between items-center p-4 text-base text-white text-lg'>
      <div className='grid grid-cols-5 w-1/2 align-bottom '>
        <NavLink
          to="/home"
          className="mr-4">
          <img src="logo.svg" alt="" style={{ width: '100px' }} />
        </NavLink>
        <NavLink
          to="/comprar"
          className="flex items-center"
        ><span className='p-1'>Comprar</span></NavLink>
        <NavLink
          to="/alugar"
          className="flex items-center"
        ><span className='p-1'>Alugar</span></NavLink>

        {
          localStorage.tipo != undefined ?
            <NavLink
              to="/anunciarimovel"
              className="flex items-center"
            ><span className='p-1'>Anunciar</span></NavLink> :
            ''
        }

        <NavLink
          to="/sobrenos"
          className="flex items-center"
        ><span className='p-1'>Sobre nós</span></NavLink>
      </div>

      <div>
        {localStorage.length === 0 ?
          <>
            <NavLink
              to="/cadastrar"
              className="mr-4">
              Cadastrar
            </NavLink>
            <NavLink
              to="/login"
              className="mr-4">
              Entrar
            </NavLink>
          </> :
          <div className="dropdown">
            <div className='p-2' id='usuario'><FontAwesomeIcon icon={faCircleUser} /> {localStorage.currentUserNome}</div>
            <div className="dropdown-content bg-blue-600">
              <button onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}>Log out</button>
            </div>
          </div>
        }
      </div>
    </nav>
  )
}

export default NavBar