let gameInfo = document.querySelector(".info");
let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Initial display of game
function initGame() {
  currentPlayer = "X";
  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((element, index) => {
    element.innerHTML = "";
    boxes[index].style.pointerEvents = "all";
    element.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
}

initGame();

//Event handle
function swapTurn() {
  if (currentPlayer === "X") currentPlayer = "O";
  else currentPlayer = "X";
  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}
function checkGameOver() {
  let answer = "";
  winningPositions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //store answer
      answer = gameGrid[position[0]];

      //disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //now we know X/O is a winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  if (answer !== "") {
    gameInfo.innerHTML = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }
  let count = 0;
  gameGrid.forEach((element) => {
    if (element !== "") count++;
  });
  if (count === 9) {
    gameInfo.innerHTML = "Game Tied";
    newGameBtn.classList.add("active");
  }
}
function eventHandle(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
  }
}
boxes.forEach((element, index) => {
  element.addEventListener("click", () => {
    eventHandle(index);
  });
});
newGameBtn.addEventListener("click", initGame);
