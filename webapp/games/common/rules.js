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

for (let i = 0; i < Object.keys(rules_points_text).length; i++) {
    console.log(rules_points_text[`${i+1}`][lang]);
    document.getElementById(`rules-${i+1}`).innerHTML = rules_points_text[`${i+1}`][lang];
}