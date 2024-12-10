import { keyboard_text, enter_text, delete_text } from "/games/common/localize.js";

let container = document.getElementById("keyboard-container");
const urlParams = new URLSearchParams(window.location.search);
export const lang = urlParams.get('lang');

const part = Math.floor(keyboard_text[lang].length / 2.5);

for (let i = 0; i < 3; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("keyboard-row");

    if (i === 1) {
        const space = document.createElement("div");
        space.classList.add("spacer-half");
        rowDiv.appendChild(space);
    }

    for (let j = 0; j < part; j++) {
        if (i === 2 && j === 0) {
            const enterButton = document.createElement("button");
            enterButton.classList.add("wide-button");
            enterButton.id = "enter";
            enterButton.dataset.key = "enter";
            enterButton.textContent = enter_text[lang];
            rowDiv.appendChild(enterButton);
        }

        if (i < 2 || j < part - 1) {
            const button = document.createElement("button");
            const button_value = keyboard_text[lang][i * part + j];
            button.dataset.key = button_value;
            button.classList.add("keyboard-button");
            button.textContent = button_value;
            rowDiv.appendChild(button);
        }

        if (i === 2 && j === part - 1) {
            const delButton = document.createElement("button");
            delButton.classList.add("wide-button");
            delButton.id = "del";
            delButton.dataset.key = "del";
            delButton.textContent = delete_text[lang];
            rowDiv.appendChild(delButton);
        }
    }

    if (i === 1) {
        const space = document.createElement("div");
        space.classList.add("spacer-half");
        rowDiv.appendChild(space);
    }

    container.appendChild(rowDiv);
}
