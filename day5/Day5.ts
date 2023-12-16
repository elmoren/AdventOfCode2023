import {readFileSync} from "fs";
import path from "path";
import {Almanac} from "./Alamanac";
import {AlmanacMap} from "./AlmanacMap";
import {Range} from "./Range";

const data: string[] = readFileSync(path.resolve('day5/input.txt'), {encoding: 'utf8'}).split(/\n/);

let seeds = (data.shift() || "").split(/\s+/).slice(1).map(e => Number(e));

let almanac: Almanac = new Almanac();

while (data.length) {
    const line = data.shift() || "";
    if (line.match(/.*map:/)) {
        let r = data.shift()
        let ranges: Range[] = []
        while (r) {
            let vals = r.trim().split(/\s+/);
            ranges.push(new Range(Number(vals[1]), Number(vals[0]), Number(vals[2])));
            r = data.shift();
        }

        const header = line.split(/-to-|\s+/);
        let almanacMap = new AlmanacMap(header[0], header[1], ranges);
        almanac.add(almanacMap);
    }
}

console.log("Part 1:", seeds.map(s => almanac.traverse("seed", s)).reduce((acc, cur) => acc < cur ? acc : cur));
