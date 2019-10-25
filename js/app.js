/*----- constants -----*/ 
// 	1.1) Define a colors object with keys of 'null' (when the square is empty), and players 1 & -1. The value assigned to each key represents the color to display for an empty square (null), player 1 and player -1.
//1.2) Define the 8 possible winning combinations, each containing three indexes of the board that make a winner if they hold the same player value.
const colors = {
    null: '#00f8ff',
    '1': '#D12EC6',
    '-1': '#2ED139'
}
/*----- app's state (variables) -----*/ 
let turn, winner, board;
// 2.1) Use a board array to represent the squares.	2.2) Use a turn variable to remember whose turn it is.
// 2.3) Use a winner variable to represent three different possibilities - player that won, a tie, or game in play.

/*----- cached element references -----*/ 
// 3.1) Store the 9 elements that represent the squares on the page.
let squareEls = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];
for (r=0; r < 3; r++) {
    for (c=0; c < 3; c++) {
        squareEls[r][c] = document.getElementById(`c${c}r${r}`);
    };
};
/*----- event listeners -----*/ 
/*----- functions -----*/
// 4.1) Initialize the state variables:
// 4.1.1) Initialize the board array to 9 nulls to represent empty squares. The 9 elements will "map" to each square, where index 0 maps to the top-left square and index 8 maps to the bottom-right square.
// 4.1.2) Initialize whose turn it is to 1 (player 'X'). Player 'O' will be represented by -1.
// 4.1.3) Initialize winner to null to represent that there is no winner or tie yet. Winner will hold the player value (1 or -1) if there's a winner. Winner will hold a 'T' if there's a tie. 
// 4.2) Render those state variables to the page:
// 4.2.1) Render the board:
//     4.2.1.1) Loop over each of the 9 elements that represent the squares on the page, and for each iteration:
//         4.2.1.1.2) Use the index of the iteration to access the mapped value from the board array.
//         4.3.1.1.3) Set the background color of the current element by using the value as a key on the colors lookup object (constant).
// 4.2.2) Render a message:
//     4.2.2.1) If winner has a value other than null (game still in progress), render whose turn it is - use the color name for the player, converting it to upper case.
//     4.2.2.2) If winner is equal to 'T' (tie), render a tie message.
//     4.2.2.3) Otherwise, render a congratulatory message to which player has won - use the color name for the player, converting it to uppercase.
// 4.3) Wait for the user to click a square

function init () {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
    turn = 1;
    winner = null;
}

function render() {
    // for (r=0; r < 3; r++) {
    //     for (c=0; c < 3; c++) {
         
    //     };
    // };
    for (r=0; r < 3; r++) {
        for (c=0; c < 3; c++) {
            squareEls[r][c].style.backgroundColor = colors[board[r][c]];
        };
    };
}