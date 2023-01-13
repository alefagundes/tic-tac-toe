import style from './Home.module.css'
import { useState, useEffect } from 'react'
import Message from '../components/Message'

const winningCombinations = [
  //possible combination

  // horizontals
  { indexes: [0, 1, 2], orientation: 'horizontal' },
  { indexes: [3, 4, 5], orientation: 'horizontal' },
  { indexes: [6, 7, 8], orientation: 'horizontal' },

  // verticals
  { indexes: [0, 3, 6], orientation: 'vertical' },
  { indexes: [1, 4, 7], orientation: 'vertical' },
  { indexes: [0, 3, 6], orientation: 'vertical' },

  // diagonals
  { indexes: [0, 4, 8], orientation: 'diagonal-1' },
  { indexes: [2, 4, 6], orientation: 'diagonal-2' },
]

const Home = () => {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [turn, setTurn] = useState(1)
  const [winningCombo, setWinningCombo] = useState(null)
  const [winner, setWinner] = useState(null)
  const [poinX, setPointX] = useState(0)
  const [poinO, setPointO] = useState(0)
  const [message, setMessage] = useState('')

  const handleClick = (clickedIndex) => {
    if (gameData[clickedIndex] !== 0) {
      return
    }
    if (winningCombo) {
      return
    }

    setGameData((prev) => {
      const newGameData = [...prev]
      newGameData[clickedIndex] = turn

      return newGameData
    })

    setTurn((prev) => (prev === 1 ? 2 : 1))
  }

  useEffect(() => {
    checkWinner()
    checkGameEnded()
  }, [gameData])

  useEffect(() => {
    if (winner === 'player 1') {
      setPointX((prev) => prev + 1)
      setMessage('Player (X) ganhou!')
      setTimeout(() => {
        setMessage('')
        resetGame()
        setWinningCombo(null)
        setWinner(null)
        setTurn(1)
      }, 2000)
    } else if (winner === 'player 2') {
      setPointO((prev) => prev + 1)
      setMessage('Player (O) ganhou!')
      setTimeout(() => {
        setMessage('')
        resetGame()
        setWinningCombo(null)
        setWinner(null)
        setTurn(1)
      }, 2000)
    }
  }, [winner])

  const resetGame = () => {
    let arr = gameData.map((e) => (e = 0))
    setGameData(arr)
  }

  const checkGameEnded = () => {
    if (gameData.every((item) => item !== 0)) {
      alert('jogo acabou, deu velha')
    }
  }

  const checkWinner = () => {
    for (let combination of winningCombinations) {
      const { indexes } = combination
      if (
        gameData[indexes[0]] === 1 &&
        gameData[indexes[1]] === 1 &&
        gameData[indexes[2]] === 1
      ) {
        setWinner('player 1')
      }
      if (
        gameData[indexes[0]] === 2 &&
        gameData[indexes[1]] === 2 &&
        gameData[indexes[2]] === 2
      ) {
        setWinner('player 2')
      }
      if (winner) {
        setWinningCombo(combination)
        break
      }
    }
  }

  return (
    <div className={style.tela}>
      {!gameData && <p>Carregando...</p>}
      {message.length > 0 && <Message msg={message} />}
      <h1>
        Player X: <span className={style.x}>{poinX}</span> |{' '}
        <span className={style.o}>{poinO}</span> Player O
      </h1>
      <div className={style.border}>
        {gameData &&
          gameData.map((e, index) => (
            <span onClick={() => handleClick(index)} key={index}>
              {e === 1 && '❌'} {e === 2 && '⭕'}
            </span>
          ))}
      </div>
    </div>
  )
}

export default Home
