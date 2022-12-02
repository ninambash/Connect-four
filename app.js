console.log("Hello World");
const squares = document.querySelectorAll(".grid div");
const result = document.querySelector("result");
const displayCurrentPlayer = document.querySelector("current-player");
let currentPlayer = 1;

////add onclick to all our squares using a for loop
for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {
      ///if the square below your current square is taken go ontop of it
      if (squares[i + 7].classList.contains("taken")) {
        if (currentPlayer == 1) {
          squares[i].classList.add("taken");
          squares[i].classList.add("player-one");
          currentPlayer = 2;
          displayCurrentPlayer.innerHTML = currentPlayer;
  
          //logic for player 2
        } else if (currentPlayer == 2) {
          squares[i].classList.add("taken");
          squares[i].classList.add("player-two");
          currentPlayer = 1;
          displayCurrentPlayer.innerHTML = currentPlayer;
        } else alert("cant");
      }
      //check if it works
      ///console.log("you have clicked sqaure" + i)
    };
  }