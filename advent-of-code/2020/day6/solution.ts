#!usr/bin/env node

const fs = require("fs");
const DATA: string[][] = fs
  .readFileSync("./input.txt", "utf-8")
  .split(/\n\n/g)
  .map((group) => group.split(/\n/g));

function part1(data: string[][]): number {
  let yesAnswerCount: number = 0;

  for (let group of data) {
    const yesAnswers: string[] = [];
    for (let person of group) {
      for (let letter of person) {
        yesAnswers.push(letter);
      }
    }
    const yesAnswersUnique: Set<string> = new Set(yesAnswers);
    yesAnswerCount += yesAnswersUnique.size;
  }

  return yesAnswerCount;
}

function part2(data: string[][]): number {
  let yesToAllCounts: number = 0;

  for (let group of data) {
    const yesAnswers: any = {};
    for (let person of group) {
      for (let letter of person) {
        yesAnswers[letter] ? (yesAnswers[letter] += 1) : (yesAnswers[letter] = 1);
      }
    }
    console.log(group.length, group);
    for (let question in yesAnswers) {
      if (yesAnswers[question] == group.length) {
        yesToAllCounts += yesAnswers[question];
      }
    }
  }
  return yesToAllCounts;
}

console.time("part 1");
console.log(part1(DATA));
console.timeLog("part 1");

console.time("part 2");
console.log(part2(DATA));
console.timeLog("part 2");