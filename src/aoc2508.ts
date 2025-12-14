import { run } from 'aoc-copilot';
import { getEffectiveConstraintOfTypeParameter } from 'typescript';

async function solve(
  inputs: string[], // Contents of the example or actual inputs
  part: number,     // Indicates whether the solver is being called for part 1 or 2 of the puzzle
  test: boolean,    // Indicates whether the solver is being run for an example or actual input
  additionalInfo?: { [key: string]: string } // Additional info for some puzzles with multiple examples
): Promise<number | string> {
  const cords: number = (test == true) ? 10 : 1000;
  // each line in inputs contain x,y,z coordinates. Read them into a list of objects containing x,y,z properties and a circuit property initialized to 0
  // also add an index property to each object
  let points: {index: number, x: number, y: number, z: number, circuit: number}[] = [];
  let index = 0;
  for (let line of inputs) {
    let parts = line.trim().split(',');
    points.push({x: Number.parseInt(parts[0]), y: Number.parseInt(parts[1]), z: Number.parseInt(parts[2]), circuit: 0, index: index});
    index++;
  }
  // make a list of distances between each pair of points, as a list of objects containing point1 index, point2 index, and distance
  // use euclidean distance

  let distances: {p1: number, p2: number, dist: number}[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let dist = (points[i].x - points[j].x)**2 + (points[i].y - points[j].y)**2 + (points[i].z - points[j].z)**2;
      distances.push({p1: points[i].index, p2: points[j].index, dist: dist});
    }
  }
  let circuit: number[] = [];
  let circuits: number = 0;
  // sort distances by distance from shortest to longest
  const distances2 = distances.sort((a, b) => a.dist - b.dist);
  //console.log(distances2);
  // for each of the "cords" shortest distances, if both points have circuit 0, assign them both to a new circuit, if one has a circuit, assign the other to that circuit, if both have circuits, do nothing. 
  // if they are different circuits, merge the circuits (one of the circuits is dicarded and circuit[that number] is set to 0)
  // always keep circuit[i] the number of points in that circuit
  for (let i = 0; (part == 2 || i < cords) && i < distances2.length; i++) {
    let p1 = points.find(p => p.index == distances2[i].p1)!;
    let p2 = points.find(p => p.index == distances2[i].p2)!;
    let c = 0;
    if (p1.circuit == 0 && p2.circuit == 0) {
      circuits++;
      c = circuits;
      p1.circuit = circuits;
      p2.circuit = circuits;
      circuit[circuits] = 2;
    } else if (p1.circuit != 0 && p2.circuit == 0) {
      p2.circuit = p1.circuit;
      c = p1.circuit;
      circuit[p1.circuit]++;
    } else if (p1.circuit == 0 && p2.circuit != 0) {
      p1.circuit = p2.circuit;
      c = p2.circuit;
      circuit[p2.circuit]++;
    } else if (p1.circuit != p2.circuit) {
      let c1 = p1.circuit;
      let c2 = p2.circuit;
      for (let p of points) {
        if (p.circuit == c2) {
          p.circuit = c1;
        }
      }
      c = c1;
      circuit[c1] += circuit[c2];
      circuit[c2] = 0;
    }
    if (part == 2 && circuit[c] == points.length) {
      return p1.x * p2.x;
    }
  }
  //console.log(points);
  //console.log(circuit);
  // find the three largest circuits and multiply their sizes together
  let largestCircuits = circuit.filter(c => c > 0).sort((a, b) => b - a).slice(0, 3);
  return largestCircuits.reduce((a, b) => a * b, 1);
}

run(__filename, solve);