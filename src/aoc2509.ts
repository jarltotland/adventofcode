import { run } from 'aoc-copilot';
import { getEffectiveConstraintOfTypeParameter } from 'typescript';

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
  test: boolean,    // Indicates whether the solver is being run for an example or actual input
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let coord: {x: number, y: number}[] = [];
  for (const input of inputs) {
    const parts = input.split(',');
    coord.push({x: Number(parts[0]), y: Number(parts[1])});
  }
  let maxarea = 0;
  for (let a = 0; a < coord.length; a++) {
    for (let b = a + 1; b < coord.length; b++) {
      const area = (Math.abs((coord[a].x - coord[b].x)+1) * (Math.abs(coord[a].y - coord[b].y)+1));
      if (area > maxarea) {
        maxarea = area;
      }
    }
  }

  return maxarea;
}

run(__filename, solve);