import React, { useContext } from 'react'
import {GameContext} from '../contexts/GameContext'

function ScoreBoard() {
  const { ships, checkIfSinked } = useContext(GameContext);

  return (
    <div className='flex flex-col ml-5'>
      {ships.map((e, i) => {
        const ships = e.ships
        const player = e.player
        return (
          <div className='flex flex-col mb-5' key={i}>
            Player {player}:
            {ships.map((ship, i ) => {
              return <div key={i} className='grid grid-cols-6'>
                {ship.map((e, i) => {                  
                  const cellColor = checkIfSinked(ship) ? 'bg-red-600' : 'bg-slate-400'
                  return <div className={`w-4 h-4 m-[0.2rem] ${cellColor}`}  key={i}></div>
                })}
              </div>
            })}
          </div>
        )
      })}
    </div>
  )
}

export default ScoreBoard