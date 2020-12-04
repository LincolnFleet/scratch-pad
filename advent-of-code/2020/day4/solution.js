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
// const fieldTitleRGX: RegExp = RegExp(`${Object.keys(requiredFields).map((field) => `(${field}:)`).join("|")}`, "g");
// const fieldTitles: Set<string> = new Set(Object.keys(docObj));
function part2(data, requiredFields, optionalFields) {
    return data.reduce(function (acc, doc) {
        var docObj = doc.split("/( |\n)/gm").reduce(function (acc, line) {
            var tup = line.split(":");
            acc[tup[0]] = tup[1];
            return acc;
        }, {});
        for (var _i = 0, docObj_1 = docObj; _i < docObj_1.length; _i++) {
            var key = docObj_1[_i];
            if (requiredFields[key](docObj[key])) {
                return acc + 1;
            }
        }
        return acc;
    }, 0);
}
var part1Required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
var part1Optional = ["cid"];
console.time("part 1");
console.log(part1(DATA, part1Required, part1Optional));
console.timeLog("part 1");
var part2Required = {
    byr: function (str) { return parseInt(str, 10) >= 1920 && parseInt(str, 10) <= 2002; },
    iyr: function (str) { return parseInt(str, 10) >= 2010 && parseInt(str, 10) <= 2020; },
    eyr: function (str) { return parseInt(str, 10) >= 2020 && parseInt(str, 10) <= 2030; },
    hgt: function (str) {
        var valid = str.match("/^(d{2,3})(cm|in)$/g");
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
    hcl: function (str) { return str.test("/^#([a-f]|[0-9]){6}$/g"); },
    ecl: function (str) { return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(str); },
    pid: function (str) { return str.test("/^d{9}$/g"); }
};
var part2Optional = { cid: function (str) { return true; } };
console.time("part 2");
console.log(part2(DATA, part2Required, part2Optional));
console.timeLog("part 2");
