import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameContext } from '../contexts/GameContext'

function Home({ socket }) {
  const { userName, setUserName, room, setRoom } = useContext(GameContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('userName', userName)
    setUserName(userName)
    setRoom(room)
    socket.emit('join', { userName, room })
    socket.emit('newUser', { userName, socketID: socket.id, room })
    socket.on('user-connected', (data) => {
      console.log(data)
    })
    navigate('/room')
  }

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={4}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <label htmlFor="room">Room</label>
      <input
        type="text"
        minLength={5}
        name="room"
        id="room"
        className="room__input"
        value={room}
        required
        onChange={(e) => setRoom(e.target.value)}
      />
      <button className="home__cta">Enter room</button>
    </form>
  )
}

export default Home
