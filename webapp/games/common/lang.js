import { new_game_text, start_game_text, result_title_text } from "./localize.js";


const urlParams = new URLSearchParams(window.location.search);
export const lang = urlParams.get('lang');


const resultTitle = document.getElementById('resultTitle');
const newGameButton = document.getElementById('newGameButton');
const startGameButton = document.getElementById('start-game-button');

resultTitle.textContent = result_title_text[lang];
newGameButton.textContent = new_game_text[lang];
startGameButton.textContent = start_game_text[lang];