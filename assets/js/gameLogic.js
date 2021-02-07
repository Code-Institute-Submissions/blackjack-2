// Declaring global variables which will be used throughout the script
let dynamicCard;
let deckReady = false;
let player = "human";
let playerName = "";
let fullDeck = [];
let computerHand = [];
let playerHand = [];
let playerScore = 0;
let computerScore = 0;
let gameStop = true;
let playerMoney = 100;
let computerMoney = 100;
let betplaced = false;
let betAmount = 0;
let computerBlackJack = false;
let playerBlackJack = false;
let gameWinner;
let gameDifficulty = "easy";
let sound = "off";


let handWinCounter = [0, 0, 0];
let tempHandWinCounter = [0, 0, 0];
let totalGameWinCounter = [0, 0];

// Declaring constants for the most common used elements to manipulate the DOM
const hitButton = document.getElementById("hit-button");
const dealButton = document.getElementById("start-button");
const mainMenuButton = document.getElementById("main-menu-button");
const notificationArea = document.getElementById("options-notification");
const stayButton = document.getElementById("stay-button");
const betNotificationArea = document.getElementById("bet-notification");
const computerCardArea = document.querySelector("#computer-player");
const playerCardArea = document.querySelector("#human-player");
const playGame = document.getElementById("play-game");

// Creating a class for cards which will be automatically generated each game
class Card {
    constructor(value, type, image_url, index) {
        this.value = value;
        this.type = type;
        this.image = image_url;
        this.index = index;
    }
}

// at the beginning of the game, both the player and the computer start with the same amount of money
document.getElementById("computer-money").innerHTML = computerMoney;
document.getElementById("player-money").innerHTML = playerMoney;

// This function calls the placeBet() function when the button is clicked
document.getElementById("bet5").addEventListener('click', function () {
    if (!gameStop) {
        return;
    } else {
        betAmount = betAmount + placeBet(5);

        if (betAmount == 0) {
            return;
        } else {

            betNotificationArea.innerHTML = `You bet $${betAmount}. Total bet is $${betAmount * 2}`;

        }
    }
});

// This function calls the placeBet() function when the button is clicked
document.getElementById("bet10").addEventListener('click', function () {
    if (!gameStop) {
        return;
    } else {
        betAmount = betAmount + placeBet(10);

        if (betAmount == 0) {
            return;
        } else {

            betNotificationArea.innerHTML = `You bet $${betAmount}. Total bet is $${betAmount * 2}`;

        }
    }
});

// This function calls the placeBet() function when the button is clicked
document.getElementById("bet20").addEventListener('click', function () {
    if (!gameStop) {
        return;
    } else {
        betAmount = betAmount + placeBet(20);

        if (betAmount == 0) {
            return;
        } else {

            betNotificationArea.innerHTML = `You bet $${betAmount}. Total bet is $${betAmount * 2}`;

        }
    }
});

// This function calls the placeBet() function when the button is clicked
document.getElementById("bet50").addEventListener('click', function () {
    if (!gameStop) {
        return;
    } else {
        betAmount = betAmount + placeBet(50);

        if (betAmount == 0) {
            return;
        } else {

            betNotificationArea.innerHTML = `You bet $${betAmount}. Total bet is $${betAmount * 2}`;

        }
    }
});

// This function listens for a click on the main menu button to take the player to the main menu
mainMenuButton.addEventListener("click", function () {
    saveToLocalStorage(playerName, handWinCounter, totalGameWinCounter);
    document.getElementById("stats-data").innerHTML = "";
    document.getElementById("overlay").classList.remove("d-none");
});

// Checks whether the "Deal" button is clicked and deals the cards
dealButton.addEventListener("click", function () {
    if (!deckReady) {
        startGame();
    } else if (!betplaced && gameStop) {
        notificationArea.innerHTML = "Place your bet by clicking on the betting buttons.";
        document.getElementById("computer-player").innerHTML = "";
        document.getElementById("human-player").innerHTML = "";
        document.getElementById("computer-score").innerHTML = "";
        document.getElementById("human-score").innerHTML = "";
        return;
    } else if (!betplaced && !gameStop) {
        return;
    } else {
        resetGame();
        startGame();
    }
});

