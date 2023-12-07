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

function parseGame(line: string): Game {
    let strings = line.split(":");
    let grabs = strings[1].split(";");

    return {
        gameId: Number(strings[0].split(" ")[1]),
        grabs: grabs.map(g => {

            let grab: Grab = {
                red: 0,
                green: 0,
                blue: 0
            };

            g.split(",").forEach(e => {
                    let pair = e.trim().split(" ");
                    grab[pair[1]] = Number(pair[0]);
                }
            );

            return grab
        })
    }
}

let result = data
    .map(l => parseGame(l))
    .filter(e => e.grabs.every(value => value.red <= 12 && value.green <= 13 && value.blue <= 14))
    .reduce((acc, cur) => acc + cur.gameId, 0);

console.log(result);
