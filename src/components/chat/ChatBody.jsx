import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../../contexts/GameContext'

const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const navigate = useNavigate()
  const { userName } = useContext(GameContext)

  const handleLeaveChat = () => {
    localStorage.removeItem('userName')
    navigate('/')
    window.location.reload()
  }

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE ROOM
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === userName ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  )
}

export default ChatBody