// Runs the hit() function when the hit button is pressed
hitButton.addEventListener("click", hit);

// when the stay button is clicked, this function will stop the player and start the computers turn
stayButton.addEventListener("click", function () {

    if (gameStop) {
        return;
    }
    letComputerPlay();
});

// Initializes when the "Play New Game" button is pressed to start a new game from the main menu
playGame.addEventListener("click", function () {
    if (document.getElementById("player-name").value == "") {
        playerName = "Player";
    } else {
        playerName = document.getElementById("player-name").value;
    }
    tempHandWinCounter = [0, 0, 0];
    resetGame();
    resetGameCounter();
    recoverSavedGame();
    playStart();
    changePlayerName();
});

// Changes the game difficulty in the main menu
document.getElementById("difficulty-toggle").addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
        document.getElementById("difficulty-display").innerHTML = "Normal Difficulty";
        gameDifficulty = "normal";
    } else {
        document.getElementById("difficulty-display").innerHTML = "Easy Difficulty";
        gameDifficulty = "easy";
    }
});

// Toggles the sound on and off from the main menu
document.getElementById("sound-toggle").addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
        document.getElementById("sound-display").innerHTML = "Sound On";
        sound = "on";
    } else {
        document.getElementById("sound-display").innerHTML = "Sound Off";
        sound = "off";
    }
});

// Clears localStorage from main menu
document.getElementById("clear-data").addEventListener("click", function () {
    clearLocalStorage();
});

// Clears the localStorage data for a single player
document.getElementById("clear-player-data").addEventListener("click", function () {
    let playerData = document.getElementById("player-name").value;
    if (localStorage.getItem(playerData) != "") {
        localStorage.removeItem(document.getElementById("player-name").value);
        document.getElementById("stats-data").innerHTML = `Removed all local data for player ${playerData}`;
    } else {
        document.getElementById("stats-data").innerHTML = `Player ${playerData} does not exist`;
    }

});

// Checks game stats for a single player
document.getElementById("check-player-stats").addEventListener("click", function () {
    let statsNotificationArea = document.getElementById("stats-data");
    playerName = document.getElementById("player-name").value;
    if (playerName == "") {
        playerName = "Player";
    }
    for (let storageItem = 0; storageItem < localStorage.length; storageItem++) {
        if (playerName == localStorage.key(storageItem)) {
            let recoverSaveData = JSON.parse(localStorage.getItem(playerName));
            totalGameWinCounter = [recoverSaveData.totalGameWinCounter[0], recoverSaveData.totalGameWinCounter[1]];
            tempHandWinCounter = [recoverSaveData.handWinCounter[0], recoverSaveData.handWinCounter[1], recoverSaveData.handWinCounter[2]];
            let handsplayed = tempHandWinCounter[0] + tempHandWinCounter[1] + tempHandWinCounter[2];
            let gamesplayed = totalGameWinCounter[0] + totalGameWinCounter[1];
            statsNotificationArea.innerHTML = `Games Played: ${gamesplayed}<br>
            Won: ${recoverSaveData.totalGameWinCounter[0]} | Lost: ${recoverSaveData.totalGameWinCounter[1]}<br>
            Hands Played: ${handsplayed}<br>
            Won: ${tempHandWinCounter[0]} | Lost: ${tempHandWinCounter[1]} | Draw: ${tempHandWinCounter[2]}`;
            tempHandWinCounter = [0, 0, 0];
            return;
        } else {
            statsNotificationArea.innerHTML = "This player name does not exist";
        }
    }
    if (localStorage.length == 0) {
        statsNotificationArea.innerHTML = "This player name does not exist";
    }
});

