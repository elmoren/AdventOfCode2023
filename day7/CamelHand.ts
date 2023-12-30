import internal from "stream";

export class CamelHand {

    readonly cards: Card[];
    readonly bid: number;
    readonly rank: string; 
    readonly score: string;

    constructor(cards: string, bid: number) {
        this.cards = cards.split('').map(c => new Card(c)).slice(0, 5);
        this.bid = bid;
        this.rank = this.calcRank();
        this.score = this.rank;
        for (let c of this.cards) {
            this.score += c.value;
        }
    }

    compareTo(other: CamelHand): number {
        return this.score.localeCompare(other.score);
    }
        
    private calcRank(): string {
        let cardCounts: {[key: string]: number} = {};
        this.cards.forEach(c => cardCounts[c.card] = (cardCounts[c.card] + 1) || 1);
        let sortedCounts: number[] = Object.keys(cardCounts).map(k => cardCounts[k]).sort((a, b) => b - a);

        if (sortedCounts.length === 1) {
              // 5 of a kind
            return "6"
        } else if (sortedCounts.length === 2) {
            // 4 of a kind or full house
            if (sortedCounts[0] == 4) {
                return "5"
            } else {
                return "4"
            }
        } else if (sortedCounts.length === 3) {
            // 3 of a kind, 2 pair
        
            if (sortedCounts[0] === 3) {
                return "3"
            } else {
                return "2"
            }
        } else if (sortedCounts.length === 4) {
            // 1 pair
            return "1"
        }
        else {
            return "0"
        }
    }
}

export class Card {

    readonly card: string;
    readonly value: string;

    constructor(card: string) {
        this.card = card;
        this.value = CARD_MAP[card] || "";
    }

}

const CARD_MAP: { [key: string]: string; } = {
    "A": "14",
    "K": "13",
    "Q": "12",
    "J": "11",
    "T": "10",
    "9": "09",
    "8": "08",
    "7": "07",
    "6": "06",
    "5": "05",
    "4": "04",
    "3": "03",
    "2": "02"
};