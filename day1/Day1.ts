import {readFileSync} from "fs";
import path from "path";

const data: string[] = readFileSync(path.resolve('Day1/input.txt'), {encoding: 'utf8'}).split(/\n/);

interface CalibrationPair {
    firstDigit: string;
    lastDigit: string;
    calibration: number;
}


function buildPair(first: string, last: string): CalibrationPair {
    return {
        firstDigit: first,
        lastDigit: last,
        calibration: Number(first + last)
    };
}

function parseDigits(line: String): CalibrationPair {
    const digitMap = {
        "one": "o1e",
        "two": "t2o",
        "three": "t3e",
        "four": "f4r",
        "five": "f5e",
        "six": "s6x",
        "seven": "s7n",
        "eight": "e8t",
        "nine": "n9e"
    };

    Object.keys(digitMap).forEach(k => line = line.replaceAll(k, digitMap[k as keyof typeof digitMap]));
    let matches = line.match(/[0-9]|one|two|three|four|five|six|seven|eight|nine/gi) || ["0"];
    return buildPair(matches[0], matches[matches.length - 1]);
}

const total = data
    .map(d => parseDigits(d))
    .reduce((acc, val) => acc + val.calibration, 0)

console.log(total);