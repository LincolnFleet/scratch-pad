// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143 ?

// JavaScript ES6

// function primesBelow(n = 0) {
//     const primesArray = (n < 2) ? [] : [2];
//     for (let i = 3; i <= n; i += 2) {
//         (primesArray.every( (x)=> {(i % x) !== 0} )) ?
//             primesArray.push(i) : null;
//     };
//     return primesArray;
// };


function findLargestPrimeFactor(mainNum) {
    this.primeFactors = [];

    function isPrime(num) {
        let numIsPrime = true;
        if (num<2) {
            numIsPrime = false;
        } else if ((num!==2) && (num%2===0)) {
            numIsPrime = false;
        } else {
            for (let i=3; i<num; i+=2) {
                if (num % i === 0) {
                    return numIsPrime = false;
        };  };  };
        return numIsPrime;
    };

    function pushAndMultFactors(newFactor) {
        this.primeFactors.push(newFactor);
        return this.primeFactors.reduce((acc, pFac)=>acc*pFac);
    };

    function main(mainNum) {
        if (isPrime(mainNum)) {
            console.log(`${mainNum} is prime and has no factors.`);
            return mainNum;
        } else {
            LOOP_1:
            for (let i=2; i<mainNum; i++) {
                if (isPrime(i)) {
                    if (mainNum%i===0) {
                        if (pushAndMultFactors(i) === mainNum) {
                            break LOOP_1;
        };  };  };  };  };
    };

    main(mainNum);
    return this.primeFactors[this.primeFactors.length-1];
};

console.log(findLargestPrimeFactor(600851475143));