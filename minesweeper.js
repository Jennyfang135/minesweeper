document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
 var board = {};
 board.cells=[];
 createBoard(3,3);
 resetButton();

function createBoard(row, col){
		
	for (let i=0; i<row; i++){
		for (let j=0; j<col; j++){
			let cell={};
			cell.row=i;
			cell.col=j;
			cell.isMine=true;
			cell.isMarked=false;
			cell.hidden=true;
			board.cells.push(cell);
		}
	}
	randomScatterMine();
}

function randomScatterMine(){
   	 for(let i=0; i<board.cells.length; i++){
   	 	if( ( Math.floor(Math.random()*100) + 1) >20 ){
   	 		board.cells[i].isMine = false;
   	 	}
   	 }
}


function startGame () {
  // Don't remove this function call: it makes the game work!
  for (let i=0; i<board.cells.length; i++){

  	 board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  lib.initBoard()
  
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

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
  	lib.displayMessage("You win!"); 	

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

// add reset button for doing it again- I added the whole function
function resetButton(){
  var button=document.createElement("button");
  button.innerHTML ="Reset";
  
}

