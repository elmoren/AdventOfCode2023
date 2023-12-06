import {readFileSync} from "fs";
import path from "path";

const data: string[] = readFileSync(path.resolve('Day1/input.txt'), {encoding: 'utf8'}).split(/\n/);

interface CalibrationPair {
    firstDigit: string;
    lastDigit: string;
    calibration: number;
}

function buildPair(first: string, last: string) {
    return {
        firstDigit: first,
        lastDigit: last,
        calibration: Number(first + last)
    };
}

function parseDigits(line: String): CalibrationPair {
    let matches = line.match(/[0-9]/g) || ["0"];
    return buildPair(matches[0], matches[matches.length - 1]);
}

const total = data
    .map(d => parseDigits(d))
    .reduce((acc, val) => acc + val.calibration, 0)

console.log(total);