#!usr/bin/env node
var fs = require("fs");
var DATA = fs.readFileSync("./input.txt", "utf-8").split("\n\n");
// function part1(data: string[], requiredFields: string[], optionalFields: string[]) {
//   const rgx: RegExp = RegExp(`${requiredFields.map((field) => `(${field}:)`).join("|")}`, "gm");
//   return data.reduce((acc, doc) => {
//     if (doc.match(rgx).length >= requiredFields.length) {
//       return acc + 1;
//     }
//     return acc;
//   }, 0);
// }
// const part1Required: Array<string> = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
// const part1Optional: Array<string> = ["cid"];
function scanDocs(data, requiredFields, optionalFields, ignoreFieldValues) {
    if (optionalFields === void 0) { optionalFields = {}; }
    if (ignoreFieldValues === void 0) { ignoreFieldValues = false; }
    var requiredFieldKeys = Object.keys(requiredFields);
    var optionalFieldKeys = Object.keys(optionalFields);
    var validPassportCount = data.reduce(function (acc1, doc, i) {
        // console.log("doc:", i);
        // console.log(doc);
        var lines = doc.split(/ |\n/g).map(function (line) { return line.split(":"); });
        if (requiredFieldKeys.length == lines.length ||
            requiredFieldKeys.length + optionalFieldKeys.length == lines.length) {
            var passingFieldsCount = lines.reduce(function (acc2, line) {
                var key = line[0], value = line[1];
                if (ignoreFieldValues && requiredFieldKeys.includes(key)) {
                    return acc2 + 1;
                }
                else if (requiredFieldKeys.includes(key) && requiredFields[key](value)) {
                    return acc2 + 1;
                }
                else {
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
var part2Required = {
    byr: function (str) { return parseInt(str, 10) >= 1920 && parseInt(str, 10) <= 2002; },
    iyr: function (str) { return parseInt(str, 10) >= 2010 && parseInt(str, 10) <= 2020; },
    eyr: function (str) { return parseInt(str, 10) >= 2020 && parseInt(str, 10) <= 2030; },
    hgt: function (str) {
        var valid = str.match(/^(\d{2,3})|(cm|in)$/g);
        if (valid) {
            if (valid[1] == "in") {
                return parseInt(valid[0], 10) >= 59 && parseInt(valid[0], 10) <= 76;
            }
            else if (valid[1] == "cm") {
                return parseInt(valid[0], 10) >= 150 && parseInt(valid[0], 10) <= 193;
            }
        }
        return false;
    },
    hcl: function (str) { return RegExp(/^#([a-f0-9]){6}$/g).test(str); },
    ecl: function (str) { return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(str); },
    pid: function (str) { return RegExp(/^\d{9}$/g).test(str); }
};
var part2Optional = { cid: function (str) { return true; } };
console.time("part 1");
console.log(scanDocs(DATA, part2Required, part2Optional, true));
console.timeLog("part 1");
console.time("part 2");
console.log(scanDocs(DATA, part2Required, part2Optional));
console.timeLog("part 2");
