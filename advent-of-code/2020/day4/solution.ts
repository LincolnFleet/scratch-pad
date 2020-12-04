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

// const fieldTitleRGX: RegExp = RegExp(`${Object.keys(requiredFields).map((field) => `(${field}:)`).join("|")}`, "g");
// const fieldTitles: Set<string> = new Set(Object.keys(docObj));

function part2(data: string[], requiredFields: {}, optionalFields: {}) {
  const numberOfRequiredFields: number = new Set(Object.keys(requiredFields)).size;
  const validPassportCount = data.reduce((acc1, doc) => {
    const lines: string[] = doc.split("/( |\n)/gm");

    if (numberOfRequiredFields == lines.length) {
      
      const passingFields: number = lines.reduce((acc2, line) => {
        const [key, value] = line.split(":");
        if (requiredFields[key](value)) {
          return acc2 + 1;
        }
      }, 0);

      if (passingFields == numberOfRequiredFields) {
        return acc1 + 1;
      }
    }

    return acc1;
  }, 0);

  return validPassportCount;
}

const part1Required: Array<string> = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const part1Optional: Array<string> = ["cid"];

console.time("part 1");
console.log(part1(DATA, part1Required, part1Optional));
console.timeLog("part 1");

const part2Required = {
  byr: (str) => parseInt(str, 10) >= 1920 && parseInt(str, 10) <= 2002,
  iyr: (str) => parseInt(str, 10) >= 2010 && parseInt(str, 10) <= 2020,
  eyr: (str) => parseInt(str, 10) >= 2020 && parseInt(str, 10) <= 2030,
  hgt: (str) => {
    const valid = str.match("/^(d{2,3})(cm|in)$/g");
    if (valid) {
      if (valid[1] == "in") {
        return parseInt(valid[0], 10) >= 59 && parseInt(valid[0], 10) <= 76;
      } else if (valid[1] == "cm") {
        return parseInt(valid[0], 10) >= 150 && parseInt(valid[0], 10) <= 193;
      }
    }
    return false;
  },
  hcl: (str) => str.test("/^#([a-f]|[0-9]){6}$/g"),
  ecl: (str) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(str),
  pid: (str) => str.test("/^d{9}$/g"),
};
const part2Optional = { cid: (str) => true };

console.time("part 2");
console.log(part2(DATA, part2Required, part2Optional));
console.timeLog("part 2");
