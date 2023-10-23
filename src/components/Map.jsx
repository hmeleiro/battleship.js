import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'

function Map(props) {
  const { board, ships, socket } = props
  const { generateBoardDivs } = useContext(GameContext)

  const divs = generateBoardDivs(board, ships, socket)

  return <div className="grid grid-cols-16">{divs}</div>
}

export default Map
