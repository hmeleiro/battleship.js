import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'

function ScoreBoard() {
  const { ships, checkIfSinked, gameInfo } = useContext(GameContext)
  const { players } = gameInfo
  return (
    <div className="flex flex-col ml-5">
      {ships.map((ships, i) => {
        return (
          <div className="flex flex-col mb-5" key={i}>
            {players[i] ? players[i] : 'Waiting for another player'}
            {ships.map((ship, i) => {
              return (
                <div key={i} className="flex">
                  {ship.map((e, i) => {
                    const cellColor = checkIfSinked(ship)
                      ? 'bg-red-600'
                      : 'bg-slate-400'

                    return (
                      <div
                        className={`w-4 h-4 mr-1 mt-1 ${cellColor}`}
                        key={i}
                      ></div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default ScoreBoard
