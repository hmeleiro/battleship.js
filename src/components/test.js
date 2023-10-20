// const generateBoardDivs = (board, ships, gridSize) => {
//   const playerIndex = 0
//   const enemyIndex = 1

//   const enemyShipCells = ships[enemyIndex]
//     .map((ship) => ship.map((cell) => cell))
//     .flat()
//   const playerShipCells = ships[playerIndex]
//     .map((ship) => ship.map((cell) => cell))
//     .flat()
//   const html = []
//   let col = 0
//   let row = 0
//   for (let i = 0; i < gridSize * gridSize; i++) {
//     const boardCell = board[i]
//     let cellColor = ''
//     const enemyCell = enemyShipCells.filter((c) => c.id === boardCell.id)
//     const playerCell = playerShipCells.filter((c) => c.id === boardCell.id)

//     if (enemyCell.length > 0) {
//       if (enemyCell[0].isHit) {
//         cellColor = 'bg-red-700'
//       } else {
//         cellColor = `bg-player1`
//       }
//     } else if (playerCell.length > 0) {
//       if (playerCell[0].isHit) {
//         cellColor = 'bg-red-700'
//       } else {
//         cellColor = `bg-player2`
//       }
//     } else {
//       if (boardCell.isHidden) {
//         cellColor = 'bg-gray-300'
//       } else {
//         cellColor = 'bg-blue-300'
//       }
//     }

//     html.push(
//       <div
//         key={i}
//         className={`flex w-10 h-10 ${cellColor} m-1 items-center justify-center text-white`}
//         data-x={col}
//         data-y={row}
//       >
//         {i}{' '}
//       </div>
//     )
//     if (col < gridSize - 1) {
//       col += 1
//     } else {
//       row += 1
//       col = 0
//     }
//   }
//   return html
// }

function range(start, stop, step) {
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

const randomShip = (remainingCoords, shipLength, dim = 15) => {
  // const x = Math.floor(Math.random() * dim)
  // const y = Math.floor(Math.random() * dim)
  const [x, y] =
    remainingCoords[Math.floor(Math.random() * remainingCoords.length)]
  const isRow = Math.random() < 0.5

  if (isRow) {
    if (x + shipLength > dim) {
      const startIndex = x - shipLength + 1
      const coordsX = range(startIndex, x + 1)
      return coordsX.map((x) => [x, y])
    } else {
      const startIndex = x
      const coordsX = range(startIndex, startIndex + shipLength)
      return coordsX.map((x) => [x, y])
    }
  } else {
    if (y + shipLength > dim) {
      const startIndex = y - shipLength + 1
      const coordsY = range(startIndex, y + 1)
      return coordsY.map((y) => [x, y])
    } else {
      const startIndex = y
      const coordsY = range(startIndex, startIndex + shipLength)
      return coordsY.map((y) => [x, y])
    }
  }
}

const generateShips = (players = [1, 2], shipLengths = [3, 4, 6]) => {
  function generateBoardCoords(m, n) {
    const result = []
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        result.push([i, j])
      }
    }
    return result
  }
  const compareArrays = (a, b) => {
    return a.toString() === b.toString()
  }
  const coordsToIndex = (coords, width = 16) => {
    const [x, y] = coords
    return x + y * width
  }
  let remainingCoords = generateBoardCoords(16, 16)

  return players.map((player) => {
    return shipLengths.map((shipLength) => {
      const shipCoords = randomShip(remainingCoords, shipLength)
      shipCoords.forEach((cellCoords) => {
        remainingCoords = remainingCoords.filter(
          (e) => !compareArrays(e, cellCoords)
        )
      })
      return shipCoords.map((coords) => ({
        id: coordsToIndex(coords),
        coords,
        isHit: false
      }))
    })
  })
}

const ships = generateShips()
console.log(ships[1])
