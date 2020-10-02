const TestRunner = require("jest-runner")

// The sum of the squares of the first ten natural numbers is,
// 1^2 + 2^2 + ... + 10^2 = 385

// The square of the sum of the first ten natural numbers is,
// (1 + 2 + ... + 10)^2 = 55^2 = 3025

// Hence the difference between the sum of the squares of the first
// ten natural numbers and the square of the sum is 3025 − 385 = 2640.

// Find the difference between the sum of the squares of the first one
// hundred natural numbers and the square of the sum.

// function diffOfNums(maxNatNum) {
//     const natNumArr = [...Array(maxNatNum+1).keys()];

//     const sumOfSquares = ()=>{
//         return natNumArr.reduce((acc, num)=> acc+= num*num);
//     };

//     const squareOfSum = ()=>{
//         return Math.pow(natNumArr.reduce((acc, num)=> acc+=num), 2);
//     };

//     return (squareOfSum() - sumOfSquares());
// };

function diffOfNums(maxNatNum) {
    let sumOfSquares = 0;
    let squareOfSum = 0;
    
    for (let num of [...Array(maxNatNum+1).keys()]) {
        sumOfSquares += num*num;
        squareOfSum += num;
    };

    return (
        (Math.pow(squareOfSum, 2)) - sumOfSquares
    );
};

test('diffOfNums returns 2640 for first 10 nat nums', ()=>{
    expect(diffOfNums(10)).toEqual(2640);
});

test('diffOfNums returns 25164150 for first 100 nat nums', ()=>{
    expect(diffOfNums(100)).toEqual(25164150);
});