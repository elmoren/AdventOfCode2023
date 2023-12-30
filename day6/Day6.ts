import {readFileSync} from "fs";
import path from "path";

const data: string[] = readFileSync(path.resolve('day6/input.txt'), {encoding: 'utf8'}).split(/\n/);

console.log(data);