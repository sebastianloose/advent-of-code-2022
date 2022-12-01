import { readFileSync } from 'fs';

const input = readFileSync('input.txt').toString();
const elves = input.split('\n\n').map(elv => elv.split('\n').map(s => parseInt(s)));
const caloriesPerElf = elves.map(elf => elf.reduce((a, b) => a + b), 0).sort((a, b) => b - a);

//Task One
console.log(`Task one: ${caloriesPerElf[0]}`);

//Task Two
console.log(`Task two: ${caloriesPerElf[0] + caloriesPerElf[1] + caloriesPerElf[2]}`);
