export const game_name_text = {
    "tetris": {
        "ru": "Тетрис",
        "gb": "Tetris",
        "in": "टेट्रिस"
    },
    "minisweeper": {
        "ru": "Сапёр",
        "gb": "Minesweeper",
        "in": "माइन स्वीपर"
    },
    "wordle": {
        "ru": "Вордли",
        "gb": "Wordle",
        "in": "वोर्डल"
    },
    "sudoku": {
        "ru": "Судоку",
        "gb": "Sudoku",
        "in": "सुडोकू"
    },
    "spotting": {
        "ru": "Пятнашки",
        "gb": "Spotting",
        "in": "स्पॉटिंग"
    },
    "tiktaktoe": {
        "ru": "Крестики-нолики",
        "gb": "Tic Tac Toe",
        "in": "टिक टैक टॉइ"
    }
}


export const congratilations_text = {
    "ru": "Поздравляем!",
    "gb": "Congratulations!",
    "in": "बिलकुल!"
}

export const new_game_text = {
    "ru": "Новая игра",
    "gb": "New game",
    "in": "नया खेल"
}

export const start_game_text = {
    "ru": "Начать игру",
    "gb": "Start game",
    "in": "खेल शुरू करें"
}

export const won_text = {
    "ru": "победил!",
    "gb": "won!",
    "in": "जीता!"
}

export const draw_text = {
    "ru": "Ничья!",
    "gb": "Draw!",
    "in": "निश्चित!"
}

export const enemy_win = {
    "ru": "O победил!",
    "gb": "O won!",
    "in": "O जीता!"
}

export const empty_leaderboard_text = {
    "ru": "Таблица лидеров пуста",
    "gb": "Leaderboard is empty",
    "in": "लीडरबोर्ड खाली है"
}

export const result_title_text = {
    "ru": "Результат игры",
    "gb": "Result game",
    "in": "परिणाम खेल"
}

export const seconds_text = {
    "ru": "сек",
    "gb": "sec",
    "in": "सेकंड"
}

export const welcome_text = {
    "ru": "Добро пожаловать в PlayInChat🎮, ",
    "gb": "Welcome to PlayInChat🎮, ",
    "in": "PlayInChat में स्वागत है🎮, "
}

export const difficulty_text = {
    "ru": "Сложность",
    "gb": "Difficulty",
    "in": "विशेषता"
}

export const flags_text = {
    "ru": "Флажков",
    "gb": "Flags",
    "in": "चिह्न"
}

export const difficulty_ranking_text = {
    "easy": {
        "ru": "Легкая",
        "gb": "Easy",
        "in": "साधारण"
    },
    "medium": {
        "ru": "Средняя",
        "gb": "Medium",
        "in": "मध्य"
    },
    "hard": {
        "ru": "Сложная",
        "gb": "Hard",
        "in": "बड़ा"
    }
}

export const points_text = {
    "ru": "очков",
    "gb": "points",
    "in": "पॉइंट्स"
}

export function getWinMessage(time_count, count_changes) { 
    return {
        "ru": `Вы победили! Время: ${(new Date() - time_count) / 1000} секунд, количество ходов: ${count_changes}`,
        "gb": `You won! Time: ${(new Date() - time_count) / 1000} seconds, number of moves: ${count_changes}`,
        "in": `आप जीते हैं! समय: ${(new Date() - time_count) / 1000} सेकंड, संख्या चलाव: ${count_changes}`
    }
}


export function getWinMessageSudoku(time_count) { 
    return {
        "ru": `Вы победили! Время: ${(new Date() - time_count) / 1000} секунд`,
        "gb": `You won! Time: ${(new Date() - time_count) / 1000} seconds`,
        "in": `आप जीते हैं! समय: ${(new Date() - time_count) / 1000} सेकंड`
    }
}


export function getWinMessageTetris(currentLines) {
    return {
        "ru": `Игра окончена! Ваш результат: ${currentLines}`,
        "gb": `Game over! Your result: ${currentLines}`,
        "in": `खेल अंतिम हो गया है! आपका परिणाम: ${currentLines}`
    }
}