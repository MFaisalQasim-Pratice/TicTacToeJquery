$(document).ready(function () {
  const gameBoard = $("#gameBoard");
  const msjBox = $("#msjBox");
  const boardCells = ["", "", "", "", "", "", "", "", ""];
  let turn = "circle";
  let allSquareFilled = false;

  msjBox.text(`First is circle's turn`);
  markedCells = 0;

  function createBoard() {
    boardCells.forEach(function (_, element) {
      boardSquare = $(`<div>`).addClass("board-square").attr("id", element);
      $(gameBoard).append(boardSquare);
      boardSquare.on("click", markedCell);
    });
  }
  createBoard();
  function markedCell() {
    const mark = $("<div>").addClass(turn);
    $(this).append(mark);
    $(this).off("click", markedCell);
    turn = turn === "circle" ? "cross" : "circle";
    msjBox.text(`Now is ${turn}'s turn`);
    checkWinner();
  }

  function checkWinner() {
    const allBoardSquare = $(".board-square");
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

    markedCells++;
    if (markedCells == 7) {
      return allSquareFilled = true;
    }
    winningCombos.forEach(function (combo) {
      const circleWins = combo.every(function (cell) {
        return allBoardSquare.eq(cell).children().first().hasClass("circle");
      });

      if (circleWins) {
        msjBox.text("Circle Wins!");
        $(allBoardSquare).off("click", markedCell);
        return;
      }
    });
    winningCombos.forEach(function (combo) {
      const crossWins = combo.every(function (cell) {
        return allBoardSquare.eq(cell).children().first().hasClass("cross");
      });
      if (crossWins) {
        msjBox.text("Cross Wins!");
        $(allBoardSquare).off("click", markedCell);
        return;
      }
    });
    if (allSquareFilled) {
        msjBox.text("It's Draw")
        $(allBoardSquare).off("click", markedCell);
    }
  }
});
