import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Room from './components/Room'
import socketIO from 'socket.io-client'
const socket = socketIO.connect('/')

function App() {
  return (
    <BrowserRouter>
      <div className="w- h-screen">
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/room" element={<Room socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
