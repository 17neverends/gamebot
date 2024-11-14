let timerInterval;
let startTime;
let name;
let tg_id;
let entry_date = new Date().toISOString(); 
let currentLevel = "Легкая";


const sudokuLevels = {
  "Легкая": [
    {
      initial: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 0],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ],
      solution: [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
      ]
    },
    {
      initial: [
        [8, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 6, 0, 0, 0, 0, 0],
        [0, 7, 0, 0, 9, 0, 2, 0, 0],
        [0, 5, 0, 0, 0, 7, 0, 0, 0],
        [0, 0, 0, 0, 4, 5, 7, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 3, 0],
        [0, 0, 1, 0, 0, 0, 0, 6, 8],
        [0, 0, 8, 5, 0, 0, 0, 1, 0],
        [0, 9, 0, 0, 0, 0, 4, 0, 0]
      ],
      solution: [
        [8, 1, 2, 7, 5, 3, 6, 4, 9],
        [9, 4, 3, 6, 8, 2, 1, 7, 5],
        [6, 7, 5, 4, 9, 1, 2, 8, 3],
        [1, 5, 4, 2, 3, 7, 8, 9, 6],
        [3, 6, 9, 8, 4, 5, 7, 2, 1],
        [2, 8, 7, 1, 6, 9, 5, 3, 4],
        [5, 2, 1, 9, 7, 4, 3, 6, 8],
        [4, 3, 8, 5, 2, 6, 9, 1, 7],
        [7, 9, 6, 3, 1, 8, 4, 5, 2]
      ]
    }
  ],
  "Средняя": [
    {
      initial: [
        [0, 0, 0, 6, 0, 0, 4, 0, 0],
        [7, 0, 0, 0, 0, 3, 6, 0, 0],
        [0, 0, 0, 0, 9, 1, 0, 8, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 5, 0, 1, 8, 0, 0, 0, 3],
        [0, 0, 0, 3, 0, 6, 0, 4, 5],
        [0, 4, 0, 2, 0, 0, 0, 6, 0],
        [9, 0, 3, 0, 0, 0, 0, 0, 0],
        [0, 2, 0, 0, 0, 0, 1, 0, 0]
      ],
      solution: [
        [5, 8, 1, 6, 2, 7, 4, 3, 9],
        [7, 9, 2, 8, 4, 3, 6, 5, 1],
        [4, 6, 3, 5, 9, 1, 7, 8, 2],
        [3, 7, 4, 9, 5, 2, 8, 1, 6],
        [6, 5, 9, 1, 8, 4, 2, 7, 3],
        [2, 1, 8, 3, 7, 6, 9, 4, 5],
        [1, 4, 5, 2, 3, 9, 7, 6, 8],
        [9, 2, 6, 4, 1, 8, 5, 9, 7],
        [8, 3, 7, 7, 6, 5, 1, 2, 4]
      ]
    },
    {
      initial: [
        [0, 0, 5, 3, 0, 0, 0, 0, 0],
        [8, 0, 0, 0, 0, 0, 0, 2, 0],
        [0, 7, 0, 0, 1, 0, 5, 0, 0],
        [4, 0, 0, 0, 0, 5, 3, 0, 0],
        [0, 1, 0, 0, 7, 0, 0, 0, 6],
        [0, 0, 3, 2, 0, 0, 0, 8, 0],
        [0, 6, 0, 5, 0, 0, 0, 0, 9],
        [0, 0, 4, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 9, 7, 0, 0]
      ],
      solution: [
        [1, 4, 5, 3, 2, 7, 6, 9, 8],
        [8, 3, 9, 6, 5, 4, 1, 2, 7],
        [6, 7, 2, 9, 1, 8, 5, 4, 3],
        [4, 9, 6, 1, 8, 5, 3, 7, 2],
        [2, 1, 8, 4, 7, 3, 9, 5, 6],
        [7, 5, 3, 2, 9, 6, 4, 8, 1],
        [3, 6, 7, 5, 4, 2, 8, 1, 9],
        [9, 8, 4, 7, 6, 1, 2, 3, 5],
        [5, 2, 1, 8, 3, 9, 7, 6, 4]
      ]
    }
  ],
  "Сложная": [
    {
      initial: [
        [0, 0, 0, 6, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 4, 0, 0],
        [0, 0, 9, 0, 0, 3, 0, 5, 0],
        [5, 0, 0, 0, 0, 0, 9, 0, 6],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 0, 3, 0, 0, 0, 0, 0, 5],
        [0, 4, 0, 7, 0, 0, 0, 3, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0]
      ],
      solution: [
        [3, 8, 4, 6, 1, 9, 2, 7, 5],
        [6, 1, 5, 3, 7, 2, 4, 9, 8],
        [7, 2, 9, 8, 4, 3, 1, 5, 6],
        [5, 3, 2, 4, 8, 7, 9, 1, 6],
        [9, 7, 6, 5, 2, 1, 3, 8, 4],
        [2, 4, 3, 9, 6, 8, 7, 5, 1],
        [1, 5, 8, 7, 9, 4, 6, 3, 2],
        [4, 9, 7, 1, 3, 6, 5, 2, 9],
        [8, 6, 1, 2, 5, 1, 9, 4, 3]
      ]
    },
    {
      initial: [
        [0, 0, 0, 0, 0, 0, 0, 6, 0],
        [0, 0, 0, 1, 0, 4, 0, 0, 0],
        [2, 0, 0, 0, 0, 0, 0, 0, 9],
        [0, 0, 0, 0, 0, 9, 0, 8, 0],
        [0, 0, 3, 0, 5, 0, 6, 0, 0],
        [0, 4, 0, 3, 0, 0, 0, 0, 0],
        [9, 0, 0, 0, 0, 0, 0, 0, 3],
        [0, 0, 0, 8, 0, 6, 0, 0, 0],
        [0, 7, 0, 0, 0, 0, 0, 0, 0]
      ],      
      solution: [
        [1, 8, 9, 7, 3, 5, 4, 6, 2],
        [3, 5, 7, 1, 2, 4, 9, 8, 6],
        [2, 6, 4, 9, 8, 1, 7, 5, 9],
        [7, 9, 1, 5, 6, 9, 3, 8, 4],
        [8, 2, 3, 4, 5, 7, 6, 9, 1],
        [6, 4, 5, 3, 9, 2, 8, 7, 9],
        [9, 1, 6, 2, 4, 8, 5, 3, 7],
        [4, 3, 7, 8, 1, 6, 2, 9, 5],
        [5, 7, 8, 9, 7, 1, 3, 2, 4]
      ]
    }
  ]
};

