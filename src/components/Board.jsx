import React, { useContext } from 'react'
import ScoreBoard from './ScoreBoard'
import Map from './Map'
import { GameContext } from '../contexts/GameContext'

function Board({ socket }) {
  const { ships, board, gameInfo } = useContext(GameContext)

  if (board) {
    const playerInTurnIndex = gameInfo.playerOneTurn ? 0 : 1
    return (
      <div className="flex w-[75%] mt-[3%] ml-[3%] h-[100%]">
        <h1 className="text-xl text-center mb-2">
          Es el turno de{' '}
          <span className="font-bold">
            {gameInfo.players[playerInTurnIndex]}
          </span>{' '}
        </h1>
        {/* <div className="grid grid-cols-16">{map}</div> */}
        <Map board={board} ships={ships} socket={socket} />
        <ScoreBoard />
      </div>
    )
  } else {
    return (
      <div className="flex w-[75%] ml-[3%] h-screen items-center justify-center bg-slate-100">
        Aquí va el tablero
      </div>
    )
  }
}

export default Board
