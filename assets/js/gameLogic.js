let fullDeck = [];
let deckReady = false;
let playerScore, computerScore = 0;
let player = "human";
let computerHand = [];
let playerHand = [];
let gameStop = false;


const hitButton = document.getElementById("hit-button");
const startButton = document.getElementById("start-button");
const notificationArea = document.getElementById("options-notification");
const stayButton = document.getElementById("stay-button");

class Card {
    constructor(value, type, image_url) {
        this.value = value;
        this.type = type;
        this.image = image_url;
    }
}

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
    debugger;
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

    // if a deck of cards is not already initialized, a new one will be created. 
    // if a deck of cards is already in play, the user will be informed that the deck is created and that they can start playing. 
    

        createDeck();
        // after the deck of cards is created, the cards are dealt. The computer and player each get two cards from the deck
        dealInitialCards();

    
}

// document.getElementById("hit-button").addEventListener("click", function(fullDeck) {hit(fullDeck)});



function hit() {
    if (gameStop) {
        return;
    } else if (fullDeck.length == 0) {
        notificationArea.innerHTML = 'There are no cards in the deck. Click "Start Game" to play.';
        deckReady = false;
        return;
    } else if (playerScore > 21) {
        
        return;

    } else {
        let cardNumber = Math.floor((Math.random() * fullDeck.length));
        playerHand.push(fullDeck[cardNumber]);
    
    
        fullDeck.splice(cardNumber, 1);
        playerScore = calculateScore(playerHand);
        calculateWin();
        displayCards(playerHand, computerHand, player);
        
   }
    
    
}





function displayCards(playerHand, computerHand, player) {
    if (player == "human") {

        document.getElementById("computer-card-1").innerHTML = `<img src="assets/img/cards/blue_back.jpg" alt="blue card back" id="computer-card-played-1" width="80%" height="80%">`;
        document.getElementById("computer-card-2").innerHTML = `<img src="${computerHand[1].image}" alt="${computerHand[1].value} + ' ' + ${computerHand[1].type}" id="computer-card-played-2" width="80%" height="80%">`;

        for (let i = 0; i < playerHand.length; i++) {
            document.getElementById(`human-card-${i + 1}`).innerHTML = `<img src="${playerHand[i].image}" alt="${playerHand[i].value} + ' ' + ${playerHand[i].type}" id="human-card-played-${i + 1}" width="80%" height="80%">`;
        }
        playerScore = calculateScore(playerHand);
        document.getElementById("human-score").innerText = playerScore;
        document.getElementById("computer-score").innerHTML = "";

    } else {

        for (let i = 0; i < playerHand.length; i++) {
            document.getElementById(`human-card-${i + 1}`).innerHTML = `<img src="${playerHand[i].image}" alt="${playerHand[i].value} + ' ' + ${playerHand[i].type}" id="human-card-played-${i + 1}" width="80%" height="80%">`;
            computerScore = calculateScore(computerHand);
            document.getElementById("computer-score").innerHTML = computerScore;
        }

        for (let i = 0; i < computerHand.length; i++) {
            document.getElementById(`computer-card-${i + 1}`).innerHTML = `<img src="${computerHand[i].image}" alt="${computerHand[i].value} + ' ' + ${computerHand[i].type}" id="computer-card-played-2" width="80%" height="80%">`;

        }
    }
}