let win;


function getRandomBoard(currentLevel) {
  const levelBoards = sudokuLevels[currentLevel];
  const randomIndex = Math.floor(Math.random() * levelBoards.length);
  win = levelBoards[randomIndex].solution;
  return levelBoards[randomIndex].initial;
}

random = getRandomBoard(currentLevel);

var sudoku = JSON.parse(JSON.stringify(random));

var originalSudoku = JSON.parse(JSON.stringify(random));


function changeLevel() {
  const levels = Object.keys(sudokuLevels);
  const currentIndex = levels.indexOf(currentLevel);
  currentLevel = levels[(currentIndex + 1) % levels.length];
  random = getRandomBoard(currentLevel);
  sudoku = JSON.parse(JSON.stringify(random));
  originalSudoku = JSON.parse(JSON.stringify(random));
  document.getElementById('difficulty-level').innerText = `Сложность: ${currentLevel}`;
  resetBoard();
  create();
  resetTimer();
  startTimer();
}

document.getElementById('difficulty-level').onclick = function() {
  changeLevel();
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
  document.getElementById('timer').innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById('timer').innerText = '00:00';
}

let time_count = new Date();

function showModal() {
  const modal = document.getElementById('modal');
  const resultMessage = document.getElementById('resultMessage');
  resultMessage.innerText = `Вы победили! Время: ${(Date.now() - startTime) / 1000} сек.`;
  modal.style.display = "block";
}

