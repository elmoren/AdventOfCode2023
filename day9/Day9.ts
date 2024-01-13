import { readFileSync } from "fs";
import path from "path";
import { SensorData } from "./SensorData";

const data: string[] = readFileSync(path.resolve('day9/input.txt'), { encoding: 'utf8' }).split(/\n/);

let sensorMaps: SensorData[] = data
    .filter(d => !!d)
    .map(d => new SensorData(d.split(/\s+/).map(e => Number(e))));

let part1 = sensorMaps.reduce((acc, cur) => acc + cur.extrapolateForward(), 0)
let part2 = sensorMaps.reduce((acc, cur) => acc + cur.extrapolateBackwards(), 0)

console.log("Day 9, Part 1:", part1);
console.log("Day 9, Part 2:", part2);