// Function startGame creates a deck of 52 cards if one is not created already. 
// It uses the class "Card" to create cards as objects dynamically
function startGame() {
    if (betplaced) {
        // if a deck of cards is not already initialized, a new one will be created. 
        // if a deck of cards is already in play, the user will be informed that the deck is created and that they can start playing. 


        createDeck();
        // after the deck of cards is created, the cards are dealt. The computer and player each get two cards from the deck
        dealInitialCards();
        betplaced = false;
        gameStop = false;
    } else {
        notificationArea.innerHTML = "Place your bet first";

    }

}

// calculates the bet for each hand
function placeBet(money) {
    if ((computerMoney - money) < 0) {
        return 0;
    } else if ((playerMoney - money) < 0) {
        return 0;
    } else {
        computerMoney = computerMoney - money;
        document.getElementById("computer-money").innerHTML = computerMoney;
        playerMoney = playerMoney - money;
        document.getElementById("player-money").innerHTML = playerMoney;
        betplaced = true;

        return money;
    }
}

// When the player hits, it deals a new card and calculates new score
function hit() {
    if (gameStop) {
        return;
    } else if (fullDeck.length == 0) {
        notificationArea.innerHTML = 'There are no cards in the deck. Click "Start Game" to play.';
        deckReady = false;
        return;
    } else {
        let cardNumber = Math.floor((Math.random() * fullDeck.length));
        playerHand.push(fullDeck[cardNumber]);


        fullDeck.splice(cardNumber, 1);
        playerScore = calculateScore(playerHand);
        displayCards(playerHand, computerHand, player);
        calculateWin();
        if (playerScore > 21) {
            endOfPlay();
        }
    }


}

// Displays cards for both the computer and player
function displayCards(playerHand, computerHand, player) {

    displayComputer(computerHand, player);
    displayHuman(playerHand);

    // playerScore = calculateScore(playerHand);
    if (playerBlackJack) {
        document.getElementById("human-score").classList.remove("score");
        document.getElementById("human-score").classList.add("black-jack");
        document.getElementById("human-score").innerText = "Black Jack!";
    } else {
        document.getElementById("human-score").innerText = playerScore;
    }


}

// displays cards for the computer depending on the active player
function displayComputer(computerHand, player) {
    if (player == "human") {
        computerCardArea.innerHTML = "";
        for (let computerCards = 0; computerCards < computerHand.length; computerCards++) {
            dynamicCard = document.createElement("div");
            dynamicCard.classList.add("col-2");
            dynamicCard.classList.add("computer-cards");
            if (computerCards == 0) {
                dynamicCard.innerHTML = `<img src="assets/img/cards/blue_back.jpg" alt="blue card back" id="computer-card-played-1">`;
            } else {
                dynamicCard.innerHTML = `<img src="${computerHand[1].image}" alt="${computerHand[1].value} + ' ' + ${computerHand[1].type}" id="computer-card-played-2">`;
            }
            document.getElementById("computer-score").innerHTML = "";
            computerCardArea.appendChild(dynamicCard);

        }
    } else {
        computerCardArea.innerHTML = "";
        for (let computerCards = 0; computerCards < computerHand.length; computerCards++) {
            dynamicCard = document.createElement("div");
            dynamicCard.classList.add("col-2");
            dynamicCard.classList.add("computer-cards");
            dynamicCard.innerHTML = `<img src="${computerHand[computerCards].image}" alt="${computerHand[computerCards].value} + ' ' + ${computerHand[computerCards].type}" id="computer-card-played-${computerCards + 1}">`;
            computerCardArea.appendChild(dynamicCard);
            computerScore = calculateScore(computerHand);

        }
        if (computerBlackJack) {
            document.getElementById("computer-score").classList.remove("score");
            document.getElementById("computer-score").classList.add("black-jack");
            document.getElementById("computer-score").innerHTML = "Black Jack!";
        } else {
            document.getElementById("computer-score").innerHTML = computerScore;
        }

    }
}

