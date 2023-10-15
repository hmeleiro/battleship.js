import React, {useState, useEffect} from 'react'
import './App.css'

function App () {
  const [ships, setShips] = useState()
  const [board, setBoard] = useState()

  useEffect(() => {
    function startGame() {
      const initBoard = generateMap()
      const initShips = [{
        player: 1,
        ships: generateShips()
      },
      {
        player: 2,
        ships: generateShips()
      }]
  
      setShips(initShips)
      setBoard(initBoard)
    }    
    startGame()
  }, [])

  function range(start, stop, step) {
    if (typeof stop === 'undefined') {
      // one param defined
      stop = start;
      start = 0;
    }
  
    if (typeof step === 'undefined') {
      step = 1;
    }
  
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
      return [];
    }
  
    const result = [];
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }
  
    return result;
  };
  
  function randomShip(length) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    const isRow = Math.random() < 0.5; // Randomly choose row or column
    const startIndex = getRandomInt(0, (16*16)-length);
  
    if(isRow) {
      return range(startIndex, startIndex + length)
    } else {
      return range(startIndex, (startIndex + (length*16)), 16)
    }
  
  }
  
  const generateShips = (ships = [5, 3, 3, 2, 2]) => {
    return ships.map((l) => randomShip(l))
  }
  
  const generateMap = () => {
    const board = []
    const l = 256
    for (let i = 0; i < l; i++) {
      board.push({id: i, cellType : 'water'})
    }
    return board
  }
  
  const handleClick = (id) => {
    const isHit = ships[1].ships.flat().includes(id)
    console.log(isHit)
    // if(isHit) {
    //   setShips((prev) => {
    //     const updatedShips = [...prev]

    //     updatedShips[1].shi
    //   })
    // }
  }
  const Map = (props) => {
    const {board, ships} = props
    const shipPlayer1 = ships[0].ships.flat()
    const shipPlayer2 = ships[1].ships.flat()
    return (
      <div className="grid grid-cols-16">
        {
          board.map((e, i) => {
            let cellColor = ''
            if (shipPlayer1.includes(e.id)) {
              cellColor = 'w-10 h-10 bg-orange-200 m-1'
            } else if(shipPlayer2.includes(e.id)) {
              cellColor =  'w-10 h-10 bg-gray-900 m-1'
            } else {
              cellColor = 'w-10 h-10 bg-gray-500 m-1'
            }
  
            const isOwnShip = shipPlayer1.includes(e.id)
  
            return <div key ={i} className= {cellColor} onClick={ isOwnShip ? () => console.log('Own ship') : () => handleClick(i)} ></div>
          })
        }
      </div>
    )
  }

  if(board) {
    return <Map board= {board} ships={ships} />
  } else {
    return <></>
  }

}

export default App
