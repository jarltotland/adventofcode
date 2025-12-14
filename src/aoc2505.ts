import { run } from 'aoc-copilot';
import { getEffectiveConstraintOfTypeParameter } from 'typescript';

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
  test: boolean,    // Indicates whether the solver is being run for an example or actual input
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;
  let fresh: {from: number, to: number}[] = [];

  for (const input of inputs) {
    if (input == '') {
      break;
    }
    fresh.push({
      from: Number.parseInt(input.split('-')[0]),
      to: Number.parseInt(input.split('-')[1]),
    });
  }

  if (part == 1) {
    // count how many of the inventory items are in any of the ranges
    for (const input of inputs.slice(fresh.length+1)) {
      const inv = Number.parseInt(input);
      a: for (const range of fresh) {
        if (inv >= range.from && inv <= range.to) {
          answer++;
          break a;
        }
      }
    }
  }

  if (part == 2) {
    // adjust the ranges in fresh to merge any overlapping ranges
    fresh.sort((a, b) => a.from - b.from);
    const merged: {from: number, to: number}[] = [];
    let current = fresh[0];
    for (let i = 1; i < fresh.length; i++) {
      const next = fresh[i];
      if (next.from <= current.to) {
        current.to = Math.max(current.to, next.to);
      } else {
        merged.push(current);
        current = next;
      }
    }
    merged.push(current);

    // sum the sizes of the merged ranges
    for (const range of merged) {
      answer += (range.to - range.from + 1);
    }
  }

  return answer;
}


run(__filename, solve);