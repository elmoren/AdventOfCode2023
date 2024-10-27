import {readFileSync} from "fs";
import path from "path";

const data: string[] = readFileSync(path.resolve('day4/input.txt'), {encoding: 'utf8'}).split(/\n/);

class Card {
    readonly cardNo: string;
    readonly winningNos: string[];
    readonly playerNos: string[];
    readonly matches: string[] = [];
    readonly score: number;

    constructor(card: string) {
        let parts = card.split(/[:|]/);
        this.cardNo = parts[0].trim().split(/\s+/)[1]
        this.winningNos = parts[1].trim().split(/\s+/);
        this.playerNos = parts[2].trim().split(/\s+/);

        this.playerNos.forEach(num => {
            if (this.winningNos.includes(num)) {
                this.matches.push(num);
            }
        })

        if (this.matches.length === 0) {
            this.score = 0;
        } else {
            this.score = Math.pow(2, this.matches.length - 1)
        }
    }

}

const cards: Card[] = data.map(d => new Card(d));
const part1 = cards.reduce((acc, cur) => Number(acc) + Number(cur.score), 0);
console.log("Part 1:", part1);

const cardTotals: number[] = Array(cards.length);
for (let i = cards.length - 1; i >= 0; i--) {
    let current: Card = cards[i];
    cardTotals[i] = cardTotals
        .slice(i + 1, i + 1 +  current.matches.length)
        .reduce((acc, cur) => acc + cur, 1);
}
console.log("Part 2:", cardTotals.reduce((acc, cur) => acc + cur, 0));