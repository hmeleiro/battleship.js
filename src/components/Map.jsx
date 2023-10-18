import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'

function Map(props) {
  const { board, ships } = props
  const { playerOneTurn, handleClick } = useContext(GameContext)

  const enemy = playerOneTurn ? 1 : 0
  const player = playerOneTurn ? 0 : 1

  console.log(ships)
  const enemyShipCells = ships[enemy]
    .map((ship) => ship.map((cell) => cell))
    .flat()
  const playerShipCells = ships[player]
    .map((ship) => ship.map((cell) => cell))
    .flat()

  console.log(enemyShipCells)
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
            cellColor = 'bg-player1'
          }
        } else if (playerCell.length > 0) {
          if (playerCell[0].isHit) {
            cellColor = 'bg-red-700'
          } else {
            cellColor = 'bg-player2'
          }
        } else {
          if (e.isHidden) {
            cellColor = 'bg-gray-300'
          } else {
            cellColor = 'bg-blue-300'
          }
        }
        return (
          <div
            key={i}
            className={`w-10 h-10 ${cellColor} m-1`}
            onClick={() => handleClick(i)}
          ></div>
        )
      })}
    </div>
  )
}

export default Map
