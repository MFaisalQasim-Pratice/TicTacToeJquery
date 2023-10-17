$(document).ready(function() {
  const gameBoard = $('#gameBoard');
  const msjBox = $('#msjBox');

  const boardCells = ["", "", "", "", "", "", "", "", ""];
  msjBox.text("First is circle's turn");
  let turn = "circle";

  function createBoard() {
    boardCells.forEach(function(_, element) {
      const boardSquare = $('<div>').addClass('board-square').attr('id', element);
      boardSquare.on('click', onBoardClick);
      gameBoard.append(boardSquare);
    });
  }
  createBoard();

  function onBoardClick() {
    const mark = $('<div>').addClass(turn);
    $(this).append(mark);
    $(this).off('click', onBoardClick);
    turn = turn === "circle" ? "cross" : "circle";
    msjBox.text(`Now is ${turn}'s turn`);
    checkWinner();
  }

  function checkWinner() {
    const allBoardSquare = $('.board-square');

    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombos.forEach(function(combo) {
      const circleWins = combo.every(function(cell) {
        return allBoardSquare.eq(cell).children().first().hasClass('circle');
      });

      if (circleWins) {
        msjBox.text('Circle Wins!');
        allBoardSquare.replaceWith(allBoardSquare.clone());
        return;
      }

      const crossWins = combo.every(function(cell) {
        return allBoardSquare.eq(cell).children().first().hasClass('cross');
      });

      if (crossWins) {
        msjBox.text('Cross Wins!');
        allBoardSquare.replaceWith(allBoardSquare.clone());
        return;
      }
    });
  }
});