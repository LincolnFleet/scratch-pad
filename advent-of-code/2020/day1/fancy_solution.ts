#!usr/bin/env node
const fs = require("fs");

const DATA: Array<number> = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map((str: string) => parseInt(str, 10));

function main(inputList: Array<number>, targetSum: number): number {
  const sortedListAsc: Array<number> = inputList;
  sortedListAsc.sort((a, b) => (a > b ? 1 : -1));

  let highPointer: number = sortedListAsc.length - 1;
  let lowPointer: number = 0;
  let prevLoopDecreasedLowPointer: boolean = false;

  try {
    while (sortedListAsc[lowPointer] + sortedListAsc[highPointer] !== targetSum) {
      const sum: number = sortedListAsc[lowPointer] + sortedListAsc[highPointer];

      if (sum > targetSum) {
        if (lowPointer > 0) {
          lowPointer -= 1;
          prevLoopDecreasedLowPointer = true;
        } else if (highPointer > lowPointer + 1) {
          highPointer -= 1;
          prevLoopDecreasedLowPointer = false;
        } else {
          throw new Error("(sum > targetSum) && !(lowPointer > 0) && !(highPointer > lowPointer + 1)");
        }
      } else if (sum < targetSum) {
        if (highPointer > lowPointer + 1) {
          if (prevLoopDecreasedLowPointer) {
            highPointer -= 1;
            prevLoopDecreasedLowPointer = false;
          } else {
            lowPointer += 1;
            prevLoopDecreasedLowPointer = false;
          }
        } else {
          throw new Error("(sum < targetSum) && !(highPointer > lowPointer + 1)");
        }
      }
    }

    return sortedListAsc[lowPointer] * sortedListAsc[highPointer];
  } catch (error) {
    console.log(
      `Cannot find pair with sum of ${targetSum}.
      Reason for stop: ${error.message}
      State at time of stop: 
        list length: ${sortedListAsc.length}
        lowPointer: ${lowPointer}, 
        highPointer: ${highPointer}, 
        prevLoopDecreasedLowPointer: ${prevLoopDecreasedLowPointer},
        nums: [${sortedListAsc[lowPointer]}, ${sortedListAsc[highPointer]}], 
        sum: ${sortedListAsc[lowPointer] + sortedListAsc[highPointer]}`
    );
  }
}

console.time("run time");
console.log(main(DATA, 2020));
console.timeLog("run time");
