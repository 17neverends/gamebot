const boardElement = document.getElementById('board');
        const modal = document.getElementById('modal');
        const modalText = document.getElementById('modal-text');

        let board = Array(9).fill(null);
        let currentPlayer = 'X';

        function startGame() {
            modal.style.display = 'none';
            renderBoard();
        }

        function renderBoard() {
            boardElement.innerHTML = '';
            board.forEach((cell, index) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                if (cell) {
                    cellElement.classList.add('taken');
                    cellElement.textContent = cell;
                }
                cellElement.addEventListener('click', () => handleMove(index));
                boardElement.appendChild(cellElement);
            });
        }

        function handleMove(index) {
            if (board[index]) return;
            board[index] = currentPlayer;
            if (checkWin(currentPlayer)) {
                endGame(`${currentPlayer} победил!`);
                return;
            }
            if (board.every(cell => cell)) {
                endGame('Ничья!');
                return;
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') botMove();
        }

        function botMove() {
            let availableMoves = board.map((cell, index) => cell ? null : index).filter(index => index !== null);
            let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            board[randomMove] = 'O';
            if (checkWin('O')) {
                endGame('O победил!');
                return;
            }
            if (board.every(cell => cell)) {
                endGame('Ничья!');
                return;
            }
            currentPlayer = 'X';
            renderBoard();
        }

        function checkWin(player) {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]            
            ];
            return winPatterns.some(pattern =>
                pattern.every(index => board[index] === player)
            );
        }

        function endGame(message) {
            modalText.textContent = message;
            modal.style.display = 'flex';
            modal.querySelector('button').textContent = 'Играть снова';
            modal.querySelector('button').onclick = () => {
                board = Array(9).fill(null);
                currentPlayer = 'X';
                startGame();
            };
        }

        renderBoard();