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

// const randomShip = (boardCells, shipLength) => {
//   //   function getRandomInt(min, max) {
//   //     return Math.floor(Math.random() * (max - min + 1)) + min
//   //   }

//   const isRow = Math.random() < 0.5 // Randomly choose row or column
//   //   const startIndex = getRandomInt(0, 16 * 16 - length)
//   const startIndex = Math.floor(Math.random() * boardCells.length)

//   if (isRow) {
//     boardCells.splice(startIndex, shipLength)
//     return range(startIndex, startIndex + shipLength)
//   } else {
//     const ship = range(startIndex, startIndex + shipLength * 16, 16)
//     boardCells = boardCells.filter((cell, i) => !ship.includes(i))
//     return ship
//   }
// }

// const generateShips = (boardCells, ships = [3, 4, 6]) => {
//   return ships.map((ship) => {
//     const shipCells = randomShip(boardCells, ship)
//     return shipCells.map((id) => ({ id, isHit: false }))
//   })
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
  const checkIfShipAvailable = (shipCoords) => {
    let isShipAvailable = shipCoords.map((cellCoords) => {
      const i = remainingCoords.filter((e) => compareArrays(e, cellCoords))
      if (i.length > 0) {
        return i[0]
      } else {
        return null
      }
    })
    isShipAvailable =
      isShipAvailable.filter((e) => e !== null).length === shipLength
    return isShipAvailable
  }

  let isShipAvailable = false
  let shipCoords
  let nTry = 1
  while (!isShipAvailable) {
    console.log(nTry, isShipAvailable)
    const [x, y] =
      remainingCoords[Math.floor(Math.random() * remainingCoords.length)]
    const isRow = Math.random() < 0.5

    if (isRow) {
      if (x + shipLength > dim) {
        const startIndex = x - shipLength + 1
        const coordsX = range(startIndex, x + 1)
        shipCoords = coordsX.map((x) => [x, y])
      } else {
        const startIndex = x
        const coordsX = range(startIndex, startIndex + shipLength)
        shipCoords = coordsX.map((x) => [x, y])
      }
    } else {
      if (y + shipLength > dim) {
        const startIndex = y - shipLength + 1
        const coordsY = range(startIndex, y + 1)
        shipCoords = coordsY.map((y) => [x, y])
      } else {
        const startIndex = y
        const coordsY = range(startIndex, startIndex + shipLength)
        shipCoords = coordsY.map((y) => [x, y])
      }
    }
    isShipAvailable = checkIfShipAvailable(shipCoords)
    nTry += 1
  }

  return shipCoords
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

const compareArrays = (a, b) => {
  return a.toString() === b.toString()
}
function generateBoardCoords(m, n) {
  const result = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      result.push([i, j])
    }
  }
  return result
}

// const ships = generateShips()
// console.log(ships[1])

const shipLength = 6
let remainingCoords = generateBoardCoords(16, 16)
const shipCoords1 = randomShip(remainingCoords, shipLength)

shipCoords1.forEach((cellCoords) => {
  remainingCoords = remainingCoords.filter((e) => !compareArrays(e, cellCoords))
})

const shipCoords2 = randomShip(remainingCoords, shipLength)

console.log(shipCoords1)
console.log(shipCoords2)
console.log(checkSubArrays(shipCoords1, shipCoords2))

function checkSubArrays(arrayA, arrayB) {
  return arrayA.some((subArrayA) => {
    return arrayB.some(
      (subArrayB) =>
        subArrayA[0] === subArrayB[0] && subArrayA[1] === subArrayB[1]
    )
  })
}
