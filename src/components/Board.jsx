import React, { useEffect, useContext } from 'react'
import ScoreBoard from './ScoreBoard'
import Map from './Map'
import { GameContext } from '../contexts/GameContext'

function Board() {
  const {
    playerOneTurn,
    ships,
    setShips,
    board,
    setBoard,
    checkIfWinner,
    winner
  } = useContext(GameContext)

  useEffect(() => {
    console.log('Mirando en la base de datos si hay una partida iniciada...')
    if (ships === 'undefined') {
      console.log('No la hay. Creando una nueva...')
    } else {
      console.log('La hay guardando la información de partida en los estados')
      // setBoard(JSON.parse(board))
      // setShips(JSON.parse(ships))
    }
  }, [])

  useEffect(() => {
    console.log('Cambios en información de partida. Guardando en base de datos')
  }, [board, ships, winner, playerOneTurn])

  useEffect(() => {
    if (ships) {
      checkIfWinner()
    }
  }, [playerOneTurn])

  if (winner) {
    console.log(winner)

    return (
      <div className="flex">
        <h1>Ha ganado el jugador {winner}</h1>
      </div>
    )
  }

  if (board) {
    return (
      <div className="flex w-[75%] mt-[3%] ml-[3%] h-[100%]">
        <h1 className="text-xl text-center mb-2">
          Es el turno de{' '}
          <span className="font-bold">
            {playerOneTurn ? 'Jugador 1' : 'Jugador 2'}
          </span>{' '}
        </h1>
        <Map board={board} ships={ships} />
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
