import { NotImplemented, run } from 'aoc-copilot';

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
  test: boolean,    // Indicates whether the solver is being run for an example or actual input
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;

  for(const input of inputs) {
    const res = Number(input.split(': ')[0]);
    const vals = input.split(': ')[1].split(' ').map(Number);
    let match = 0;

    const ops = await allOpsCombinations(part === 1 ? '+*' : 'i+*', vals.length - 1);
    for (let op in ops) {
      let sum = vals[0];
      let str = vals[0].toString();
      //console.log(`${res}: ${vals.join(' ')} - ${ops[op]}`);
      for (let i = 1; i < vals.length; i++) {
        switch (ops[op][i - 1]) {
          case '+':
            sum += vals[i];
            str += `+${vals[i]}`;
            break;
          case '*':
            sum *= vals[i];
            str += `*${vals[i]}`;
            break;
          case 'i':
            sum = Number(sum.toString() + vals[i].toString());
            str += vals[i].toString();
            break;
        }
      }
      str += `=${sum}`;
      if (sum === res) {
        str += ' MATCH';
        match++;
      }
      //console.log(str);
    }
    if (match > 0) {
      answer += res;
    }
  }

  return answer;
}

async function allOpsCombinations(ops: string, len: number): Promise<string[]> {
  let result : string[] = [];
  const n = ops.length;
  for (let i = 0; i < n**len; i++) {
    // create a string that represents i in base n
    let s = '';
    let j = i;
    for (let k = 0; k < len; k++) {
      s = ops[j % n] + s;
      j = Math.floor(j / n)
    }
    result.push(s);
  }
  //console.log(result);
  return result;
}


run(__filename, solve);