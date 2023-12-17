export class MapRange {
    readonly srcStart: number;
    readonly destStart: number
    readonly range: number;

    constructor(src: number, dest: number, range: number) {
        this.srcStart = src;
        this.destStart = dest;
        this.range = range;
    }
}