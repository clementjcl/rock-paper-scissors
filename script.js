function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3 + 1)
    switch (choice) {
        case 1:
            return 'Rock';
        case 2:
            return 'Paper';
        case 3:
            return 'Scissors';
    }
}


function updateScoreboard(winner, playerSelection, computerSelection) {
    round += 1
    // Upadating messages depending on the winner and the choices.
    if (winner === 1) {
        playerPoints += 1;
        scoreInfo.textContent = `Round ${round}: You won!`;
        scoreMessage.textContent = `${playerSelection} beats ${computerSelection}`;
    } else if (winner === -1) {
        computerPoints += 1;
        scoreInfo.textContent = `Round ${round}: You lost!`;
        scoreMessage.textContent = `${computerSelection} beats ${playerSelection}`;
    } else if (winner === 0) {
        scoreInfo.textContent = `Round ${round}: It's a tie!`;
        scoreMessage.textContent = `${playerSelection} ties with ${computerSelection}`;
    }
    scorePlayer.textContent = `Player: ${playerPoints}`;
    scoreComputer.textContent = `Computer: ${computerPoints}`;

    // Changing chosen symbol (rock paper scissors).
    switch (playerSelection) {
        case 'Rock':
            symbolPlayer.textContent = '✊'
            break
        case 'Paper':
            symbolPlayer.textContent = '✋'
            break
        case 'Scissors':
            symbolPlayer.textContent = '✌'
            break
    }
    switch (computerSelection) {
        case 'Rock':
            symbolComputer.textContent = '✊'
            break
        case 'Paper':
            symbolComputer.textContent = '✋'
            break
        case 'Scissors':
            symbolComputer.textContent = '✌'
            break
    }
    console.log(`Round ${round}: ${scoreInfo.textContent} Player: ${playerPoints} points | Computer: ${computerPoints}`);
}


function playRound(playerSelection) {
    let computerSelection = getComputerChoice();
 
    if (playerSelection === computerSelection) {
        winner = 0;
    } else if (
        (playerSelection === "Rock" && computerSelection === "Paper") ||
        (playerSelection === "Paper" && computerSelection === "Scissors") ||
        (playerSelection === "Scissors" && computerSelection === "Rock")
    ) {
        winner = -1;
    } else if (
        (playerSelection === "Rock" && computerSelection === "Scissors") ||
        (playerSelection === "Paper" && computerSelection === "Rock") ||
        (playerSelection === "Scissors" && computerSelection === "Paper")
    ) {
        winner = 1;
    }

    updateScoreboard(winner, playerSelection, computerSelection);
}


function gameOver() {
    if (playerPoints > computerPoints) {
        alert("YOU WON! CONGRATULATIONS")
    } else {
        alert("YOU LOSE..")
    }
}


function resetGame() {
    round = 0
    // Upadating messages depending on the winner and the choices.
    playerPoints = 0;
    computerPoints = 0;
    scoreInfo.textContent = `Choose your weapon`;
    scoreMessage.textContent = `First to score 5 points wins the game`;
    scorePlayer.textContent = `Player: 0`;
    scoreComputer.textContent = `Computer: 0`;
}


function clickSelection(playerSelection) {
    if (computerPoints < 5 && playerPoints < 5) {
        playRound(playerSelection);
    } else {
        gameOver();
        resetGame();
    }
}


function game() {
    btnRock.addEventListener('click', () => clickSelection('Rock'));
    btnPaper.addEventListener('click', () => clickSelection('Paper'));
    btnScissors.addEventListener('click', () => clickSelection('Scissors'));
}


// SCRIPT
let playerPoints = 0;
let computerPoints = 0;
let round = 0;

let scoreInfo = document.querySelector('.score-info');
let scoreMessage = document.querySelector('.score-message');
let symbolPlayer = document.querySelector('#symbolPlayer');
let scorePlayer = document.querySelector('#scorePlayer');
let symbolComputer = document.querySelector('#symbolComputer');
let scoreComputer = document.querySelector('#scoreComputer');

let btnRock = document.querySelector('#rock');
let btnPaper = document.querySelector('#paper');
let btnScissors = document.querySelector('#scissors');

game();