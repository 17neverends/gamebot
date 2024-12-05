from bot.utils.games import games_dict


start_keyboard_text = {
    "message_text": "Выберите язык",
    "button_text": {
        "ru": "Русский 🇷🇺",
        "gb": "English 🇬🇧",
        "in": "हाय 🇮🇳"
    }
}
    

welcome_text = {
    "ru": "Привет! Добро пожаловать в PlayInChat! 🎮\n\nЗдесь ты можешь играть в любимые игры через чат без скачивания и установки. Играй в Судоку, Тетрис, 3 в ряд, Крестики-нолики и другие игры прямо здесь и сейчас!\n\n<b>Выбери игру, чтобы начать!</b>",
    "gb": "Hello! Welcome to PlayInChat! 🎮\n\nHere you can play your favorite games through the chat without any downloads. Enjoy games like Sudoku, Tetris, 3 in a Row, Tic Tac Toe, and more right here, right now!\n\n<b>Choose a game to get started</b>",
    "in": "नमस्ते! PlayInChat में आपका स्वागत है! 🎮\n\nयहां आप बिना कोई डाउनलोड किए अपने पसंदीदा खेलों को चैट के माध्यम से खेल सकते हैं। सुडोकू, टेट्रिस, 3 इन ए रो, क्रॉस और नोल और अन्य खेलों का आनंद लें!\n\n<b>खेल शुरू करने के लिए खेल का चयन करें।</b>"
}


games_text = {
    "ru": "Выбери игру, которая тебе нравится!\n\n1️⃣ 3 в ряд — Соединяй одинаковые элементы и проходи уровни.\n\n2️⃣ Судоку — Разгадай числовые головоломки.\n\n3️⃣ Крестики-нолики — Побеждай в классической игре!\n\n4️⃣ Сапер — Опасайся мин и открывай клетки!\n\n5️⃣ Тетрис — Лови блоки и строй линии!\n\n6️⃣ Пятнашки — Уложи плитки в правильном порядке.\n\n7️⃣ Вордли — Угадай слово за 6 попыток!\n\nНапиши номер игры или её название.",
    "gb": "Which game would you like to play?\n\n1️⃣ 3 in a Row — Match similar elements and pass levels.\n\n2️⃣ Sudoku — Solve number puzzles.\n\n3️⃣ Tic Tac Toe — Play the classic game!\n\n4️⃣ Minesweeper — Avoid mines and open areas!\n\n5️⃣ Tetris — Fit blocks and create lines.\n\n6️⃣ Fifteen — Arrange tiles in the right order.\n\n7️⃣ Wordle — Guess the word in 6 attempts!\n\nType the number of the game or its name.",
    "in": "आप कौन सी खेल खेलना चाहते हैं?\n\n1️⃣ 3 इन ए रो — समान तत्वों को जोड़ें और स्तरों को पार करें।\n\n2️⃣ सुडोकू — संख्याओं के साथ पहेलियाँ हल करें।\n\n3️⃣ क्रॉस और नोल — पारंपरिक खेल को खेलें!\n\n4️⃣ सैपर — खदानों से बचें और क्षेत्र खोलें!\n\n5️⃣ टेट्रिस — घटकों को फिट करें और लाइनों को बनाएं।\n\n6️⃣ फिफ्टीन — टाइल्स को सही क्रम में रखें।\n\n7️⃣ वर्डली — शब्द का अनुमान 6 प्रयासों में लगाएं!अपनी पसंदीदा खेल का नंबर या नाम लिखें।\n\n खेल की संख्या या उसका नाम लिखें"
}


