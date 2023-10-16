import React, { useState, useContext } from 'react'
import { GameContext } from '../../contexts/GameContext'

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState('')
  const { room } = useContext(GameContext)

  const handleTyping = () =>
    socket.emit('typing', `${localStorage.getItem('userName')} is typing`)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && localStorage.getItem('userName')) {
      console.log(room)
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        room: room
      })
    }
    setMessage('')
  }
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  )
}

export default ChatFooter
