import React from 'react'

function Map(props) {
  const { board, ships } = props

  return <div className="grid grid-cols-16">{generateBoardDivs(16)}</div>
}

export default Map
