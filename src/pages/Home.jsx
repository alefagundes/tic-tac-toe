import style from './Home.module.css'
import { useState, useEffect } from 'react'

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
      alert(`O ${winner} ganhou - (X)`)
    } else if (winner === 'player 2') {
      alert(`O ${winner} ganhou - (O)`)
    }
  }, [winner])

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
