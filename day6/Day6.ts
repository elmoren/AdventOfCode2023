import {readFileSync} from "fs";
import path from "path";
import { Race, calc_distance } from "./Race";

const data: string[] = readFileSync(path.resolve('day6/input.txt'), {encoding: 'utf8'}).split(/\n/);

const times = data[0].split(/\s+/).slice(1);
const distances = data[1].split(/\s+/).slice(1);

let races: Race[] = [];
for (let i = 0; i < times.length; i++) {
    races.push({duration_ms: Number(times[i]), distance_mm: Number(distances[i])});
}

let ways_to_win: number[] = new Array(races.length).fill(0);;
for (let i = 0; i < races.length; i++) {
    const r = races[i];
    for (let button_press = 1; button_press < r.duration_ms - 1; button_press++) {
        const d = calc_distance(button_press, r);
        if (d > r.distance_mm) {
            ways_to_win[i]++;
        }
    }
}

console.log("Part 1:", ways_to_win.reduce((acc, n) => acc * n, 1));

let part2_race: Race = {
    duration_ms: Number(data[0].replaceAll(/\D/g, '')),
    distance_mm: Number(data[1].replaceAll(/\D/g, ''))
};

let part2_ways_to_win = 0;
for (let button_press = 1; button_press < part2_race.duration_ms - 1; button_press++) {
    const d = calc_distance(button_press, part2_race);
    if (d > part2_race.distance_mm) {
        part2_ways_to_win++;
    }
}

console.log("Part 2:", part2_ways_to_win);