// displays cards for the human player
function displayHuman(playerHand) {
    playerCardArea.innerHTML = "";

    for (let playerCards = 0; playerCards < playerHand.length; playerCards++) {
        dynamicCard = document.createElement("div");
        dynamicCard.classList.add("col-2");
        dynamicCard.classList.add("human-cards");
        dynamicCard.innerHTML = `<img src="${playerHand[playerCards].image}" alt="${playerHand[playerCards].value} + ' ' + ${playerHand[playerCards].type}" id="human-card-played-${playerCards + 1}">`;
        playerCardArea.appendChild(dynamicCard);

        if (sound == "on") {
            let audio = new Audio("/assets/sounds/card-deal.mp3");
            audio.play();
        }

    }

}


// This function creates a deck of cards at the start of the game. It is called by the startGame() function
function createDeck() {
    let cardValue = 1;
    for (let newCard = 1; newCard < 14; newCard++) {
        if (newCard > 10) {
            cardValue = 10;
        }
        for (let cardType = 0; cardType < 4; cardType++) {
            if (cardType == 0) {
                fullDeck.push(new Card(cardValue, "diamonds", `assets/img/cards/${newCard}D.jpg`, newCard));
            } else if (cardType == 1) {
                fullDeck.push(new Card(cardValue, "hearts", `assets/img/cards/${newCard}H.jpg`, newCard));
            } else if (cardType == 2) {
                fullDeck.push(new Card(cardValue, "spades", `assets/img/cards/${newCard}S.jpg`, newCard));
            } else {
                fullDeck.push(new Card(cardValue, "clubs", `assets/img/cards/${newCard}C.jpg`, newCard));
            }
        }
        cardValue = newCard + 1;
    }
}

// This function deals the initial cards. Both players get two cards. The human player can see both of their cards
// and one computer card. 
function dealInitialCards() {
    for (let initialCard = 0; initialCard < 4; initialCard++) {
        let cardNumber = Math.floor((Math.random() * fullDeck.length));
        if (initialCard < 2) {
            computerHand.push(fullDeck[cardNumber]);
        } else {
            playerHand.push(fullDeck[cardNumber]);
        }
        fullDeck.splice(cardNumber, 1);
    }

    notificationArea.innerHTML = '';
    computerScore = calculateScore(computerHand);
    playerScore = calculateScore(playerHand);
    computerBlackJack = isBlackJack(computerHand);
    playerBlackJack = isBlackJack(playerHand);


    displayCards(playerHand, computerHand, player);

    calculateWin();

    deckReady = true;

}

// this function is used to calculate the current hand
function calculateScore(score) {
    let totalScore = 0;
    let scoreCopy = score.map((x) => x);

    for (let oldScore = 0; oldScore < scoreCopy.length; oldScore++) {
        for (let newScore = 0; newScore < oldScore; newScore++) {
            if (scoreCopy[oldScore].value > scoreCopy[newScore].value) {
                let tempValue = scoreCopy.splice(oldScore, 1);
                scoreCopy.unshift(tempValue[0]);
            }
        }
    }

    for (let newScore = 0; newScore < scoreCopy.length; newScore++) {
        totalScore += scoreCopy[newScore].value;
        if (scoreCopy[newScore].value == 1 && totalScore + 10 < 22) {
            totalScore += 10;
        }
    }

    return totalScore;
}

// resets the game to its original state
function resetGameCounter() {

    document.getElementById("computer-money").innerHTML = 100;
    document.getElementById("player-money").innerHTML = 100;
    betNotificationArea.innerHTML = "";
    notificationArea.innerHTML = "";
    document.getElementById("computer-score").innerHTML = "";
    document.getElementById("human-score").innerHTML = "";
    player = "human";
    fullDeck = [];
    computerHand = [];
    playerHand = [];
    gameStop = true;
    playerMoney = 100;
    computerMoney = 100;
    betplaced = false;
    betAmount = 0;
    computerBlackJack = false;
    playerBlackJack = false;


    handWinCounter = [0, 0, 0];

}

