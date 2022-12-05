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


//create a function for starting the game 
function newGame(button) {
  button.style.display = "none";
  const game = document.getElementById("gameContainer")
   //columns
   const columns = [];
   //create an empty array that stores columns and rows
   const slotsArray = [];
   //determine the next color
   let nextColor = "red";
   //create loop for creating colums
   for (let i = 0; i < 7; i++) {
     const column = document.createElement("div");
     column.className = "column";
     game.appendChild(column);
     columns.push(column);
   }
   ////create a class for slots
   class Slot {
    constructor(element, column, row) {
      this.column = column;
      this.row = row;
      this.element = element;
      this.state = "";
    }
////////////create a function for element clickable
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

}


}