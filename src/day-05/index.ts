import { readFileSync } from 'fs';

type Instruction = {
    amount: number;
    from: number;
    to: number;
};

const input = readFileSync('input.txt').toString().split('\n');

const getStacks = () => {
    const stacks: string[][] = [];
    const stackInput = input.slice(0, 8);

    for (let i = 1; i < stackInput[0].length; i += 4) {
        const currentStack = i / 4 - 0.25;
        stacks[currentStack] = [];
        for (let j = 0; j < stackInput.length; j++) {
            const c = stackInput[j].charAt(i);
            if (c == ' ') continue;
            stacks[currentStack].unshift(c);
        }
    }

    return stacks;
};

const instructions = input.slice(10).map(s => {
    const parts = s.split(' ');
    return {
        amount: parseInt(parts[1]),
        from: parseInt(parts[3]) - 1,
        to: parseInt(parts[5]) - 1,
    };
}) as Instruction[];

(() => {
    const stacks = getStacks();

    for (let { amount, from, to } of instructions) {
        for (let i = 0; i < amount; i++) {
            stacks[to].push(stacks[from].pop()!);
        }
    }

    const resultOne = stacks.reduce((a, b) => (a += b.pop()), '');
    console.log(`Task one: ${resultOne}`);
})();

(() => {
    const stacks = getStacks();

    for (let { amount, from, to } of instructions) {
        stacks[to].push(...stacks[from].splice(stacks[from].length - amount));
    }

    const resultTwo = stacks.reduce((a, b) => (a += b.pop()), '');
    console.log(`Task two: ${resultTwo}`);
})();
