import { keyboard_text, enter_text, delete_text } from "/games/common/localize.js";

let container = document.getElementById("keyboard-container");
const urlParams = new URLSearchParams(window.location.search);
export const lang = urlParams.get('lang');


const part = keyboard_text[lang].length / 2.5;

for (let i = 0; i < 3; i++) {
    const rowDiv = document.createElement("keyboard-row");
    rowDiv.classList.add("keyboard-row");
    if (i === 1) {
        const space = document.createElement("div");
        space.classList.add("spacer-half");
        rowDiv.appendChild(button);
    }

    for (let j = 0; j < part; j++) {
        if (i === 2) {
            const button = document.createElement("button");
            button.classList.add("wide-button");
            const button_value = "enter";
            button.id = button_value;
            button.dataset.key = button_value;
            button.textContent = enter_text[lang];
            rowDiv.appendChild(button);
        }
        const button = document.createElement("button");
        let button_value = keyboard_text[lang][i * part + j];
        button.dataset.key = button_value;
        button.classList.add("keyboard-button");
        button.textContent = button_value;
        rowDiv.appendChild(button);
        if (i === 2) {
            const button = document.createElement("button");
            button.classList.add("wide-button");
            const button_value = "del";
            button.id = button_value;
            button.dataset.key = button_value;
            button.textContent = delete_text[lang];
            rowDiv.appendChild(button);

        }
    }
    if (i === 1) {
        const space = document.createElement("div");
        space.classList.add("spacer-half");
        rowDiv.appendChild(button);
    }
    container.appendChild(rowDiv);
}   