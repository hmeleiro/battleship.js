import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'

function Map(props) {
  const { board, ships, socket } = props
  const { handleClick, userName, gameInfo, emitGameState } =
    useContext(GameContext)

  const playerIndex = gameInfo.players.findIndex((e) => e === userName)
  const enemyIndex = playerIndex === 0 ? 1 : 0

  const isPlayerTurn =
    (gameInfo.playerOneTurn && playerIndex === 0) ||
    (!gameInfo.playerOneTurn && playerIndex === 1)

  console.log('playerIndex', playerIndex)
  console.log('playerOneTurn', gameInfo.playerOneTurn)
  console.log('isPlayerTurn', isPlayerTurn)

  const enemyShipCells = ships[enemyIndex]
    .map((ship) => ship.map((cell) => cell))
    .flat()
  const playerShipCells = ships[playerIndex]
    .map((ship) => ship.map((cell) => cell))
    .flat()

  return (
    <div className="grid grid-cols-16">
      {board.map((e, i) => {
        let cellColor = ''
        const enemyCell = enemyShipCells.filter((c) => c.id === e.id)
        const playerCell = playerShipCells.filter((c) => c.id === e.id)

        if (enemyCell.length > 0) {
          if (enemyCell[0].isHit) {
            cellColor = 'bg-red-700'
          } else {
            cellColor = 'bg-gray-300'
          }
        } else if (playerCell.length > 0) {
          if (playerCell[0].isHit) {
            cellColor = 'bg-red-700'
          } else {
            cellColor = `bg-player${playerIndex + 1}`
          }
        } else {
          if (e.isHidden) {
            cellColor = 'bg-gray-300'
          } else {
            cellColor = 'bg-blue-300'
          }
        }

        const nextTurn = async () => {
          if (isPlayerTurn) {
            await handleClick(i)
            emitGameState(socket)
          } else {
            console.log('Turno del otro jugador')
          }
        }

        return (
          <div
            key={i}
            className={`w-10 h-10 ${cellColor} m-1`}
            onClick={nextTurn}
          ></div>
        )
      })}
    </div>
  )
}

export default Map
