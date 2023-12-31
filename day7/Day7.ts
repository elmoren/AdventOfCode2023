import {readFileSync} from "fs";
import path from "path";
import { CamelHand } from "./CamelHand";
import { BaseRules, Game, JokersRules } from "./CamelPoker";

const data: string[] = readFileSync(path.resolve('day7/input.txt'), {encoding: 'utf8'}).split(/\n/);

let baseGame = new Game(new BaseRules());
data.forEach(d => {
    let vals: string[] = d.split(/\s+/);
    baseGame.addHand(vals[0], Number(vals[1]));
})

let sortedHands: CamelHand[] = baseGame.hands.sort((a, b) => b.compareTo(a));

let part1 = 0;
for (let i = 0; i < sortedHands.length; i++) {
    part1 += (sortedHands.length - i) * sortedHands[i].bid;
}
console.log("Part 1:", part1);

let jokerGame = new Game(new JokersRules());
data.forEach(d => {
    let vals: string[] = d.split(/\s+/);
    jokerGame.addHand(vals[0], Number(vals[1]));
})
sortedHands = jokerGame.hands.sort((a, b) => b.compareTo(a));

let part2 = 0;
for (let i = 0; i < sortedHands.length; i++) {
    part2 += (sortedHands.length - i) * sortedHands[i].bid;
}
console.log("Part 2:", part2);