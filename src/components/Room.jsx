import React, { useContext, useEffect, useState } from 'react'
import Board from './Board'
import Chat from './chat/Chat'
import { GameContext } from '../contexts/GameContext'
import { useSearchParams } from 'react-router-dom'

function Room({ socket }) {
  const {
    setUserName,
    setRoom,
    ships,
    setShips,
    setBoard,
    gameInfo,
    setGameInfo,
    checkIfWinner
  } = useContext(GameContext)
  const [searchParams] = useSearchParams()
  const [roomFullError, setRoomFullError] = useState(false)
  const [waitingForSecondPlayer, setWaitingForSecondPlayer] = useState(true)

  useEffect(() => {
    const roomId = searchParams.get('id')
    let user = searchParams.get('user')
    user = user === '' ? 'wu-ming' : user
    localStorage.setItem('userName', user)
    socket.emit('join', { userName: user, room: roomId })

    socket.on('roomFullError', (data) => {
      console.log(data)
      setRoomFullError(true)
    })

    setUserName(user)
    socket.on('gameState', (data) => {
      const { board, ships, room, players, winner, playerOneTurn, step } = data
      setBoard(board)
      setShips(ships)
      setRoom(room)
      setGameInfo({ players, winner, playerOneTurn, step })
    })

    socket.on('newGameState', (data) => {
      const { board, ships, room, players, winner, playerOneTurn, step } = data
      setBoard(board)
      setShips(ships)
      setRoom(room)
      setGameInfo({ players, winner, playerOneTurn, step })
    })
  }, [])

  socket.on('secondPlayerConnected', (data) => {
    setWaitingForSecondPlayer(false)
  })

  // useEffect(() => {
  //   console.log('Mirando en la base de datos si hay una partida iniciada...')
  //   if (ships === 'undefined') {
  //     console.log('No la hay. Creando una nueva...')
  //   } else {
  //     console.log('La hay guardando la información de partida en los estados')
  //     // setBoard(JSON.parse(board))
  //     // setShips(JSON.parse(ships))
  //   }
  // }, [])

  useEffect(() => {
    if (ships) {
      checkIfWinner()
    }
  }, [gameInfo])

  if (gameInfo?.winner) {
    console.log(gameInfo.winner)

    return (
      <div className="flex">
        <h1>Ha ganado el jugador {gameInfo.winner}</h1>
      </div>
    )
  }

  if (roomFullError) {
    return (
      <div className="flex flex-row w-screen justify-center">ROOM FULL</div>
    )
  }

  if (waitingForSecondPlayer) {
    return (
      <div className="flex flex-row w-screen justify-center">
        WAITING FOR SECOND PLAYER
      </div>
    )
  }

  return (
    <div className="flex flex-row w-screen">
      <Board socket={socket} />
      <Chat socket={socket} />
    </div>
  )
}

export default Room
