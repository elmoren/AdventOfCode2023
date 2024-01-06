export interface MapNode {
    id: string;
    left: string;
    right: string;
}

export class DesertMap {

    private instructions: string[];
    private nodes: Map<string, MapNode> = new Map();

    constructor(instructions: string, nodes: MapNode[]) {
        this.instructions = instructions.split('');
        nodes.forEach(n => this.nodes.set(n.id, n));
    }

    navigate(start: string, destination: string): number {
        let currentLocation: string = start;
        let steps: number = 0;
        let currentInstruction: string = this.instructions[steps];

        while (currentLocation !== destination) {
            if (currentInstruction === 'L') {
                currentLocation = this.nodes.get(currentLocation)?.left || "";
            } else {
                currentLocation = this.nodes.get(currentLocation)?.right || "";

            }
            
            currentInstruction = this.instructions[++steps % this.instructions.length]
        }

        return steps;
    }

}