document.getElementById('closeModal').onclick = function() {
  document.getElementById('modal').style.display = "none";
}

document.getElementById('restart-button').onclick = function() {
  time_count = new Date();
  resetTimer();
  startTimer();
  resetBoard();

};

function clearCell() {
  if (current && !original_cell(current)) {
    update(current, '');
  }
}

document.getElementById('clear-button').onclick = function() {
  clearCell();
};

function resetBoard() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.getElementById(`cell${i * 9 + j + 1}`);
      sudoku[i][j] = originalSudoku[i][j];
      cell.textContent = originalSudoku[i][j] !== 0 ? originalSudoku[i][j] : '';
      mouse_out();
      current = null;
    }
  }
}


document.getElementById('start-game-button').onclick = function() {
  document.getElementById('popup').style.display = "none";
  time_count = new Date();
  startTimer();
};

document.getElementById('newGameButton').onclick = function() {
  document.getElementById('modal').style.display = "none";
  changeLevel();
  time_count = new Date();
  
  startTimer();
};



let timer = new Date();
let current = null;

function create() {
  const container = document.querySelector('.container');
  container.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      if (i % 3 === 0) cell.classList.add('top');
      if (i % 3 === 2) cell.classList.add('bottom');
      if (j % 3 === 0) cell.classList.add('left');
      if (j % 3 === 2) cell.classList.add('right');
      cell.id = `cell${i * 9 + j + 1}`;
      cell.textContent = sudoku[i][j] !== 0 ? sudoku[i][j] : '';
      cell.addEventListener('click', () => select_cell(cell));
      container.appendChild(cell);
    }
  }
}

function select_cell(cell) {
  if (current === cell) {
    cell.classList.remove('focused');
    mouse_out();
    current = null;
    return;
  }

  if (current) {
    current.classList.remove('focused');
    mouse_out();
  }

  current = cell;
  cell.classList.add('focused');

  if (cell.textContent === '') {
    highlightLineAndSquare(cell);
  } else {
    highlightIdenticalNumbers(cell);
  }
}

function highlightIdenticalNumbers(cell) {
  const cell_value = cell.textContent;

  const cells = document.querySelectorAll('.cell');
  cells.forEach((c) => {
    if (c.textContent === cell_value && c !== cell) {
      c.classList.add('same-value');
    }
  });

  highlightLineAndSquare(cell);
}

function highlightLineAndSquare(cell) {
  const index = parseInt(cell.id.substring(4));
  const cell_i = Math.floor((index - 1) / 9);
  const cell_j = (index - 1) % 9;

  for (let i = 0; i < 9; i++) {
    const column = document.getElementById(`cell${i * 9 + cell_j + 1}`);
    column.classList.add('hovered');
  }

  for (let j = 0; j < 9; j++) {
    const row = document.getElementById(`cell${cell_i * 9 + j + 1}`);
    row.classList.add('hovered');
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const square = document.getElementById(`cell${(Math.floor(cell_i / 3) * 27) + (i * 9) + (Math.floor(cell_j / 3) * 3) + j + 1}`);
      square.classList.add('hovered');
    }
  }
}

function input_value(event) {
  
  if (current && !original_cell(current)) {

    const key = event.key;
    if (/^[1-9]$/.test(key)) {
      const value = parseInt(key);
        update(current, value);
        if (check_win()) {
          showModal();

    
          save_result()
            .then(result => {
              console.log("Результат сохранён:", result);
            })
            .catch(error => {
              console.error("Ошибка сохранения результата:", error);
            });
          resetTimer();
          timer = 0;
        }
      
    } else if (key === 'Backspace') {
      update(current, '');
    }
  }
}

function check_win() {
  return sudoku.every((row, i) => row.every((val, j) => val === win[i][j]));
}


function original_cell(cell) {
  const index = parseInt(cell.id.substring(4));
  const row = Math.floor((index - 1) / 9);
  const col = (index - 1) % 9;  
  return originalSudoku[row][col] !== 0;
}

