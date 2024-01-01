export class CamelHand {

    readonly cards: string[];
    readonly bid: number;
    readonly score: string;

    constructor(cards: string, bid: number, score: string) {
        this.cards = cards.split('').slice(0, 5);
        this.bid = bid;
        this.score = score;
    }

    compareTo(other: CamelHand): number {
        return this.score.localeCompare(other.score);
    }
        
}