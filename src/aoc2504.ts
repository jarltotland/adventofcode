import { run } from 'aoc-copilot';
import { getEffectiveConstraintOfTypeParameter } from 'typescript';

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
  test: boolean,    // Indicates whether the solver is being run for an example or actual input
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;
  // each line of input is a string of chars. Read them into a 2d array map[x][y]
  const map: string[][] = [];
  for (const input of inputs) {
    map.push(input.split(''));
  }

  if (part == 1) {
    const result = remove(map);
    answer = result.removed;
  }

  if (part == 2) {
    let result = {map, removed: 0};
    do {
      result = remove(result.map);
      answer += result.removed;
    } while (result.removed > 0);
  }

  return answer;
}

function remove(map: string[][]): {map: string[][], removed: number} {
  let removed = 0;
  const width = map[0].length;
  const height = map.length;
  // for each x,y check how many adjacent cells are occupied (@)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] == '@') {
        let occupied = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx == 0 && dy == 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
              if (map[ny][nx] != '.') occupied++;
            }
          }
        }
        if (occupied < 4) {
          removed++;
          map[y][x] = 'x';
        }
      }
    }
  }
  // remove the 'x' cells from the map
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x] == 'x') {
        map[y][x] = '.';
      }
    }
  } 
  
  return {map, removed};
}

run(__filename, solve);