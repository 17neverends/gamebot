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
    "ru": """Привет! Добро пожаловать в PlayInChat! 🎮\nЗдесь ты можешь играть в любимые игры через чат без скачивания и установки. Играй в Судоку, Тетрис, 3 в ряд, Крестики-нолики и другие игры прямо здесь и сейчас!\n<b>Выбери игру, чтобы начать!</b>""",
    "gb": """Hello! Welcome to PlayInChat! 🎮\nHere you can play your favorite games through the chat without any downloads. Enjoy games like Sudoku, Tetris, 3 in a Row, Tic Tac Toe, and more right here, right now!\n<b>Choose a game to get started</b>""",
    "in": """नमस्ते! PlayInChat में आपका स्वागत है! 🎮\nयहां आप बिना कोई डाउनलोड किए अपने पसंदीदा खेलों को चैट के माध्यम से खेल सकते हैं। सुडोकू, टेट्रिस, 3 इन ए रो, क्रॉस और नोल और अन्य खेलों का आनंद लें!\n<b>खेल शुरू करने के लिए खेल का चयन करें।</b>"""
}


games_text = {
    "ru": """Выбери игру, которая тебе нравится!\n1️⃣ 3 в ряд — Соединяй одинаковые элементы и проходи уровни.\n2️⃣ Судоку — Разгадай числовые головоломки.\n3️⃣ Крестики-нолики — Побеждай в классической игре!\n4️⃣ Сапер — Опасайся мин и открывай клетки!\n5️⃣ Тетрис — Лови блоки и строй линии!\n6️⃣ Пятнашки — Уложи плитки в правильном порядке.\n7️⃣ Вордли — Угадай слово за 6 попыток!""",
    "gb": """Which game would you like to play?\n1️⃣ 3 in a Row — Match similar elements and pass levels.\n2️⃣ Sudoku — Solve number puzzles.\n3️⃣ Tic Tac Toe — Play the classic game!\n4️⃣ Minesweeper — Avoid mines and open areas!\n5️⃣ Tetris — Fit blocks and create lines.\n6️⃣ Fifteen — Arrange tiles in the right order.\n7️⃣ Wordle — Guess the word in 6 attempts!""",
    "in": """आप कौन सी खेल खेलना चाहते हैं?\n1️⃣ 3 इन ए रो — समान तत्वों को जोड़ें और स्तरों को पार करें।\n2️⃣ सुडोकू — संख्याओं के साथ पहेलियाँ हल करें।\n3️⃣ क्रॉस और नोल — पारंपरिक खेल को खेलें!\n4️⃣ सैपर — खदानों से बचें और क्षेत्र खोलें!\n5️⃣ टेट्रिस — घटकों को फिट करें और लाइनों को बनाएं।\n6️⃣ फिफ्टीन — टाइल्स को सही क्रम में रखें।\n7️⃣ वर्डली — शब्द का अनुमान 6 प्रयासों में लगाएं!अपनी पसंदीदा खेल का नंबर या नाम लिखें।"""
}


games_description = {
    "1": {
        "ru": """3 в ряд — это классическая головоломка, в которой вам нужно соединить три одинаковых элемента или более, чтобы пройти уровень. Игра становится всё сложнее по мере прохождения уровней, но это только делает её интереснее!✨ Совет: Ищите скрытые комбинации, чтобы быстрее пройти уровни.""",
        "gb": """3 in a Row is a classic puzzle game where you need to match three or more similar elements to pass a level. The game gets more challenging as you progress, but that only makes it more fun!✨ Tip: Look for hidden combinations to progress faster.""",
        "in": """3 इन ए रो एक मजेदार और सरल खेल है, जिसमें आपको तीन या उससे अधिक समान तत्वों को जोड़ना होता है। जैसे-जैसे आप स्तरों को पार करते जाएंगे, खेल और भी कठिन होता जाएगा!✨ सुझाव: छिपे हुए संयोजनों को ढूंढें और खेल में तेजी से प्रगति करें।"""
    }
}

open_game_text = {
    "ru": "Открыть игру",
    "gb": "Open game",
    "in": "खेल खोलें"
}


value_error_text = {
    "ru": f"Выберите значение от 1 до {len(games_dict)}",
    "gb": f"Select a value between 1 and {len(games_dict)}",
    "in": f"1 से {len(games_dict)} के बीच का वैल्यू चुनें"
}