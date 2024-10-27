import {readFileSync} from "fs";
import path from "path";
import {Almanac} from "./Alamanac";
import {AlmanacMap} from "./AlmanacMap";
import {MapRange} from "./MapRange";
import {Range} from "./Range";

const data: string[] = readFileSync(path.resolve('day5/input.txt'), {encoding: 'utf8'}).split(/\n/);

let seeds = (data.shift() || "").split(/\s+/).slice(1).map(e => Number(e));

let almanac: Almanac = new Almanac();

while (data.length) {
    const line = data.shift() || "";
    if (line.match(/.*map:/)) {
        let r = data.shift()
        let ranges: MapRange[] = []
        while (r) {
            let vals = r.trim().split(/\s+/);
            ranges.push(new MapRange(Number(vals[1]), Number(vals[0]), Number(vals[2])));
            r = data.shift();
        }

        const header = line.split(/-to-|\s+/);
        let almanacMap = new AlmanacMap(header[0], header[1], ranges);
        almanac.add(almanacMap);
    }
}

console.log("Part 1:", seeds.map(s => almanac.traverse("seed", s)).reduce((acc, cur) => acc < cur ? acc : cur));

let seedRanges: Range[] = [];
for (let i = 0; i + 1 < seeds.length; i += 2) {
    seedRanges.push({start: seeds[i], end: seeds[i] + seeds[i + 1] - 1})
}

// Tough one... Should have installed jest initially but will do it for day 6!
let part2 = seedRanges
    .map(sr => almanac.rangeTraverse("seed", sr))
    .flat()
    .reduce((acc, cur) => {return acc < cur ? acc : cur;});
console.log("Part 2:", part2);