const boardElement = document.getElementById('board');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('resultMessage');
const closeModalButton = document.getElementById('closeModal');
const newGameButton = document.getElementById('newGameButton');
const popup = document.getElementById('popup');
const startGameButton = document.getElementById('start-game-button');

let timerInterval;
let startTime;
let name;
let tg_id;
const entry_date = new Date().toISOString();


let board = Array(9).fill(null);
let currentPlayer = 'X';
let playerName = 'Игрок';

function showPopup() {
    popup.style.display = 'flex';
}

function hidePopup() {
    popup.style.display = 'none';
}

function startGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    hidePopup();
    modal.style.display = 'none';
    renderBoard();
}

function renderBoard() {
    boardElement.innerHTML = '';
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        if (cell) {
            cellElement.classList.add('taken');
            cellElement.textContent = cell;
        }
        cellElement.addEventListener('click', () => handleMove(index));
        boardElement.appendChild(cellElement);
    });
}

function handleMove(index) {
    if (board[index]) return;
    board[index] = currentPlayer;
    renderBoard();

    if (checkWin(currentPlayer)) {
        endGame(`${currentPlayer} победил!`);
        return;
    }

    if (board.every(cell => cell)) {
        endGame('Ничья!');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (currentPlayer === 'O') botMove();
}

function botMove() {
    const availableMoves = board
        .map((cell, index) => (cell ? null : index))
        .filter(index => index !== null);

    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[randomMove] = 'O';

    renderBoard();

    if (checkWin('O')) {
        endGame('O победил!');
        return;
    }

    if (board.every(cell => cell)) {
        endGame('Ничья!');
        return;
    }

    currentPlayer = 'X';
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === player)
    );
}

function endGame(message) {
    modalMessage.textContent = message;
    modal.style.display = 'flex';
    save_result(message);
    resetTimer();
}

closeModalButton.addEventListener('click', () => (modal.style.display = 'none'));
newGameButton.addEventListener('click', startGame);
startGameButton.addEventListener('click', startGame);



async function get_data() {
    const response = await fetch(`/tiktaktoe/leaderboard`, {
      method: 'GET',
      headers: {
          Authorization: window.Telegram.WebApp.initData
      },
    });
    const data = await response.json();
    return data;
  }



async function save_result(status) { 
    const result_time = (Date.now() - startTime) / 1000;
    const response = await fetch('/tiktaktoe/save_result', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: window.Telegram.WebApp.initData
      },
      body: JSON.stringify({
          status: status,
          result_time: result_time,
          entry_date: entry_date,
      })
      }
    );
    const data = await response.json();
    return data;
}


async function save_init_result() {
    const response = await fetch('/tiktaktoe/save_result', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: window.Telegram.WebApp.initData
      },
      body: JSON.stringify({
          entry_date: entry_date,
      })
      }
    );
    const data = await response.json();
    return data;
}


function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = new Date();
    const timeDiff = (currentTime - startTime) / 1000;
    const minutes = Math.floor(timeDiff / 60);
    const seconds = Math.floor(timeDiff % 60);
    document.getElementById('timer').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer').innerText = '00:00';
}


window.onload = async function () {
    await save_init_result();
    let data = await get_data();
    renderLeaderboard(data);  
    showPopup();
}


function renderLeaderboard(data) {
    document.getElementById('player-name').textContent = data.name;
  
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = '';
  
    data.leaderboard.sort((a, b) => a.result_time - b.result_time);
  
    data.leaderboard.forEach((leader, index) => {
        const leaderRow = document.createElement('div');
        leaderRow.classList.add('leader-row');
  
        let icon;
        const position = index + 1;
  
        if (position === 1) {
            icon = '<img src="static/first.png" class="leader-icon">';
        } else if (position === 2) {
            icon = '<img src="static/second.png" class="leader-icon">';
        } else if (position === 3) {
            icon = '<img src="static/third.png" class="leader-icon">';
        } else {
            icon = `<span class="leader-number">${position}</span>`;
        }
  
        leaderRow.innerHTML = `
        ${icon}
        <span class="leader-name">
            ${leader.tg_id === data.tg_id ? '<strong>' : ''}${leader.name} - ${leader.result_time} сек.${leader.tg_id === data.tg_id ? '</strong>' : ''}
        </span>
        `;
  
        leaderboardElement.appendChild(leaderRow);
    });
  
    document.getElementById('popup').style.display = 'block';
  }