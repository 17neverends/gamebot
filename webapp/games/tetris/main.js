var ROWS = 20;
var COLS = 10;
var SIZE = 32;
const closeModalButton = document.getElementById('closeModal');
const newGameButton = document.getElementById('newGameButton');
const startGameButton = document.getElementById('start-game-button');
let timerInterval;
let startTime;
let name;
let tg_id;
const entry_date = new Date().toISOString();

var canvas;
var ctx;
var blockImage;
var backgroundImage;
var gameOverImage;

var currentPiece;
var gameData;
var imageLoader;
var previousTime;
var currentTime;
var isGameOver;
var lineSpan;
var currentLines;
var speed;
var paused;

var touchX;
var touchY;
var touchId;


function onReady(){
  imageLoader = new bulkImageLoader();
  imageLoader.addImage("/static/blocks.png", "blocks");
  imageLoader.addImage("/static/bg.png", "background");
  imageLoader.addImage("/static/over.png", "gameover");
  imageLoader.onReadyCallback = onImagesLoaded;
  imageLoader.loadImages();

  canvas = document.getElementById("gameCanvas");
  lineSpan = document.getElementById("lines");
  ctx = canvas.getContext("2d");


  previousTime = currentTime = 0;
  speed = 500;
  paused = false;

  document.onkeydown = getInput;
}

function getInput(event){
  if(!event){
    var event = window.event;
  }

  event.preventDefault();

  if(!isGameOver){
    switch(event.keyCode){
      case 37:
        if(checkMove(currentPiece.gridX - 1, currentPiece.gridY, currentPiece.currentState)){
          currentPiece.gridX--;
        }
      break;
      case 39:
        if(checkMove(currentPiece.gridX + 1, currentPiece.gridY, currentPiece.currentState)){
          currentPiece.gridX++;
        }
      break;
      case 38:
        var newState = currentPiece.currentState - 1;
        if(newState < 0){
          newState = currentPiece.states.length - 1;
        }
        if(checkMove(currentPiece.gridX, currentPiece.gridY, newState)){
          currentPiece.currentState = newState;
        }
      break;
      case 40:
        if(checkMove(currentPiece.gridX, currentPiece.gridY + 1, currentPiece.currentState)){
          currentPiece.gridY++;
        }
      break;
    }
  } else {
    initGame();
  }
}

function onImagesLoaded(event){
  blockImage = imageLoader.getImageAtIndex(0);
  backgroundImage = imageLoader.getImageAtIndex(1);
  gameOverImage = imageLoader.getImageAtIndex(2);
}

function pauseGame(){
  paused = !paused;
  if(paused === false){
    update();
  }
}

function initGame(){
  startTimer();
  var r, c;
  currentLines = 0;
  isGameOver = false;
  paused = false;

  if(gameData === undefined){
    gameData = new Array();

    for(r = 0; r < ROWS; r++){
      gameData[r] = new Array();

      for(c = 0; c < COLS; c++){
        gameData[r].push(0);
      }
    }
  } else {
    for(r = 0; r < ROWS; r++){
      for(c = 0; c < COLS; c++){
        gameData[r][c] = 0;
      }
    }
  }

  currentPiece = getRandomPiece();
  lineSpan.innerHTML = currentLines.toString();

  var requestAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimFrame;
  requestAnimationFrame(update);
}

function update(){
  if(!paused){
    currentTime = new Date().getTime();

    if(currentTime - previousTime > speed){
      if(checkMove(currentPiece.gridX, currentPiece.gridY + 1, currentPiece.currentState)){
        currentPiece.gridY += 1;
      } else {
        copyData(currentPiece);
        currentPiece = getRandomPiece();
      }

      previousTime = currentTime;
    }

    ctx.clearRect(0, 0, 320, 640);
    drawBoard();
    drawPiece(currentPiece);

    if(isGameOver === false){
      requestAnimationFrame(update);
    } else {
      ctx.drawImage(gameOverImage, 0, 0, 320, 640, 0, 0, 320, 640);
    }
  }
}

function copyData(piece){
  var xPos = piece.gridX;
  var yPos = piece.gridY;
  var state = piece.currentState;

  for(var r = 0, length = piece.states[state].length; r < length; r++){
    for(var c = 0, length2 = piece.states[state][r].length; c < length2; c++){
      if(piece.states[state][r][c] == 1 && yPos >= 0){
        gameData[yPos][xPos] = (piece.color + 1);
      }

      xPos += 1;
    }

    xPos = piece.gridX;
    yPos += 1;
  }

  checkLines();

  if(piece.gridY < 0){
    isGameOver = true;
    showModal();
    save_result();
    resetTimer();
  }
}

function checkLines(){
  var lineFound = false;
  var fullRow = true;
  var r = ROWS - 1;
  var c = COLS - 1;

  while(r >= 0){
    while(c >= 0){
      if(gameData[r][c] == 0){
        fullRow = false;
        c = -1;
      }
      c--;
    }

    if(fullRow === true){
      zeroRow(r);
      r++;
      lineFound = true;
      currentLines++;
    }

    fullRow = true;
    c = COLS - 1;
    r--;
  }

  if(lineFound){
    lineSpan.innerHTML = currentLines.toString();
    if(currentLines <= 20){
      speed = 500;
    } else if(currentLines <= 40){
      speed = 400;
    } else if(currentLines <= 50){
      speed = 300;
    } else if(currentLines <= 60){
      speed = 200;
    } else if( currentLines <= 70){
      speed = 100;
    }
  }
}

