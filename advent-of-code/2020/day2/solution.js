#!usr/bin/env node
var fs = require("fs");
var DATA = fs.readFileSync("./input.txt", "utf-8").split("\n");
function part1(list) {
    return list.reduce(function (acc, entry) {
        var _a = entry.split(":").map(function (str) { return str.trim(); }), rule = _a[0], password = _a[1];
        var _b = rule.split(" "), quants = _b[0], char = _b[1];
        var _c = quants.split("-").map(function (str) { return parseInt(str, 10); }), min = _c[0], max = _c[1];
        var rgx = RegExp(char, "g");
        var matches = password.match(rgx);
        if (matches && min <= matches.length && matches.length <= max) {
            acc += 1;
        }
        return acc;
    }, 0);
}
function part2(list) {
    return list.reduce(function (acc, entry) {
        var _a = entry.split(":").map(function (str) { return str.trim(); }), rule = _a[0], password = _a[1];
        var _b = rule.split(" "), positions = _b[0], char = _b[1];
        var _c = positions.split("-").map(function (str) { return parseInt(str, 10); }), pos1 = _c[0], pos2 = _c[1];
        var _d = [password[pos1 - 1] === char, password[pos2 - 1] === char], match1 = _d[0], match2 = _d[1];
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
