let fullDeck = [];
let deckReady = false;
let playerScore, computerScore = 0;
let player = "human";
let computerHand = [];
let playerHand = [];



// When player starts game, a deck of cards is created
function startGame() {
    if (deckReady == false) {
        function Card(value, type, image_url) {
            this.value = value;
            this.type = type;
            this.image = image_url;
        }

        let cardValue = 1;
        for (let i = 1; i < 14; i++) {
            if (i > 10) {
                cardValue = 10;
            }
            for (let j = 0; j < 4; j++) {
                if (j == 0) {
                    fullDeck.push(new Card(cardValue, "diamonds", `assets/img/cards/${i}D.jpg`));
                } else if (j == 1) {
                    fullDeck.push(new Card(cardValue, "hearts", `assets/img/cards/${i}H.jpg`));
                } else if (j == 2) {
                    fullDeck.push(new Card(cardValue, "spades", `assets/img/cards/${i}S.jpg`));
                } else {
                    fullDeck.push(new Card(cardValue, "clubs", `assets/img/cards/${i}C.jpg`));
                }
            }
            cardValue = i + 1;
        }

        // after the deck of cards is created, the cards are dealt. The computer and player each get two cards from the deck


        for (let i = 0; i < 4; i++) {
            let cardNumber = Math.floor((Math.random() * fullDeck.length));
            if (i < 2) {
                computerHand.push(fullDeck[cardNumber]);
            } else {
                playerHand.push(fullDeck[cardNumber]);
            }
            fullDeck.splice(cardNumber, 1);

        }



        document.getElementById("options-notification").innerHTML = '';

        // computer gets two cards and human gets two cards at the beginning of the game

        computerScore = calculateScore(computerHand);
        playerScore = calculateScore(playerHand);


        displayCards(playerHand, computerHand, player);


        // player score is displayed, but computer score is hidden for now
 

        deckReady = true;
    } else {
        document.getElementById("options-notification").innerHTML = 'Deck already created. Play now!';
    }

    function newFunction() {
        debugger;
    }
}

function resetGame() {
    deckReady = false;
    fullDeck = [];

    for (let i = 0; i < playerHand.length; i++) {
        document.getElementById(`human-card-${i + 1}`).innerHTML = "";
        document.getElementById(`computer-card-${i + 1}`).innerHTML = "";
    }
    playerScore = 0;
    document.getElementById("human-score").innerText = "";
    computerScore = 0;
    playerHand = [];
    computerHand = [];
}


function hit(deck) {
    if (deck.length == 0) {
        document.getElementById("options-notification").innerHTML = 'There are no cards in the deck. Click "Start Game" to play.';
        deckReady = false;
        return;
    }
    let cardNumber = Math.floor((Math.random() * deck.length));
    playerHand.push(deck[cardNumber]);

    
    deck.splice(cardNumber, 1);
    displayCards(playerHand, computerHand, player);
    playerScore = calculateScore(playerHand);


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

    } else {

        for (let i = 0; i < playerHand.length; i++) {
            document.getElementById(`human-card-${i + 1}`).innerHTML = `<img src="${playerHand[i].image}" alt="${playerHand[i].value} + ' ' + ${playerHand[i].type}" id="human-card-played-${i + 1}" width="80%" height="80%">`;

        }

        for (let i = 0; i < computerHand.length; i++) {
            document.getElementById(`computer-card-${i + 1}`).innerHTML = `<img src="${computerHand[i].image}" alt="${computerHand[i].value} + ' ' + ${computerHand[i].type}" id="computer-card-played-2" width="80%" height="80%">`;

        }
    }
}