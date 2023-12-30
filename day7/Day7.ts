import {readFileSync} from "fs";
import path from "path";
import { CamelHand } from "./CamelHand";

const data: string[] = readFileSync(path.resolve('day7/input.txt'), {encoding: 'utf8'}).split(/\n/);

let sortedHands: CamelHand[] = data.map(d => {
    let vals: string[] = d.split(/\s+/);
    return new CamelHand(vals[0], Number(vals[1]));
}).sort((a, b) => b.compareTo(a));

let part1 = 0;
for (let i = 0; i < sortedHands.length; i++) {
    part1 += (sortedHands.length - i) * sortedHands[i].bid;
}
console.log("Part 1:", part1);