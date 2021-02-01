
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

    if (totalScore > 21 && player == "human") {
        notificationArea.innerHTML = "Your score is over 21. Bust!";
        gameStop = true;
    } else if (totalScore > 21 && player == "computer") {
        notificationArea.innerHTML = "Computer score is over 21. Player Wins!"
        gameStop = true;
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
    let winPercentage = Math.round((smallerCards / fullDeck.length) * 100);
    notificationArea.innerHTML = 'If you "hit", there is a ' + winPercentage + '% chance that you will be under 21.';
    return winPercentage;

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

    for (let i = 0; i < cardsToClear; i++) {
        document.getElementById(`human-card-${i + 1}`).innerHTML = "";
        document.getElementById(`computer-card-${i + 1}`).innerHTML = "";
    }
    playerScore = 0;
    document.getElementById("human-score").innerText = "";
    computerScore = 0;
    playerHand = [];
    computerHand = [];
    gameStop = false;
}

function computerTurn() {
    while (computerScore < 17) {
            let cardNumber = Math.floor((Math.random() * fullDeck.length));
            computerHand.push(fullDeck[cardNumber]);
            fullDeck.splice(cardNumber, 1);
            computerScore = calculateScore(computerHand);
            displayCards(playerHand, computerHand, player);
        }

        endOfPlay();        

        return;
        
    }

    function endOfPlay() {
        if (playerHand.length == 2 || computerHand.length == 2) {
            if ((playerHand[0].value == 1 && playerHand[1].value == 10) || (playerHand[0].value == 1 && playerHand[1].value == 10)) {
                notificationArea.innerHTML = "Player has Blackjack!";
            } else if ((computerHand[0].value == 1 && computerHand[1].value == 10) || (computerHand[0].value == 1 && computerHand[1].value == 10)) {
                notificationArea.innerHTML = "Computer has Blackjack";
            }
        }
        
        if (playerScore > computerScore || computerScore > 21) {
            notificationArea.innerHTML = "Player wins!";
        } else if (playerScore == computerScore) {
            notificationArea.innerHTML = "Draw";
        } else {
            notificationArea.innerHTML = "Computer wins!";
        }

        gameStop = true;
    }