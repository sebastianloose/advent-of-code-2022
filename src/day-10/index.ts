import { readFileSync } from 'fs';

interface Instruction {
    name: 'noop' | 'addx';
    value: number;
}

const instructions = readFileSync('input.txt')
    .toString()
    .split('\n')
    .map(line => {
        const parts = line.split(' ');
        const value = parseInt(parts[1]);
        return {
            name: parts[0],
            value: Number.isNaN(value) ? 0 : value,
        };
    }) as Instruction[];

(() => {
    let cycle = 0;
    let registerX = 1;
    let signalStrengthSum = 0;

    const checkSignalStrength = () => {
        if ((++cycle - 20) % 40 != 0) return;
        signalStrengthSum += cycle * registerX;
    };

    for (let { name, value } of instructions) {
        for (let i = 0; i < (name == 'addx' ? 2 : 1); i++) {
            checkSignalStrength();
        }
        registerX += value;
    }

    console.log(`Task one: ${signalStrengthSum}`);
})();

(() => {
    const screen = [...Array(6)].map(_ => Array(40).fill('.'));
    let cycle = 0;
    let registerX = 1;

    const drawPixel = () => {
        let column = Math.floor(cycle / 40);
        let row = cycle % 40;
        if (Math.abs(row - registerX) <= 1) {
            screen[column][row] = '#';
        }
    };

    drawPixel();
    for (let { name, value } of instructions) {
        cycle++;
        drawPixel();
        if (name == 'addx') {
            cycle++;
            registerX += value;
            drawPixel();
        }
    }

    console.log('Task two:');
    for (let line of screen) console.log(line.join(''));
})();
