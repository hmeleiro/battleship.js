import React, { useState } from 'react'

export const GameContext = React.createContext()

export function GameContextProvider({ children }) {
  const [ships, setShips] = useState()
  const [board, setBoard] = useState()
  const [gameInfo, setGameInfo] = useState()
  const [userName, setUserName] = useState('')
  const [room, setRoom] = useState('')

  const checkIfSinked = (ship) => {
    return ship.filter((e) => !e.isHit).length === 0
  }

  const handleClick = async (id) => {
    const playerIndex = gameInfo.players.findIndex((e) => e === userName)
    const enemyIndex = playerIndex === 0 ? 1 : 0

    const enemyShipCells = ships[enemyIndex]
      .map((ship) => ship.map((cell) => cell.id))
      .flat()
    const playerShipCells = ships[playerIndex]
      .map((ship) => ship.map((cell) => cell.id))
      .flat()

    if (playerShipCells.includes(id)) {
      return true
    }

    const isHit = enemyShipCells.includes(id)
    if (isHit) {
      setShips((prev) => {
        const updatedShips = [...prev]

        updatedShips[enemyIndex].map((ship) =>
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
    return false
  }

  const emitGameState = (socket) => {
    if (!gameInfo) return
    const { playerOneTurn, winner, players, step } = gameInfo
    const gameState = {
      room,
      board,
      ships,
      players,
      playerOneTurn,
      winner,
      step
    }
    socket.emit('nextTurn', gameState)
  }

  const checkIfWinner = () => {
    ships.forEach((player) => {
      const shipsRemaining = player.filter((ship) => !checkIfSinked(ship))
      if (shipsRemaining.length === 0) {
        setGameInfo((prev) => ({
          ...prev,
          winner: player.player === 2 ? 1 : 2
        }))
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
        setRoom,
        emitGameState
      }}
    >
      {children}{' '}
    </GameContext.Provider>
  )
}
