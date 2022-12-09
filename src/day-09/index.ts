import { readFileSync } from 'fs';

type Direction = 'U' | 'R' | 'D' | 'L';

interface Step {
    direction: Direction;
    distance: number;
}
interface Position {
    x: number;
    y: number;
}

const steps = readFileSync('input.txt')
    .toString()
    .split('\n')
    .map(row => {
        const parts = row.split(' ');
        return {
            direction: parts[0],
            distance: parseInt(parts[1]),
        };
    }) as Step[];

const movementsOffsets = { U: { x: 0, y: 1 }, R: { x: 1, y: 0 }, D: { x: 0, y: -1 }, L: { x: -1, y: 0 } };

const moveHead = (head: Position, direction: Direction) => {
    const offset = movementsOffsets[direction];
    head.x += offset.x;
    head.y += offset.y;
};

const moveTail = (head: Position, tail: Position) => {
    let y = head.y - tail.y;
    let x = head.x - tail.x;

    if (Math.abs(y) <= 1 && Math.abs(x) <= 1) return;
    tail.x += Math.sign(x);
    tail.y += Math.sign(y);
};

(() => {
    const tailPositions: Position[] = [{ x: 0, y: 0 }];
    let head = { x: 0, y: 0 };
    let tail = { x: 0, y: 0 };

    for (let { direction, distance } of steps) {
        for (let i = 0; i < distance; i++) {
            moveHead(head, direction);
            moveTail(head, tail);

            const item = tailPositions.find(item => item.x == tail.x && item.y == tail.y);
            if (!item) tailPositions.push({ ...tail });
        }
    }
    console.log(`Task one: ${tailPositions.length}`);
})();

(() => {
    const tailPositions: Position[] = [{ x: 0, y: 0 }];
    const ropeParts = [...Array(10)].map(_ => ({ x: 0, y: 0 })) as Position[];

    for (let { direction, distance } of steps) {
        for (let i = 0; i < distance; i++) {
            moveHead(ropeParts[0], direction);
            for (let i = 1; i < 10; i++) moveTail(ropeParts[i - 1], ropeParts[i]);

            const item = tailPositions.find(item => item.x == ropeParts[9].x && item.y == ropeParts[9].y);
            if (!item) tailPositions.push({ ...ropeParts[9] });
        }
    }
    console.log(`Task two: ${tailPositions.length}`);
})();
