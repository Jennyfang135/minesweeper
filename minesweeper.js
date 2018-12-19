document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {};
board.cells=[];
createBoard(4,4);

function createBoard(row, col){
  var i, j = this;
  this.row = row;
  this.col = col;
  this.board={};
  this.board.cells=[];		
  for (i=0; i<this.row; i++){
		for (j=0; j<this.col; j++){
		  let cell={};
	    cell.row=i;
	    cell.col=j;
      cell.isMine=true;
	    cell.isMarked=false;
      cell.hidden=true;
      this.board.cells.push(cell);
		}
  }
  this.randomScatterMine();
  return this;
}

function randomScatterMine(){
  for(let i=0; i<this.board.cells.length; i++){
   	if( ( Math.floor(Math.random()*100) + 1) >20 ){
   	 	this.board.cells[i].isMine = false;
   	}
  }
}


function startGame () {

// Don't remove this function call: it makes the game work!
  for (let i=0; i<board.cells.length; i++){

    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  lib.initBoard(); 
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
   //mySound= sound("applause.mp3");
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
	for (let i=0; i<board.cells.length; i++){
    if (board.cells[i].isMine && !board.cells[i].isMarked) {
    	return;
		}	
    if (!board.cells[i].isMine && board.cells[i].hidden){
    	return;
    }
	}
	//mySound = sound("applause.mp3");
  lib.displayMessage("You win!"); 
  var audio = new Audio("applause.mp3");
  audio.play();
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
	var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
	let count = 0;
	for (let i=0;i<surroundingCells.length; i++){
		if(surroundingCells[i].isMine)
			count+=1;
	}
	return count;
}



