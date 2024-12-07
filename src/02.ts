import * as fs from 'fs';
import * as readline from 'readline';

var length = 0;
var lines = [];

async function countLines(fun: (list: number[]) => boolean) {
  const fileStream = fs.createReadStream('02.dat');
  const rl = readline.createInterface({input: fileStream});
  let oks = 0;
  for await (const line of rl) {
    let list = line.split(/ +/).map(Number);
    if (fun(list)) oks++;
  }
  console.log(`Read ${length} lines`);
  console.log(`OKs: ${oks}`);
}


//isListSafeish([1, 4, 0, 7, 8]);
//isListSafeish([12, 4, 6, 7, 8]);
//isLineSafe('7 4 4 1');
//countLines(isListSafe);
countLines(isListSafeish);

function isListSafe(list: number[]): boolean {
  length += 1;

  let ok = true;
  let up = (list[1] > list[0]);
  let i = 1;
  while (i < list.length && ok) {
    let diff = list[i] - list[i - 1];
    ok = up ? (diff >= 1 && diff <= 3) : (diff >= -3 && diff <= -1);
    i++;
  }
  console.log(`${list} ${up ? 'INC' : 'DEC'} ${ok ? 'OK' : 'KO'}`);
  return ok;
}

function isListSafeish(list: number[]): boolean {
  let ok = isListSafe(list);
  if (ok) return true;

  for (let i = 0; i < list.length; i++) {
    let copy = list.slice();
    copy.splice(i, 1);
    if (isListSafe(copy)) return true;
  }
  return false;
}

