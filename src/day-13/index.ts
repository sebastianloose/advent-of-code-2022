import { readFileSync } from 'fs';

type List = number | List[];
const input = readFileSync('input.txt')
    .toString()
    .split('\n\n')
    .map(items => items.split('\n').map(i => JSON.parse(i)));

const compareLists = (aList: List[], bList: List[]): number => {
    const maxSize = Math.max(aList.length, bList.length);
    for (let i = 0; i < maxSize; i++) {
        const a = aList?.[i];
        const b = bList?.[i];
        if (a == undefined) return -1;
        if (b == undefined) return 1;

        if (Array.isArray(a) || Array.isArray(b)) {
            const res = compareLists(Array.isArray(a) ? a : [a], Array.isArray(b) ? b : [b]);
            if (res != 0) return res;
        } else {
            if (a != b) return Math.sign(a - b);
        }
    }
    return 0;
};

(() => {
    const res = input.reduce((a, b, i) => a + (compareLists(b[0], b[1]) == -1 ? i + 1 : 0), 0);
    console.log(`Task one: ${res}`);
})();

(() => {
    const [d1, d2] = [[[2]], [[6]]];
    const list = [d1, d2];
    input.forEach(i => list.push(...i));
    list.sort((a, b) => compareLists(a, b));
    console.log(`Task two: ${(list.indexOf(d1) + 1) * (list.indexOf(d2) + 1)}`);
})();
