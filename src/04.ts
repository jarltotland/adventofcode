import * as fs from 'fs';

const input = fs.readFileSync('04.dat', 'utf-8').trim();

// make a two-dimensional array from the input: m[row][col]
const m = input.split('\n').map((line: string): string[] => line.split(''));
const w = m[0].length;
const h = m.length;

// function that given x, y returns m[y][x] or "" if out of bounds
const c = (x: number, y: number): string => {
  return (x >= 0 && x < w && y >= 0 && y < h) ? m[y][x] : '';
};

// function that given x, y, dx, dy returns 1 if the characters at x, y, x+dx, y+dy ... forms XMAS, 0 otherwise
const find = (x: number, y: number, dx: number, dy: number): number => {
  const w = c(x, y) + c(x + dx, y + dy) + c(x + 2 * dx, y + 2 * dy) + c(x + 3 * dx, y + 3 * dy);
  return w === 'XMAS' ? 1 : 0;
};

const xmas = () => {
  let count = 0;
  let solve = '';
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const hit = find(x, y, 1, 0)
        + find(x, y, -1, 0)
        + find(x, y, 0, 1)
        + find(x, y, 0, -1)
        + find(x, y, -1, -1)
        + find(x, y, -1, 1)
        + find(x, y, 1, -1)
        + find(x, y, 1, 1);
      count += hit;
      solve += hit ? c(x, y) : '.';
    }
    solve += '\n';
  }
  console.log(count);
  //console.log(solve);
}

const xmas2 = () => {
  let count = 0;
  let solve = '';
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (c(x, y) === 'A' && x > 0 && x < w-1 && y > 0 && y < h-1) {
        const t = c(x-1, y-1) + c(x+1, y-1) + c(x-1, y+1) + c(x+1, y+1);
        if (t === 'MMSS' || t === 'SSMM' || t === 'MSMS' || t === 'SMSM') {
          count += 1;
          solve += 'A';
        } else {
          solve += '.';
        }
      } else {
        solve += '.';
      }
    }
    solve += '\n';
  }
  console.log(count);
  //console.log(solve);
}

//xmas();
xmas2();