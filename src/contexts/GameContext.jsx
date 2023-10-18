import React, { useState } from 'react'

export const GameContext = React.createContext()

export function GameContextProvider({ children }) {
  // const [playerOneTurn, setPlayerOneTurn] = useState(true)
  const [ships, setShips] = useState()
  const [board, setBoard] = useState()
  const [gameInfo, setGameInfo] = useState()
  // const [winner, setWinner] = useState(false)
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')

  const checkIfSinked = (ship) => {
    return ship.filter((e) => !e.isHit).length === 0
  }

  const handleClick = (id) => {
    const enemy = playerOneTurn ? 1 : 0
    const player = playerOneTurn ? 0 : 1

    const enemyShipCells = ships[enemy]
      .map((ship) => ship.map((cell) => cell.id))
      .flat()
    const playerShipCells = ships[player]
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

        updatedShips[enemy].map((ship) =>
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
      const shipsRemaining = player.filter((ship) => !checkIfSinked(ship))
      if (shipsRemaining.length === 0) {
        setWinner(player.player === 2 ? 1 : 2)
      }
    })
  }

  return (
    <GameContext.Provider
      value={{
        gameInfo,
        setGameInfo,
        userName,
        setUserName,
        board,
        setBoard,
        ships,
        setShips,
        handleClick,
        checkIfSinked,
        checkIfWinner,
        room,
        setRoom
      }}
    >
      {children}{' '}
    </GameContext.Provider>
  )
}