function zeroRow(row){
  var r = row;
  var c = 0;

  while(r >= 0){
    while(c < COLS){
      if(r > 0){
        gameData[r][c] = gameData[r-1][c];
      } else {
        gameData[r][c] = 0;
      }

      c++;
    }

    c = 0;
    r--;
  }
}

function drawBoard(){
  ctx.drawImage(backgroundImage, 0, 0, 320, 640, 0, 0, 320, 640);

  for(var r = 0; r < ROWS; r++){
    for(var c = 0; c < COLS; c++){
      if(gameData[r][c] != 0){
        ctx.drawImage(blockImage, (gameData[r][c] - 1) * SIZE, 0, SIZE, SIZE, c * SIZE, r * SIZE, SIZE, SIZE);
      }
    }
  }
}

function drawPiece(piece){
  var drawX = piece.gridX;
  var drawY = piece.gridY;
  var state = piece.currentState;

  for(var r = 0, length = piece.states[state].length; r < length; r++){
    for(var c = 0, length2 = piece.states[state][r].length; c < length2; c++){
      if(piece.states[state][r][c] == 1 && drawY >= 0){
        ctx.drawImage(blockImage, piece.color * SIZE, 0, SIZE, SIZE, drawX * SIZE, drawY * SIZE, SIZE, SIZE);
      }

      drawX += 1;
    }

    drawX = piece.gridX;
    drawY += 1;
  }
}

function checkMove(x, y, state){
  var result = true;
  var newX = x;
  var newY = y;

  for(var r = 0, length = currentPiece.states[state].length; r < length; r++){
    for(var c = 0, length2 = currentPiece.states[state][r].length; c < length2; c++){
      if(newX < 0 || newX >= COLS){
        result = false;
        c = length2;
        r = length;
      }

      if(gameData[newY] != undefined && gameData[newY][newX] != 0
         && currentPiece.states[state][r] != undefined && currentPiece.states[state][r][c] != 0){
           result = false;
           c = length2;
           r = length;
      }

      newX += 1;
    }

    newX = x;
    newY += 1;

    if(newY > ROWS){
      r = length;
      result = false;
    }
  }

  return result;
}


function moveLeft() {
  if (checkMove(currentPiece.gridX - 1, currentPiece.gridY, currentPiece.currentState)) {
    currentPiece.gridX--;
  }
}

function moveRight() {
  if (checkMove(currentPiece.gridX + 1, currentPiece.gridY, currentPiece.currentState)) {
    currentPiece.gridX++;
  }
}

function rotatePiece() {
  var newState = currentPiece.currentState - 1;
  if (newState < 0) {
    newState = currentPiece.states.length - 1;
  }
  if (checkMove(currentPiece.gridX, currentPiece.gridY, newState)) {
    currentPiece.currentState = newState;
  }
}


let difficultyIndex = 0;

const difficulties = [
  { name: "Легкая", speed: 500 },
  { name: "Средняя", speed: 300 },
  { name: "Сложная", speed: 150 },
];

function toggleDifficulty() {
  difficultyIndex = (difficultyIndex + 1) % difficulties.length;
  const currentDifficulty = difficulties[difficultyIndex];

  document.getElementById("current-difficulty").textContent = currentDifficulty.name;
  speed = currentDifficulty.speed;

  if (!paused) {
    previousTime = new Date().getTime();
  }
  initGame()
}


function toggleGame() {
    document.getElementById("pause-button").style.backgroundImage = !paused ? "url(/static/play.png)" : "url(/static/stop.png)";
    pauseGame();
}



async function get_data() {
  const response = await fetch(`/tetris/leaderboard/${difficulties[difficultyIndex].name}`, {
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

  const response = await fetch('/tetris/save_result', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: window.Telegram.WebApp.initData
    },
    body: JSON.stringify({
        level: difficulties[difficultyIndex].name,
        score: currentLines,
        result_time: result_time,
        entry_date: entry_date,
    })
    }
  );
  const data = await response.json();
  return data;
}


async function save_init_result() {
  const response = await fetch('/tetris/save_result', {
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
}


function renderLeaderboard(data) {
  document.getElementById('player-name').textContent = data.name;

  const leaderboardElement = document.getElementById('leaderboard');
  leaderboardElement.innerHTML = '';

  data.leaderboard.sort((a, b) => a.score - b.score);

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
          ${leader.tg_id === data.tg_id ? '<strong>' : ''}${leader.name} - ${leader.score} очков.${leader.tg_id === data.tg_id ? '</strong>' : ''}
      </span>
      `;

      leaderboardElement.appendChild(leaderRow);
  });

  document.getElementById('popup').style.display = 'block';
}



window.onload = async function () {
  await save_init_result();
  let data = await get_data();
  renderLeaderboard(data);  
  onReady();
}


closeModalButton.addEventListener('click', () => (modal.style.display = 'none'));
startGameButton.onclick = function() {
    document.getElementById('popup').style.display = "none";
    initGame();
  };

  newGameButton.onclick = function() {
    document.getElementById('modal').style.display = "none";
    initGame();
  };


function showModal() {
  const modal = document.getElementById("modal");
  const resultMessage = document.getElementById("resultMessage");
  resultMessage.innerText = `Игра окончена! Ваш результат: ${currentLines}`;
  modal.style.display = "block";
}
eruda.init();