games_description = {
    "match": {
        "ru": "3 в ряд — это классическая головоломка, в которой вам нужно соединить три одинаковых элемента или более, чтобы пройти уровень. Игра становится всё сложнее по мере прохождения уровней, но это только делает её интереснее!✨ Совет: Ищите скрытые комбинации, чтобы быстрее пройти уровни.",
        "gb": "3 in a Row is a classic puzzle game where you need to match three or more similar elements to pass a level. The game gets more challenging as you progress, but that only makes it more fun!✨ Tip: Look for hidden combinations to progress faster.",
        "in": "3 इन ए रो एक मजेदार और सरल खेल है, जिसमें आपको तीन या उससे अधिक समान तत्वों को जोड़ना होता है। जैसे-जैसे आप स्तरों को पार करते जाएंगे, खेल और भी कठिन होता जाएगा!✨ सुझाव: छिपे हुए संयोजनों को ढूंढें और खेल में तेजी से प्रगति करें।"
    }, 
    "sudoku": {
        "ru": "Судоку — популярная головоломка, в которой нужно заполнить сетку 9x9 числами, так чтобы в каждой строке, столбце и 3x3 блоке не повторялись одинаковые числа.🧠 Совет: Начни с самых очевидных чисел и постепенно переходи к более сложным.",
        "gb": "Sudoku is a popular puzzle game where you need to fill a 9x9 grid with numbers such that no number repeats in any row, column, or 3x3 block.🧠 Tip: Start with the easiest numbers and then focus on the harder sections.",
        "in": "सुडोकू एक लोकप्रिय पहेली खेल है जिसमें आपको 9x9 ग्रिड को संख्याओं से भरना होता है, ताकि हर पंक्ति, स्तंभ और 3x3 ब्लॉक में कोई भी संख्या न दोहराए।🧠 सुझाव: सबसे आसान अंक भरें और फिर कठिन हिस्सों पर ध्यान दें।"
    },
    "tiktaktoe": {
        "ru": "Крестики-нолики — классическая игра, в которой нужно расставить три одинаковых символа в ряд. Игра закончена, когда один из игроков выигрывает или все клетки заняты.🏆 Совет: Захватывай центральную клетку, это увеличивает шансы на победу!",
        "gb": "Tic Tac Toe is a classic game where you need to line up three identical symbols. The game ends when one player wins or all the boxes are filled.🏆 Tip: Try to capture the central box — it increases your chances of winning!",
        "in": "क्रॉस और नोल एक सरल खेल है जिसमें आपको तीन समान चिन्हों को एक पंक्ति में जोड़ना होता है। खेल तब समाप्त होता है जब एक खिलाड़ी जीतता है या सभी बॉक्स भर जाते हैं।🏆 सुझाव: केंद्रीय बॉक्स को कब्जा करने की कोशिश करें, इससे जीतने के अवसर बढ़ते हैं!"
    },
    "minisweeper": {
        "ru": "Сапер — это игра, в которой нужно открывать клетки, избегая мин. Каждый ход позволяет узнать, сколько мин находится рядом с выбранной клеткой. Используй стратегию, чтобы избежать взрывов.💣 Совет: Сначала открывай безопасные клетки и работай от них дальше!",
        "gb": "Minesweeper is a game where you need to open cells while avoiding mines. Each move gives you a clue about how many mines are adjacent to the chosen cell.💣 Tip: Start by opening safe cells and work from there!",
        "in": "सैपर एक खेल है जिसमें आपको खानों से बचते हुए बॉक्स खोलने होते हैं। हर कदम से यह पता चलता है कि किसी बॉक्स के पास कितनी खनाएं हैं।💣 सुझाव: पहले सुरक्षित बॉक्स खोलें और फिर उनके आधार पर रणनीति बनाएं!"
    },
    "tetris": {
        "ru": "Тетрис — классическая аркадная игра, в которой нужно располагать падающие блоки так, чтобы они заполнили горизонтальные линии. Каждая линия, которая заполняется, исчезает, давая место новым блокам.🔲 Совет: Старайтесь создавать полные линии для максимального набора очков.",
        "gb": "Tetris is a classic arcade game where you need to position falling blocks to complete horizontal lines. Each line you complete disappears, making space for new blocks.🔲 Tip: Try to create full lines for maximum points. ",
        "in": "टेट्रिस एक क्लासिक आर्केड खेल है जिसमें आपको गिरते हुए ब्लॉकों को इस तरह से रखना होता है कि वे क्षैतिज लाइनों को भरें। हर भरी हुई लाइन गायब हो जाती है और नई लाइनों के लिए जगह मिलती है।🔲 सुझाव: अधिक अंक प्राप्त करने के लिए पूरी लाइनें बनाने का प्रयास करें।"
    },
    "spotting": {
        "ru": "Пятнашки — это головоломка, в которой нужно расположить плитки с числами в правильном порядке. Ты должен перемещать плитки, пока не получишь правильное расположение.✨ Совет: Сначала расставь плитки с номерами, которые находятся ближе к нужному месту.",
        "gb": "Fifteen is a puzzle game where you need to arrange numbered tiles in the correct order. You must move tiles until they are in the right place.✨ Tip: Start by arranging the tiles that should be in their correct places first.",
        "in": "फिफ्टीन एक पहेली खेल है जिसमें आपको टाइल्स को सही क्रम में रखना होता है। आपको टाइल्स को इस तरह से स्थानांतरित करना होगा कि उनका सही स्थान मिल सके।✨ सुझाव: पहले उन टाइल्स को सेट करें जो पहले सही जगह पर होनी चाहिए।"
    },
    "wordle": {
        "ru": "Вордли — это игра на угадывание слов. У тебя есть 6 попыток, чтобы угадать 5-буквенное слово. Каждый раз, когда ты угадываешь букву правильно, она подсвечивается.🔠 Совет: Используй слова, которые содержат много гласных, чтобы быстрее сократить список возможных вариантов.",
        "gb": "Wordle is a word-guessing game. You have 6 attempts to guess a 5-letter word. Every time you guess a correct letter, it is highlighted.🔠 Tip: Use words with many vowels to quickly narrow down the possibilities.",
        "in": "वर्डली एक शब्द अनुमान खेल है। आपके पास 6 प्रयास होते हैं ताकि आप 5-अक्षरी शब्द का अनुमान लगा सकें। हर बार जब आप सही अक्षर अनुमानित करते हैं, तो वह हाइलाइट हो जाता है।🔠 सुझाव: ऐसे शब्दों का उपयोग करें जिनमें अधिक स्वर हों, ताकि आप संभावनाओं को जल्दी से सीमित कर सकें।"
    }
}

open_game_text = {
    "ru": "Открыть игру",
    "gb": "Open game",
    "in": "खेल खोलें"
}


value_error_text = {
    "ru": f"Выберите значение от 1 до {len(games_dict)} или введите название",
    "gb": f"Select a value between 1 and {len(games_dict)} or enter the name",
    "in": f"1 से {len(games_dict)} के बीच का वैल्यू चुनें या नाम दर्ज करें"
}


back_event = {
    "ru": "Назад",
    "gb": "Back",
    "in": "बैक"
}
