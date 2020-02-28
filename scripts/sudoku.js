window.onload = function() {
   // dynamically create new DOM nodes
   var y;
   var x;
   for (y = 0; y < 9; y++) {
      for (x=0; x < 9; x++) {
         let num = boardData[this.boardPosition(x, y)];
         if (num == -1) {
            num = "";
         }
         // let content = document.createTextNode(num);

         // note: work from the inside out to dynamically generate things. So input is inside the <td>...
         // ...and <td> is inside the <tr> (the row id), so start with generating the input the pass value up.
         let input = document.createElement('input');
         input.setAttribute('type', 'text');
         input.setAttribute('value', num);
         // input.setAttribute('id', 'cell-' + this.boardPosition(x, y));
         if(boardData[this.boardPosition(x, y)] != -1) {
           input.setAttribute('disabled', "");
         }
         // input.appendChild(content);

         let newTd = document.createElement('td');
         newTd.appendChild(input);
      
         // insert the new element into the DOM
         let insertToDom = document.getElementById('row-' + y);
         insertToDom.appendChild(newTd);
      } 
   }

   // innerText for most browsers, textContent for Firefox (seems like either one works for all browers now!)
   let button1 = document.getElementById('p1');
   button1.onclick = function() {
      paletteValue = button1.innerText || button1.textContent;
      // alert(paletteValue);
   };

   let button2 = document.getElementById('p2');
   button2.onclick = function() {
      paletteValue = button2.innerText || button2.textContent;
   };

   let button3 = document.getElementById('p3');
   button3.onclick = function() {
      paletteValue = button3.innerText || button3.textContent;
   };

   let button4 = document.getElementById('p4');
   button4.onclick = function() {
      paletteValue = button4.innerText || button4.textContent;
   };

   let button5 = document.getElementById('p5');
   button5.onclick = function() {
      paletteValue = button5.innerText || button5.textContent;
   };

   let button6 = document.getElementById('p6');
   button6.onclick = function() {
      paletteValue = button6.innerText || button6.textContent;
   };

   let button7 = document.getElementById('p7');
   button7.onclick = function() {
      paletteValue = button7.innerText || button7.textContent;
   };

   let button8 = document.getElementById('p8');
   button8.onclick = function() {
      paletteValue = button8.innerText || button8.textContent;
   };

   let button9 = document.getElementById('p9');
   button9.onclick = function() {
      paletteValue = button9.innerText || button9.textContent;
   };

   // Input the palette value selected into the game board cell thats clicked
   var tData = document.getElementsByTagName("td");
   for (var i=0; i<tData.length; i++) {
      tData[i].onclick = tDataClickHandler;  
   }

   // UNDO THE STEPS
   let buttonUndo = document.getElementById('undo');
   buttonUndo.onclick = function() {
      var hist = cellHistory.pop();

      tData[hist].firstChild.setAttribute('value', "");
      undoHash[hist].pop();

      if (undoHash[hist].length > 0) {
         // Good working version
         tData[hist].firstChild.setAttribute('value', undoHash[hist][undoHash[hist].length-1]);
      }

      // clear all error cell indicators
      for(var i = 0; i < 81; i++) {
         if(tData[i].firstChild.className == 'error') {
            tData[i].firstChild.className = '';
         }
      }

      // note: else { take the value thats just deleted, and check for its error cells, then erase all of those error cells }
      // storeInfo = false;
      // paletteValue = valueHistory[valueHistory.length-1];
      // tData[cellHistory[cellHistory.length-1]] = tDataClickHandler;
      // storeInfo = true;

      // storeInfo = false;
      // paletteValue = undoHash[hist][undoHash[hist].length-1];
      // tData[hist] = tDataClickHandler;
      // storeInfo = true;
      
      // click undo to clear all the error classes on the board, then use the tDataClickHandler funciton on the specified tData index.
      // palette value will be equal to the value on stack, then just use the tDataClickHandler function
   };
   

   // for dubugging
   // alert(document.getElementById("board").rows[0].cells[1].innerHTML);
   // alert(tData[1].firstChild.value); // Works, shows the value of 1

   // setInterval(function() {  // note: use this to execute a piece of code every specified miliseconds interval
   //    // alert("hi");
   // }, 1000)
}



// Initialize all 0-80 hash keys and empty arrays?
var undoHash = {};
for (var i = 0; i < 81; i++) {
   undoHash[i] = [];
}
// undoHash[2].push(2);
// undoHash[2].push(3);
// undoHash[2].push(5);

var storeInfo = true;
var paletteValue;
var cellHistory = [];
var valueHistory = [];

