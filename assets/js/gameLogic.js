let dynamicCard;
let deckReady = false;
let player = "human";
let playerName = ""
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


let gameWinCounter = [0, 0];


const hitButton = document.getElementById("hit-button");
const dealButton = document.getElementById("start-button");
const mainMenuButton = document.getElementById("reset-button");
const notificationArea = document.getElementById("options-notification");
const stayButton = document.getElementById("stay-button");
const betNotificationArea = document.getElementById("bet-notification");
const computerCardArea = document.querySelector("#computer-player");
const playerCardArea = document.querySelector("#human-player");
const playGame = document.getElementById("play-game");


class Card {
    constructor(value, type, image_url, index) {
        this.value = value;
        this.type = type;
        this.image = image_url;
        this.index = index;
    }
}

document.getElementById("computer-money").innerHTML = computerMoney;
document.getElementById("player-money").innerHTML = playerMoney;

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

mainMenuButton.addEventListener("click", function () {
    // resetGame();
    // resetGameCounter();
    document.getElementById("overlay").classList.remove("d-none");
});

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

hitButton.addEventListener("click", hit);

stayButton.addEventListener("click", function () {

    if (gameStop) {
        return;
    }
    letComputerPlay();
});

playGame.addEventListener("click", function () {
    if(document.getElementById("player-name").value == "") {
        playerName = "Player";
    } else {
        playerName = document.getElementById("player-name").value;
    }
    resetGame();
    resetGameCounter();
    playStart();
    changePlayerName();
});

document.getElementById("difficulty-toggle").addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
        document.getElementById("difficulty-display").innerHTML = "Normal Difficulty";
        gameDifficulty = "normal";
    } else {
        document.getElementById("difficulty-display").innerHTML = "Easy Difficulty";
        gameDifficulty = "easy";
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
        //document.getElementById("bet").value = '';
        betplaced = true;

        return money;
    }
}

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

function displayHuman(playerHand) {
    playerCardArea.innerHTML = "";
    for (let playerCards = 0; playerCards < playerHand.length; playerCards++) {
        dynamicCard = document.createElement("div");
        dynamicCard.classList.add("col-2");
        dynamicCard.classList.add("human-cards");
        dynamicCard.innerHTML = `<img src="${playerHand[playerCards].image}" alt="${playerHand[playerCards].value} + ' ' + ${playerHand[playerCards].type}" id="human-card-played-${playerCards + 1}">`;
        playerCardArea.appendChild(dynamicCard);
    }

}


// This function creates a deck of cards at the start of the game. It is called by the startGame() function
function createDeck() {
    let cardValue = 1;
    for (let i = 1; i < 14; i++) {
        if (i > 10) {
            cardValue = 10;
        }
        for (let j = 0; j < 4; j++) {
            if (j == 0) {
                fullDeck.push(new Card(cardValue, "diamonds", `assets/img/cards/${i}D.jpg`, i));
            } else if (j == 1) {
                fullDeck.push(new Card(cardValue, "hearts", `assets/img/cards/${i}H.jpg`, i));
            } else if (j == 2) {
                fullDeck.push(new Card(cardValue, "spades", `assets/img/cards/${i}S.jpg`, i));
            } else {
                fullDeck.push(new Card(cardValue, "clubs", `assets/img/cards/${i}C.jpg`, i));
            }
        }
        cardValue = i + 1;
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
    // player score is displayed, but computer score is hidden for now

    deckReady = true;

}

// this function is used to calculate the current hand
function calculateScore(score) {
    let totalScore = 0;
    let scoreCopy = score.map((x) => x);

    for (let i = 0; i < scoreCopy.length; i++) {
        for (let j = 0; j < i; j++) {
            if (scoreCopy[i].value > scoreCopy[j].value) {
                let tempValue = scoreCopy.splice(i, 1);
                scoreCopy.unshift(tempValue[0]);
            }
        }
    }

    for (let i = 0; i < scoreCopy.length; i++) {
        totalScore += scoreCopy[i].value;
        if (scoreCopy[i].value == 1 && totalScore + 10 < 22) {
            totalScore += 10;
        }
    }

    return totalScore;
}

function resetGameCounter() {

    // document.getElementById("player-game-score").innerText = "";
    // document.getElementById("computer-game-score").innerText = "";
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


    gameWinCounter = [0, 0];

}

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
    // gameStop = false;



}

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

function playerWins() {
    notificationArea.innerHTML = `${playerName} wins! You won $${betAmount * 2}`;
    gameWinCounter[0]++;
    // document.getElementById("player-game-score").innerText = gameWinCounter[0];
    playerMoney = playerMoney + (betAmount * 2);
}

function gameIsDraw() {
    notificationArea.innerHTML = "Draw";

    playerMoney = (playerMoney + betAmount);
    computerMoney = (computerMoney + betAmount);
}

function computerWins() {
    notificationArea.innerHTML = `Computer wins! You lost $${betAmount}`;
    gameWinCounter[1]++;
    // document.getElementById("computer-game-score").innerText = gameWinCounter[1];
    computerMoney = computerMoney + (betAmount * 2);
}

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

function letComputerPlay() {
    player = "computer";
    displayCards(playerHand, computerHand, player);
    computerTurn();
}

function gameOver() {
    if (gameWinCounter[0] > gameWinCounter[1]) {
        gameWinner = "Player";
    } else {
        gameWinner = "Computer";
    }

    notificationArea.innerHTML = `Game Over! ${gameWinner} wins!`;
    setTimeout(() => {
        document.getElementById("overlay").classList.remove("d-none");
    }, 1500);

}

function playStart() {
    document.getElementById("overlay").classList.add("d-none");
}

function changePlayerName() {
    document.getElementById("player-name-display").innerHTML = `${playerName}'s`;
    document.getElementById("player-name-display-score").innerHTML = `${playerName}'s`;
}