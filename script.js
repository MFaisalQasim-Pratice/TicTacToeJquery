$(document).ready(function () {
  const gameBoard = $('#gameBoard');
  const msjBox = $('#msjBox');
  const boardCells = ['', '', '', '', '', '', '', '', ''];
  let turn = 'circle';
  msjBox.text(`First is circle's turn`);

  function createBoard() {
    boardCells.forEach(function (_, element) {
      boardSquare = $(`<div>`).addClass('board-square').attr('id', element);
      $(gameBoard).append(boardSquare);
      boardSquare.on('click', markedCell);
    });
  }
  createBoard();
  function markedCell() {
    const mark = $('<div>').addClass(turn);
    $(this).append(mark);
    turn =  turn === 'circle' ? 'cross' : 'circle';
    msjBox.text(`Now is ${turn}'s turn`);
  }
});