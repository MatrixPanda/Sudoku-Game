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
         // Good working version (note: what if I make check error cells is a function, then just pass in the value into that function?)
         tData[hist].firstChild.setAttribute('value', undoHash[hist][undoHash[hist].length-1]);
      }

      // clear all error cell indicators
      for(var i = 0; i < 81; i++) {
         if(tData[i].firstChild.className == 'error') {
            tData[i].firstChild.className = '';
         }
      }
   };
   
}



// Initialize all 0-80 hash keys and empty arrays?
var undoHash = {};
for (var i = 0; i < 81; i++) {
   undoHash[i] = [];
}

var storeInfo = true;
var paletteValue;
var cellHistory = [];
var valueHistory = [];

// Input the palette value selected into the game board cell thats clicked
function tDataClickHandler(e){
   e = e||window.event;
   var tdElm = e.target||e.srcElement;
   var tDataTemp = document.getElementsByTagName("td");

   if(tdElm.disabled == false && paletteValue != null) {
      tdElm.setAttribute('value', paletteValue);
      if (storeInfo) {
         cellHistory.push(boardPosition(this.cellIndex, this.parentElement.rowIndex));
         undoHash[boardPosition(this.cellIndex, this.parentElement.rowIndex)].push(paletteValue);
      }

      // Deletes any existing error cell idicators so that only the error cells for the current move will show.
      for(var i = 0; i < 81; i++) {
         if(tDataTemp[i].firstChild.className == 'error') {
            tDataTemp[i].firstChild.className = '';
         }
      }

      var count = 0;
      var initialFindRow = 0;
      var initialFindCol = 0;
      var initialFindBlock = 0;

      // Check row error
      for (var y = 0; y < 9; y++) { 
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

      // 1st
      if (this.parentElement.rowIndex < 3 && this.cellIndex < 3) {
         console.log("1st");
         for (var r = 0; r < 3; r++) {   
            for (var c = 0; c < 3; c++) {
               console.log(boardPosition(r,c));
               if (tDataTemp[boardPosition(r,c)].firstChild.value == tdElm.value) {
                  if (count < 1) {
                     initialFindBlock = boardPosition(r,c);
                  }
                  count = count + 1;
                  if(count > 1) {
                     tDataTemp[initialFindBlock].firstChild.setAttribute('class', 'error');
                     tDataTemp[boardPosition(r,c)].firstChild.setAttribute('class', 'error');
                  }
               }
            }
         }

         // 2nd
      } else if (this.parentElement.rowIndex < 3 && this.cellIndex < 6) {
         for (var r = 0; r < 3; r++) {   
            for (var c = 0; c < 3; c++) {
               var pos = boardPosition(r,c) + 3;
               if (tDataTemp[pos].firstChild.value == tdElm.value) {
                  if (count < 1) {
                     initialFindBlock = pos;
                  }
                  count = count + 1;
                  if(count > 1) {
                     tDataTemp[initialFindBlock].firstChild.setAttribute('class', 'error');
                     tDataTemp[pos].firstChild.setAttribute('class', 'error');
                  }
               }
            }
         }

         // 3rd
      } else if (this.parentElement.rowIndex < 3 && this.cellIndex < 9) {
         for (var r = 0; r < 3; r++) {   
            for (var c = 0; c < 3; c++) {
               console.log(boardPosition(r,c) + 6);
               var pos = boardPosition(r,c) + 6;
               if (tDataTemp[pos].firstChild.value == tdElm.value) {
                  if (count < 1) {
                     initialFindBlock = pos;
                  }
                  count = count + 1;
                  if(count > 1) {
                     tDataTemp[initialFindBlock].firstChild.setAttribute('class', 'error');
                     tDataTemp[pos].firstChild.setAttribute('class', 'error');
                  }
               }
            }
         }

         // 4th
      } else if (this.parentElement.rowIndex < 6 && this.cellIndex < 3) {
         for (var r = 0; r < 3; r++) {   
            for (var c = 0; c < 3; c++) {
               var pos = boardPosition(r,c) + 27;
               if (tDataTemp[pos].firstChild.value == tdElm.value) {
                  if (count < 1) {
                     initialFindBlock = pos;
                  }
                  count = count + 1;
                  if(count > 1) {
                     tDataTemp[initialFindBlock].firstChild.setAttribute('class', 'error');
                     tDataTemp[pos].firstChild.setAttribute('class', 'error');
                  }
               }
            }
         }

         // 5th
      } else if (this.parentElement.rowIndex < 6 && this.cellIndex < 6) {
         for (var r = 0; r < 3; r++) {   
            for (var c = 0; c < 3; c++) {
               var pos = boardPosition(r,c) + 30;
               if (tDataTemp[pos].firstChild.value == tdElm.value) {
                  if (count < 1) {
                     initialFindBlock = pos;
                  }
                  count = count + 1;
                  if(count > 1) {
                     tDataTemp[initialFindBlock].firstChild.setAttribute('class', 'error');
                     tDataTemp[pos].firstChild.setAttribute('class', 'error');
                  }
               }
            }
         }

         // 6th
      } else if (this.parentElement.rowIndex < 6 && this.cellIndex < 9) {
         for (var r = 0; r < 3; r++) {   
            for (var c = 0; c < 3; c++) {
               var pos = boardPosition(r,c) + 33;
               if (tDataTemp[pos].firstChild.value == tdElm.value) {
                  if (count < 1) {
                     initialFindBlock = pos;
                  }
                  count = count + 1;
                  if(count > 1) {
                     tDataTemp[initialFindBlock].firstChild.setAttribute('class', 'error');
                     tDataTemp[pos].firstChild.setAttribute('class', 'error');
                  }
               }
            }
         }

         // 7th
      } else if (this.parentElement.rowIndex < 9 && this.cellIndex < 3) {
         for (var r = 0; r < 3; r++) {   
            for (var c = 0; c < 3; c++) {
               var pos = boardPosition(r,c) + 54;
               if (tDataTemp[pos].firstChild.value == tdElm.value) {
                  if (count < 1) {
                     initialFindBlock = pos;
                  }
                  count = count + 1;
                  if(count > 1) {
                     tDataTemp[initialFindBlock].firstChild.setAttribute('class', 'error');
                     tDataTemp[pos].firstChild.setAttribute('class', 'error');
                  }
               }
            }
         }

         // 8th
      } else if (this.parentElement.rowIndex < 9 && this.cellIndex < 6) {
         for (var r = 0; r < 3; r++) {   
            for (var c = 0; c < 3; c++) {
               var pos = boardPosition(r,c) + 57;
               if (tDataTemp[pos].firstChild.value == tdElm.value) {
                  if (count < 1) {
                     initialFindBlock = pos;
                  }
                  count = count + 1;
                  if(count > 1) {
                     tDataTemp[initialFindBlock].firstChild.setAttribute('class', 'error');
                     tDataTemp[pos].firstChild.setAttribute('class', 'error');
                  }
               }
            }
         }

         // 9th
      } else if (this.parentElement.rowIndex < 9 && this.cellIndex < 9) {
         for (var r = 0; r < 3; r++) {   
            for (var c = 0; c < 3; c++) {
               var pos = boardPosition(r,c) + 60;
               if (tDataTemp[pos].firstChild.value == tdElm.value) {
                  if (count < 1) {
                     initialFindBlock = pos;
                  }
                  count = count + 1;
                  if(count > 1) {
                     tDataTemp[initialFindBlock].firstChild.setAttribute('class', 'error');
                     tDataTemp[pos].firstChild.setAttribute('class', 'error');
                  }
               }
            }
         }
      }
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
