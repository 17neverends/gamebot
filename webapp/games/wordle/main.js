document.addEventListener("DOMContentLoaded", () => {
    
  let timerInterval;
  let startTime;
  let name;
  let tg_id;
  let entry_date = new Date().toISOString(); 

  let guessedWords = [[]];
  let availableSpace = 1;
  const dictionary = [
    "ПОРОХ",
    "МОСТЫ",
    "МАРИЯ",
    "ГОРОД",
    "ПОЛКА",
  ];

  let word = dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();
  let guessedWordCount = 0;

  const keys = document.querySelectorAll(".keyboard-row button");

  function getCurrentWordArr() {
    const numberOfGuessedWords = guessedWords.length;
    return guessedWords[numberOfGuessedWords - 1];
  }

  function updateGuessedWords(letter) {
    const currentWordArr = getCurrentWordArr();

    if (currentWordArr && currentWordArr.length < 5) {
      currentWordArr.push(letter);

      const availableSpaceEl = document.getElementById(String(availableSpace));

      availableSpace = availableSpace + 1;
      availableSpaceEl.textContent = letter;
    }
  }

  function getTileColor(letter, index) {
    const isCorrectLetter = word.includes(letter);

    if (!isCorrectLetter) {
      return "rgb(58, 58, 60)";
    }

    const letterInThatPosition = word.charAt(index);
    const isCorrectPosition = letter === letterInThatPosition;

    if (isCorrectPosition) {
      return "rgb(83, 141, 78)";
    }

    return "rgb(181, 159, 59)";
  }

  function handleSubmitWord() {
    const currentWordArr = getCurrentWordArr();
    if (currentWordArr.length !== 5) {
      window.alert("Слово должно состоять из 5 букв");
      return;
    }

    const currentWord = currentWordArr.join("");

    if (!dictionary.includes(currentWord)) {
      window.alert("Слово не найдено в словаре!");
      return;
    }

    const firstLetterId = guessedWordCount * 5 + 1;
    const interval = 200;
    currentWordArr.forEach((letter, index) => {
      setTimeout(() => {
        const tileColor = getTileColor(letter, index);

        const letterId = firstLetterId + index;
        const letterEl = document.getElementById(letterId);
        letterEl.classList.add("animate__flipInX");
        letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
      }, interval * index);
    });

    guessedWordCount += 1;

    if (currentWord === word) {
      showModal("Поздравляем! Вы угадали слово!", true);
      save_result(true);
      return;
    }

    if (guessedWords.length === 6) {
      showModal(`Вы проиграли! Правильное слово: ${word}`, false);
      save_result(false);
      return;
    }

    guessedWords.push([]);
  }

  function createSquares() {
    const gameBoard = document.getElementById("board");

    for (let index = 0; index < 30; index++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.classList.add("animate__animated");
      square.setAttribute("id", index + 1);
      gameBoard.appendChild(square);
    }
  }

  function handleDeleteLetter() {
    const currentWordArr = getCurrentWordArr();
    const removedLetter = currentWordArr.pop();

    guessedWords[guessedWords.length - 1] = currentWordArr;

    const lastLetterEl = document.getElementById(String(availableSpace - 1));

    lastLetterEl.textContent = "";
    availableSpace = availableSpace - 1;
  }

  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const letter = target.getAttribute("data-key");

      if (letter === "enter") {
        handleSubmitWord();
        return;
      }

      if (letter === "del") {
        handleDeleteLetter();
        return;
      }

      updateGuessedWords(letter.toUpperCase());
    };
  }
  document.getElementById('restart-button').onclick = function() {
    document.getElementById('modal').style.display = "none";
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
  
  
  function showModal(message, isVictory) {
    const modal = document.getElementById("modal");
    const resultMessage = document.getElementById("resultMessage");
    resultMessage.innerText = message;
    modal.style.display = "block";
  
    const modalClass = isVictory ? "victory" : "defeat";
    modal.classList.remove("victory", "defeat");
    modal.classList.add(modalClass);
    resetTimer();
  }
  
  document.getElementById("closeModal").onclick = () => {
    document.getElementById("modal").style.display = "none";
  };
  
  
  
  function resetGame() {
    const gameBoard = document.getElementById("board");
    gameBoard.innerHTML = "";
    createSquares();  
    guessedWords = [[]];
    availableSpace = 1;
    guessedWordCount = 0;
  
    resetTimer();
    startTimer();
  
    word = dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();
  
    document.getElementById("modal").style.display = "none";
  }
  
  document.getElementById("newGameButton").onclick = resetGame;
  document.getElementById("restart-button").onclick = resetGame;
  document.getElementById("start-game-button").onclick = resetGame;


  async function get_data() {
    const response = await fetch(`/wordle/leaderboard`, {
      method: 'GET',
      headers: {
          Authorization: window.Telegram.WebApp.initData
      },
    });
    const data = await response.json();
    return data;
  }
  
  
  async function save_result(status) { 
    status = status ? "win" : "lose";
    const result_time = (Date.now() - startTime) / 1000;
    const response = await fetch('/wordle/save_result', {
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
    const response = await fetch('/wordle/save_result', {
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
    let data = await get_data();
    renderLeaderboard(data); 
    createSquares();
  };


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
});





