const X = 'x'
const CIRCLE = 'circle'
const COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cells = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningDialog = document.getElementById("winningDialog")
const winningDialogMessage = document.getElementById("message")
const startDialog = document.getElementById("startDialog")
const swapName = document.getElementById("name")
const invalidInputMessage= document.getElementById("invalidInputMessage")
let circle
let player1Name
let player2Name


window.onload = () => {
  startDialog.style.display = "block";
}

function startGame() {
  if (validateInput()) {
    cells.forEach(cell => {
      cell.classList.remove(X)
      cell.classList.remove(CIRCLE)
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
    })
    startDialog.style.display = "none"
    setPlayersNames()
    setPlayersTurn()
  } else {
    showInvalidInputMessage()
  }
}

function reStartGame() {
  location.reload()
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circle ? CIRCLE : X
  addMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGameDialog(false)
  } else if (isDraw()) {
    endGameDialog(true)
  } else {
    swapPlayers()
    setPlayersTurn()
  }
}

function endGameDialog(draw) {
  winningDialog.style.display = "block";
  if (draw) {
    winningDialogMessage.innerText = 'Velha!'
  } else {
    winningDialogMessage.innerText = `${circle ? player1Name : player2Name} venceu essa partida!`
  }
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains(X) || cell.classList.contains(CIRCLE)
  })
}

function addMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapPlayers() {
  circle = !circle
}

function checkWin(currentClass) {
  return COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass)
    })
  })
}

function setPlayersTurn() {
  if (circle) {
    swapName.innerText = player1Name
  } else {
    swapName.innerText = player2Name
  }
}

function setPlayersNames() {
  player1Name = document.getElementById("playerX").value
  player2Name = document.getElementById("playerO").value
}

function validateInput() {
  player1Name = document.getElementById("playerX").value
  player2Name = document.getElementById("playerO").value

  if (player1Name != '' && player2Name != '') {
    return true;
  } else {
    return false;
  }
}

function showInvalidInputMessage(){
  invalidInputMessage.innerText="Preencha os nomes dos jogadores"
}
