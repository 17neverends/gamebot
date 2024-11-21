let selectedAction = null;
let name;
let tg_id;
let entry_date = new Date().toISOString(); 

document.getElementById('open-btn').addEventListener('click', () => {
  selectedAction = 'open';
  document.getElementById('open-btn').classList.add('selected');
  document.getElementById('flag-btn').classList.remove('selected');
});

document.getElementById('flag-btn').addEventListener('click', () => {
  selectedAction = 'flag';
  document.getElementById('flag-btn').classList.add('selected');
  document.getElementById('open-btn').classList.remove('selected');
});

let timerInterval;
let startTime;
let currentLevel = "Легкая";
let minefield;
let mineCount;
let revealedCount = 0;
let flaggedCount = 0;
let mineLocations = [];

const levels = {
  "Легкая": { size: 8, mines: 1 },
  "Средняя": { size: 8, mines: 5 },
  "Сложная": { size: 8, mines: 7 },
};

function changeLevel() {
  const levelKeys = Object.keys(levels);
  const currentIndex = levelKeys.indexOf(currentLevel);
  currentLevel = levelKeys[(currentIndex + 1) % levelKeys.length];
  document.getElementById("current-difficulty").innerText = currentLevel;
  resetGame();
}


const startGameButton = document.getElementById('start-game-button');

startGameButton.onclick = function() {
  document.getElementById('popup').style.display = "none";
  resetGame();
};

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const currentTime = new Date();
  const timeDiff = (currentTime - startTime) / 1000;
  const minutes = Math.floor(timeDiff / 60);
  const seconds = Math.floor(timeDiff % 60);
  document.getElementById("timer").innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").innerText = "00:00";
}

function generateMinefield(size, mines) {
  minefield = Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));

  const mineLocations = [];
  while (mineLocations.length < mines) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    if (!mineLocations.some(([r, c]) => r === row && c === col)) {
      mineLocations.push([row, col]);
      minefield[row][col] = "M";

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = row + dr;
          const nc = col + dc;
          if (nr >= 0 && nr < size && nc >= 0 && nc < size && minefield[nr][nc] !== "M") {
            minefield[nr][nc]++;
          }
        }
      }
    }
  }
  return mineLocations;
}

function createBoard() {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  const size = levels[currentLevel].size;



  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `cell-${i}-${j}`;
      cell.addEventListener("click", () => handleCellClick(i, j));
      cell.addEventListener("click", (e) => handleRightClick(e, i, j));
      container.appendChild(cell);
    }
  }
}

function handleCellClick(row, col) {
  const cell = document.getElementById(`cell-${row}-${col}`);
  
  if (cell.classList.contains("revealed") || cell.classList.contains("flagged")) return;

  if (selectedAction === 'open') {
    const value = minefield[row][col];
    if (value === "M") {
      revealMines();
      showModal("Вы проиграли!", false);
      save_result(false);
      resetTimer();
    } else {
      revealCell(row, col);
    }
  }
  checkVictory();
}

function handleRightClick(event, row, col) {
  event.preventDefault();
  const cell = document.getElementById(`cell-${row}-${col}`);
  
  if (cell.classList.contains("revealed")) return;

  if (selectedAction === 'flag') {
    if (cell.classList.contains("flagged")) {
      cell.classList.remove("flagged");
      cell.textContent = "";
      flaggedCount--;
    } else {
      if (flaggedCount < levels[currentLevel].mines) {
        cell.classList.add("flagged");
        cell.textContent = "🚩";
        flaggedCount++;
      }
    }
    updateFlagCount();
  }
  checkVictory();
}

function revealCell(row, col) {
  const cell = document.getElementById(`cell-${row}-${col}`);
  if (!cell || cell.classList.contains("revealed") || cell.classList.contains("flagged")) return;

  const value = minefield[row][col];
  cell.classList.add("revealed");
  cell.textContent = value === 0 ? "" : value;
  cell.classList.add(`number-${value}`);
  revealedCount++;

  if (value === 0) {
    cell.classList.add("empty");
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (row + dr >= 0 && row + dr < levels[currentLevel].size && col + dc >= 0 && col + dc < levels[currentLevel].size) {
          revealCell(row + dr, col + dc);
        }
      }
    }
  }

  checkVictory();
}


document.getElementById('restart-button').onclick = function() {
  document.getElementById('modal').style.display = "none";
  resetGame();
};


function checkVictory() {
  const size = levels[currentLevel].size;
  const totalCells = size * size;

  const allCellsProcessed = revealedCount + flaggedCount === totalCells;

  const allMinesFlagged = mineLocations.every(([row, col]) => {
    const cell = document.getElementById(`cell-${row}-${col}`);
    return cell.classList.contains("flagged");
  });

  if (allCellsProcessed && allMinesFlagged) {
    showModal("Вы победили!", true);
    save_result(true);
    resetTimer();
  }
}



function revealMines() {
  mineLocations.forEach(([row, col]) => {
    const cell = document.getElementById(`cell-${row}-${col}`);
    cell.classList.add("mine");
    cell.textContent = "💣";
  });
}

function resetGame() {
  document.getElementById('modal').style.display = "none";
  resetTimer();
  const { size, mines } = levels[currentLevel];
  revealedCount = 0;
  flaggedCount = 0;
  mineLocations = generateMinefield(size, mines);
  createBoard();
  updateFlagCount();
  startTimer();
}

function showModal(message, isVictory) {
  const modal = document.getElementById("modal");
  const resultMessage = document.getElementById("resultMessage");
  resultMessage.innerText = message;
  modal.style.display = "block";

  const modalClass = isVictory ? "victory" : "defeat";
  modal.classList.remove("victory", "defeat");
  modal.classList.add(modalClass);
}

document.getElementById("newGameButton").onclick = resetGame;
document.getElementById("difficulty-level").onclick = changeLevel;
document.getElementById("closeModal").onclick = () => {
  document.getElementById("modal").style.display = "none";
};

window.onload = async function () {
  await save_init_result();
  let data = await get_data();
  renderLeaderboard(data);  
  document.getElementById('difficulty-level').innerText = `Сложность: ${currentLevel}`;
};


function updateFlagCount() {
  document.getElementById("flag-count").innerText = `Флажков: ${flaggedCount}`;
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

async function get_data() {
  const response = await fetch(`/minisweeper/leaderboard/${currentLevel}`, {
    method: 'GET',
    headers: {
        Authorization: window.Telegram.WebApp.initData
    },
  });
  const data = await response.json();
  return data;
}


async function save_result(status) {
  console.log("запрос отправлен");
  
  status = status ? "win" : "lose";
  const result_time = (Date.now() - startTime) / 1000;
  const response = await fetch('/minisweeper/save_result', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: window.Telegram.WebApp.initData
    },
    body: JSON.stringify({
        level: currentLevel,
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
  const response = await fetch('/minisweeper/save_result', {
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