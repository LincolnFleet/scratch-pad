#!usr/bin/env node
const fs = require("fs");
const path = require("path");
const inputFilePath = path.join(__dirname, "/input.txt");

type numList = Array<number>;

const DATA: numList = fs
  .readfile(inputFilePath, (error: any, file: any) => {
    if (error) throw error;
    return file.toString();
  })
  .then((bigStr: string) => bigStr.split("/n"))
  .then((arr: Array<string>) => arr.map((str: string) => parseInt(str)));

function main(inputList: numList, targetSum: number): number {
  const sortedListAsc: numList = inputList;
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
          throw new Error("(sum > targetSum) && (highPointer > lowPointer + 1)");
        }
      } else if (sum < targetSum) {
        if (highPointer > lowPointer + 1 && !prevLoopDecreasedLowPointer) {
          lowPointer += 1;
          prevLoopDecreasedLowPointer = false;
        } else {
          throw new Error("(sum < targetSum) && (highPointer > lowPointer + 1)");
        }
      } else {
        break;
      }
    }

    const pair: numList = [sortedListAsc[lowPointer], sortedListAsc[highPointer]];

    console.log(`${pair}; sum: ${pair[0] + pair[1]}; product: ${pair[0] * pair[1]}`);

    return pair[0] * pair[1];
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

main(DATA, 2020);
