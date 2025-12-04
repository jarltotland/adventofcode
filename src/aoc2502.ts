import { run } from 'aoc-copilot';
import { getEffectiveConstraintOfTypeParameter } from 'typescript';

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
  test: boolean,    // Indicates whether the solver is being run for an example or actual input
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;
  const data = String(inputs).split(',')
  for(const input of data) {  
    //console.log(input);
    const [from, to] = input.split('-');
    for (let i = Number.parseInt(from); i <= Number.parseInt(to); i++) {
      if (part == 1 && part1(i)) answer += i;
      if (part == 2 && part2(i)) answer += i;
    }
  }
  return answer;
}

function part1(i: number): boolean {
  const s = i.toString();
  if (s.length % 2 != 0) return false;
  const half = s.length / 2;
  return (s.slice(0, half) === s.slice(half));
}

function part2(i: number): boolean {
  const s = i.toString();
  for (let l = 1; l < s.length; l++) {
    if (s.length % l > 0) continue;
    // check if all segments of length l are the same
    const segment = s.slice(0, l);
    let allSame = true;
    for (let start = l; start < s.length; start += l) {
      if (s.slice(start, start + l) !== segment) {
        allSame = false;
        break;
      }
    }
    if (allSame) return true;
  }
  return false;
}

run(__filename, solve);