#!usr/bin/env node
//@ts-check

const fs = require("fs");

const main = (sumTarget) => {
  const list = fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map((str) => parseInt(str, 10));

  const result = { twoFactor: null, threeFactor: null };

  for (let a = 0; a < list.length - 3; a++) {
    for (let b = a + 1; b < list.length - 2; b++) {
      if (!result.twoFactor) {
        const sum = list[a] + list[b];
        if (sum == sumTarget) {
          result.twoFactor = list[a] * list[b];
          if (result.twoFactor && result.threeFactor) {
            return result;
          }
        }
      }
      if (!result.threeFactor) {
        for (let c = b + 1; c < list.length - 1; c++) {
          const sum2 = list[a] + list[b] + list[c];
          if (sum2 == sumTarget) {
            result.threeFactor = list[a] * list[b] * list[c];
            if (result.twoFactor && result.threeFactor) {
              return result;
            }
          }
        }
      }
    }
  }
};

console.time();
console.log(main(2020));
console.timeLog();
