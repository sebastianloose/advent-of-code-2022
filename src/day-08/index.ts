import { readFileSync } from 'fs';

const input = readFileSync('input.txt')
    .toString()
    .split('\n')
    .map(line => line.split('').map(i => parseInt(i)));

(() => {
    const resultMap = [...Array(input.length)].map(_ => Array(input[0].length).fill(false));

    const updateResultMap = (i: number, j: number, lastHeight: number) => {
        if (input[i][j] <= lastHeight) return lastHeight;
        lastHeight = input[i][j];
        resultMap[i][j] = true;
        return lastHeight;
    };

    for (let i = 0; i < input.length; i++) {
        let lastHeight = -1;
        for (let j = 0; j < input[0].length; j++) lastHeight = updateResultMap(i, j, lastHeight);
    }

    for (let i = 0; i < input.length; i++) {
        let lastHeight = -1;
        for (let j = input[0].length - 1; j > 0; j--) lastHeight = updateResultMap(i, j, lastHeight);
    }

    for (let i = 0; i < input[0].length; i++) {
        let lastHeight = -1;
        for (let j = 0; j < input.length; j++) lastHeight = updateResultMap(j, i, lastHeight);
    }

    for (let i = input[0].length - 1; i > 0; i--) {
        let lastHeight = -1;
        for (let j = input.length - 1; j > 0; j--) lastHeight = updateResultMap(j, i, lastHeight);
    }

    const result = resultMap.reduce((a, b) => a + b.reduce((a, b) => a + (b ? 1 : 0), 0), 0);

    console.log(`Task one: ${result}`);
})();

(() => {
    let highestScore = 0;

    for (let i = 1; i < input.length - 1; i++) {
        for (let j = 1; j < input[0].length - 1; j++) {
            const height = input[i][j];
            const distances = Array(4).fill(1);
            let tempI = i - 1;
            while (tempI > 0 && input[tempI--][j] < height) distances[0]++;

            tempI = i + 1;
            while (tempI < input[0].length - 1 && input[tempI++][j] < height) distances[1]++;

            let tempJ = j - 1;
            while (tempJ > 0 && input[i][tempJ--] < height) distances[2]++;

            tempJ = j + 1;
            while (tempJ < input[0].length - 1 && input[i][tempJ++] < height) distances[3]++;

            const score = distances.reduce((a, b) => a * b, 1);
            if (score > highestScore) highestScore = score;
        }
    }

    console.log(`Task two: ${highestScore}`);
})();
