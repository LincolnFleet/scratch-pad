#!usr/bin/env node
var fs = require("fs");
var DATA = fs.readFileSync("./input.txt", "utf-8").split("\n");
function BrakesAreForBabies(terrain, trajectory, startingPos) {
    if (startingPos === void 0) { startingPos = { y: 0, x: 0 }; }
    var terrainDimensions = { y: terrain.length, x: terrain[0].length };
    var treeCount = 0;
    var position = startingPos;
    while (position.y < terrainDimensions.y) {
        if (terrain[position.y][position.x] === "#") {
            treeCount++;
        }
        position = {
            y: position.y + trajectory.y,
            x: (position.x + trajectory.x) % terrainDimensions.x
        };
    }
    return treeCount;
}
var part1Trajectories = { y: 1, x: 3 };
console.time("part1");
console.log(BrakesAreForBabies(DATA, part1Trajectories));
console.timeLog("part1");
var part2Trajectories = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
];
console.time("part2");
console.log(part2Trajectories.reduce(function (acc, traj) { return acc * BrakesAreForBabies(DATA, traj); }, 1));
console.timeLog("part2");
