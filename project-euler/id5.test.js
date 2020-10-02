// 2520 is the smallest number that can be divided by each
// of the numbers from 1 to 10 without any remainder.

// What is the smallest positive number that is evenly divisible
// by all of the numbers from 1 to 20?

function findCommonDenominee(minDenominator, maxDenominator) {
    const maxSafeDenom = Math.round(Number.MAX_SAFE_INTEGER / maxDenominator);

    LOOP_1:
    for (let i=1; i<maxSafeDenom; i++) {
        let testNum = i*maxDenominator;

        LOOP_2:
        for (let k=minDenominator; k<maxDenominator; k++) {
            if (testNum % k !== 0) {
                continue LOOP_1;
            };
        };
        return testNum;
    };
};

test('finds smallest num divided by 1-10 to be 2520', ()=>{
    expect(findCommonDenominee(1, 10)).toEqual(2520);
});

test('return is evenly divided by 1-20', ()=>{
    expect(findCommonDenominee(1,20) % 2).toEqual(0);
    expect(findCommonDenominee(1,20) % 5).toEqual(0);
    expect(findCommonDenominee(1,20) % 10).toEqual(0);
    expect(findCommonDenominee(1,20) % 13).toEqual(0);
    expect(findCommonDenominee(1,20) % 19).toEqual(0);
});

console.log(findCommonDenominee(1, 20))