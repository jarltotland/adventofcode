import * as fs from 'fs';

const input = fs.readFileSync('03.dat', 'utf-8');
const regex = /mul\(([0-9]+),([0-9]+)\)|do\(\)|don\'t\(\)/gm;

let match;
let doit = true;
let sum = 0;

while ((match = regex.exec(input)) !== null) {
  if (match[0] === 'do()') {
    doit = true;
  } else if (match[0] === 'don\'t()') {
    doit = false;
  } else if (doit) {
    sum += Number(match[1]) * Number(match[2]);
  }
}

console.log(sum);