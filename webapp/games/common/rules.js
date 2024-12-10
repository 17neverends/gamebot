import { enter_text, delete_text, rules_points_text, continue_text, rules_text } from "./localize.js";


const urlParams = new URLSearchParams(window.location.search);
export const lang = urlParams.get('lang');


const enterButton = document.getElementById('enter');
const delButton = document.getElementById('del');
const rulesTitle = document.getElementById('rulesTitle');
const continueTitle = document.getElementById('continueGame');

enterButton.textContent = enter_text[lang];
delButton.textContent = delete_text[lang];
rulesTitle.textContent = rules_text[lang];
continueTitle.textContent = continue_text[lang];

for (let i = 0; i < rules_points_text.length; i++) {
    document.getElementById(`rules-${i+1}`).innerText = rules_points_text[i+1][lang];
}