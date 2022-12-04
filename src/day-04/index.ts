import { readFileSync } from 'fs';

const input = readFileSync('input.txt')
    .toString()
    .split('\n')
    .map(item => item.split(',').map(ids => ids.split('-').map(id => parseInt(id))));

// Task one
const resultOne = input.reduce(
    (a, b) => ((b[0][0] >= b[1][0] && b[0][1] <= b[1][1]) || (b[1][0] >= b[0][0] && b[1][1] <= b[0][1]) ? a + 1 : a),
    0,
);
console.log(`Task one: ${resultOne}`);

// Task two
const resultTwo = input.reduce(
    (a, b) => ((b[0][1] >= b[1][0] && b[0][0] <= b[1][1]) || (b[0][1] >= b[1][1] && b[0][1] <= b[1][0]) ? a + 1 : a),
    0,
);
console.log(`Task two: ${resultTwo}`);
