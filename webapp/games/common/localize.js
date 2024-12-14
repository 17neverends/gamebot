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

export const minesweeper_ranking_text = {
    "Легкая": {
        "ru": "Легкая",
        "gb": "Easy",
        "in": "साधारण"
    },
    "Средняя": {
        "ru": "Средняя",
        "gb": "Medium",
        "in": "मध्य"
    },
    "Сложная": {
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

export const rules_text = {
    "ru": "Правила игры",
    "gb": "Game rules",
    "in": "खेल के नियम"
}

export const continue_text = {
    "ru": "Продолжить игру",
    "gb": "Continue game",
    "in": "खेल जारी रखें"
}

export const rules_points_text = {
    "1": {
        "ru": "Слово состоит из 5 букв.",
        "gb": "The word is made up of 5 letters.",
        "in": "शब्द 5 अक्षरों का है।"
    },
    "2": {
        "ru": "Каждая буква может быть использована только один раз.",
        "gb": "Each letter can be used only once.",
        "in": "अक्षर को पहले से पहला जा सकता है।"
    },
    "3": {
        "ru": "Правильные буквы выделены зеленым цветом.",
        "gb": "The correct letters are highlighted in green.",
        "in": "सही अक्षरों को लाल रंग में लिखा जाता है।"
    },
    "4": {
        "ru": "Буквы, входящие в слово, но не своей позиции, выделены желтым цветом.",
        "gb": "Letters that are in the word but not in the correct position are highlighted in yellow.",
        "in": "शब्द में होने वाले अक्षरों को लाल रंग में लिखा जाता है।"
    },
    "5": {
        "ru": "Если слово не угадано за 6 попыток, игра заканчивается.",
        "gb": "If the word is not guessed within 6 attempts, the game ends.",
        "in": "6 प्रयास के बाद शब्द नहीं मिला, खेल समाप्त हो जाता है।"
    }
}

export const enter_text = {
    "ru": "Ввод",
    "gb": "Enter",
    "in": "एंटर"
}

export const delete_text = {
    "ru": "Удалить",
    "gb": "Delete",
    "in": "डिलीट"
}

export const wordle_lost_status = {
    "ru": "Вы проиграли! Правильное слово:",
    "gb": "You lost! Correct word:",
    "in": "आप लोस हो गया है! सही शब्द:"
}

export const wordle_win_status = {
    "ru": "Поздравляем! Вы угадали слово!",
    "gb": "Congratulations! You guessed the word!",
    "in": "बधाई हो! आपको शब्द मिला!"
}

export const wordle_dict_error_text = {
    "ru": "Слово не найдено в словаре!",
    "gb": "Word not found in dictionary!",
    "in": "शब्द डिक्शनारी में नहीं मिला!"
}

export const score_text_new = {
    "ru": "Счет",
    "gb": "Score",
    "in": "स्कोर"
}

export const score_text = {
    "ru": "Счет",
    "gb": "Score",
    "in": "स्कोर"
}


export const wordle_size_error_text = {
    "ru": "Слово должно состоять из 5 букв",
    "gb": "Word should be made up of 5 letters",
    "in": "शब्द 5 अक्षरों का है।"
}

export const keyboard_text = {
    "ru": "йцукенгшщзхъфывапролджэячсмитьбю",
    "gb": "qwertyuiopasdfghjklzxcvbnm",
    "in": "अआइईउऊऋएऐओऔअंअःकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह"
}
