#!usr/bin/env node
const fs = require("fs");

const DATA: Array<string> = fs.readFileSync("./input.txt", "utf-8").split("\n");

function part1(list: Array<string>): number {
  return list.reduce((acc, entry) => {
    const [rule, password] = entry.split(":").map((str) => str.trim());
    const [quants, char] = rule.split(" ");
    const [min, max] = quants.split("-").map((str) => parseInt(str, 10));
    const rgx: RegExp = RegExp(char, "g");
    const matches: RegExpMatchArray | null = password.match(rgx);

    if (matches && min <= matches.length && matches.length <= max) {
      acc += 1;
    }
    return acc;
  }, 0);
}

function part2(list: Array<string>): number {
  return list.reduce((acc, entry) => {
    const [rule, password] = entry.split(":").map((str) => str.trim());
    const [positions, char] = rule.split(" ");
    const [pos1, pos2] = positions.split("-").map((str) => parseInt(str, 10));
    const [match1, match2] = [password[pos1 - 1] === char, password[pos2 - 1] === char];

    if (match1 !== match2) {
      acc += 1;
    }
    return acc;
  }, 0);
}

console.time("part 1");
console.log(part1(DATA));
console.timeLog("part 1");

console.time("part 2");
console.log(part2(DATA));
console.timeLog("part 2");