// calculates the percentage chance that the next card will add to less than 21
function calculateWin() {
    if (gameDifficulty === "easy") {
        if (playerBlackJack) {
            notificationArea.innerHTML = "You have BlackJack! You should NOT hit!";
        } else {
            let scoreRemainder = 21 - playerScore;
            let smallerCards = 0;

            for (let cardsRemaining = 0; cardsRemaining < fullDeck.length; cardsRemaining++) {
                if (fullDeck[cardsRemaining].value <= scoreRemainder) {
                    smallerCards++;
                }
            }
            let winPercentage = Math.round((smallerCards / fullDeck.length) * 100);
            notificationArea.innerHTML = 'If you "hit", there is a ' + winPercentage + '% chance that you will be under 21.';

            return winPercentage;
        }
    } else {
        return;
    }

}

// resets the play area after each hand is played
function resetGame() {

    deckReady = false;
    player = "human";
    fullDeck = [];
    let cardsToClear = 0;
    if (playerHand.length > computerHand.length) {
        cardsToClear = playerHand.length;
    } else {
        cardsToClear = computerHand.length;
    }
    computerCardArea.innerHTML = "";
    playerCardArea.innerHTML = "";

    playerScore = 0;
    document.getElementById("human-score").innerText = "";
    document.getElementById("computer-score").innerText = "";
    document.getElementById("human-score").classList.remove("black-jack");
    document.getElementById("computer-score").classList.remove("black-jack");
    document.getElementById("human-score").classList.add("score");
    document.getElementById("computer-score").classList.add("score");
    computerScore = 0;
    playerHand = [];
    computerHand = [];



}

// plays the computer hand once the player has decided to "stay"
function computerTurn() {
    while ((computerScore < playerScore && playerScore <= 21)) {
        if (computerScore == 21) {
            return;
        }
        let cardNumber = Math.floor((Math.random() * fullDeck.length));
        computerHand.push(fullDeck[cardNumber]);
        fullDeck.splice(cardNumber, 1);
        computerScore = calculateScore(computerHand);
        displayCards(playerHand, computerHand, player);
    }

    endOfPlay();



}

// at the end of each hand, calculates who had the winning hand
function endOfPlay() {

    if (playerBlackJack && !computerBlackJack) {
        playerWins();
    } else if (playerBlackJack && computerBlackJack) {
        gameIsDraw();
    } else if (!playerBlackJack && computerBlackJack) {
        computerWins();
    } else {
        if ((playerScore > computerScore && playerScore < 22) || computerScore > 21) {
            playerWins();

        } else if (playerScore == computerScore) {
            gameIsDraw();
        } else {
            computerWins();
        }
    }


    document.getElementById("computer-money").innerHTML = computerMoney;
    document.getElementById("player-money").innerHTML = playerMoney;
    gameStop = true;
    betplaced = false;
    betAmount = 0;
    if (playerMoney == 0 || computerMoney == 0) {
        gameOver();
    } else {
        betNotificationArea.innerHTML = 'Please place your bet and click "Deal"';
    }

}

// what happens when the player wins
function playerWins() {
    notificationArea.innerHTML = `${playerName} wins! You won $${betAmount * 2}`;
    handWinCounter[0]++;
    playerMoney = playerMoney + (betAmount * 2);
}

// what happens if the game is a draw
function gameIsDraw() {
    notificationArea.innerHTML = "Draw";
    handWinCounter[2]++;
    playerMoney = (playerMoney + betAmount);
    computerMoney = (computerMoney + betAmount);
}

// what happens if the computer wins
function computerWins() {
    notificationArea.innerHTML = `Computer wins! You lost $${betAmount}`;
    handWinCounter[1]++;
    computerMoney = computerMoney + (betAmount * 2);
}

