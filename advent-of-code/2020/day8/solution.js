#!usr/bin/env node
var fs = require('fs');
var DATA = fs.readFileSync('./input.txt', 'utf-8').split(/\n/g).map(function (line) { return line.split(/ /g); });
function part1(data) {
    var executedLines = [];
    var lineToExecute = 0;
    var accumulator = 0;
    while (!executedLines.includes(lineToExecute)) {
        executedLines.push(lineToExecute);
        var lineType = data[lineToExecute][0];
        var lineValue = parseInt(data[lineToExecute][1], 10);
        switch (lineType) {
            case "jmp":
                lineToExecute += lineValue;
                break;
            case "acc":
                accumulator += lineValue;
                lineToExecute += 1;
                break;
            default:
                lineToExecute += 1;
                break;
        }
    }
    return accumulator;
}
console.time('part 1');
console.log(part1(DATA));
console.timeLog('part 1');
