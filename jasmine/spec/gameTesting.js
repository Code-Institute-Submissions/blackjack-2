describe("Card score calculator", function() {
    describe("Calculate the total score using random cards", function() {
        it('should return a value of 12', () => {
            expect(calculateScore([{value: 2}, {value: 10}])).toBe(12);
        });
        it('should return 15', () => {
            expect(calculateScore([{value:1}, {value:10,}, {value:3}, {value:1}])).toBe(15);
        });
        it('should return 20 when we use 5 cards', () => {
            expect(calculateScore([{value:5}, {value:3}, {value:10}, {value:1}, {value:1}])).toBe(20);
        });
    });
    describe("Calculate aces so that it can be either 1 or 11 depending on final score", function() {
        it('should return a score of 20', () => {
            expect(calculateScore([{value:1}, {value:1}, {value:10}, {value: 1}, {value: 7}])).toBe(20);
        });
        it('should calculate one ace as 1 and the other ace as 11', () => {
            expect(calculateScore([{value: 2}, {value:1}, {value:4}, {value:1}, {value: 3}])).toBe(21);
        });
        it('should be under 21 with three aces', () => {
            expect(calculateScore([{value:1}, {value:4}, {value:2}, {value:2}, {value:1}, {value:1}])).toBe(21);
        });
        it('should add 4 aces to 14', () => {
            expect(calculateScore([{value:1}, {value:1}, {value:1}, {value:1}])).toBe(14);
        });
    });
});
describe("Calculate blackjack", function() {
    it('should return blackjack when a 10 card and ace are the first cards', () => {
        expect(isBlackJack([{value: 1}, {value:10}])).toBe(true);
    });
    it('should not return a blackjack if it is an ace and a non 10 card', () => {
        expect(isBlackJack([{value: 1}, {value: 3}])).toBe(false);
    });
    it('should not return blackjack if it is a 10 card and a non ace card', () => {
        expect(isBlackJack([{value:4}, {value:10}])).toBe(false);
    });
})