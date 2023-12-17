import {MapRange} from "./MapRange";
import {Range} from "./Range";

export class AlmanacMap {
    readonly source: string;
    readonly destination: string;
    readonly ranges: MapRange[];

    constructor(src: string, dst: string, ranges: MapRange[]) {
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

    mapRange(range: Range): Range[] {
        let result: Range[] = [];
        let matchedRange: Range[] = [];

        for (let i = 0; i < this.ranges.length; i++) {
            let srcRange = {start: this.ranges[i].srcStart, end: this.ranges[i].srcStart + this.ranges[i].range - 1};
            matchedRange.push(srcRange);
        }

        let splits = AlmanacMap.getRangeSplits(range, matchedRange);
        splits.forEach(tmp => {
            let t = {
                start: this.map(tmp.start),
                end: this.map(tmp.end)
            } as Range;

            result.push(t);
        });

        return result;
    }

    static getRangeSplits(input: Range, internals: Range[]): Range[] {
        let result: Range[] = [];

        let currentBoundary: number = input.start;

        while (currentBoundary <= input.end) {
            let nextBoundary: number = AlmanacMap.findNextBoundary(currentBoundary, [input, ...internals]);

            result.push({
                start: currentBoundary,
                end: nextBoundary
            })

            currentBoundary = nextBoundary + 1;
        }

        return result;
    }

    // Walk through and find all the ranges. Lots of opportunity for off by ones
    static findNextBoundary(currentBoundary: number, internals: Range[]): number {
        let next = Number.MAX_SAFE_INTEGER;

        internals.forEach(r => {
            if (r.start > currentBoundary && r.start < next) {
                next = r.start - 1;
            }

            if (r.end >= currentBoundary && r.end < next) {
                next = r.end;
            }
        });

        return next;
    }

}