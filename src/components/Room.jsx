import React, { useContext, useEffect, useState } from 'react'
import Board from './Board'
import Chat from './chat/Chat'
import { GameContext } from '../contexts/GameContext'
import { useSearchParams } from 'react-router-dom'

function Room({ socket }) {
  const {
    userName,
    setUserName,
    room,
    setRoom,
    setShips,
    setBoard,
    setGameInfo
  } = useContext(GameContext)
  const [searchParams, setSearchParams] = useSearchParams()
  const [roomFullError, setRoomFullError] = useState(false)

  useEffect(() => {
    const roomId = searchParams.get('id')
    var user = searchParams.get('user')
    user = user === '' ? 'wu-ming' : user
    localStorage.setItem('userName', user)
    socket.emit('join', { userName: user, room: roomId })

    socket.on('roomFullError', (data) => {
      console.log(data)
      setRoomFullError(true)
    })
    socket.on('gameResponse', (data) => {
      console.log(data)
      const { board, ships, room, players, winner, playerOneTurn } = data
      setBoard(board)
      setShips(ships)
      setRoom(room)
      setGameInfo({ players, winner, playerOneTurn })
    })
    setUserName(user)

    socket.emit('newUser', { userName, socketID: socket.id, room })
  }, [])

  // useEffect(() => {
  //   const gameState = {
  //     ships,
  //     board,
  //     winner,
  //     playerOneTurn
  //   }

  //   socket.emit('newUser', {
  //     socketID: socket.id,
  //     room: room,
  //     gameState
  //   })
  // }, [ships, board, winner, playerOneTurn])

  if (roomFullError) {
    return (
      <div className="flex flex-row w-screen justify-center">ROOM FULL</div>
    )
  }

  return (
    <div className="flex flex-row w-screen">
      <Board />
      <Chat socket={socket} />
    </div>
  )
}

export default Room
