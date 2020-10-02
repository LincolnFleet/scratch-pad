// A palindromic number reads the same both ways.
// The largest palindrome made from the product of
// two 2-digit numbers is 9009 = 91 × 99.
// Find the largest palindrome made from the product of two 3-digit numbers.

// JS ES6
// Starting with the highest possible multipliers and working backwards

function findLargestPalindrome(numOfDigits) {
    const maxMulti = Math.pow(10, numOfDigits)-1;
    const minMulti = Math.pow(10,numOfDigits)/10;

    let highest=[0,0,0];

    function PaliCheck(num) {
        let string = num.toString();
        let revString = num.toString().split('').reverse().join('');
        
        return (string === revString);
    };

    for (let i=maxMulti; i>=minMulti; i--) {
        for (let k=maxMulti; k>=minMulti; k--) {
            if (PaliCheck(i*k) && i*k>highest[2]) {
                highest = [i, k, i*k];
            };
        };
    };

    console.log(highest[0], '*', highest[1], '=', highest[2]);
    return highest[2];
};

test('largest palindrome of (2) 2-digit nums is 9009', ()=>{
    expect(findLargestPalindrome(2)).toEqual(9009)
});

findLargestPalindrome(3);