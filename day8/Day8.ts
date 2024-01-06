import { readFileSync } from "fs";
import path from "path";
import { DesertMap, MapNode } from "./DesertMap";

const data: string[] = readFileSync(path.resolve('Day8/input.txt'), { encoding: 'utf8' }).split(/\n/);

function node(d: string): MapNode {
    const values = d.split(/[^A-Z]+/g);
    return {
        id: values[0],
        left: values[1],
        right: values[2]
    } as MapNode;
}

const instructions: string = data.shift() || "";
const nodes: MapNode[] = data
    .filter(d => d && d.length > 0)
    .map(d => node(d));

const desertMap: DesertMap = new DesertMap(instructions, nodes);

console.log("Part 1:", desertMap.navigate('AAA', 'ZZZ'));