import React, { useEffect, useContext } from 'react'
import ScoreBoard from './ScoreBoard'
import Map from './Map'
import { GameContext } from '../contexts/GameContext'
import { Button } from '@chakra-ui/react'

function Board({ gameState }) {
  const {
    playerOneTurn,
    ships,
    setShips,
    board,
    setBoard,
    startGame,
    checkIfWinner,
    winner
  } = useContext(GameContext)

  // useEffect(() => {
  //   const board = window.localStorage.getItem('board')
  //   const ships = window.localStorage.getItem('ships')
  //   if (ships === 'undefined') {
  //     startGame()
  //   } else {
  //     setBoard(JSON.parse(board))
  //     setShips(JSON.parse(ships))
  //   }
  // }, [])

  // useEffect(() => {
  //   window.localStorage.setItem('board', JSON.stringify(board))
  // }, [board])

  // useEffect(() => {
  //   window.localStorage.setItem('ships', JSON.stringify(ships))
  // }, [ships])

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
      <div className="flex w-[75%] mt-[3%] ml-[3%] h-[100%] items-center justify-center">
        <Button onClick={startGame}>Empezar partida</Button>
      </div>
    )
  }
}

export default Board
