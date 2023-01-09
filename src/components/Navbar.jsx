import style from './Navbar.module.css'
import { GiTicTacToe } from 'react-icons/gi'

const Navbar = () => {
  return (
    <nav>
      <a href="/" className={style.logo}>
        Tic tic{' '}
        <span>
          toe
          <GiTicTacToe />
        </span>
      </a>
      <ul>
        <a href="#">Portifólio</a>
      </ul>
    </nav>
  )
}

export default Navbar
