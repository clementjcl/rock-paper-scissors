// Scroll window all the way to the bottom
// function toBottom() {
//     window.scrollTo(0, document.body.scrollHeight);
// }


function getComputerChoice() {
    let choice = Math.floor(Math.random() * 3 + 1)
    switch (choice) {
        case 1:
            return 'Observe';
        case 2:
            return 'Move';
        case 3:
            return 'Hide';
    }
}


function updateScoreboard(winner, playerSelection, computerSelection) {
    round += 1
    // Upadating messages depending on the winner and the choices.
    if (winner === 1) {
        playerPoints += 1;
        selInfo.textContent = `Round ${round}: Alex is climbing up!`;
        scoreMessage.textContent = `${playerSelection} beats ${computerSelection}`;
        eagle.src = "./images/eagle-fly1.png";
        // Changing Alex Altitude
        alexPosition = alexPosition - 50;
        console.log(alexPosition);
    } else if (winner === -1) {
        computerPoints -= 1;
        selInfo.textContent = `Round ${round}: The eagle attack Alex!`;
        scoreMessage.textContent = `${computerSelection} beats ${playerSelection}`;
        eagle.src = './images/eagle-attack.png';
    } else if (winner === 0) {
        selInfo.textContent = `Round ${round}: Alex couldn't climb!`;
        scoreMessage.textContent = `${playerSelection} ties with ${computerSelection}`;
        eagle.src = "./images/eagle-fly2.png";
    }
    scorePlayer.textContent = `Alex: ${playerPoints}`;
    scoreComputer.textContent = `Energy: ${computerPoints}`;

    updatePositions();

    // Checks if it's the end of the game 
    if (playerPoints >= 5 || computerPoints <= 0) {
        overGame();
    }
}

function updatePositions() {

    
    // Changing Eagle image
    alex.style.marginTop = alexPosition + ".px";

    // Changing Body background position
    if (playerPoints >= 2) {
        document.body.style.backgroundPosition = 'center';
    }
    if (playerPoints >= 4) {
        document.body.style.backgroundPosition = 'top right'; 
    }
}

function playRound(playerSelection) {
    let computerSelection = getComputerChoice();
 
    if (playerSelection === computerSelection) {
        winner = 0;
    } else if (
        (playerSelection === "Observe" && computerSelection === "Move") ||
        (playerSelection === "Move" && computerSelection === "Hide") ||
        (playerSelection === "Hide" && computerSelection === "Observe")
    ) {
        winner = -1;
    } else if (
        (playerSelection === "Observe" && computerSelection === "Hide") ||
        (playerSelection === "Move" && computerSelection === "Observe") ||
        (playerSelection === "Hide" && computerSelection === "Move")
    ) {
        winner = 1;
    }

    updateScoreboard(winner, playerSelection, computerSelection);
}


function overGame() {
    console.log("Game over");

    if (playerPoints >= 5) {
        alex.src = "./images/monkey-banana.png";
        overTitle.textContent = 'YOU WON!';
        overText.textContent = "ALEX IS EATING A DELICIOUS BANANA AND ENJOYING THE BEST VIEWS!"
    } else if (computerPoints <= 0) {
        overTitle.textContent = 'YOU LOSE..';
        overText.textContent = "THE EAGLE HAS EATEN ALEX.."
    }

    overContainer.appendChild(overTitle);
    overContainer.appendChild(overText);
    overButtons.appendChild(btnAgain);
    overButtons.appendChild(btnIntro);
    overContainer.appendChild(overButtons);

    playSelection = playContainer.removeChild(playSelection);
    playContainer.appendChild(overContainer);
}

function overToIntro () {
    overContainer = playContainer.removeChild(overContainer);
    playContainer.appendChild(playSelection);
    playContainer = gameBlock.removeChild(playContainer);
    gameBlock.appendChild(introContainer);
    resetGame();
}


function overToPlay () {
    overContainer = playContainer.removeChild(overContainer);
    playContainer.appendChild(playSelection);
    resetGame();
}


function resetGame() {
    // Resetting scores
    round = 0;
    playerPoints = 0;
    computerPoints = 5;

    // Resetting positions
    alexPosition = 450;
    alex.style.marginTop = alexPosition + ".px";
    eagle.src = "./images/eagle-fly1.png";
    document.body.style.backgroundPosition = 'bottom right'; 
    alex.src = "./images/monkey.png";

    // Resetting messages
    selInfo.textContent = `Make your next move`;
    scoreMessage.textContent = `Climb 5 levels before Alex run out of energy`;
    scorePlayer.textContent = `Alex: 0`;
    scoreComputer.textContent = `Energy: 0`;
    
    // Showing help button
    btnHelp.style.visibility = "visible";
}


function helpToIntro () {
    helpContainer = gameBlock.removeChild(helpContainer);
    gameBlock.appendChild(introContainer);
}


function startGame() {
    introContainer = gameBlock.removeChild(introContainer);

    playDisplay.appendChild(eagle);

    playDisplay.appendChild(alex);
    alex.style.marginTop = alexPosition + ".px";

    

    playSelection.appendChild(selInfo);
    playSelection.appendChild(btnObserve);
    playSelection.appendChild(txtObserve);
    playSelection.appendChild(btnMove);
    playSelection.appendChild(txtMove);
    playSelection.appendChild(btnHide);
    playSelection.appendChild(txtHide);

    playContainer.appendChild(playDisplay);
    playContainer.appendChild(playSelection);

    gameBlock.appendChild(playContainer);

    btnHelp.style.visibility = "hidden";
}


