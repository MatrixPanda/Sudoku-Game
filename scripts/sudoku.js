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

   // UNDO THE STEPS
   let buttonUndo = document.getElementById('undo');
   buttonUndo.onclick = function() {
      // alert(paletteValue);
      // for (var i = valueHistory.length-1; i >= 0; i--) {
      //    alert(valueHistory[i]);  
      // }

      tData[cellHistory.pop()].firstChild.value = 1;
      // alert(cellHistory.pop());
   };

   // Input the palette value selected into the game board cell thats clicked
   var tData = document.getElementsByTagName("td");
   for (var i=0; i<tData.length; i++) {
      tData[i].onclick = tDataClickHandler;  
   }
   
   //  this.alert(testing3(1,2,3,4)); // for dubugging
   // alert(document.getElementById("board").rows[0].cells[1].innerHTML);
   // alert(tData[1].firstChild.value); // Works, show the value of 1

   // for (y = 0; y < 9; y++) {     
   //    for (x=0; x < 9; x++) {
         
   //    } 
   // }

}


var paletteValue;
var cellHistory = [];
var valueHistory = []; 

// Input the palette value selected into the game board cell thats clicked
function tDataClickHandler(e){
   e = e||window.event;
   var tdElm = e.target||e.srcElement;
   if(tdElm.disabled == false && paletteValue != null) {
      tdElm.setAttribute('value', paletteValue);
      // cellHistory.push(((this.parentElement.rowIndex + 1) * (this.cellIndex + 1)) - 1); // should be rx9+c
      cellHistory.push(boardPosition(this.cellIndex, this.parentElement.rowIndex));
      valueHistory.push(paletteValue);
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


// function testing(a1, a2) { // For Debugging
//    return a1 == a2;
// }

// function testing2(b1, b2) {
//    return b1 == b2;
// }

// function testing3(c1, c2, c3, c4) {
//    return testing(c1, c2) || testing2(c3, c4);
// }
