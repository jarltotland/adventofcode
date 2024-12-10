import { run } from 'aoc-copilot';

async function solve(
  inputs: string[],
  part: number,
  test: boolean,
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  let answer: number | string = 0;
  let input = inputs[0].split('');
  let map: (number | undefined)[] = [];
  let fileno = 0;

  map.push(...Array(Number(input[0])).fill(fileno++));
  for (let i = 1; i < input.length; i+=2) {
    map.push(...Array(Number(input[i])));
    map.push(...Array(Number(input[i+1])).fill(fileno++));
  }

  console.log(map);

  if (part === 1) {
    let index_empty = Number(input[0]);
    let index_last = map.length - 1;
    while(index_empty < index_last) {
      map[index_empty++] = map[index_last];
      map[index_last--] = undefined;
      while(index_empty < index_last && map[index_empty] !== undefined) index_empty++;
      while(index_empty < index_last && map[index_last] == undefined) index_last--;
    }
  } else {
    let free: [number, number][] = []; // [pos, len]
    let used: [number, number, number][] = []; // [fileno, pos, len]
    let pos = 0;
    let fileno = 0;
    for (let i = 0; i < input.length; i++) {
      if (i%2 === 0) {
        used.push([fileno++, pos, Number(input[i])]);
      } else {
        free.push([pos, Number(input[i])]);
      }
      pos += Number(input[i]);
    }
    //console.log('used: ', used, ' free: ', free)
    for (let i = used.length - 1; i >= 0; i--) {
      let [fileno, upos, ulen] = used[i];
      for (let j = 0; j < free.length; j++) {
        let [fpos, flen] = free[j];
        //console.log(`${i}, ${fileno}, ${upos}, ${ulen} - ${j}, ${fpos}, ${flen}`);
        if (fpos > upos) break;
        if (flen >= ulen) {
          for (let k = 0; k < ulen; k++) {
            map[fpos + k] = fileno;
            map[upos + k] = undefined;
          }
          used[i] = [fileno, fpos, ulen];
          free[j] = [fpos + ulen, flen - ulen];
          break;
        }
      }
    }
  }

  //console.log(map.map(n => n === undefined ? '.' : n).join(''));

  for (let i = 0; i < map.length; i++) {
    if (map[i] !== undefined) {
      answer += i * Number(map[i]);
    };
  }

  return answer;
}

run(__filename, solve);