function helpGame() {
    introContainer = gameBlock.removeChild(introContainer);

    helpContainer.appendChild(helpTitle);
    helpContainer.appendChild(help1);
    helpContainer.appendChild(help2);
    helpContainer.appendChild(help3);
    helpContainer.appendChild(help4);

    helpContainer.appendChild(btnBack);

    gameBlock.appendChild(helpContainer);
}


function game() {
    btnStart.addEventListener('click', () => startGame());
    
    btnObserve.addEventListener('click', () => playRound('Observe'));
    btnMove.addEventListener('click', () => playRound('Move'));
    btnHide.addEventListener('click', () => playRound('Hide'));

    btnHelp.addEventListener('click', () => helpGame());
    btnBack.addEventListener('click', () => helpToIntro());

    btnAgain.addEventListener('click', () => overToPlay());
    btnIntro.addEventListener('click', () => overToIntro());
}


// SCRIPT

let playerPoints = 0;
let computerPoints = 5;
let round = 0;
let alexPosition = 450;

let scoreMessage = document.querySelector('.score-message');
let scorePlayer = document.querySelector('#scorePlayer');
let scoreComputer = document.querySelector('#scoreComputer');

let gameBlock = document.querySelector('.game-block')
let introContainer = document.querySelector('.intro-container');
let btnStart = document.querySelector('.btn-start');
let btnHelp = document.querySelector('.btn-help');

// Elements in Play Mode
let playContainer = document.createElement('div');
playContainer.setAttribute('class', 'play-container');
let playDisplay = document.createElement('p');
playDisplay.setAttribute('class', 'play-display');

let alex = document.createElement('img');
alex.setAttribute('class', 'alex');
alex.setAttribute('src', './images/monkey.png')
let eagle = document.createElement('img');
eagle.setAttribute('class', 'eagle');
eagle.setAttribute('src', './images/eagle-fly1.png')


let playSelection = document.createElement('div');
playSelection.setAttribute('class', 'play-selection');
let selInfo = document.createElement('h2');
selInfo.setAttribute('class', 'sel-info')
selInfo.textContent = 'Make your next move';
let btnObserve = document.createElement('input');
btnObserve.setAttribute('class', 'btn-selection');
btnObserve.setAttribute('id', 'observe');
btnObserve.setAttribute('type', 'image');
btnObserve.setAttribute('src', './images/observe_w.png');
let txtObserve = document.createElement('p');
txtObserve.textContent = "Observe";
let btnMove = document.createElement('input');
btnMove.setAttribute('class', 'btn-selection');
btnMove.setAttribute('id', 'move');
btnMove.setAttribute('type', 'image');
btnMove.setAttribute('src', './images/move_w.png');
let txtMove = document.createElement('p');
txtMove.textContent = "Move";
let btnHide = document.createElement('input');
btnHide.setAttribute('class', 'btn-selection');
btnHide.setAttribute('id', 'hide');
btnHide.setAttribute('type', 'image');
btnHide.setAttribute('src', './images/hide_w.png');
let txtHide = document.createElement('p');
txtHide.textContent = "Hide";

// Element in Game Over
let overContainer = document.createElement('div');
overContainer.setAttribute('class', 'over-container');
let overTitle = document.createElement('h1');
let overText = document.createElement('h2');
let overButtons = document.createElement('div');
overButtons.setAttribute('class', 'over-buttons');
let btnAgain = document.createElement('button');
btnAgain.setAttribute('class', 'btn-over');
btnAgain.textContent = 'Try Again';
let btnIntro = document.createElement('button');
btnIntro.setAttribute('class', 'btn-over');
btnIntro.textContent = 'Main Menu';

// Elements in Help Mode
let helpContainer = document.createElement('div');
helpContainer.setAttribute('class', 'help-container');
let helpTitle = document.createElement('h1');
helpTitle.textContent = 'HOW TO PLAY'
let help1 = document.createElement('h2');
help1.textContent = 'The game is based in Rock-Paper-Scissors. You have three choices to help Alex climb the tree and get the fruit. The Eagle is hungry too and will attack the Hungry Monkey.'
let help2 = document.createElement('p');
help2.textContent = "1. 'OBSERVE' will make Alex to look if the Eagle is in 'Hide' mode and make the next move succesful. But be careful! If the Eagle is on the 'Move' is gonna attack him! (OBSERVE beats HIDE)"
let help3 = document.createElement('p');
help3.textContent = "2. 'MOVE' will make Alex to get in action and make a succesful step up if the Eagle is just in 'Observe' mode. But be careful! The Eagle can be in 'Hide' mode and attack anytime! (MOVE beats OBSERVE)"
let help4 = document.createElement('p');
help4.textContent = "3. 'HIDE' will help Alex to hide when the Eagle is on the 'Move' mode. But be careful! The Eagle can be in 'Observe' mode with it's sharp eyes! (HIDE beats MOVE)"
let btnBack = document.createElement('button');
btnBack.setAttribute('class', 'btn-back');
btnBack.textContent = 'Back';


// MAIN
// window.onload = toBottom;
game();


