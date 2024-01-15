export interface Point {
    x: number,
    y: number
};

export function findPossiblePaths(map: string[][], current: Point): Point[] {
    let testDirections: Point[] = [
        add(current, { x: 1, y: 0 }),
        add(current, { x: 0, y: 1 }),
        add(current, { x: -1, y: 0}),
        add(current, { x: 0, y: -1})
    ];

    return testDirections
        .filter(d => isNavigable(map, d, current));
}

export function next(mapVal: string, current: Point, previous: Point) {
    let nav = navigation[mapVal];

    let next = add(current, nav[0]);

    if (!isEqual(previous, next)) {
        return next;
    }

    return add(current, nav[1]);
}


export function findStart(dataMap: string[][]): Point {
    let x = dataMap.findIndex(inner => inner.indexOf('S') >= 0);
    return {
        x: x,
        y: dataMap[x].indexOf('S')
    };
}

export function isEqual(a: Point, b: Point) {
    return a.x === b.x && a.y === b.y
}

function add(a: Point, b: Point): Point {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    };
}

function isNavigable(map: string[][], current: Point, next: Point): boolean {
    let dirs: Point[] = navigation[map[current.x][current.y]];
    if (!dirs) {
        return false;
    }

    const tests = [
        add(dirs[0], current),
        add(dirs[1], current)
    ];

    return isEqual(next, tests[0]) || isEqual(next, tests[1]);
}

const navigation: { [key: string]: Point[] } = {
    '|': [
        { x: 1, y: 0 },
        { x: -1, y: 0 }
    ],
    '-': [
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ],
    'L': [
        { x: -1, y: 0 },
        { x: 0, y: 1 }
    ],
    'J': [
        { x: -1, y: 0 },
        { x: 0, y: -1 }
    ],
    '7': [
        { x: 1, y: 0 },
        { x: 0, y: -1 }
    ],
    'F': [
        { x: 1, y: 0 },
        { x: 0, y: 1 }
    ]
};