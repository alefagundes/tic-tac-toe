import style from './Navbar.module.css'
import { GiTicTacToe } from 'react-icons/gi'

const Navbar = () => {
  return (
    <nav>
      <a href="/" className={style.logo}>
        Tic tac{' '}
        <span>
          toe
          <GiTicTacToe />
        </span>
      </a>
    </nav>
  )
}

export default Navbar
