import { readFileSync } from 'fs';

const input = readFileSync('input.txt')
    .toString()
    .split('\n')
    .map(line => line.split(''));

interface Position {
    x: number;
    y: number;
    d: number;
}

const getStartPoint = () => {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] === 'S') {
                return { x: i, y: j };
            }
        }
    }
    return undefined;
};

const mapHeightToNum = (x: number, y: number) => {
    let height = input[x][y];

    if (height === 'S') height = 'a';
    if (height === 'E') height = 'z';
    return height.charCodeAt(0);
};

const getNeighbors = ({ x, y, d }: Position) => {
    const neighbors = [
        { x: x - 1, y, d },
        { x: x + 1, y, d },
        { x, y: y - 1, d },
        { x, y: y + 1, d },
    ];

    return neighbors.filter(n => {
        if (!input?.[n.x]?.[n.y]) return false;

        let current = mapHeightToNum(x, y);
        let neighbor = mapHeightToNum(n.x, n.y);

        return neighbor - current <= 1;
    });
};

const findShortestPath = (x: number, y: number) => {
    const visitedPoints: boolean[][] = [...Array(input.length)].map(_ => Array(input[0].length).fill(false));
    let queue: { x: number; y: number; d: number }[] = [];
    visitedPoints[x][y] = true;
    queue.push({ x, y, d: 0 });

    while (queue.length != 0) {
        const current = queue.shift()!;
        if (input[current.x][current.y] == 'E') {
            return current.d;
        }
        const neighbors = getNeighbors({ ...current, d: current.d + 1 });
        neighbors.forEach(n => {
            if (visitedPoints[n.x][n.y]) return;
            visitedPoints[n.x][n.y] = true;
            queue.push(n);
        });
    }
    return -1;
};

(() => {
    const startPoint = getStartPoint()!;
    console.log(`Task one: ${findShortestPath(startPoint.x, startPoint.y)}`);
})();

(() => {
    const startPoints = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[0].length; j++) {
            if (input[i][j] === 'a') {
                startPoints.push({ x: i, y: j });
            }
        }
    }
    let shortestDistance = Infinity;
    for (let { x, y } of startPoints) {
        const distance = findShortestPath(x, y);
        if (distance < shortestDistance && distance > 0) {
            shortestDistance = distance;
        }
    }
    console.log(`Task two: ${shortestDistance}`);
})();
