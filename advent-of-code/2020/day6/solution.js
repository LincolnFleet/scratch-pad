#!usr/bin/env node
var fs = require("fs");
var DATA = fs
    .readFileSync("./input.txt", "utf-8")
    .split(/\n\n/g)
    .map(function (group) { return group.split(/\n/g); });
function part1(data) {
    var yesAnswerCount = 0;
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
        yesAnswerCount += yesAnswersUnique.size;
    }
    return yesAnswerCount;
}
function part2(data) {
    var yesToAllCounts = 0;
    for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
        var group = data_2[_i];
        var yesAnswers = {};
        for (var _a = 0, group_2 = group; _a < group_2.length; _a++) {
            var person = group_2[_a];
            for (var _b = 0, person_2 = person; _b < person_2.length; _b++) {
                var letter = person_2[_b];
                yesAnswers[letter] ? (yesAnswers[letter] += 1) : (yesAnswers[letter] = 1);
            }
        }
        console.log(group.length, group);
        for (var question in yesAnswers) {
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
