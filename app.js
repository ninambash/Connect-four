////check if everything is connected
console.log("Hello Connect Four")
///create a function for starting the game 
////create a class for slots
///add and append class
///have 2 elements red and yellow
//create an empty array that stores columns and rows
///determine the next color
///make elements clickable and not clickable if already filled
///have a check win function 
///have d draw function
///game over function
///check if game is over


function newGame(button) {
  button.style.display = "none";
  const game = document.getElementById("gameContainer");
  //columns
  const columns = [];
  //array that stores columns/rows
  const slotsArray = [];
  //determine the next color
  let nextColor = "red";
  //create columns
  for (let i = 0; i < 7; i++) {
    const column = document.createElement("div");
    column.className = "column";
    game.appendChild(column);
    columns.push(column);
  }
  class Slot {
    constructor(element, column, row) {
      this.column = column;
      this.row = row;
      this.element = element;
      this.state = "";
    }
    clicked() {
      const el = this.element;
      if (!el.classList.contains("clickable")) return;
      el.style.backgroundColor = nextColor;
      this.state = nextColor;
      //make this element not clickable
      el.classList.remove("clickable");
      //make next element clickable
      if (slotsArray[this.column][this.row - 1]) {
        slotsArray[this.column][this.row - 1].element.classList.add(
          "clickable",
          nextColor
        );
      }
      //check for game over
      if (isDraw(slotsArray) == true) gameOver(nextColor);

      if (isWinner(this.column, this.row, nextColor, slotsArray) == true)
        gameOver(nextColor);

      //change next color
      let oldColor = nextColor;
      nextColor == "red" ? (nextColor = "yellow") : (nextColor = "red");
      document.querySelectorAll(".clickable").forEach((el) => {
        el.classList.remove(oldColor);
        el.classList.add(nextColor);
      });
    }
  }
  //create slots and push to columns
  columns.forEach((el, col) => {
    let slotColumn = [];
    for (i = 0; i < 6; i++) {
      const div = document.createElement("div");
      div.classList.add("slot");
      el.appendChild(div);
      const slot = new Slot(div, col, i);
      slotColumn.push(slot);
      div.onclick = function () {
        slot.clicked();
      };
      div.style.top = i * 70 + 2 + "px";
    }
    slotsArray.push(slotColumn);
  });
  slotsArray.forEach((col) => {
    col[5].element.classList.add("clickable", nextColor);
  });
  console.log(slotsArray);
}
//check if game is draw
function isDraw(slotsArray) {
  let isDraw = true;
  slotsArray.forEach((col) => {
    col.forEach((slot) => {
      if (slot.state == "") isDraw = false;
    });
  });
  return isDraw;
}
//test the lines to see if someone has won
function testLines(lines, color, slotsArray) {
  let connectedSlots = 1; //slots touching, if 4 you win
  lines.forEach((line) => {
    for (i = 0; i < line.length; i++) {
      const slotLocation = line[i];
      column = slotLocation[0];
      row = slotLocation[1];
      //don't allow for searching off screen
      if (column >= 0 && column <= 6 && row >= 0 && row <= 5) {
        //make sure it is defined
        if (typeof slotsArray[column][row] !== "undefined") {
          if (slotsArray[column][row].state == color) {
            connectedSlots += 1;
            console.log(connectedSlots);
          } else break;
        }
      } else break;
    }
  });
  if (connectedSlots >= 4) return true;
  return false;
}
//check if there is a winner
function isWinner(col, row, color, slotsArray) {
  const winningLines = {
    horizontal: [
      [
        [col - 1, row],
        [col - 2, row],
        [col - 3, row],
      ],
      [
        [col + 1, row],
        [col + 2, row],
        [col + 3, row],
      ],
    ],
    vertical: [
      [
        [col, row - 1],
        [col, row - 2],
        [col, row - 3],
      ],
      [
        [col, row + 1],
        [col, row + 2],
        [col, row + 3],
      ],
    ],
    diagonalLeft: [
      [
        [col - 1, row - 1],
        [col - 2, row - 2],
        [col - 3, row - 3],
      ],
      [
        [col + 1, row + 1],
        [col + 2, row + 2],
        [col + 3, row + 3],
      ],
    ],
    diagonalRight: [
      [
        [col - 1, row + 1],
        [col - 2, row + 2],
        [col - 3, row + 3],
      ],
      [
        [col + 1, row - 1],
        [col + 2, row - 2],
        [col + 3, row - 3],
      ],
    ],
  };
  if (testLines(winningLines.horizontal, color, slotsArray) == true)
    return true;

  if (testLines(winningLines.vertical, color, slotsArray) == true) return true;
  if (testLines(winningLines.diagonalLeft, color, slotsArray) == true)
    return true;

  if (testLines(winningLines.diagonalRight, color, slotsArray) == true)
    return true;

  return false;
}
//check if game is over
function gameOver(winner) {
  console.log("game over");
  setScore(winner);
  //delete game
  document.querySelectorAll(".column").forEach((column) => {
    column.innerHTML = "";
    column.parentNode.removeChild(column);
    document.getElementById("playButton").style.display = "inherit";
  });
}
//set score on the scoreboard
function setScore(winner) {
  if (winner == "undefined") return;

  document.getElementById(winner + "Score").innerHTML =
    parseInt(document.getElementById(winner + "Score").innerHTML) + 1;
}