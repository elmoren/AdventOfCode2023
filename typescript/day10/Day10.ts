import { readFileSync } from "fs";
import path from "path";
import { findPossiblePaths, findStart, isEqual, next, Point } from "./MapModel";
const data: string[] = readFileSync(path.resolve('day10/input.txt'), { encoding: 'utf8' }).split(/\n/);

const dataMap: string[][] = [];
data.forEach(e => dataMap.push(e.split('')));

const start: Point = findStart(dataMap);

let dirs: Point[] = findPossiblePaths(dataMap, start);
let d1 = {
    cur: dirs[0],
    prev: start
};
let d2 = {
    cur: dirs[1],
    prev: start
};
let steps = 1;

while (!isEqual(d1.cur, d2.cur)) {
    d1 = {
        cur: next(dataMap[d1.cur.x][d1.cur.y], d1.cur, d1.prev),
        prev: d1.cur
    };
    
    d2 = {
        cur: next(dataMap[d2.cur.x][d2.cur.y], d2.cur, d2.prev),
        prev: d2.cur
    };

    steps++;
}

console.log("Day 10, Part 1:", steps);

