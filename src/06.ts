import * as fs from 'fs';
import * as process from 'process';

class Solve {
  x: number = 0;
  y: number = 0;
  width: number;
  height: number;
  map: string[][];
  startx: number = 0;
  starty: number = 0;
  constructor(imap: string[][]) {
    this.map = imap.map(row => row.slice());
    this.height = this.map.length;
    this.width = this.map[0].length;
    //console.log(`received ${this.width}x${this.height}:\n` + this.show());
    find: for (this.y = 0; this.y < this.height; this.y++) {
      for (this.x = 0; this.x < this.width; this.x++) {
        if (this.get(this.x, this.y) === '^') {
          break find;
        }
      }
    }
    this.startx = this.x;
    this.starty = this.y;
  }

  solve(max: number): number {
    let i = 0;
    while (!this.moveOut()) {
      const dirs = '<^>v';
      this.set(this.x, this.y, dirs[(dirs.indexOf(this.get(this.x, this.y)) + 1) % dirs.length]);
      if (i++ > max) return 0;
    }
    return this.map.reduce((acc, line) => acc + line.filter(c => c === 'X').length, 0);
  }

  get(x: number, y: number): string {
    return this.map[y][x];
  }

  set(x: number, y: number, char: string) {
    this.map[y][x] = char;
  }

  // Move guard forward until it hits a wall or exits
  moveOut(): boolean {
    const dir = this.get(this.x, this.y);
    const dx = (dir === '<') ? -1 : (dir === '>') ? 1 : 0;
    const dy = (dir === '^') ? -1 : (dir === 'v') ? 1 : 0;
    while (true) {
      this.set(this.x, this.y, 'X');
      this.x += dx;
      this.y += dy;
      if (this.x < 0 || this.x >= this.width || this.y < 0 || this.y >= this.height) return true;
      if (this.get(this.x, this.y) === '#' || this.get(this.x, this.y) === 'O') {
        this.x-=dx; this.y-=dy;
        this.set(this.x, this.y, dir);
        return false;
      }
    }
  }

  findNthX(n: number): [number, number] {
    let count = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.get(x, y) === 'X') {
          if (count++ === n) {
            return [x, y];
          }
        }
      }
    }
    return [-1, -1];
  }

  block(x: number, y: number) {
    this.set(x, y, 'O');
  }

  show(): string {
    return this.map.map(s => s.join('')).join('\n') + '\n';
  }
}

const input = fs.readFileSync(process.argv[2], 'utf-8').trim();
const xmap = input.split('\n').map((line: string): string[] => line.split(''));
const first = new Solve(xmap);
const count = first.solve(10000);
console.log(first.show());
console.log(`Traversed ${count} cells`);

let loops = 0;
for (let n = 0; n < count; n++) {
  const newSolve = new Solve(xmap);
  const b = first.findNthX(n);
  if (b[0] === first.startx && b[1] === first.starty) {
    // Skip the starting point
    continue;
  }
  newSolve.block(b[0], b[1]);
  if (newSolve.solve(10000) == 0) {
    loops++;
  }
}

console.log(`Possible blocks: ${loops}`);