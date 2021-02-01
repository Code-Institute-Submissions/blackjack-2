
function createDeck() {
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
}

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

    // computer gets two cards and human gets two cards at the beginning of the game

    computerScore = calculateScore(computerHand);
    playerScore = calculateScore(playerHand);

    displayCards(playerHand, computerHand, player);

    calculateWin();
    // player score is displayed, but computer score is hidden for now

    deckReady = true;
}

// this function is used to calculate the current hand
function calculateScore(score) {
    let totalScore = 0;
    for (let i = 0; i < score.length; i++) {

        totalScore += score[i].value;

        // if one of the cards is an Ace it can be either 1 or 11. This will recalculate the score if the higher score would be less than 22
        if (score[i].value == 1 && totalScore + 10 < 22) {
            totalScore += 10;
        }
    } 
    
    if (totalScore > 21) {
        notificationArea.innerHTML = "Your score is over 21. You lose!"
    }


    return totalScore;
}

function calculateWin() {
     let scoreRemainder = 21 - playerScore; 
    let smallerCards = 0; 

     for (let cardsRemaining = 0; cardsRemaining < fullDeck.length; cardsRemaining++) {
         if (fullDeck[cardsRemaining].value <= scoreRemainder) {
            smallerCards++;
         }
     }
    let winPercentage = Math.round((smallerCards/fullDeck.length)*100);
    notificationArea.innerHTML = 'If you "hit", there is a ' + winPercentage + '% chance that you will be under 21.';
    return winPercentage;

}


