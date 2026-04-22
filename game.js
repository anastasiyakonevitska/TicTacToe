const board = document.getElementById('board');
const squares = document.getElementsByClassName('square');
const restartButton = document.getElementById('restartButton');
const status = document.getElementById('status');
const players = ['X', 'O'];
let currentPlayer = players[0];
let someoneWon = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (someoneWon || squares[i].textContent !== '') {
            return;
        }

        squares[i].textContent = currentPlayer;

        if (checkWin(currentPlayer)) {
            someoneWon = true;
            status.textContent = `${currentPlayer} wins!`;
            return;
        }

        if (checkTie()) {
            someoneWon = true;
            status.textContent = "It's a tie!";
            return;
        }

        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        status.textContent = `${currentPlayer}'s turn!`;
    });
}

restartButton.addEventListener('click', restartGame);

function checkWin(player) {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        if (
            squares[a].textContent === player &&
            squares[b].textContent === player &&
            squares[c].textContent === player
        ) {
            return true;
        }
    }

    return false;
}

function checkTie() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false;
        }
    }

    return true;
}

function restartGame() {
    someoneWon = false;
    currentPlayer = players[0];

    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = '';
    }

    status.textContent = "X's turn!";
}
