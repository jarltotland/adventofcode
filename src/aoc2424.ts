import { run } from 'aoc-copilot';

async function solve(
  inputs: string[],
  part: number,
  test: boolean,
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;
  const wires : Record<string, number> = {};

  let line = 0;
  while (inputs[line] !== '') {
    const [w, v] = inputs[line++].split(': ');
    wires[w] = parseInt(v);
  }
  
  const gates = inputs.slice(++line).map(line => {
    console.log(line);
    const m = line.match(/(\w+) (\w+) (\w+) -> (\w+)/);
    if (!m) throw new Error('Invalid input');
    const [, in1, op, in2, out] = m;
    return {in1, op, in2, out};
  })

  let todo = [...gates];
  while(todo.length > 0) {
    todo = todo.filter(
      gate => {
        if (gate.in1 in wires && gate.in2 in wires) {
          switch (gate.op) {
            case 'AND':
              wires[gate.out] = (wires[gate.in1] & wires[gate.in2]);
              break;
            case 'OR':
              wires[gate.out] = (wires[gate.in1] | wires[gate.in2]);
              break;
            case 'XOR':
              wires[gate.out] = (wires[gate.in1] ^ wires[gate.in2]);
              break;
          }
          return false;
        } else {
          return true;
        }
      }
    );
  }

  console.log(wires);

  const z = Object.keys(wires)
    .filter((k) => k[0] === 'z')
    .sort((a, b) => -a.localeCompare(b))
    .map((k) => wires[k])
    .join('');
  return parseInt(z, 2);
}

run(__filename, solve, 
  {testsOnly: false}, {
  reason: 'Irregular format',
  part1length: 3,
  inputs: {
    selector: 'code',
    indexes: [17, 38]
  },
  answers: {
    selector: 'code',
    indexesOrLiterals: [37, 43]
  }}
);