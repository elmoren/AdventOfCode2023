import {Range} from "./Range";

export class AlmanacMap {
    readonly source: string;
    readonly destination: string;
    readonly ranges: Range[];

    constructor(src: string, dst: string, ranges: Range[]) {
        this.source = src;
        this.destination = dst;
        this.ranges = ranges;
    }

    map(start: number): number {
        const range = this.ranges.find(e => start >= e.srcStart && start < e.srcStart + e.range);
        if (!range) {
            return start;
        }
        return range.destStart + (start - range.srcStart);
    }

}