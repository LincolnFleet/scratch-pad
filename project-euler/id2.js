// Each new term in the Fibonacci sequence is generated by
// adding the previous two terms. By starting with 1 and 2,
// the first 10 terms will be:

// 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...

// By considering the terms in the Fibonacci sequence 
// whose values do not exceed four million, find the sum of the even-valued terms.

// JavaScript ES6
// Somewhat longer of a solution because I wanted to make it work with
// varying parameters

function sumOfFibonacci(
    upperLimitInclusive = Number.MAX_SAFE_INTEGER,
    divisibleBy = 1,
    startingPairArray = [1,2]
    ) {

    let fragFib = startingPairArray;
    let selectSumFib = 0;
    
    (startingPairArray[0] % divisibleBy === 0) ?
        selectSumFib += startingPairArray[0] :
        null;
        
    (startingPairArray[1] % divisibleBy === 0) ?
        selectSumFib += startingPairArray[1] :
        null;

    while (fragFib[1] <= upperLimitInclusive) {
        fragFib[2] = fragFib[0] + fragFib[1];

        (fragFib[2] % divisibleBy === 0) ?
            selectSumFib += fragFib[2] :
            null;

        fragFib = [ fragFib[1], fragFib[2] ];
    };

    return selectSumFib;
};

console.log(
    sumOfFibonacci(4000000, 2)
);