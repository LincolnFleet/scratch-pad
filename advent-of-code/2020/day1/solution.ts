#!usr/bin/env node
const fs = require("fs");

type numList = Array<number>;

const DATA: numList = fs
  .readfile("./input.txt", (error: any, file: any) => {
    if (error) throw error;
    return file.toString();
  })
  .then((bigStr: string) => bigStr.split("/n"))
  .then((arr: Array<string>) => arr.map((str: string) => parseInt(str)));

function main(inputList: numList, targetSum: number): number {
  const sortedListAsc: numList = inputList.sort((a, b) => (a > b ? 1 : -1));
  let lowPointer: number = 0;
  let highPointer: number = sortedListAsc.length - 1;

  try {
    while (sortedListAsc[lowPointer] + sortedListAsc[highPointer] !== targetSum) {
      const sum: number = sortedListAsc[lowPointer] + sortedListAsc[highPointer];

      if (sum > targetSum) {
        if (lowPointer > 0) {
          lowPointer -= 1;
        } else if (highPointer > lowPointer + 1) {
          highPointer -= 1;
        } else {
          throw new Error("(sum > targetSum) && (highPointer > lowPointer + 1)");
        }
      } else if (sum < targetSum) {
        if (highPointer > lowPointer + 1) {
          lowPointer += 1;
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
        lowPointer:${lowPointer}, 
        highPointer:${highPointer}, 
        nums: [${sortedListAsc[lowPointer]}, ${sortedListAsc[highPointer]}], 
        sum:${sortedListAsc[lowPointer] + sortedListAsc[highPointer]}`
    );
  }
}

main(DATA, 2020);

export { main };
