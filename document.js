let currentPlayer = 'X';
let board = [];
let boardSize = 0;

document.addEventListener('DOMContentLoaded', () => {
    setupMenu();
});

function setupMenu() {
    const btn3x3 = document.getElementById('btn3x3');
    const btn4x4 = document.getElementById('btn4x4');
    const gameBoard = document.getElementById('gameBoard');
    const mainMenu = document.getElementById('mainMenu');

    btn3x3.addEventListener('click', () => {
        boardSize = 3;
        createBoard(boardSize);
        toggleDisplay(mainMenu, gameBoard);
    });

    btn4x4.addEventListener('click', () => {
        boardSize = 4;
        createBoard(boardSize);
        toggleDisplay(mainMenu, gameBoard);
    });
}

function createBoard(size) {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board = [];

    for (let i = 0; i < size * size; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', cellClicked);
        gameBoard.appendChild(cell);
        board.push(cell);
    }
}

function cellClicked(e) {
    const cell = e.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        setTimeout(() => {
            if (checkWinner(currentPlayer === 'X' ? 'O' : 'X')) { 
                alert((currentPlayer === 'X' ? 'O' : 'X') + ' wins!');
                resetGame();
            } else if (isDraw()) {
                alert('Remis!');
                resetGame();
            }
        }, 0);
    }
}



function checkWinner(player) {
    if (boardSize === 4) {
        for (let i = 0; i < 4; i++) {
            if (checkThreeInRow(player, i * 4, 1) || checkThreeInRow(player, i, 4)) {
                return true;
            }
        }

        if (checkThreeInRow(player, 0, 5) || checkThreeInRow(player, 3, 3)) {
            return true;
        }
        if (checkThreeInRow(player, 2, 3) || checkThreeInRow(player, 4, 5)) {
            return true;
        }
        if (checkThreeInRow(player, 1, 5) || checkThreeInRow(player, 7, 3)) {
            return true;
        }
    } else {
        for (let row = 0; row < boardSize; row++) {
            if (checkLine(player, row * boardSize, 1)) {
                return true;
            }
        }
        for (let col = 0; col < boardSize; col++) {
            if (checkLine(player, col, boardSize)) {
                return true;
            }
        }
        return checkLine(player, 0, boardSize + 1) || checkLine(player, boardSize - 1, boardSize - 1);
    }
    return false;
}

function checkThreeInRow(player, startIndex, step) {
    let consecutive = 0;
    for (let i = 0; i < 4; i++) {
        const index = startIndex + i * step;
        if (index < board.length && board[index].textContent === player) {
            consecutive++;
            if (consecutive === 3) {
                return true;
            }
        } else {
            consecutive = 0;
        }
    }
    return false;
}

function checkLine(player, startIndex, step) {
    for (let i = 0; i < boardSize; i++) {
        if (board[startIndex + i * step].textContent !== player) {
            return false;
        }
    }
    return true;
}

function isDraw() {
    return board.every(cell => cell.textContent);
}

function resetGame() {
    board.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
}

function toggleDisplay(menu, boardElement) {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    boardElement.style.display = boardElement.style.display === 'none' ? 'grid' : 'none';
}




