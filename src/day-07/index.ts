import { readFileSync } from 'fs';

const input = readFileSync('input.txt').toString().split('\n');

const scanFolderTree = (currentLine: number, folderCallback: (size: number) => void) => {
    let folderSize = 0;
    for (; currentLine < input.length; currentLine++) {
        const line = input[currentLine].trim();
        const lineParts = line.split(' ');
        if (lineParts[1] === 'ls' || lineParts[0] === 'dir') continue;
        if (lineParts[1] === 'cd') {
            if (lineParts[2] === '..') {
                folderCallback(folderSize);
                return { currentLine, folderSize };
            }
            const res = scanFolderTree(currentLine + 1, folderCallback);
            currentLine = res.currentLine;
            folderSize += res.folderSize;
            continue;
        }
        folderSize += parseInt(lineParts[0]);
    }
    folderCallback(folderSize);
    return { currentLine, folderSize };
};

(() => {
    let aggregatedSize = 0;

    const callback = (size: number) => {
        if (size <= 100000) {
            aggregatedSize = aggregatedSize + size;
        }
    };

    scanFolderTree(0, callback);
    console.log(`Task one: ${aggregatedSize}`);
})();

(() => {
    const usedSpace = scanFolderTree(0, () => {}).folderSize;
    const neededSpace = 30000000 - (70000000 - usedSpace);

    let bestFoundSize = Infinity;

    const callback = (size: number) => {
        if (size >= neededSpace && size <= bestFoundSize) {
            bestFoundSize = size;
        }
    };
    scanFolderTree(0, callback);
    console.log(`Task two: ${bestFoundSize}`);
})();
