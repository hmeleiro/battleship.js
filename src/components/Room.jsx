import React, { useContext, useEffect } from 'react'
import Board from './Board'
import Chat from './chat/Chat'
import { GameContext } from '../contexts/GameContext'
import { useSearchParams } from 'react-router-dom'

function Room({ socket }) {
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
  const { userName, setUserName, room, setRoom } = useContext(GameContext)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const roomId = searchParams.get('id')
    const name =
      searchParams.get('userName') === ''
        ? 'wu-ming'
        : searchParams.get('userName')
    setUserName(name)
    setRoom(roomId)
    console.log(name)
    localStorage.setItem('userName', name)
    localStorage.setItem('room', roomId)

    socket.emit('join', { userName: name, room: roomId })
    socket.emit('newUser', {
      userName: name,
      socketID: socket.id,
      room: roomId
    })
  }, [])

  useEffect(() => {
    const gameState = {
      ships,
      board,
      winner,
      playerOneTurn
    }

    socket.emit('newUser', {
      socketID: socket.id,
      room: room,
      gameState
    })
  }, [ships, board, winner, playerOneTurn])

  return (
    <div className="flex flex-row w-screen">
      <Board />
      <Chat socket={socket} />
    </div>
  )
}

export default Room
