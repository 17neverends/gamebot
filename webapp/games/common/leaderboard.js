import { welcome_text, seconds_text } from "/games/common/localize.js";
import { lang } from "/games/common/lang.js";


export function renderLeaderboard(data) {
    document.getElementById('player-name').textContent = `${welcome_text[lang]}${data.name}!`;
  
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
            ${leader.tg_id === data.tg_id ? '<strong>' : ''}${leader.name} - ${leader.result_time} ${seconds_text[lang]}.${leader.tg_id === data.tg_id ? '</strong>' : ''}
        </span>
        `;
  
        leaderboardElement.appendChild(leaderRow);
    });
    if (data.leaderboard.length === 0) {
        const leaderRow = document.createElement('div');
        leaderRow.classList.add('leader-row');
        leaderRow.innerHTML = `<span class="leader-name">${empty_leaderboard_text[lang]}</span>`;
        leaderboardElement.appendChild(leaderRow);
    }
  
    document.getElementById('popup').style.display = 'block';
  }