function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3 + 1)
    if (choice === 1) {
        return "rock";
    } else if (choice === 2) {
        return "paper";
    } else {
        return "scissors";
    }
}
  
function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();

    playerSelCapitalized = playerSelection[0].toUpperCase() + playerSelection.substring(1)
    computerSelCapitalized = computerSelection[0].toUpperCase() + computerSelection.substring(1)

    if (playerSelection === computerSelection) {
        return 0;
    } else if (playerSelection === "rock") {
        if (computerSelection === "paper") {
            return -1;
        } else if (computerSelection == "scissors") {
            return  1;
        }
    } else if (playerSelection === "paper") {
        if (computerSelection === "rock") {
            return 1;
        } else if (computerSelection == "scissors") {
            return -1;
        }
    } else if (playerSelection === "scissors") {
        if (computerSelection === "rock") {
            return -1;
        } else if (computerSelection === "paper") {
            return 1;
        }
    }
}

function game() {
    let playerPoints = 0;
    let computerPoints = 0;
    let message = "";
    let round;
    let playerSelection;
    let computerSelection;

    for (let i = 1; i <= 5; i++) {
        playerSelection = prompt("Rock, Paper, Scissors. Choose and Good Luck!");
        computerSelection = getComputerChoice();
        round = playRound(playerSelection, computerSelection);
        if (round === 1) {
            playerPoints += 1;
            message = (`You Won! ${playerSelCapitalized} beats ${computerSelCapitalized}`);
        } else if (round === -1) {
            computerPoints += 1;
            message = (`You Lose! ${computerSelCapitalized} beats ${playerSelCapitalized}`);
        } else if (round === 0) {
            message = (`It's a Tie! ${playerSelCapitalized} ties with ${computerSelCapitalized}`);
        }
        console.log(`Round ${i}: ${message}. Player: ${playerPoints} points | Computer: ${computerPoints}`)
    }

    if (playerPoints > computerPoints) {
        return `You Won the game!`;
    } else if (playerPoints < computerPoints) {
        return `You Lost the game!`;
    } else {
        return `Tie game!`;
    }

}


console.log(game());