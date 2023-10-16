import React, { useState } from 'react'

export const GameContext = React.createContext()

export function GameContextProvider({ children }) {
  const [playerOneTurn, setPlayerOneTurn] = useState(true)
  const [ships, setShips] = useState()
  const [board, setBoard] = useState()
  const [winner, setWinner] = useState(false)
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')

  function startGame() {
    const initBoard = generateMap()
    const initShips = [
      {
        player: 1,
        ships: generateShips()
      },
      {
        player: 2,
        ships: generateShips()
      }
    ]

    setShips(initShips)
    setBoard(initBoard)
  }

  function range(start, stop, step) {
    if (typeof stop === 'undefined') {
      // one param defined
      stop = start
      start = 0
    }

    if (typeof step === 'undefined') {
      step = 1
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
      return []
    }

    const result = []
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i)
    }

    return result
  }

  function randomShip(length) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const isRow = Math.random() < 0.5 // Randomly choose row or column
    const startIndex = getRandomInt(0, 16 * 16 - length)

    if (isRow) {
      return range(startIndex, startIndex + length)
    } else {
      return range(startIndex, startIndex + length * 16, 16)
    }
  }

  const generateShips = (ships = [3]) => {
    return ships.map((ship) => {
      const shipCells = randomShip(ship)
      return shipCells.map((id) => ({ id, isHit: false }))
    })
  }

  const generateMap = () => {
    const board = []
    const l = 256
    for (let i = 0; i < l; i++) {
      board.push({ id: i, cellType: 'water', isHidden: true })
    }
    return board
  }

  const checkIfSinked = (ship) => {
    return ship.filter((e) => !e.isHit).length === 0
  }

  const handleClick = (id) => {
    const enemy = playerOneTurn ? 1 : 0
    const player = playerOneTurn ? 0 : 1

    const enemyShipCells = ships[enemy].ships
      .map((ship) => ship.map((cell) => cell.id))
      .flat()
    const playerShipCells = ships[player].ships
      .map((ship) => ship.map((cell) => cell.id))
      .flat()

    if (playerShipCells.includes(id)) {
      console.log('Own ship')
      return
    }

    const isHit = enemyShipCells.includes(id)
    if (isHit) {
      setShips((prev) => {
        const updatedShips = [...prev]

        updatedShips[enemy].ships.map((ship) =>
          ship.map((cell) => {
            if (cell.id === id) {
              cell.isHit = true
            }
            return cell
          })
        )
        return updatedShips
      })
    } else {
      setBoard((prev) => {
        const updatedBoard = [...prev]
        updatedBoard.map((cell) => {
          if (cell.id === id) {
            cell.isHidden = false
          }
          return cell
        })
        setBoard(updatedBoard)
      })
    }
    setPlayerOneTurn((prev) => !prev)
  }

  const checkIfWinner = () => {
    ships.forEach((player) => {
      const shipsRemaining = player.ships.filter((ship) => !checkIfSinked(ship))
      if (shipsRemaining.length === 0) {
        setWinner(player.player === 2 ? 1 : 2)
      }
    })
  }

  return (
    <GameContext.Provider
      value={{
        userName,
        setUserName,
        board,
        setBoard,
        ships,
        setShips,
        playerOneTurn,
        handleClick,
        startGame,
        checkIfSinked,
        checkIfWinner,
        winner,
        room,
        setRoom
      }}
    >
      {children}{' '}
    </GameContext.Provider>
  )
}
