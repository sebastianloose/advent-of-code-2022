import { readFileSync } from 'fs';

interface Monkey {
    id: number;
    itemsProcessed: number;
    items: number[];
    operation: (old: number) => number;
    test: {
        divisibleBy: number;
        successful: number;
        unsuccessful: number;
    };
}

const generateOperationFunction = (operation: string) => {
    const parts = operation.substring(19).split(' ');
    const second = parseInt(parts[2]);
    const operatorFunktion = (a: number, b: number) => (parts[1] === '*' ? a * b : a + b);

    return (old: number) => operatorFunktion(old, Number.isNaN(second) ? old : second);
};

const generateMonkeys = () =>
    readFileSync('input.txt')
        .toString()
        .split('\n\n')
        .map(m => {
            const lines = m.split('\n');
            const items = lines[1]
                .substring(18)
                .split(',')
                .map(n => parseInt(n));
            return {
                id: parseInt(lines[0].split(' ')[1]),
                items,
                itemsProcessed: 0,
                operation: generateOperationFunction(lines[2]),
                test: {
                    divisibleBy: parseInt(lines[3].split(' ')[5]),
                    successful: parseInt(lines[4].split(' ')[9]),
                    unsuccessful: parseInt(lines[5].split(' ')[9]),
                },
            };
        }) as Monkey[];

const runSimulation = (monkeys: Monkey[], iterations: number, worryLevelFunction: (level: number) => number) => {
    for (let i = 0; i < iterations; i++) {
        for (let j = 0; j < monkeys.length; j++) {
            let monkey = monkeys[j];
            for (let worryLevel of monkey.items) {
                monkey.itemsProcessed++;
                worryLevel = worryLevelFunction(monkey.operation(worryLevel));
                const nextMonkey =
                    worryLevel % monkey.test.divisibleBy == 0 ? monkey.test.successful : monkey.test.unsuccessful;
                monkeys[nextMonkey].items.push(worryLevel);
            }
            monkey.items = [];
        }
    }

    const sortedCounters = monkeys.map(m => m.itemsProcessed).sort((a, b) => b - a);
    return sortedCounters[0] * sortedCounters[1];
};

(() => {
    const monkeys = generateMonkeys();
    console.log(`Task one: ${runSimulation(monkeys, 20, i => Math.floor(i / 3))}`);
})();

(() => {
    const monkeys = generateMonkeys();
    const leastCommonMultiple = monkeys.reduce((a, b) => a * b.test.divisibleBy, 1);
    console.log(`Task two: ${runSimulation(monkeys, 10000, i => i % leastCommonMultiple)}`);
})();
