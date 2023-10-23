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

  const generateBoardDivs = (board, ships, socket, gridSize = 16) => {
    const playerIndex = gameInfo.players.findIndex((e) => e === userName)
    const enemyIndex = playerIndex === 0 ? 1 : 0

    const isPlayerTurn =
      (gameInfo.playerOneTurn && playerIndex === 0) ||
      (!gameInfo.playerOneTurn && playerIndex === 1)

    const enemyShipCells = ships[enemyIndex]
      .map((ship) => ship.map((cell) => cell))
      .flat()
    const playerShipCells = ships[playerIndex]
      .map((ship) => ship.map((cell) => cell))
      .flat()
    const html = []
    let col = 0
    let row = 0
    for (let i = 0; i < gridSize * gridSize; i++) {
      const boardCell = board[i]
      let cellColor = ''
      const enemyCell = enemyShipCells.filter((c) => c.id === boardCell.id)
      const playerCell = playerShipCells.filter((c) => c.id === boardCell.id)

      if (enemyCell.length > 0) {
        if (enemyCell[0].isHit) {
          cellColor = 'bg-red-700'
        } else {
          cellColor = `bg-player1`
        }
      } else if (playerCell.length > 0) {
        if (playerCell[0].isHit) {
          cellColor = 'bg-red-700'
        } else {
          cellColor = `bg-player2`
        }
      } else {
        if (boardCell.isHidden) {
          cellColor = 'bg-gray-300'
        } else {
          cellColor = 'bg-blue-300'
        }
      }

      const nextTurn = async () => {
        if (isPlayerTurn) {
          const ownShipClicked = await handleClick(i)
          if (!ownShipClicked) {
            emitGameState(socket)
          }
        } else {
          console.log('Turno del otro jugador')
        }
      }

      html.push(
        <div
          key={i}
          className={`flex w-10 h-10 ${cellColor} m-1 items-center justify-center text-white text-xs`}
          data-x={col}
          data-y={row}
          onClick={nextTurn}
        >
          {i}{' '}
        </div>
      )
      if (col < gridSize - 1) {
        col += 1
      } else {
        row += 1
        col = 0
      }
    }
    return html
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
        generateBoardDivs,
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
