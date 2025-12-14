import { run } from 'aoc-copilot';
import { getEffectiveConstraintOfTypeParameter } from 'typescript';

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
  test: boolean,    // Indicates whether the solver is being run for an example or actual input
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let splits: number = 0;
  let map = inputs;
  let weights: number[][] = [];  
  for (let y = 0; y < map.length; y++) {
    weights.push(new Array(map[y].length).fill(0));
  }
  for (let y = 1; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y-1][x] == 'S' || map[y-1][x] == '|') {
        if (map[y][x] == '.' || map[y][x] == '|') {
          map[y] = map[y].substring(0, x) + '|' + map[y].substring(x + 1);
          weights[y][x] += (y == 1) ? 1 : weights[y-1][x];
        } else if (map[y][x] == '^') {
          if (x > 0) {
            weights[y][x-1] += weights[y-1][x];
            map[y] = map[y].substring(0, x-1) + '|' + map[y].substring(x);
          }
          if (x < map[y].length - 1) {
            weights[y][x+1] += weights[y-1][x];
            map[y] = map[y].substring(0, x+1) + '|' + map[y].substring(x+2);
          }
          splits++;
        }
      }
    }
    console.log(`${map[y]}, ${weights[y]}, ${weights[y].reduce((a, b) => a + b, 0)}`);
  } 

  if (part == 2) { 
    return weights[map.length - 1].reduce((a, b) => a + b, 0);
  }
  return splits;
}


run(__filename, solve);