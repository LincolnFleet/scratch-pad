#!usr/bin/env node

const fs = require("fs");
const DATA: string[][] = fs
  .readFileSync("./input.txt", "utf-8")
  .split(/\n\n/g)
  .map((group) => group.split(/\n/g));

function part1(data: string[][]): number {
  const yesAnswerCounts: number[] = [];

  for (let group of data) {
    const yesAnswers: string[] = [];
    for (let person of group) {
      for (let letter of person) {
        yesAnswers.push(letter);
      }
    }
    const yesAnswersUnique: Set<string> = new Set(yesAnswers);
    yesAnswerCounts.push(yesAnswersUnique.size);
  }

  return yesAnswerCounts.reduce((acc, count) => acc + count);
}

console.time("part 1");
console.log(part1(DATA));
console.timeLog("part 1");
