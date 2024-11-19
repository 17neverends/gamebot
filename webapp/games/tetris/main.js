var ROWS = 20;
var COLS = 10;
var SIZE = 32;

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

window.onload = onReady;

document.body.addEventListener("touchstart", function(event){
  event.preventDefault();

  touchX = event.touches[0].pageX;
  touchY = event.touches[0].pageY;
  touchId = event.touches[0].identifier;
});

document.body.addEventListener("touchmove", function(event){
  event.preventDefault();

  var yDiff = event.touches[0].pageY - touchY;

  if(yDiff > 60){
    if(checkMove(currentPiece.gridX, currentPiece.gridY + 1, currentPiece.currentState)){
      currentPiece.gridY++;
    }
  }
});

document.body.addEventListener("touchend", function(event){
  event.preventDefault();

  var touchEndX;
  var touchEndY;

  var touch = event.changedTouches.item(0);

  try{
    touchEndX = touch.pageX;
    touchEndY = touch.pageY;

  } catch(error) {
    alert(error);
    return;
  }

  var diffX = Math.abs(touchEndX - touchX);
  var diffY = Math.abs(touchEndY - touchY);

  if(diffX < 10 && diffY < 10){
    var newState = currentPiece.currentState - 1;
    if(newState < 0){
      newState = currentPiece.states.length - 1;
    }
    if(checkMove(currentPiece.gridX, currentPiece.gridY, newState)){
      currentPiece.currentState = newState;
    }
  }
  else{
    if(diffX > diffY){
      if(touchEndX < touchX){
        if(checkMove(currentPiece.gridX - 1, currentPiece.gridY, currentPiece.currentState)){
          currentPiece.gridX--;
        }
      }
      else{
        if(checkMove(currentPiece.gridX + 1, currentPiece.gridY, currentPiece.currentState)){
          currentPiece.gridX++;
        }
      }
    }
  }
});

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