import {AlmanacMap} from "./AlmanacMap";
import {Range} from "./Range";

export class Almanac {
    private map: Map<string, AlmanacMap> = new Map<string, AlmanacMap>();

    add(am: AlmanacMap) {
        this.map.set(am.source, am);
    }

    traverse(src: string, start: number): number {
        if (!this.map.has(src)) {
            throw new Error("No map found for source: " + src);
        }

        let almanacMap = this.map.get(src);

        let current = start;
        while (almanacMap) {
            current = almanacMap.map(current);
            almanacMap = this.map.get(almanacMap.destination);
        }

        return current;
    }

    rangeTraverse(src: string, range: Range): number[] {
        if (!this.map.has(src)) {
            throw new Error("No map found for source: " + src);
        }

        let almanacMap = this.map.get(src);
        let ranges: Range[] = [range];

        while (almanacMap) {
            // @ts-ignore
            ranges = ranges.map(r => almanacMap.mapRange(r)).flat();
            // @ts-ignore
            almanacMap = this.map.get(almanacMap.destination);
        }

        return ranges.map(r => [r.start, r.end]).flat();
    }
}
