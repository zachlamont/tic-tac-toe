const gameArea = document.getElementById("game-area");
const info = document.getElementById("info");
const boardText = document.createElement("p");
const boardText2 = document.createElement("p");
info.appendChild(boardText);
info.appendChild(boardText2);

let winnerCells = [];
let winnerCoordinates = [];

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

const boardContainsNull = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === null) {
        return true;
      }
    }
  }
  return false;
};

const playerMove = (event) => {
  event.target.textContent = "X";
  gameState.playerTurn = false;

  let x = event.target.getAttribute("x-data");
  let y = event.target.getAttribute("y-data");

  gameState.board[x][y] = "X";
  boardText.textContent = "gameState.board" + JSON.stringify(gameState.board);

  if (checkWin(gameState.board) === true) {
    gameState.winner = "player";
    highlightWinningCells(winnerCoordinates);
  } else if (boardContainsNull(gameState.board)) {
    computerMove(gameState.board);
  } else {
    boardText.textContent = "It's a draw";
  }
};

const computerMove = (board) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === null) {
        gameState.board[i][j] = "O";
        if (checkWin(gameState.board) === true) {
          var winningCell = document.querySelector(
            `div[x-data="${i}"][y-data="${j}"]`
          );
          winningCell.textContent = "O";
          gameState.winner = "computer";
          highlightWinningCells(winnerCoordinates);
          return; // exit function after making one move
        } else {
          gameState.board[i][j] = null;
        }
      }
    }
  }
  // if no winning move is found, make a random move
  let x, y;
  do {
    x = Math.floor(Math.random() * 3);
    y = Math.floor(Math.random() * 3);
  } while (gameState.board[x][y] !== null);

  gameState.board[x][y] = "O";
  boardText.textContent = "gameState.board" + JSON.stringify(gameState.board);
  let randomCell = document.querySelector(`div[x-data="${x}"][y-data="${y}"]`);
  randomCell.textContent = "O";

  gameState.playerTurn = true;
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
      board[i][0] !== null
    ) {
      winnerCells = [board[i][0], board[i][1], board[i][2]];
      winnerCoordinates = [
        [i, 0],
        [i, 1],
        [i, 2],
      ];

      return true;
    }
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== null
    ) {
      winnerCells = [board[0][i], board[1][i], board[2][i]];
      winnerCoordinates = [
        [0, i],
        [1, i],
        [2, i],
      ];

      return true;
    }
  }
  // check diagonals
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== null
  ) {
    winnerCells = [board[0][0], board[1][1], board[2][2]];
    winnerCoordinates = [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
    return true;
  }
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== null
  ) {
    winnerCells = [board[0][2], board[1][1], board[2][0]];
    winnerCoordinates = [
      [0, 2],
      [1, 1],
      [2, 0],
    ];
    return true;
  }
  return false;
};

const highlightWinningCells = (winnerCoordinates) => {
  winnerCoordinates.forEach((coordinates) => {
    const x = coordinates[0];
    const y = coordinates[1];
    const selectedCell = document.querySelector(
      `[x-data="${x}"][y-data="${y}"]`
    );
    selectedCell.classList.add("green");
    boardText2.textContent =
      "winnerCoordinates" + JSON.stringify(winnerCoordinates);
  });
};

gameArea.appendChild(gameBoard);
