export interface MapNode {
    id: string;
    left: string;
    right: string;
}

export class DesertMap {

    private instructions: Array<'L' | 'R'>;
    private nodes: Map<string, MapNode> = new Map();

    constructor(instructions: string, nodes: MapNode[]) {
        this.instructions = instructions.split('') as Array<'L' | 'R'>;
        nodes.forEach(n => this.nodes.set(n.id, n));
    }

    navigate(start: string, endCondion: (node: string) => boolean): number {
        let currentLocation: string = start;
        let steps: number = 0;
        let currentInstruction: string = this.instructions[steps];

        while (!endCondion(currentLocation)) {
            if (currentInstruction === 'L') {
                currentLocation = this.nodes.get(currentLocation)?.left || "";
            } else {
                currentLocation = this.nodes.get(currentLocation)?.right || "";

            }
            
            currentInstruction = this.instructions[++steps % this.instructions.length];
        }

        return steps;
    }

    // Navigation for ghosts
    spookyNavigate(startChar: string, endChar: string) {
        let steps: number = 0;
        let currentInstruction: "L" | "R" = this.instructions[steps];
        let currentLocations: string[] = [];
        
        for (const k of this.nodes.keys()) {
            if (k.endsWith(startChar)) {
                currentLocations.push(k);
            }
        }
        
        let firstMatches: number[] = currentLocations.map(l => this.navigate(l, (node) => node.endsWith('Z')));

        return firstMatches.reduce(lcm);
    }
}

const lcm = function (a: number, b: number): number {
    return a * b / gcd(a, b);
}

const gcd =  function (a: number, b: number): number {
     return a ? gcd(b % a, a) : b 
}
