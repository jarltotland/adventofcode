import { run } from 'aoc-copilot';

type Plot = { plant: string, region: number | undefined };
type Region = { plant: string, area: number, perimeter: number, sides: number, merged?: number | undefined};

async function solve(
  inputs: string[],
  part: number,
  test: boolean,
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;

  let height = inputs.length;
  let width = inputs[0].length;
  const plots: Plot[][] = inputs.map(row => row.split('').map(plant => ({ plant, region: undefined })));
  const regions: Region[] = [];

  function region(x: number, y: number): number {
    let r = plots[y][x].region!;
    while (regions[r].area === 0) {
      r = regions[r].merged!;
    }
    return r;
  }

  console.log(plots.map(row => row.map(p => p.plant).join('')).join('\n'));

  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      const p = plots[y][x].plant;
      if (y>0 && x>0 && p === plots[y-1][x].plant && p === plots[y][x-1].plant) {
        const r = region(x-1, y);
        const r2 = region(x, y-1);
        plots[y][x].region = r;
        if (r === r2) {
          regions[r].area++;
        } else {
          regions[r].area = regions[r].area + regions[r2].area + 1;
          regions[r].perimeter = regions[r].perimeter + regions[r2].perimeter;
          regions[r].sides = regions[r].sides + regions[r2].sides;
          regions[r2].merged = r;
          regions[r2].area = 0;
        }
        if (!(x < width-1 && p === plots[y-1][x+1].plant)) {
          regions[r].sides -= 2;
        }
      } else if (y>0 && p === plots[y-1][x].plant) {
        const r = region(x, y-1);
        plots[y][x].region = r;
        regions[r].area++;
        regions[r].perimeter+=2;
        let s = 0; 
        if (x > 0 && p === plots[y-1][x-1].plant) s++;
        if (x < width-1 && p === plots[y-1][x+1].plant) s++;
        regions[r].sides += s*2;
      } else if (x>0 && p === plots[y][x-1].plant) {
        const r = region(x-1, y);
        plots[y][x].region = r;
        regions[r].area++;
        regions[r].perimeter+=2;
        if (y > 0 && p === plots[y-1][x-1].plant) regions[r].sides += 2;
      } else {
        const r = regions.length;
        plots[y][x].region = r;
        regions.push({ area: 1, perimeter: 4, sides: 4, plant: p });
      }      
      //const r = region(x, y);
      //console.log(`${x},${y}: ${plots[y][x].plant} ${r}`, regions[r]);
    }
  }

  if (part === 1) {
    console.log(regions);
    for (let r = 0; r < regions.length; r++) {
      if (regions[r].area > 0) {
        answer += regions[r].area * regions[r].perimeter;
        console.log(`Region ${r}: plant=${regions[r].plant}, area=${regions[r].area}, perimeter=${regions[r].perimeter}`);
      }
    }
  } else {
    console.log(regions);
    for (let r = 0; r < regions.length; r++) {
      if (regions[r].area > 0) {
        answer += regions[r].area * regions[r].sides;
        console.log(`Region ${r}: plant=${regions[r].plant}, area=${regions[r].area}, sides=${regions[r].sides}`);
      }
    }
  }

  return answer;
}

/*
solve(`0.000
00.00
0.000
000.0
00000`.split('\n'), 2, false).then(console.log);
*/

run(__filename, solve, {testsOnly: false}, {
  reason: 'Irregular format',
  part1length: 3,
  inputs: {
    selector: 'code',
    indexes: [0, 25, 54, 79, 25, 99, 106]
  },
  answers: {
    selector: 'code',
    indexesOrLiterals: [47, 52, 77, 94, 97, 104, 105]
  }
});