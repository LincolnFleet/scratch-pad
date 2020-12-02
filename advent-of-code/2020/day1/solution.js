#!usr/bin/env node
var fs = require("fs");
var path = require("path");
var inputFilePath = path.join(__dirname, "/input.txt");
var DATA = fs
    .readfile(inputFilePath, function (error, file) {
    if (error)
        throw error;
    return file.toString();
})
    .then(function (bigStr) { return bigStr.split("/n"); })
    .then(function (arr) { return arr.map(function (str) { return parseInt(str); }); });
function main(inputList, targetSum) {
    var sortedListAsc = inputList;
    sortedListAsc.sort(function (a, b) { return (a > b ? 1 : -1); });
    var highPointer = sortedListAsc.length - 1;
    var lowPointer = 0;
    var prevLoopDecreasedLowPointer = false;
    try {
        while (sortedListAsc[lowPointer] + sortedListAsc[highPointer] !== targetSum) {
            var sum = sortedListAsc[lowPointer] + sortedListAsc[highPointer];
            if (sum > targetSum) {
                if (lowPointer > 0) {
                    lowPointer -= 1;
                    prevLoopDecreasedLowPointer = true;
                }
                else if (highPointer > lowPointer + 1) {
                    highPointer -= 1;
                    prevLoopDecreasedLowPointer = false;
                }
                else {
                    throw new Error("(sum > targetSum) && (highPointer > lowPointer + 1)");
                }
            }
            else if (sum < targetSum) {
                if (highPointer > lowPointer + 1 && !prevLoopDecreasedLowPointer) {
                    lowPointer += 1;
                    prevLoopDecreasedLowPointer = false;
                }
                else {
                    throw new Error("(sum < targetSum) && (highPointer > lowPointer + 1)");
                }
            }
            else {
                break;
            }
        }
        var pair = [sortedListAsc[lowPointer], sortedListAsc[highPointer]];
        console.log(pair + "; sum: " + (pair[0] + pair[1]) + "; product: " + pair[0] * pair[1]);
        return pair[0] * pair[1];
    }
    catch (error) {
        console.log("Cannot find pair with sum of " + targetSum + ".\n      Reason for stop: " + error.message + "\n      State at time of stop: \n        list length: " + sortedListAsc.length + "\n        lowPointer: " + lowPointer + ", \n        highPointer: " + highPointer + ", \n        prevLoopDecreasedLowPointer: " + prevLoopDecreasedLowPointer + ",\n        nums: [" + sortedListAsc[lowPointer] + ", " + sortedListAsc[highPointer] + "], \n        sum: " + (sortedListAsc[lowPointer] + sortedListAsc[highPointer]));
    }
}
main(DATA, 2020);
