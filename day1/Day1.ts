import {readFileSync} from "fs";
import path from "path";

const hi:string = 'Hello World!';

const data = readFileSync(path.resolve(__dirname, 'input.txt'), {encoding: 'utf8'});
console.log(data)