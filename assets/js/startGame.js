let fullDeck = [];
let deckReady = false;
let playerScore, computerScore = 0; 



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
            if (i > 10){
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
            cardValue = i;
        }
        console.log(fullDeck);
        // after the deck of cards is created, the cards are dealt. The computer and player each get two cards from the deck
        let computerHand = [];
        let playerHand = [];
        
        for (let i = 0; i < 4; i++){
            let cardNumber = Math.floor((Math.random() * fullDeck.length));
            if(i<2) {
                computerHand.push(fullDeck[cardNumber]);
            } else {
                playerHand.push(fullDeck[cardNumber]);
            }
            fullDeck.splice(cardNumber, 1);
            console.log(cardNumber);
            console.log(fullDeck);
        }
        console.log(computerHand);
        console.log(playerHand);
        

        document.getElementById("options-notification").innerHTML = '';

        // computer gets two cards
        document.getElementById("computer-card-1").innerHTML = `<img src="assets/img/cards/blue_back.jpg" alt="blue card back" id="computer-card-played-1" width="100%" height="100%">`
        document.getElementById("computer-card-2").innerHTML = `<img src="${computerHand[1].image}" alt="${computerHand[1].value} + ' ' + ${computerHand[1].type}" id="computer-card-played-2" width="100%" height="100%">`
        computerScore = calculateScore(computerHand);
        // player gets two cards
        document.getElementById("human-card-1").innerHTML = `<img src="${playerHand[0].image}" alt="${playerHand[0].value} + ' ' + ${playerHand[0].type}" id="human-card-played-1" width="100%" height="100%">`
        document.getElementById("human-card-2").innerHTML = `<img src="${playerHand[1].image}" alt="${playerHand[1].value} + ' ' + ${playerHand[1].type}" id="human-card-played-2" width="100%" height="100%">`
        playerScore = calculateScore(playerHand);
        console.log(fullDeck);
        
        // player score is displayed, but computer score is hidden for now
        document.getElementById("human-score").innerText = playerScore;
        console.log(computerScore);
        console.log(playerScore);

        deckReady = true;
    } else {
        document.getElementById("options-notification").innerHTML = 'Deck already created. Play now!';
    }
}


function hit(deck) {
    if (deck.length == 0) {
        document.getElementById("options-notification").innerHTML = 'There are no cards in the deck. Click "Start Game" to play.';
        deckReady = false;
        return;
    }
    let cardNumber = Math.floor((Math.random() * deck.length));
    document.getElementById("human-score").innerHTML = deck[cardNumber].value + " " + deck[cardNumber].type;
    document.getElementById("human-card-played-1").src = deck[cardNumber].image;
    deck.splice(cardNumber, 1);
    console.log(cardNumber);
    console.log(deck);

}

function calculateScore(score) {
    let totalScore = 0;
    for (let i = 0; i < score.length; i++) {
        
        totalScore += score[i].value;
    }
    return totalScore;
}