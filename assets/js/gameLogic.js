let fullDeck = [];
let deckReady = false;
let player = "human";
let computerHand = [];
let playerHand = [];
let gameStop = false;
let playerMoney = 100;
let computerMoney = 100; 
let betplaced = false;
let betAmount = 0;

let gameWinCounter = [0,0];


const hitButton = document.getElementById("hit-button");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const notificationArea = document.getElementById("options-notification");
const stayButton = document.getElementById("stay-button");
const betButton = document.getElementById("bet-button");
const betNotificationArea = document.getElementById("bet-notification");

class Card {
    constructor(value, type, image_url) {
        this.value = value;
        this.type = type;
        this.image = image_url;
    }
}

document.getElementById("computer-money").innerHTML = computerMoney;
document.getElementById("player-money").innerHTML = playerMoney;

betButton.addEventListener("click", function() {
    if(document.getElementById("bet").value !== '') {
        betAmount = betAmount + placeBet(document.getElementById("bet").value);
        betplaced = true;
    } else {
        notificationArea.innerHTML = "Enter the amount you would like to bet";
    }
 
});

document.getElementById("bet5").addEventListener('click', function() {
    betAmount = betAmount + placeBet(5);
    betplaced = true;
    betNotificationArea.innerHTML = `You bet ${betAmount}. Total bet is ${betAmount*2}`;
})


resetButton.addEventListener("click", function() {
    resetGame();
    resetGameCounter();
});

startButton.addEventListener("click", function() {
    if (!deckReady) {
        startGame();
    } else {
        resetGame();
        startGame();
    }
});

hitButton.addEventListener("click", hit);

stayButton.addEventListener("click", function() {
    
    if (gameStop) {
        return;
    }
    player = "computer";
    displayCards(playerHand, computerHand, player);
    computerTurn();
});


// Function startGame creates a deck of 52 cards if one is not created already. 
// It uses the class "Card" to create cards as objects dynamically
function startGame() {
    if(betplaced) {
    // if a deck of cards is not already initialized, a new one will be created. 
    // if a deck of cards is already in play, the user will be informed that the deck is created and that they can start playing. 
    

        createDeck();
        // after the deck of cards is created, the cards are dealt. The computer and player each get two cards from the deck
        dealInitialCards();
    } else {
        notificationArea.innerHTML = "Place your bet first";
    }
    
}

function placeBet (money) {
   
        computerMoney = computerMoney-money;
        document.getElementById("computer-money").innerHTML = computerMoney;
        playerMoney = playerMoney-money;
        document.getElementById("player-money").innerHTML = playerMoney;
        document.getElementById("bet").value = '';
        betplaced = true;
        return money;
}



function hit() {
    if (gameStop) {
        return;
    } else if (fullDeck.length == 0) {
        notificationArea.innerHTML = 'There are no cards in the deck. Click "Start Game" to play.';
        deckReady = false;
        return;
     } 
    //else if (playerScore > 21) {
        
    //     return;

    // } 
    else {
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
    if (player == "human") {

        document.getElementById("computer-card-1").innerHTML = `<img src="assets/img/cards/blue_back.jpg" alt="blue card back" id="computer-card-played-1">`;
        document.getElementById("computer-card-2").innerHTML = `<img src="${computerHand[1].image}" alt="${computerHand[1].value} + ' ' + ${computerHand[1].type}" id="computer-card-played-2">`;

        for (let i = 0; i < playerHand.length; i++) {
            document.getElementById(`human-card-${i + 1}`).innerHTML = `<img src="${playerHand[i].image}" alt="${playerHand[i].value} + ' ' + ${playerHand[i].type}" id="human-card-played-${i + 1}">`;
        }
        playerScore = calculateScore(playerHand);
        document.getElementById("human-score").innerText = playerScore;
        document.getElementById("computer-score").innerHTML = "";

    } else {

        for (let i = 0; i < playerHand.length; i++) {
            document.getElementById(`human-card-${i + 1}`).innerHTML = `<img src="${playerHand[i].image}" alt="${playerHand[i].value} + ' ' + ${playerHand[i].type}" id="human-card-played-${i + 1}">`;
            computerScore = calculateScore(computerHand);
            document.getElementById("computer-score").innerHTML = computerScore;
        }

        for (let i = 0; i < computerHand.length; i++) {
            document.getElementById(`computer-card-${i + 1}`).innerHTML = `<img src="${computerHand[i].image}" alt="${computerHand[i].value} + ' ' + ${computerHand[i].type}" id="computer-card-played-2">`;

        }
    }
}

