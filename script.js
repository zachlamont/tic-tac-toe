const gameArea = document.getElementById("game-area");
const info = document.getElementById("info");
const boardText = document.createElement("p");
info.appendChild(boardText);

let winnerCells = [];

const gameBoard = document.createElement("div");
gameBoard.id = "board-container";

const gameState = {
  playerTurn: true,
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  winner: null,
  isOver: false,
};

const playerMove = (event) => {
  event.target.textContent = "X";
  gameState.playerTurn = false;

  let x = event.target.getAttribute("x-data");
  let y = event.target.getAttribute("y-data");

  gameState.board[x][y] = "X";
  boardText.textContent = JSON.stringify(gameState.board);
  if (checkWin(gameState.board) === true) {
    gameState.winner = "player";
    highlightWinningCells(winnerCells);
  }
};
const computerMove = (event) => {
  event.target.textContent = "O";
  gameState.playerTurn = true;

  let x = event.target.getAttribute("x-data");
  let y = event.target.getAttribute("y-data");

  gameState.board[x][y] = "O";
  boardText.textContent = JSON.stringify(gameState.board);
};

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let cell = document.createElement("div");
    cell.setAttribute("x-data", i);
    cell.setAttribute("y-data", j);
    cell.classList.add("board-square");
    gameBoard.appendChild(cell);
  }
}
gameBoard.addEventListener("click", function (event) {
  //handle the click event

  if (gameState.playerTurn === true) {
    playerMove(event);
  } else {
    computerMove(event);
  }
});

const checkWin = (board) => {
  // check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] != null
    ) {
      winnerCells = [board[i][0], board[i][1], board[i][2]];
      return true;
    }
  }
  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] != null
    ) {
      winnerCells = [board[0][i], board[1][i], board[2][i]];
      return true;
    }
  }
  // check diagonals
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] != null
  ) {
    winnerCells = [board[0][0], board[1][1], board[2][2]];
    return true;
  }
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] != null
  ) {
    winnerCells = [board[0][2], board[1][1], board[0][2]];
    return true;
  }
  return false;
};

const highlightWinningCells = (winnerCells) => {
  const cells = document.querySelectorAll(".board-square");
  cells.forEach((cell) => {
    if (winnerCells.includes(cell.textContent)) {
      cell.classList.add("green");
    }
  });
};

gameArea.appendChild(gameBoard);
