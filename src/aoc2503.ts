import { run } from 'aoc-copilot';
import { getEffectiveConstraintOfTypeParameter } from 'typescript';

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
  test: boolean,    // Indicates whether the solver is being run for an example or actual input
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;
  for (const input of inputs) {
    answer += part2(input, part == 1 ? 2 : 12);
  }
  return answer;
}

function part1(input: string): number {
  const digits = input.split('').map(c => Number.parseInt(c));
  const digit1 = Math.max(...digits.slice(0, digits.length - 1));
  const digit2 = Math.max(...digits.slice(digits.indexOf(digit1) + 1));
  return digit1 * 10 + digit2;
}

function part2(input: string, len: number): number {
  const digits = input.split('').map(c => Number.parseInt(c));
  let answer = '';
  let a = -1;
  for (let l = len; l >= 1; l--) {
    // find largest digit between position a and the last l ones, add the digit to the string answer and set a to its position
    const maxDigit = Math.max(...digits.slice(a + 1, digits.length - l + 1));
    answer += maxDigit.toString();
    a = digits.indexOf(maxDigit, a + 1);
  }
  return Number(answer);
}

run(__filename, solve);