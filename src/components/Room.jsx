import React from 'react'
import Board from './Board'
import Chat from './chat/Chat'

function Room({ socket }) {
  return (
    <div className="flex flex-row w-screen">
      <Board />
      <Chat socket={socket} />
    </div>
  )
}

export default Room
