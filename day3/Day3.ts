import {readFileSync} from "fs";
import path from "path";

const data: string[] = readFileSync(path.resolve('Day3/input.txt'), {encoding: 'utf8'}).split(/\n/);

function containsSymbol(val: string): boolean {
    return val.replaceAll(/[0-9]|\./g, "").length > 0;
}

let digitRegex = /\d/;
let partNos: string[] = [];

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
                partNos.push(candidate);
            }

            j += candidate.length;
        }
    }
}

let part1 = partNos.map(e => Number(e)).reduce((acc, cur) => acc + cur, 0);
console.log(part1);