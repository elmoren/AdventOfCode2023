import { CamelHand } from "./CamelHand";

export class Game {

    readonly rules: Rules;
    readonly hands: CamelHand[];

    constructor(rules: Rules) {
        this.rules = rules;
        this.hands = new Array();
    }

    addHand(hand: string, bid: number): void {
        this.hands.push(new CamelHand(hand, bid, this.rules.calcRank(hand.split(''))));
    }

}

export interface Rules {
    calcRank(cards: string[]): string;
}

export class BaseRules implements Rules {

    private readonly CARD_MAP: { [key: string]: string; } = {
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

    calcRank(cards: string[]): string {
        let cardCounts: { [key: string]: number } = {};
        cards.forEach(c => cardCounts[c] = (cardCounts[c] + 1) || 1);
        let sortedCounts: number[] = Object.keys(cardCounts).map(k => cardCounts[k]).sort((a, b) => b - a);
        let score: string = "";

        if (sortedCounts.length === 1) {
            // 5 of a kind
            score = "6"
        } else if (sortedCounts.length === 2) {
            // 4 of a kind or full house
            if (sortedCounts[0] == 4) {
                score = "5"
            } else {
                score = "4"
            }
        } else if (sortedCounts.length === 3) {
            // 3 of a kind, 2 pair
            if (sortedCounts[0] === 3) {
                score = "3"
            } else {
                score = "2"
            }
        } else if (sortedCounts.length === 4) {
            // 1 pair
            score = "1"
        }
        else {
            score = "0"
        }

        for (const c of cards) {
            score += this.CARD_MAP[c];
        }
        return score;
    }
}

export class JokersRules implements Rules {

    private readonly JOKER_MAP: { [key: string]: string; } = {
        "A": "14",
        "K": "13",
        "Q": "12",
        "J": "01",
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

    calcRank(cards: string[]): string {
        let cardCounts: { [key: string]: number } = {};
        cards.forEach(c => cardCounts[c] = (cardCounts[c] + 1) || 1);
        let sortedCounts: number[] = Object.keys(cardCounts).map(k => cardCounts[k]).sort((a, b) => b - a);
        let score: string = "";

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

        for (const c of cards) {
            score += this.JOKER_MAP[c];
        }
        return score;
    }
}