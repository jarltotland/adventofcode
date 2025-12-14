import { run } from 'aoc-copilot';
import { getEffectiveConstraintOfTypeParameter } from 'typescript';

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
  test: boolean,    // Indicates whether the solver is being run for an example or actual input
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  if (part == 1) {
    let ops: string[] = inputs[inputs.length - 1].trim().split(/\s+/);
    let result: number[] = inputs[0].trim().split(/\s+/).map(x => Number.parseInt(x));
    for (let i = 1; i < inputs.length - 1; i++) {
      const data: number[] = inputs[i].trim().split(/\s+/).map(x => Number.parseInt(x));
      for (let n = 0; n < ops.length; n++) {
        switch (ops[n]) {
          case '+':
            result[n] += data[n];
            break;
          case '*':
            result[n] *= data[n];
            break;
        }
      }
    }
    return result.reduce((a, b) => a + b, 0);
  } else {
    let answer: number = 0;
    let x = inputs[0].length - 1;
    do {
      let nums: number[] = [];
      let op = ' ';
      do {
        // let col be the string formed by taking the xth character of each input line
        let col = '';
        for (let y = 0; y < inputs.length-1; y++) {
          col += inputs[y][x];
        }
        op = inputs[inputs.length - 1][x];
        x--;
        if (col.trim() == '') continue;
        nums.push(Number.parseInt(col.trim()));
      } while (op == ' '); 
      console.log(`nums: ${nums}, op: ${op}`);
      switch (op) {
        case '+':
          answer += nums.reduce((a, b) => a + b, 0);
          break;
        case '*':
          answer += nums.reduce((a, b) => a * b, 1);
          break;
      }
    } while (x >= 0);
    return answer;
  }
  return 0;
}


run(__filename, solve);