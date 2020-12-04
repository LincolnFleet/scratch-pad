#!usr/bin/env node
var fs = require("fs");
var DATA = fs.readFileSync("./input.txt", "utf-8").split("\n\n");
function part1(data, requiredFields, optionalFields) {
    var rgx = RegExp("" + requiredFields.map(function (field) { return "(" + field + ":)"; }).join("|"), "gm");
    return data.reduce(function (acc, doc) {
        if (doc.match(rgx).length >= requiredFields.length) {
            return acc + 1;
        }
        return acc;
    }, 0);
}
var part1RequiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
var part1OptionalFields = ["cid"];
console.time("part 1");
console.log(part1(DATA, part1RequiredFields, part1OptionalFields));
console.timeLog("part 1");
