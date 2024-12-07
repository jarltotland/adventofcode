import * as fs from 'fs';
import * as readline from 'readline';

var list1: number[] = [];
var list2: number[] = [];
var length = 0;

async function readInput(filePath: string) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        const [num1, num2] = line.split(/ +/).map(Number);
        list1.push(num1);
        list2.push(num2);
        length += 1;
    }
    console.log(`Read ${length} lines`);
}

async function calcDiff() {
    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    let sum = BigInt(0);
    for (let i = 0; i < length; i++) {
        //console.log(`Diff between ${list1[i]} and ${list2[i]} is: ${Math.abs(list1[i] - list2[i])}`);
        sum += BigInt(Math.abs(list1[i] - list2[i]));
    }
    console.log(`The sum of differences is: ${sum}`);
}

async function calcSimilarity() {
    let sum1 = BigInt(0);
    let pos1 = 0;
    let pos2 = 0;
    while (pos1 < length && pos2 < length) {
        while (list1[pos1] > list2[pos2] && pos2 < length) {
            pos2 += 1;
        }
        while (list1[pos1] === list2[pos2] && pos2 < length) {
            sum1 += BigInt(list1[pos1]);
            pos2 += 1;
        }
        pos1 += 1;
    }
    console.log(`The similarity score is: ${sum1}`);
}

readInput('01-input.dat')
    .then(() => calcDiff())
    .then(() => calcSimilarity());;
