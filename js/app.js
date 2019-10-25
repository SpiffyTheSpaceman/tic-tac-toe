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

let message = document.querySelector('h1');
/*----- event listeners -----*/ 
document.querySelector('.gameContainer').addEventListener('click', handleClick);
document.querySelector('button').addEventListener('click', handleResetClick);

/*----- functions -----*/
// 4.1) Initialize the state variables:
// 4.1.1) Initialize the board array to 9 nulls to represent empty squares. The 9 elements will "map" to each square, where index 0 maps to the top-left square and index 8 maps to the bottom-right square.
// 4.1.2) Initialize whose turn it is to 1 (player 'X'). Player 'O' will be represented by -1.
// 4.1.3) Initialize winner to null to represent that there is no winner or tie yet. Winner will hold the player value (1 or -1) if there's a winner. Winner will hold a 'T' if there's a tie. 

function init () {
    board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]
    turn = 1;
    winner = null;
    render();
}


// 4.2) Render those state variables to the page:
// 4.2.1) Render the board:
//     4.2.1.1) Loop over each of the 9 elements that represent the squares on the page, and for each iteration:
//         4.2.1.1.2) Use the index of the iteration to access the mapped value from the board array.
//         4.3.1.1.3) Set the background color of the current element by using the value as a key on the colors lookup object (constant).
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

// 4.2.2) Render a message:
//     4.2.2.1) If winner has a value other than null (game still in progress), render whose turn it is - use the color name for the player, converting it to upper case.
//     4.2.2.2) If winner is equal to 'T' (tie), render a tie message.
//     4.2.2.3) Otherwise, render a congratulatory message to which player has won - use the color name for the player, converting it to uppercase.
// 4.3) Wait for the user to click a square
    if (winner === null) {
        let player = (turn === 1) ? 'X' : 'O';
        message.textContent = `It is Player ${turn === 1 ? 'X' : 'O'}'s turn`;
        message.style.backgroundColor = colors[turn];
    } else if (winner === 'T') {
        message.textContent = 'Sad: it is a Tie';
        message.style.backgroundColor = 'transparent';
    } else {
        message.textContent = `CONGRATS PLAYER ${winner === 1 ? 'X' : 'O'}`;
        message.style.backgroundColor = colors[winner];
    }
}

// 5) Handle a player clicking a square:
// 	5.6) Set the winner variable if there's a winner:
// 		5.6.1) Loop through the each of the winning combination arrays defined.
// 		5.6.2) Total up the three board positions using the three indexes in the current combo.
// 		5.6.3) Convert the total to an absolute value (convert any negative total to positive).
// 		5.6.4) If the total equals 3, we have a winner! Set winner to the board's value at the index specified by the first index in the combo array. Exit the loop.
// 	5.7) If there's no winner, check if there's a tie:
// 		5.7.1) Set winner to 'T' if there are no more nulls in the board array.
// 	5.8) All state has been updated, so render the state to the page (step 4.2).

// 	5.3) If winner is not null, immediately return because the game is over.
function handleClick(evt) {
    if(evt.target.tagName !== 'DIV' || (winner !== null)) {
        return;
    }
    // 	5.1) Obtain the index of the square that was clicked
    // 		5.1.2) Looping through the cached square elements using a for loop and breaking out when the current square element equals the event object's target.
    for (r=0; r < 3; r++) {
        for (c=0; c < 3; c++) {
            
            if (evt.target === squareEls[r][c]){
                // 	5.2) If the board has a value at the index, immediately return because that square is already taken.
                if (board[r][c] !== null) {
                    return;
                } else {
                    // 	5.4) Update the board array at the index with the value of turn.
                    // 	5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).
                    board[r][c] = turn;
                    evt.target.textContent = turn === 1 ? 'X' : 'O';
                    turn = turn * (-1);
                }
                // 	5.6) Set the winner variable if there's a winner:
                // 		5.6.1) Loop through the each of the winning combination arrays defined.
                // 		5.6.2) Total up the three board positions using the three indexes in the current combo.
                // 		5.6.3) Convert the total to an absolute value (convert any negative total to positive).
                // 		5.6.4) If the total equals 3, we have a winner! Set winner to the board's value at the index specified by the first index in the combo array. Exit the loop.
            }
        };
        // if (Math.abs(horizontalCount) === 3) {
        
    };
    checkWinner();

    render();
}

function checkWinner () {
    let horizontalCount = 0;
    let verticalCount = 0;
    let diagonalCount1 = 0;
    let diagonalCount2 = 0;
    let tieCount = 0;
    for (r=0; r < 3; r++) {
        diagonalCount1 += board[r][r];
        diagonalCount2 += board[2-r][r]
        horizontalCount = 0;
        verticalCount = 0;
        if (!board[r].includes(null)) tieCount += 1;
        for (c=0; c < 3; c++) {
            horizontalCount += board[r][c];
            verticalCount += board[c][r];
            if (Math.abs(horizontalCount) === 3 ||
                Math.abs(verticalCount) === 3 ||
                Math.abs(diagonalCount1) === 3 ||
                Math.abs(diagonalCount2) === 3) {
                winner = turn * (-1);
                return;
            } 
            
        };
    };
    if (tieCount === 3) {
        console.log(tieCount);
        winner = 'T';
    }
    
}

function handleResetClick(evt){
    init();
}

init();