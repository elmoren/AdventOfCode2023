import {AlmanacMap} from "./AlmanacMap";

export class Almanac  {
    private map: Map<string, AlmanacMap> = new Map<string, AlmanacMap>();

    add(am: AlmanacMap) {
        this.map.set(am.source, am);
    }

    traverse(src: string, start: number): number {
        let almanacMap = this.map.get(src);
        if (!almanacMap) {
            return start;
        }

        if (this.map.has(almanacMap.destination)) {
            return this.traverse(almanacMap.destination, almanacMap.map(start))
        }

        return almanacMap.map(start);
    }
}
