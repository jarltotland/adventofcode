import { run } from 'aoc-copilot';
import { getEffectiveConstraintOfTypeParameter } from 'typescript';

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
  test: boolean,    // Indicates whether the solver is being run for an example or actual input
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;
  let pos = 50;
  for(const input of inputs) {
    const down = input.charAt(0) == 'L'
    const steps = Number.parseInt(input.slice(1)) * (down ? -1 : 1);
    const oldpos = pos;
    const passed = await zeros(pos, steps);
    if (part == 2) answer += passed;
    pos += steps;
    while (pos > 99) pos -= 100;
    while (pos < 0) pos += 100;
    const landed = (pos == 0 ? 1 : 0); 
    answer += landed;

    //if (part == 2) 
    //  console.log(`${input}: ${oldpos} -> ${pos}, zeros passed=${passed} landed=${landed}, answer=${answer}`);
  }
  return answer;
}

async function zeros(pos: number, steps: number): Promise<number> {
  const oldpos = pos;
  const newpos = (pos + steps + 100) % 100;
  pos = pos + steps;
  let zeros = 0;
  if (pos > 99) {
    zeros += Math.abs(Math.floor(pos / 100)) - (newpos == 0 ? 1 : 0);
  } else if (pos < 0) {
    zeros += Math.abs(Math.floor(pos / 100)) - (oldpos == 0 ? 1 : 0)
  }
  return zeros;
}

run(__filename, solve);