import {readFileSync} from "fs";
import path from "path";

const data: string[] = readFileSync(path.resolve('Day2/input.txt'), {encoding: 'utf8'}).split(/\n/);

console.log(data)