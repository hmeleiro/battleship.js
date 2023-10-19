import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GameContextProvider } from './contexts/GameContext'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac'
  }
}
const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>  </React.StrictMode>
  <ChakraProvider theme={theme}>
    <GameContextProvider>
      <div className="flex w-screen h-screen items-center justify-center">
        <App />
      </div>
    </GameContextProvider>
  </ChakraProvider>
)
