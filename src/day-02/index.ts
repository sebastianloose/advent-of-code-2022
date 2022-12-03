import { readFileSync } from 'fs';

type Player = 'X' | 'Y' | 'Z';
type Opponent = 'A' | 'B' | 'C';

type Game = {
    p: Player;
    o: Opponent;
};

const input = readFileSync('input.txt')
    .toString()
    .split('\n')
    .map(s => ({ p: s.substring(2, 3), o: s.substring(0, 1) })) as Game[];

const winningCombinations = [{ p: 'X', o: 'C' }, { p: 'Y', o: 'A' }, { p: 'Z', o: 'B' }];
const loosingCombinations = [{ p: 'X', o: 'B' }, { p: 'Y', o: 'C' }, { p: 'Z', o: 'A' }];
const drawCombinations = [{ p: 'X', o: 'A' }, { p: 'Y', o: 'B' }, { p: 'Z', o: 'C' }];
const itemPoints = { X: 1, Y: 2, Z: 3 };

const gameResult = ({ p, o }: Game) => {
    if (winningCombinations.find(e => e.p == p && e.o == o)) {
        return 6;
    }
    if (loosingCombinations.find(e => e.p == p && e.o == o)) {
        return 0;
    }
    return 3;
};

//Task One
const resultOne = input.reduce((a, b) => a + gameResult(b) + itemPoints[b.p], 0);
console.log(`Task 1: ${resultOne}`);

// Task Two
const resultCombinations = { X: loosingCombinations, Y: drawCombinations, Z: winningCombinations };

const resultTwo = input.reduce((a, b) => {
    const playerItem = resultCombinations[b.p].find(item => item.o == b.o)!.p as Player;
    return a + gameResult({ p: playerItem, o: b.o }) + itemPoints[playerItem];
}, 0);
console.log(`Task 2: ${resultTwo}`);