function update(cell, value) {
  const index = parseInt(cell.id.substring(4));
  const row = Math.floor((index - 1) / 9);
  const col = (index - 1) % 9;
  sudoku[row][col] = value === '' ? 0 : value;
  cell.textContent = value === '' ? '' : value;
}

function mouse_in(cell) {
  const cell_id = cell.id;
  const cell_value = cell.textContent;
  const index = parseInt(cell_id.substring(4));
  const cell_i = Math.floor((index - 1) / 9);
  const cell_j = (index - 1) % 9;

  const sameValueCells = document.querySelectorAll('.same-value');
  sameValueCells.forEach(c => c.classList.remove('same-value'));
  
  const hoveredCells = document.querySelectorAll('.hovered');
  hoveredCells.forEach(c => c.classList.remove('hovered'));
  
  cell.classList.add('hover');

  const cells = document.querySelectorAll('.cell');
  cells.forEach((c) => {
    if (c.textContent === cell_value && c !== cell) {
      c.classList.add('same-value');
    }
  });

  for (let i = 0; i < 9; i++) {
    const column = document.getElementById(`cell${i * 9 + cell_j + 1}`);
    column.classList.add('hovered');
  }

  for (let j = 0; j < 9; j++) {
    const row = document.getElementById(`cell${cell_i * 9 + j + 1}`);
    row.classList.add('hovered');
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const square = document.getElementById(`cell${(Math.floor(cell_i / 3) * 27) + (i * 9) + (Math.floor(cell_j / 3) * 3) + j + 1}`);
      square.classList.add('hovered');
    }
  }
}

function inputNumber(value) {
  if (current) {
    update(current, value);
    if (check_win()) {
      showModal();
      resetTimer();
      timer = 0;

      save_result()
        .then(result => {
          console.log("Результат сохранён:", result);
        })
        .catch(error => {
          console.error("Ошибка сохранения результата:", error);
        });
    }
  }
}
function mouse_out() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((c) => {
      c.classList.remove('same-value', 'hovered', 'hover');
    
  });
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
  const response = await fetch(`/sudoku/leaderboard/${currentLevel}`, {
    method: 'GET',
    headers: {
        Authorization: window.Telegram.WebApp.initData
    },
  });
  const data = await response.json();
  return data;
}


async function save_result() { 
  const result_time = (Date.now() - startTime) / 1000;
  const response = await fetch('/sudoku/save_result', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: window.Telegram.WebApp.initData
    },
    body: JSON.stringify({
        level: currentLevel,
        result_time: result_time,
        entry_date: entry_date,
    })
    }
  );
  const data = await response.json();
  return data;
}


async function save_init_result() { 
  const response = await fetch('/sudoku/save_result', {
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


window.onload = async function () {
  await save_init_result();
  create();
  let data = await get_data();
  renderLeaderboard(data);  
  document.getElementById('difficulty-level').innerText = `Сложность: ${currentLevel}`;
  document.addEventListener('keydown', input_value);
};


function giveHint() {
  if (hintRemaining === 0) {
    return;
  }
  const emptyCells = [];
  for (let row = 0; row < sudoku.length; row++) {
    for (let col = 0; col < sudoku[row].length; col++) {
      if (sudoku[row][col] === 0) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];

    sudoku[row][col] = win[row][col];

    updateBoardUI(row, col, sudoku[row][col]);
    hintRemaining--;
    document.getElementById('hint-text').textContent = `${hintRemaining}/${maxHints}`;
    if (check_win()) {
      showModal();
      resetTimer();
      timer = 0;

      save_result()
        .then(result => {
          console.log("Результат сохранён:", result);
        })
        .catch(error => {
          console.error("Ошибка сохранения результата:", error);
        });
    }
    
  }
}

const maxHints = 3;

let hintRemaining = 3;

document.getElementById('hint-text').textContent = `${hintRemaining}/${maxHints}`;

function updateBoardUI(row, col, value) {
  
  const cellNumber = row * 9 + col + 1;
  const cell = document.getElementById(`cell${cellNumber}`);
  cell.innerText = value;
  cell.classList.add('hint-cell');
}

document.getElementById('hint-button').onclick = function() {
  giveHint();
};