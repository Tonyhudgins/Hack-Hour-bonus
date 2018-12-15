// On our special chessboard, two bishops attack each other if they share the same diagonal. 
// This includes bishops that have another bishop located between them, i.e. bishops can attack through pieces.

// You are given an array 'positions' of bishops, represented as [row, column] tuples on a 'w' by 'w' chessboard. 
// Write a function to count the number of pairs of bishops that can attack each other. 
// The ordering of the pair doesn't matter. It could be [x, y] or [y, x], but must be consistent.

/**
  For example, given w = 5 and a positions array of bishops:

  [ [0, 0],
    [1, 2],
    [2, 2],
    [4, 0] ]

  The board would look like this:

  [b _ _ _ _]
  [_ _ b _ _]
  [_ _ b _ _]
  [_ _ _ _ _]
  [b _ _ _ _]

  You should return 2, since bishops 1 and 3 attack each other, as well as bishops 3 and 4.
**/

/**
  bishops([[0, 0], [1, 2], [2, 2], [4, 0]], 5)  -> 2 
  bishops([[2, 8], [3, 4], [4, 4], [7, 8], [10, 11], [11, 3]], 11)  -> 3 
**/

function bishops (positions, w) {
	// collapse diagonally to top left or top right
  const TOPLEFT=0, TOPRIGHT=1;
  
  // The possible connections between points on the same diagonal
  // is the same as the nth-1 Triangular Number
  // https://en.wikipedia.org/wiki/Triangular_number
  function connections(points) {  
    return (points * (points - 1)) / 2
  }

  // collapse the points on the same diagonal to an element in 
  // diagonalsObj with the count of bishops on that diagonal
  function collapse (dir) {
    let count = 0, diagonalsObj = {};
    
	  diagonalsObj = positions.reduce( (acc, c)=>{
  	  let collapsedPos
      if (dir === TOPLEFT) {
	      collapsedPos = c[0] - c[1]
      }else{
 	      collapsedPos = c[0] + c[1]
      }

    	acc[collapsedPos] = acc[collapsedPos] + 1 || 1
  	  return acc
  	}, {})
    
    for (let diagonal in diagonalsObj) {
      count += connections(diagonalsObj[diagonal])
    }
		return count    
  }
  return collapse (TOPLEFT) + collapse (TOPRIGHT)
}

console.log(bishops([[0, 0], [1, 2], [2, 2], [4, 0]], 5)) // -> 2 
console.log(bishops([[2, 8], [3, 4], [4, 4], [7, 8], [10, 11], [11, 3]], 11)) // -> 3 
console.log(bishops([[2, 8], [3, 4], [4, 5], [7, 8], [10, 11], [11, 3]], 11)) // -> 6  

