import { run } from 'aoc-copilot';

async function solve(
  inputs: string[],
  part: number,
  test: boolean,
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;
  const map: string[][] = inputs.map(row => row.split(''));
  const height = map.length;
  const width = map[0].length;

  // look through the map. For each character except ., add the coordinates [x,y] to a list freq[character]
  const freq: { [key: string]: [number, number][] } = {};
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const char = map[y][x];
      if (char === '.') continue;
      if (!freq[char]) freq[char] = [];
      freq[char].push([x, y]);
    }
  }

  if (part === 1) {
    // for each position in the map, check for each frequency if there are two senders in line with distance ratio 1:2
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        pos: for (let f in freq) {
          //console.log(`${x},${y}: ${f} - ${freq[f]}`);
          for (let fn = 0; fn < freq[f].length; fn++) {
            if (x === freq[f][fn][0] && y === freq[f][fn][1]) continue
            const f1: [number, number] = freq[f][fn];
            const f2: [number, number] = [x + 2*(f1[0] - x), y + 2*(f1[1] - y)];
            const dup = freq[f].find(([x, y]) => x === f2[0] && y === f2[1]);
            //console.log(`  ${f1} - ${f2} - ${dup}`);
            if (dup) {
              answer++;
              map[y][x] = '#';
              //console.log(`${x} ${y}: ${f} - ${freq[f][fn]}`);
              break pos;
            }
          }
        }
      }
    }
  } else {
    for (let f in freq) {
      //console.log(`Frequency ${f}: ${freq[f].join(';')}`);
      for (let fa = 0; fa < freq[f].length; fa++) {
        for (let fb = 0; fb < freq[f].length; fb++) {
          if (fa === fb) continue;
          const a: [number, number] = freq[f][fa];
          const b: [number, number] = freq[f][fb];
          //console.log(`  ${a} - ${b}`);
          const d: [number, number] = [b[0] - a[0], b[1] - a[1]];
          const p: [number, number] = [freq[f][fa][0], freq[f][fa][1]];
          do {
            map[p[1]][p[0]] = '#';
            p[0] += d[0]; p[1] += d[1];
          } while (p[0] >= 0 && p[0] < width && p[1] >= 0 && p[1] < height);
        }
      }
    }
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (map[y][x] === '#') {
          answer++;
        }
      }
    }
  }

  console.log(map.map(l => l.join('')).join('\n'));
  return answer;
}

run(__filename, solve);