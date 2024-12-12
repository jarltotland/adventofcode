import { run } from 'aoc-copilot';

async function solve(
  inputs: string[],
  part: number,
  test: boolean,
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;
  let data: Map<number, number> = new Map();
  for (let num of inputs[0].split(' ').map(Number)) {
    data.set(num, (data.get(num) ?? 0) + 1);
  }
  const blinks = part === 1 ? 25 : 75;

  for (let n = 0; n < blinks; n++) {
    //console.log(n, data.size, ': ', data)
    let d2: Map<number, number> = new Map();
    // loop over key,value of data
    for(const [num, count] of data) {
      if (num === 0) {
        d2.set(1, (d2.get(1) ?? 0) + count);
      } else {
        const s = num.toString();
        const l = s.length;
        if (l % 2 === 0) {
          const n1 = Number(s.slice(0, l / 2));
          const n2 = Number(s.slice(l / 2));
          d2.set(n1, (d2.get(n1) ?? 0) + count);
          d2.set(n2, (d2.get(n2) ?? 0) + count);
        } else {
          const n = num * 2024;
          d2.set(n, (d2.get(n) ?? 0) + count);
        }
      }
    }
    data = d2;
  }
  
  answer = Array.from(data.values()).reduce((a, b) => a + b, 0);
  return answer;
}

run(__filename, solve);