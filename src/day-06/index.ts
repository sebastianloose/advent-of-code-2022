import { readFileSync } from 'fs';

const input = readFileSync('input.txt').toString();

const getKey = (size: number) => {
    for (let i = size; i < input.length; i++) {
        const charsOfKey = input.substring(i - size, i).split('');
        if (charsOfKey.filter((c, index) => charsOfKey.indexOf(c) != index).length == 0) {
            return i;
        }
    }
};

console.log(`Task one ${getKey(4)}`);
console.log(`Task two ${getKey(14)}`);
