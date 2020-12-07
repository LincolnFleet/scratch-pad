#!usr/bin/env node
var fs = require("fs");
var DATA = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/\n\n/g)
    .map(function (group) { return group.split(/\n/g); });
function part1(data) {
    var yesAnswerCounts = [];
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var group = data_1[_i];
        var yesAnswers = [];
        for (var _a = 0, group_1 = group; _a < group_1.length; _a++) {
            var person = group_1[_a];
            for (var _b = 0, person_1 = person; _b < person_1.length; _b++) {
                var letter = person_1[_b];
                yesAnswers.push(letter);
            }
        }
        var yesAnswersUnique = new Set(yesAnswers);
        yesAnswerCounts.push(yesAnswersUnique.size);
    }
    return yesAnswerCounts.reduce(function (acc, count) { return acc + count; });
}
console.time("part 1");
console.log(part1(DATA));
console.timeLog("part 1");
