const Game = () => {
    const board = Array.from(document.getElementsByClassName("cell"));
    const playerOne = Player("Player One", "X");
    const playerTwo = Player("Player Two", "O");
    const message = document.getElementById("message");
    const restart = document.getElementById("restartBtn")
    let notStop = true;
    
    currentMove = playerOne
    const winScenario = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const checkWin = () => {
        for (i = 0; i < winScenario.length; i++) {
            if (board[winScenario[i][0]].innerHTML === board[winScenario[i][1]].innerHTML && board[winScenario[i][1]].innerHTML === board[winScenario[i][2]].innerHTML && board[winScenario[i][0]].innerHTML !== "") {
                console.log(`${board[winScenario[i][0]].innerHTML} ${board[winScenario[i][1]].innerHTML} ${board[winScenario[i][2]].innerHTML}`);

                // Display message
                message.innerHTML = `${currentMove.name} wins!`;
                return true;
            }
        }
    }


    const checkStatus = () => {
        if (checkWin()) {
            notStop = false;
        } else {
            notEmpty = 0;
            for (i = 0; i < board.length; i++) {
                if (board[i].innerHTML !== "") notEmpty ++;
            }
            if (notEmpty === board.length) {
                message.innerHTML = "Tie!"
                notStop = false;
            }
        }
        
    }

    // add events of making move for the cells
    for (i = 0;i < board.length; i++) {
        board[i].addEventListener("click", function(e) {
            if (e.target.innerHTML == "" && notStop) {
                e.target.innerHTML = currentMove.symbol
                checkStatus();
                if (currentMove == playerOne) {
                    currentMove = playerTwo
                } else {
                    currentMove = playerOne
                }
                if (notStop) {
                    message.innerHTML = `${currentMove.name}'s turn`
                }
            }


        });
    }
    restart.addEventListener("click", function(e) {
        for (i = 0;i < board.length; i++) {
            board[i].innerHTML = ""
        notStop = true;
        message.innerHTML = `${currentMove.name}'s turn`
        }
    })
    message.innerHTML = `${currentMove.name}'s turn`

    return {board, checkStatus, checkWin, winScenario}
    
}

const Player = (name, symbol) => {
    return {
        name, 
        symbol
    }
}

game = Game();