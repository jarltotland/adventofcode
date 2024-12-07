import * as fs from 'fs';
import * as process from 'process';

const input = fs.readFileSync(process.argv[2], 'utf-8').trim();
const [rulelist, updatelist] = input.split('\n\n');
const rules = rulelist.split('\n');

let ordered_checksum = 0;
let unordered_checksum = 0;
for (let updatestring of updatelist.split('\n')) {
  const update = updatestring.split(',');
  let ordered = true;
  for (let a = 0; a < update.length-1; a++) {
    for (let b = a+1; b < update.length; b++) {
      const rule = `${update[b]}|${update[a]}`;
      if (rules.includes(rule)) {
        console.log(`Update ${update} breaks rule ${rule}`);
        ordered = false;
      }
    }
  }
  if (ordered) {
    const middle = update[(update.length-1)/2];
    console.log(`Update ${update} is ordered, middle number is ${middle}`);
    ordered_checksum += parseInt(middle);
  } else {
    const u = reorder(update);
    const middle = u[(u.length-1)/2];
    console.log(`Update ${update} -> ${u}, middle number is ${middle}`);
    unordered_checksum += parseInt(middle);
  }
}

function reorder(list: string[]): string[] {
  for (let a = 0; a < list.length-1; a++) {
    for (let b = a+1; b < list.length; b++) {
      const rule = `${list[b]}|${list[a]}`;
      if (rules.includes(rule)) {
        return reorder([...list.slice(0,a), list[b], ...list.slice(a, b), ...list.slice(b+1)]);
      }
    }
  }
  return list;
}

console.log(`Part one: sum of middle numbers is ${ordered_checksum}`);
console.log(`Part two: sum of middle numbers is ${unordered_checksum}`);