// Input the palette value selected into the game board cell thats clicked
function tDataClickHandler(e){
   e = e||window.event;
   var tdElm = e.target||e.srcElement;
   if(tdElm.disabled == false && paletteValue != null) {
      tdElm.setAttribute('value', paletteValue);
      if (storeInfo) {
         cellHistory.push(boardPosition(this.cellIndex, this.parentElement.rowIndex));
         undoHash[boardPosition(this.cellIndex, this.parentElement.rowIndex)].push(paletteValue);
      }

      // // ERROR CELLS
      // for (y = 0; y < 9; y++) {     
      //    if (boardPosition(this.cellIndex, y) == paletteValue) {
            
      //       tdElm.className = 'error';
      //       // var tData = document.getElementsByTagName("td");
      //       // tData[boardPosition(this.cellIndex, y)].firstChild.setAttribute('class', 'error');
      //    }
      // }

      var count = 0;
      var initialFindRow = 0;
      var initialFindCol = 0;

      // Check row error
      for (var y = 0; y < 9; y++) { 
            var tDataTemp = document.getElementsByTagName("td");

            // if (overlaps(tDataTemp[boardPosition(y, this.parentElement.rowIndex)].firstChild.value, tDataTemp[boardPosition(this.cellIndex, y)].firstChild.value, tdElm.value, tdElm.value)) {
            // if ((sameColumn(tDataTemp[boardPosition(y, this.parentElement.rowIndex)].firstChild.value, 1, tdElm.value, 1) == true)) {
               
            if ((sameRow(1, tDataTemp[boardPosition(this.cellIndex, y)].firstChild.value, 1, tdElm.value) == true)) {
               if (count < 1) {
                  initialFindRow = boardPosition(this.cellIndex, y);
               }
               count = count + 1;
               if(count > 1) {
                  tDataTemp[initialFindRow].firstChild.setAttribute('class', 'error');
                  tDataTemp[boardPosition(this.cellIndex, y)].firstChild.setAttribute('class', 'error');
               }
            }

      }

      count = 0;

      // Check column error
      for (var y = 0; y < 9; y++) {   
            var tDataTemp = document.getElementsByTagName("td");
            if ((sameColumn(tDataTemp[boardPosition(y, this.parentElement.rowIndex)].firstChild.value, 1, tdElm.value, 1) == true)) {
               if (count < 1) {
                  initialFindCol = boardPosition(y, this.parentElement.rowIndex);
               }
               count = count + 1;
               if(count > 1) {
                  tDataTemp[initialFindCol].firstChild.setAttribute('class', 'error');
                  tDataTemp[boardPosition(y, this.parentElement.rowIndex)].firstChild.setAttribute('class', 'error');
               }
            }
      }

      count = 0;
      initialFindRow = 0;
      initialFindCol = 0;
      
      
      // Check same block error
      // for (var y = 0; y < 9; y++) {
      //    alert(tdElm.value);   
      //    alert("y is: " + y);
      //    alert("Column Cell: " + (Math.floor((tDataTemp[boardPosition(y, this.parentElement.rowIndex)].firstChild.value) / 3) * 3));
      //    alert("Row Cell: " + (Math.floor((tDataTemp[boardPosition(this.cellIndex, y)].firstChild.value) / 3) * 3));
      //    var tDataTemp = document.getElementsByTagName("td");
      //    // if ((sameBlock(tDataTemp[boardPosition(y, this.parentElement.rowIndex)].firstChild.value, tDataTemp[boardPosition(this.cellIndex, y)].firstChild.value, tdElm.value, tdElm.value) == true)) {
      //    if (sameBlock(tDataTemp[boardPosition(y, this.parentElement.rowIndex)].firstChild.value, tDataTemp[boardPosition(this.cellIndex, y)].firstChild.value, tdElm.value, tdElm.value)) { 
      //       // if (count < 1) {
      //       //    initialFindCol = boardPosition(y, this.parentElement.rowIndex);
      //       //    initialFindRow = boardPosition(this.cellIndex, y);
      //       // }
      //       // count = count + 1;
      //       // if(count > 1) {
      //       //    tDataTemp[initialFindCol].firstChild.setAttribute('class', 'error');
      //       //    tDataTemp[boardPosition(y, this.parentElement.rowIndex)].firstChild.setAttribute('class', 'error');

      //       //    tDataTemp[initialFindRow].firstChild.setAttribute('class', 'error');
      //       //    tDataTemp[boardPosition(this.cellIndex, y)].firstChild.setAttribute('class', 'error');
      //       // }
      //       // tdElm.className = 'error';
      //       alert("found");
      //    }
      // }  
   }

   if(tdElm.disabled == false && paletteValue == null) {
      alert("Please select a number on the bottom palette then click a cell on the gameboard to set the value.");
   }
}

// 9x9 Sudoku board shown in 1D array. -1 is a blank cell.
var boardData = [
   -1,  1, -1, -1, -1, -1, -1,  9, -1,
   -1, -1,  4, -1, -1, -1,  2, -1, -1,
   -1, -1,  8, -1, -1,  5, -1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1,  3, -1,
    2, -1, -1, -1,  4, -1,  1, -1, -1,
   -1, -1, -1, -1, -1, -1, -1, -1, -1,
   -1, -1,  1,  8, -1, -1,  6, -1, -1,
   -1,  3, -1, -1, -1, -1, -1,  8, -1,
   -1, -1,  6, -1, -1, -1, -1, -1, -1
];

// A convenience function to convert between x and y coordinates in the 2D grid and the 1D array
function boardPosition(x, y) {
   return y * 9 + x;
}

function sameBlock(x1, y1, x2, y2) {
   let firstRow = Math.floor(y1 / 3) * 3;
   let firstCol = Math.floor(x1 / 3) * 3;
   return (y2 >= firstRow && y2 <= (firstRow + 2) && x2 >= firstCol && x2 <= (firstCol + 2));
}

function sameRow(x1, y1, x2, y2) {
   return y1 == y2;
}

function sameColumn(x1, y1, x2, y2) {
   return x1 == x2;
}

function overlaps(x1, y1, x2, y2) {
   return sameBlock(x1, y1, x2, y2) || sameRow(x1, y1, x2, y2) || sameColumn(x1, y1, x2, y2);
}
