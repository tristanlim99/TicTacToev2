//board state
let boardData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
//Define game variables
let player = 1;
let gameOver = false;
let cellElements = document.querySelectorAll(".cell");
let resultElement = document.getElementById("result");
let restartButton = document.getElementById("restart");
let boxes = Array.from(document.querySelectorAll(".cell"));
let boxesId = Array(9).fill(null);
let moves = document.getElementById("moves");
let flatHistory = [].concat(...boardData);
let newList = document.createElement("li");

//Add event from cellElements
cellElements.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    placeMarker(index);
  });
});

//create function for placing markers
function placeMarker(index) {
  //determin row and column form index
  let col = index % 3;
  let row = (index - col) / 3;

  //check if the current cell is empty
  if (boardData[row][col] == 0 && gameOver == false) {
    boardData[row][col] = player;
    //change player
    player *= -1;
    //update the screen with markers
    drawMarkers();
    //check if anyone has won
    checkresult();
  }
}

//create function for drawing players markers
function drawMarkers() {
  //Iterate over rows
  for (let row = 0; row < 3; row++) {
    //Iterate over columns
    for (let col = 0; col < 3; col++) {
      //check if it is player 1's
      if (boardData[row][col] == 1) {
        //update cell class to add a 'X'
        cellElements[row * 3 + col].innerText = "X";
      } else if (boardData[row][col] == -1) {
        // update cell to add 'X'
        cellElements[row * 3 + col].innerText = "O";
      }
    }
  }
}

//create function for checking the result of the game
function checkresult() {
  //check rows and columns
  for (let i = 0; i < 3; i++) {
    let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
    let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
    if (rowSum == 3 || colSum == 3) {
      //player 1 wins
      endGame(1);
      return;
    } else if (rowSum == -3 || colSum == -3) {
      //player 2 wins
      endGame(2);
      return;
    }
  }

  //Check diagonals
  let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];

  let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
  if (diagonalSum1 == 3 || diagonalSum2 == 3) {
    //player 1 wins
    endGame(1);
    return;
  } else if (diagonalSum1 == -3 || diagonalSum2 == -3) {
    //player 2 wins
    endGame(2);
    return;
  }

  //Check for a tie
  if (
    boardData[0].indexOf(0) == -1 &&
    boardData[1].indexOf(0) == -1 &&
    boardData[2].indexOf(0) == -1
  ) {
    endGame(0);
    return;
  }
}

//function to end the game and display the result
function endGame(winner) {
  //Trigger Game Over
  gameOver = true;

  //Check if game ended in a tie
  if (winner == 0) {
    resultElement.innerText = "It's a tie!";
  } else {
    resultElement.innerText = `Player ${winner} has Won`;
  }
}

//restart game
//add event listener
restartButton.addEventListener("click", () => {
  //Reset game variables
  boardData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  player = 1;
  gameOver = false;
  //Reset game board
  cellElements.forEach((cell) => {
    cell.innerText = "";
  });
  //Reset Result
  resultElement.innerText = "";
});
