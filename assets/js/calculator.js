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


    return totalScore;
}

