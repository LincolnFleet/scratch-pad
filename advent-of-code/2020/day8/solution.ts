#!usr/bin/env node
const fs = require('fs')

const DATA: string[][] = fs.readFileSync('./input.txt', 'utf-8').split(/\n/g).map((line) => line.split(/ /g));

function part1(data: string[][]) {
  const executedLines: number[] = [];
  let lineToExecute: number = 0;
  let accumulator: number = 0;

  while (!executedLines.includes(lineToExecute)) {
    executedLines.push(lineToExecute);
    const lineType: string = data[lineToExecute][0];
    const lineValue: number = parseInt(data[lineToExecute][1], 10);

    switch (lineType) {
      case "jmp":
        lineToExecute += lineValue;
        break;

      case "acc":
        accumulator += lineValue;
        lineToExecute += 1;
        break;

      default:
        lineToExecute += 1;
        break;
    }
  }

  return accumulator;
}

console.time('part 1')
console.log(part1(DATA))
console.timeLog('part 1')