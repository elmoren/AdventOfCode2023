import { readFileSync } from "fs";
import path from "path";
import { SensorData } from "./SensorData";

const data: string[] = readFileSync(path.resolve('day9/input.txt'), { encoding: 'utf8' }).split(/\n/);

let part1 = data
    .filter(d => !!d)
    .map(d => new SensorData(d.split(/\s+/).map(e => Number(e))))
    .reduce((acc, cur) => acc + cur.getResult(), 0)

console.log("Day 9, Part 1:", part1);