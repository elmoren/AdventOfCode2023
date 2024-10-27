import {readFileSync} from "fs";
import path from "path";

const data: string[] = readFileSync(path.resolve('Day2/input.txt'), {encoding: 'utf8'}).split(/\n/);

interface Grab {
    red: number,
    blue: number,
    green: number
}

interface Game {
    gameId: number
    grabs: Grab[]
}

function emptyGrab(): Grab {
    return {
        red: 0,
        green: 0,
        blue: 0
    };
}

function parseGame(line: string): Game {
    let strings = line.split(":");
    let grabs = strings[1].split(";");

    return {
        gameId: Number(strings[0].split(" ")[1]),
        grabs: grabs.map(g => {

            let grab: Grab = emptyGrab();

            g.split(",").forEach(e => {
                    let pair = e.trim().split(" ");
                    // @ts-ignore
                    grab[pair[1]] = Number(pair[0]);
                }
            );

            return grab
        })
    }
}

let games: Game[] = data.map(l => parseGame(l));

let part1 = games
    .filter(e => e.grabs.every(value => value.red <= 12 && value.green <= 13 && value.blue <= 14))
    .reduce((acc, cur) => acc + cur.gameId, 0);

console.log(part1);

let part2 = games
    .map(g => {
        return g.grabs.reduce((acc, g) => {
            return {
                red: acc.red > g.red ? acc.red : g.red,
                green: acc.green > g.green ? acc.green : g.green,
                blue: acc.blue > g.blue ? acc.blue : g.blue
            } as Grab;
        }, emptyGrab())
    })
    .reduce((acc, g) => acc + (g.red * g.blue * g.green) , 0)

console.log(part2);