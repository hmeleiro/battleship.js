const cells = Array.from(Array(255).keys())
const gen = (shipLength) => {
  const i = Math.floor(Math.random() * cells.length)
  const num = cells.splice(i, shipLength)
  return num
}
