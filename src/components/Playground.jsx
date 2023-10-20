import React from 'react'
// import Map from './Map2'

const range = (start, stop, step) => {
  if (typeof stop === 'undefined') {
    // one param defined
    stop = start
    start = 0
  }

  if (typeof step === 'undefined') {
    step = 1
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return []
  }

  const result = []
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i)
  }

  return result
}

const randomShip = (boardCells, shipLength) => {
  //   function getRandomInt(min, max) {
  //     return Math.floor(Math.random() * (max - min + 1)) + min
  //   }

  const isRow = Math.random() < 0.5 // Randomly choose row or column
  //   const startIndex = getRandomInt(0, 16 * 16 - length)
  const startIndex = Math.floor(Math.random() * boardCells.length)

  if (isRow) {
    boardCells.splice(startIndex, shipLength)
    return range(startIndex, startIndex + shipLength)
  } else {
    const ship = range(startIndex, startIndex + shipLength * 16, 16)
    boardCells = boardCells.filter((cell, i) => !ship.includes(i))
    return ship
  }
}

const generateShips = (boardCells, ships = [3, 4, 6]) => {
  return ships.map((ship) => {
    const shipCells = randomShip(boardCells, ship)
    return shipCells.map((id) => ({ id, isHit: false }))
  })
}

const generateBoardCells = () => {
  const board = []
  const l = 256
  for (let i = 0; i < l; i++) {
    board.push({ id: i, cellType: 'water', isHidden: true })
  }
  return board
}

function startGame() {
  //   var boardCells = Array.from(Array(255).keys())
  const board = generateBoardCells()
  const boardCells = board.map((e) => e.id)
  const ships1 = generateShips(boardCells)
  const ships2 = generateShips(boardCells)
  const ships = [ships1, ships2]
  return { board, ships }
}

function Playground({ socket }) {
  const { board, ships } = startGame()
  const map = generateBoardDivs(board, ships, 16)
  //   console.log(map)
  return (
    <div className="flex flex-row w-screen">
      <div className="grid grid-cols-16">{map}</div>
    </div>
  )
}

export default Playground
