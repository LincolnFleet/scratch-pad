// Problem 1
// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

// Find the sum of all the multiples of 3 or 5 below 1000.

// function sumOfMultiples(upperLimitExclusive, int1, int2) {
//     this.sharedMultiplesTotal = 0;
//     this.runningTotal = 0;

//     function findMultiples(testNum, offNum) {
//         for (let i=1; (i+1)*testNum < upperLimitExclusive; i++) {
//             (i*testNum)%offNum === 0 ?
//                 this.sharedMultiplesTotal += (i*testNum) :
//                 this.runningTotal += (i*testNum);
//         };
//     };

//     findMultiples(int1, int2);
//     findMultiples(int2, int1);

//     return this.runningTotal+(this.sharedMultiplesTotal/2);
// };

function sumOfMultiples(upperLimitExclusive, int1, int2) {
    this.runningSum=0;

    for (let i=0; i<upperLimitExclusive; i++) {
        (i%int1===0) || (i%int2===0) ? this.runningSum+=i : null;
    };

    return this.runningSum;
};


console.log(
    sumOfMultiples(1000, 3, 5)
);

console.log(
    sumOfMultiples(10, 3, 5)
);