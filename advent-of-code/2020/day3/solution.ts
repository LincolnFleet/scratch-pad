#!usr/bin/env node
const fs = require("fs");

const DATA: Array<string> = fs.readFileSync("./input.txt", "utf-8").split("\n");
interface Coord {
  y: number;
  x: number;
}

function BrakesAreForBabies(terrain: Array<string | []>, trajectory: Coord, startingPos: Coord = { y: 0, x: 0 }) {
  const terrainDimensions: Coord = { y: terrain.length, x: terrain[0].length };
  let treeCount: number = 0;
  let position = startingPos;

  while (position.y < terrainDimensions.y) {
    if (terrain[position.y][position.x] === "#") {
      treeCount++;
    }
    position = {
      y: position.y + trajectory.y,
      x: (position.x + trajectory.x) % terrainDimensions.x,
    };
  }

  return treeCount;
}

const part1Trajectories: Coord = { y: 1, x: 3 };
console.time("part1");
console.log(BrakesAreForBabies(DATA, part1Trajectories));
console.timeLog("part1");

const part2Trajectories: Array<Coord> = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
];
console.time("part2");
console.log(part2Trajectories.reduce((acc, traj) => acc * BrakesAreForBabies(DATA, traj), 1));
console.timeLog("part2");
