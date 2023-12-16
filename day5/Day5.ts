import {readFileSync} from "fs";
import path from "path";

const data: string[] = readFileSync(path.resolve('day5/input.txt'), {encoding: 'utf8'}).split(/\n/);
console.log(data);