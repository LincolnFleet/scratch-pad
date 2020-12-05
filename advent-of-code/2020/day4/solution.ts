#!usr/bin/env node
const fs = require("fs");

const DATA = fs.readFileSync("./input.txt", "utf-8").split("\n\n");

// function part1(data: string[], requiredFields: string[], optionalFields: string[]) {
//   const rgx: RegExp = RegExp(`${requiredFields.map((field) => `(${field}:)`).join("|")}`, "gm");

//   return data.reduce((acc, doc) => {
//     if (doc.match(rgx).length >= requiredFields.length) {
//       return acc + 1;
//     }
//     return acc;
//   }, 0);
// }

function scanDocs(
  data: string[],
  requiredFields: {},
  optionalFields: {} = {},
  ignoreFieldValues: boolean = false,
) {
  const requiredFieldKeys: Array<string> = Object.keys(requiredFields);
  const optionalFieldKeys: Array<string> = Object.keys(optionalFields);

  const validPassportCount = data.reduce((acc1, doc, i) => {
    // console.log("doc:", i);
    // console.log(doc);
    const lines: string[][] = doc.split(/ |\n/g).map((line) => line.split(":"));
    if (
      requiredFieldKeys.length == lines.length ||
      requiredFieldKeys.length + optionalFieldKeys.length == lines.length
    ) {
      const passingFieldsCount: number = lines.reduce((acc2, line) => {
        const [key, value] = line;

        if (ignoreFieldValues && requiredFieldKeys.includes(key)) {
          return acc2 + 1;
        } else if (requiredFieldKeys.includes(key) && requiredFields[key](value)) {
          return acc2 + 1;
        } else {
           return acc2;
        }
      }, 0);

      if (passingFieldsCount == requiredFieldKeys.length) {
        // console.log("pass");
        return acc1 + 1;
      }
    }
    // console.log("fail");
    return acc1;
  }, 0);

  return validPassportCount;
}

// const part1Required: Array<string> = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
// const part1Optional: Array<string> = ["cid"];

const part2Required = {
  byr: (str: string): boolean => parseInt(str, 10) >= 1920 && parseInt(str, 10) <= 2002,
  iyr: (str: string): boolean => parseInt(str, 10) >= 2010 && parseInt(str, 10) <= 2020,
  eyr: (str: string): boolean => parseInt(str, 10) >= 2020 && parseInt(str, 10) <= 2030,
  hgt: (str: string): boolean => {
    const valid = str.match(/^(\d{2,3})|(cm|in)$/g);
    if (valid) {
      if (valid[1] == "in") {
        return parseInt(valid[0], 10) >= 59 && parseInt(valid[0], 10) <= 76;
      } else if (valid[1] == "cm") {
        return parseInt(valid[0], 10) >= 150 && parseInt(valid[0], 10) <= 193;
      }
    }
    return false;
  },
  hcl: (str: string): boolean => RegExp(/^#([a-f0-9]){6}$/g).test(str),
  ecl: (str: string): boolean => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(str),
  pid: (str: string): boolean => RegExp(/^\d{9}$/g).test(str),
};
const part2Optional = { cid: (str) => true };

console.time("part 1");
console.log(scanDocs(DATA, part2Required, part2Optional, true));
console.timeLog("part 1");

console.time("part 2");
console.log(scanDocs(DATA, part2Required, part2Optional));
console.timeLog("part 2");
