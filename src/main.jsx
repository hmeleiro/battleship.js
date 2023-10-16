import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GameContextProvider } from './contexts/GameContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameContextProvider>
      <div className="flex w-screen h-screen items-center justify-center">
        <App />
      </div>
    </GameContextProvider>
  </React.StrictMode>,
)