// looks at the first two cards dealt to check whether the computer or player have a blackjack
function isBlackJack(cardHand) {
    if (cardHand.length == 2) {
        let ace = 0;
        let face = 0;
        for (let cards = 0; cards < cardHand.length; cards++) {
            if (cardHand[cards].value == 1) {
                ace++;
            } else if (cardHand[cards].value == 10) {
                face++;
            }
        }


        if (ace == 1 && face == 1) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }

}

// switches the player from human to computer
function letComputerPlay() {
    player = "computer";
    displayCards(playerHand, computerHand, player);
    computerTurn();
}

//when either the player or computer have run out of money this will end the game and add up the final scores
function gameOver() {
    if (handWinCounter[0] > handWinCounter[1]) {
        gameWinner = playerName;
        totalGameWinCounter[0]++;
    } else {
        gameWinner = "Computer";
        totalGameWinCounter[1]++;
    }
    saveToLocalStorage(playerName, handWinCounter, totalGameWinCounter);
    notificationArea.innerHTML = `Game Over! ${gameWinner} wins!`;
    document.getElementById("stats-data").innerHTML = "";
    setTimeout(() => {
        document.getElementById("overlay").classList.remove("d-none");
    }, 1500);

}

// Starts the game
function playStart() {
    document.getElementById("overlay").classList.add("d-none");
}

// changes the player name depending on the input field in the main menu
function changePlayerName() {
    document.getElementById("player-name-display").innerHTML = `${playerName}'s`;
    document.getElementById("player-name-display-score").innerHTML = `${playerName}'s`;
}

// saves the game data to local storage
function saveToLocalStorage(playerName, handWinCounter, totalGameWinCounter) {

    handWinCounter = [handWinCounter[0] + tempHandWinCounter[0], handWinCounter[1] + tempHandWinCounter[1], handWinCounter[2] + tempHandWinCounter[2]];
    let myObj = {
        "handWinCounter": handWinCounter,
        "totalGameWinCounter": totalGameWinCounter
    };
    let playerSaveData = JSON.stringify(myObj);

    localStorage.setItem(playerName, playerSaveData);



}

// when the player enters their name in the input field on the main meny, this function will check whether this palyer has played before. If yes, their data will be retrieved
function recoverSavedGame() {
    for (let savedItem = 0; savedItem < localStorage.length; savedItem++) {
        if (playerName == localStorage.key(savedItem)) {
            let recoverSaveData = JSON.parse(localStorage.getItem(playerName));
            totalGameWinCounter = [recoverSaveData.totalGameWinCounter[0], recoverSaveData.totalGameWinCounter[1]];
            tempHandWinCounter = [recoverSaveData.handWinCounter[0], recoverSaveData.handWinCounter[1], recoverSaveData.handWinCounter[2]];
            let gamesplayed = totalGameWinCounter[0] + totalGameWinCounter[1];
            if (gamesplayed === 0) {
                notificationArea.innerHTML = `Welcome back ${playerName}. You started, but haven't finished a game. Good luck!`;
                return;
            } else {
                notificationArea.innerHTML = `Welcome back ${playerName}! To date, you have played ${gamesplayed} games. You won ${totalGameWinCounter[0]}  and lost ${totalGameWinCounter[1]}.`;
                return;
            }
        } else {
            notificationArea.innerHTML = `Welcome ${playerName}. This is your first time playing, have fun!`;
            totalGameWinCounter = [0, 0];
        }
    }
    if (localStorage.length == 0) {
        notificationArea.innerHTML = `Welcome ${playerName}. This is your first time playing, have fun!`;
        totalGameWinCounter = [0, 0];
    }
}

// clears local storage
function clearLocalStorage() {
    localStorage.clear();
    document.getElementById("stats-data").innerHTML = "All local game data cleared";
}
