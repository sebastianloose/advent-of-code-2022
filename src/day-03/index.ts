import { readFileSync } from 'fs';

const input = readFileSync('input.txt').toString().split('\n');
const getPriorities = (c: string) => (c == c.toUpperCase() ? c.charCodeAt(0) - 38 : c.charCodeAt(0) - 96);

// Task one
const findDuplicates = (s: string) => {
    const [p1, p2] = [s.substring(0, s.length / 2).split(''), s.substring(s.length / 2, s.length)];
    return p1.find(s => p2.includes(s))!;
};

const resultOne = input.reduce((a, b) => a + getPriorities(findDuplicates(b)), 0);
console.log(`Task one: ${resultOne}`);

// Task two
let resultTwo = 0;
for (let i = 0; i < input.length; i += 3) {
    const key = input[i].split('').find(s => input[i + 1].includes(s) && input[i + 2].includes(s))!;
    resultTwo += getPriorities(key);
}
console.log(`Task two: ${resultTwo}`);
