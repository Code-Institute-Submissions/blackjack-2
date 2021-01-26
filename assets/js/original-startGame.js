let fullDeck = [];
let deckReady = false;


function startGame() {
    if (deckReady == false) {
        function Card(value, type, image_url) {
            this.value = value;
            this.type = type;
            this.image = image_url;
        }

        for (let i = 1; i < 14; i++) {
            for (let j = 0; j < 4; j++) {
                if (j == 0) {
                    fullDeck.push(new Card(i, "diamonds", `assets/img/cards/${i}D.jpg`));
                } else if (j == 1) {
                    fullDeck.push(new Card(i, "hearts", `assets/img/cards/${i}H.jpg`));
                } else if (j == 2) {
                    fullDeck.push(new Card(i, "spades", `assets/img/cards/${i}S.jpg`));
                } else {
                    fullDeck.push(new Card(i, "clubs", `assets/img/cards/${i}C.jpg`));
                }
            }

        }
        document.getElementById("card-value").innerHTML = '';
        console.log(fullDeck);
        deckReady = true;
    } else {
        document.getElementById("card-value").innerHTML = 'Deck already created. Play now!';
    }
}







function hit(deck) {
    if (deck.length == 0) {
        document.getElementById("card-value").innerHTML = 'There are no cards in the deck. Click "Start Game" to play.';
        deckReady = false;
        return;
    }
    let cardNumber = Math.floor((Math.random() * deck.length));
    document.getElementById("card-value").innerHTML = deck[cardNumber].value + " " + deck[cardNumber].type;
    document.getElementById("card-image").src = deck[cardNumber].image;
    deck.splice(cardNumber, 1);
    console.log(cardNumber);
    console.log(deck);

}