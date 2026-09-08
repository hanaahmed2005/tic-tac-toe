document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // GAME ELEMENTS
    // =====================================================

    const cells = document.querySelectorAll(".cell");

    const gameBoard = document.getElementById("game-board");

    const turnText = document.getElementById("turn-text");

    const gameMessage = document.getElementById("game-message");

    const resetButton = document.getElementById("reset-button");

    const resultModal = document.getElementById("result-modal");

    const resultIcon = document.getElementById("result-icon");

    const resultTitle = document.getElementById("result-title");

    const resultDescription =
        document.getElementById("result-description");

    const playAgainButton =
        document.getElementById("play-again-button");

    const playerX =
        document.querySelector(".player-x");

    const playerO =
        document.querySelector(".player-o");


    // =====================================================
    // GAME VARIABLES
    // =====================================================

    // 9 cells = 9 values
    let board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    let currentPlayer = "X";

    let gameActive = true;


    // =====================================================
    // WINNING COMBINATIONS
    // =====================================================

    const winningCombinations = [

        [0, 1, 2],

        [3, 4, 5],

        [6, 7, 8],

        [0, 3, 6],

        [1, 4, 7],

        [2, 5, 8],

        [0, 4, 8],

        [2, 4, 6]

    ];


    // =====================================================
    // CELL CLICK
    // =====================================================

    cells.forEach(function (cell) {

        cell.addEventListener("click", function () {

            const index = Number(cell.dataset.index);

            // Don't allow clicking occupied cells
            if (board[index] !== "" || !gameActive) {
                return;
            }

            // Add current player's symbol
            board[index] = currentPlayer;

            cell.classList.add(
                currentPlayer.toLowerCase(),
                "filled"
            );

            cell.disabled = true;

            // Check game result
            checkGameResult();

        });

    });


    // =====================================================
    // CHECK GAME RESULT
    // =====================================================

    function checkGameResult() {

        let winningCombination = null;

        // Check for winner
        for (
            let i = 0;
            i < winningCombinations.length;
            i++
        ) {

            const combination = winningCombinations[i];

            const first = board[combination[0]];

            const second = board[combination[1]];

            const third = board[combination[2]];


            if (
                first !== "" &&
                first === second &&
                second === third
            ) {

                winningCombination = combination;

                break;
            }

        }


        // =================================================
        // WINNER
        // =================================================

        if (winningCombination) {

            gameActive = false;

            highlightWinner(winningCombination);

            showWinner(currentPlayer);

            return;
        }


        // =================================================
        // DRAW
        // =================================================

        if (!board.includes("")) {

            gameActive = false;

            showDraw();

            return;
        }


        // =================================================
        // NEXT PLAYER
        // =================================================

        switchPlayer();

    }


    // =====================================================
    // SWITCH PLAYER
    // =====================================================

    function switchPlayer() {

        if (currentPlayer === "X") {

            currentPlayer = "O";

        } else {

            currentPlayer = "X";

        }


        updateTurnUI();

    }


    // =====================================================
    // UPDATE TURN UI
    // =====================================================

    function updateTurnUI() {

        turnText.textContent =
            `PLAYER ${currentPlayer}`;


        gameMessage.textContent =
            `Player ${currentPlayer}'s turn`;


        // Remove active state
        playerX.classList.remove("active-player");

        playerO.classList.remove("active-player");


        // Add active state
        if (currentPlayer === "X") {

            playerX.classList.add("active-player");

        } else {

            playerO.classList.add("active-player");

        }

    }


    // =====================================================
    // HIGHLIGHT WINNING CELLS
    // =====================================================

    function highlightWinner(combination) {

        combination.forEach(function (index) {

            cells[index].classList.add("winner");

        });

    }


    // =====================================================
    // SHOW WINNER
    // =====================================================

    function showWinner(winner) {

        gameMessage.textContent =
            `Player ${winner} wins!`;

        gameMessage.classList.remove("draw");

        gameMessage.classList.add("win");


        turnText.textContent =
            `PLAYER ${winner} WINS`;


        resultIcon.textContent = "🏆";

        resultTitle.textContent =
            `PLAYER ${winner} WINS!`;

        resultDescription.textContent =
            "Congratulations! You got three in a row.";


        openResultModal();

    }


    // =====================================================
    // SHOW DRAW
    // =====================================================

    function showDraw() {

        gameMessage.textContent =
            "It's a draw!";

        gameMessage.classList.remove("win");

        gameMessage.classList.add("draw");


        turnText.textContent =
            "DRAW GAME";


        resultIcon.textContent = "🤝";

        resultTitle.textContent =
            "IT'S A DRAW!";

        resultDescription.textContent =
            "Great game! Nobody got three in a row.";


        openResultModal();

    }


    // =====================================================
    // OPEN RESULT MODAL
    // =====================================================

    function openResultModal() {

        resultModal.classList.add("show");

        resultModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    // =====================================================
    // CLOSE RESULT MODAL
    // =====================================================

    function closeResultModal() {

        resultModal.classList.remove("show");

        resultModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    // =====================================================
    // RESET GAME
    // =====================================================

    function resetGame() {

        // Reset board
        // 9 cells = 9 values
        board = [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ];


        // Reset player
        currentPlayer = "X";

        gameActive = true;


        // Reset cells
        cells.forEach(function (cell) {

            cell.classList.remove(
                "x",
                "o",
                "filled",
                "winner"
            );

            cell.disabled = false;

        });


        // Reset messages
        gameMessage.textContent =
            "Player X's turn";

        gameMessage.classList.remove(
            "win",
            "draw"
        );


        // Reset turn
        turnText.textContent =
            "PLAYER X";


        // Reset active player
        playerX.classList.add("active-player");

        playerO.classList.remove("active-player");


        // Close modal
        closeResultModal();

    }


    // =====================================================
    // RESET BUTTON
    // =====================================================

    resetButton.addEventListener(
        "click",
        resetGame
    );


    // =====================================================
    // PLAY AGAIN BUTTON
    // =====================================================

    playAgainButton.addEventListener(
        "click",
        resetGame
    );


    // =====================================================
    // CLOSE MODAL WHEN CLICKING OUTSIDE
    // =====================================================

    resultModal.addEventListener(
        "click",
        function (event) {

            if (event.target === resultModal) {

                closeResultModal();

            }

        }
    );


    // =====================================================
    // ESC KEY
    // =====================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                resultModal.classList.contains("show")
            ) {

                closeResultModal();

            }

        }
    );


    // =====================================================
    // INITIAL GAME STATE
    // =====================================================

    updateTurnUI();

});