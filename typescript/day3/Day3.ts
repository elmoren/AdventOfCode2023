import {readFileSync} from "fs";
import path from "path";

const data: string[] = readFileSync(path.resolve('Day3/input.txt'), {encoding: 'utf8'}).split(/\n/);

function containsSymbol(val: string): boolean {
    return val.replaceAll(/[0-9]|\./g, "").length > 0;
}

interface Part {
    i: number;
    j: number;
    size: number
    value: string;
}

function part(i: number, j: number, candidate: string): Part {
    return {
        i: i,
        j: j,
        size: candidate.length,
        value: candidate,
    };
}

let digitRegex = /\d/;
let partNos: Part[] = [];
let gearRatios: number[] = [];

function parseNumberAt(data: string[], i: number, j: number) {
    let candidate = "";
    let k = j;
    while (k < data[i].length && digitRegex.test(data[i][k])) {
        candidate += data[i][k];
        k++;
    }

    return candidate;
}

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (digitRegex.test(data[i][j])) {
            let candidate = parseNumberAt(data, i, j);
            let testStr = "";

            // Previous
            if (i > 0) {
                testStr += data[i - 1].substring(j - 1, j + candidate.length + 1);
            }
            // Current Row
            testStr += data[i].substring(j - 1, j + candidate.length + 1);

            // Next
            if (i + 1 < data[i].length) {
                testStr += data[i + 1].substring(j - 1, j + candidate.length + 1);
            }

            if (containsSymbol(testStr)) {
                partNos.push(part(i, j, candidate));
            }

            j += candidate.length;
        }
    }
}

function getAdjacentParts(partsList: Part[], i: number, j: number): Part[] {
    let adjacent: Part[] = [];
    partsList.forEach(p => {
            // Is row distance < 2 and does the number overlap with the gear location +/- 1
            if (Math.abs(p.i - i) < 2 && p.j <= j + 1 && j - 1 <= p.j + p.size-1) {
                adjacent.push(p)
            }
        }
    )
    return adjacent;
}


for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] === "*") {
            let adjacentParts = getAdjacentParts(partNos, i, j);
            if (adjacentParts.length === 2) {
                gearRatios.push(Number(adjacentParts[0].value) * Number(adjacentParts[1].value))
            }
        }
    }
}

let part1 = partNos.map(e => Number(e.value)).reduce((acc, cur) => acc + cur, 0);
console.log("Part No Total: ", part1);

let part2 = gearRatios.reduce((acc, cur) => acc + cur, 0);
console.log("Gear Ratio Total: ", part2);