const gameBoard = document.querySelector("#gameBoard");
const msjBox = document.querySelector("#msjBox");

const boardCells = ["", "", "", "", "", "", "", "", ""];
msjBox.textContent = "First is circle's turn";
let turn = "circle";

function createBoard() {
  boardCells.forEach((_, element) => {
    const boardSquare = document.createElement("div");
    boardSquare.classList.add("board-square");
    boardSquare.id = element;
    boardSquare.addEventListener("click", onBoardClick); // Use addEventListener here
    gameBoard.append(boardSquare);
  });
}

createBoard();

function onBoardClick(e) {
  const mark = document.createElement("div");
  mark.classList.add(turn);
  e.target.append(mark);
  turn = turn === "circle" ? "cross" : "circle";
  msjBox.textContent = `Now is ${turn}'s turn`;
  // Remove the click event listener
  e.target.removeEventListener("click", onBoardClick);
  checkWinner();
}

function checkWinner() {
    const allBoardSquare = document.querySelectorAll(".board-square");

  winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winningCombos.forEach(combo => {
    const circleWins = combo.every(cell => allBoardSquare[cell].firstChild?.classList.contains('circle'))
    if (circleWins) {
        msjBox.textContent = 'Circle Wins!';
        allBoardSquare.forEach(square => square.replaceWith(square.cloneNode(true)))
        return;
    }
    const crossWins = combo.every(cell => allBoardSquare[cell].firstChild?.classList.contains('cross'))
    if (crossWins) {
        msjBox.textContent = 'Cross Wins!';
        allBoardSquare.forEach(square => square.replaceWith(square.cloneNode(true)))
        return;
    }
  });
}