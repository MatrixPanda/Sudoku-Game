window.onload = function() {
//    let drawRow = document.getElementById('board');

//    drawRow.onkeypress = function(event) {
      
//       if(event.keyCode == 13) {
//          alert("Enter Pressed!");

//          // let content = document.createTextNode('1');
//          // let newTd = document.createElement('td');
//          // newTd.appendChild(content);
//       }
//   };

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
         input.setAttribute('id', 'cell-' + this.boardPosition(x, y));
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
   
   

}


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
