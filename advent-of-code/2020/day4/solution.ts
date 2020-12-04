#!usr/bin/env node
const fs = require("fs");

const DATA = fs.readFileSync("./input.txt", "utf-8").split("\n\n");

function part1(data: string[], requiredFields: string[], optionalFields: string[]) {
  const rgx: RegExp = RegExp(`${requiredFields.map((field) => `(${field}:)`).join("|")}`, "gm");

  return data.reduce((acc, doc) => {
    if (doc.match(rgx).length >= requiredFields.length) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

const part1RequiredFields: Array<string> = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const part1OptionalFields: Array<string> = ["cid"];

console.time("part 1");
console.log(part1(DATA, part1RequiredFields, part1OptionalFields));
console.timeLog("part 1");
