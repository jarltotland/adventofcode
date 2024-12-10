import { run } from 'aoc-copilot';

class Ucs {
  m : Map<string, number> = new Map();
  put(x: number, y: number, w: number) {
    const k = `${x},${y}`;
    this.m.set(k, (this.m.get(k) ?? 0) + w)
  }
  get(x: number, y: number) {
    const k = `${x},${y}`;
    return this.m.get(k);
  } 
  has(x: number, y: number) {
    const k = `${x},${y}`;
    return this.m.has(k);
  }
  peaks() {
    return this.m.size;
  }
  ways() {
    let i = 0;
    for(let [k, v] of this.m) {
      i += v;
    }
    return i;
  }
  map(w: number, h: number) : string {
    let s = '';
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        s += this.get(x, y) ?? ' ';
      }
      s += '\n';
    }
    return s;
  }
}

async function solve(
  inputs: string[],
  part: number,
  test: boolean,
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;
  let ratings: number = 0;
  const map : string[][] = inputs.map(row => row.split(''));  
  const height = map.length;
  const width = map[0].length;

  console.log(inputs)
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (map[y][x] === '0') {
        let pos = new Ucs();
        pos.put(x, y, 1);
        //console.log(`Starting at ${x},${y} with ${pos.get(x, y)}`);
        for (let e = 1; e <= 9; e++) {
          const c = e.toString();
          const reachable = new Ucs();
          for (let xy of pos.m.keys()) {
            const [x, y] = xy.split(',').map(Number);
            const w = pos.get(x, y)!;
            if (y > 0 && map[y-1][x] === c) reachable.put(x, y-1, w);
            if (x < width-1 && map[y][x+1] === c) reachable.put(x+1, y, w);
            if (y < height-1 && map[y+1][x] === c) reachable.put(x, y+1, w);
            if (x > 0 && map[y][x-1] === c) reachable.put(x-1, y, w);
            //console.log(`  ${c}: ${x},${y} - ${w} `, pos.m, reachable.m);
          }
          pos = reachable;
        }
        answer += pos.peaks();
        ratings += pos.ways();
        //console.log(x, y, ':', pos.peaks(), 'peaks', pos.ways(), 'rating', pos.m, pos.map(width, height));
      }
    }
  }
  if (part === 1) {
    return answer;
  } else {
    return ratings;
  }
}

run(__filename, solve, {}, {
    reason: 'Irregular format',
    part1length: 1,
    inputs: {
      selector: 'code',
      indexes: [18, 30, 34, 40, 41]
    },
    answers: {
      selector: 'code',
      indexesOrLiterals: [28, 31, 33, 35, 51]
    }
  });