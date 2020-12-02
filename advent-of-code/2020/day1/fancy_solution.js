#!usr/bin/env node
var fs = require("fs");
var DATA = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map(function (str) { return parseInt(str, 10); });
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
                if (highPointer > lowPointer + 1) {
                    if (prevLoopDecreasedLowPointer) {
                        highPointer -= 1;
                        prevLoopDecreasedLowPointer = false;
                    }
                    else {
                        lowPointer += 1;
                        prevLoopDecreasedLowPointer = false;
                    }
                }
                else {
                    throw new Error("(sum < targetSum) && (highPointer > lowPointer + 1)");
                }
            }
        }
        return sortedListAsc[lowPointer] * sortedListAsc[highPointer];
    }
    catch (error) {
        console.log("Cannot find pair with sum of " + targetSum + ".\n      Reason for stop: " + error.message + "\n      State at time of stop: \n        list length: " + sortedListAsc.length + "\n        lowPointer: " + lowPointer + ", \n        highPointer: " + highPointer + ", \n        prevLoopDecreasedLowPointer: " + prevLoopDecreasedLowPointer + ",\n        nums: [" + sortedListAsc[lowPointer] + ", " + sortedListAsc[highPointer] + "], \n        sum: " + (sortedListAsc[lowPointer] + sortedListAsc[highPointer]));
    }
}
console.time("time elapsed");
console.log(main(DATA, 2020));
console.timeLog("time elapsed");
