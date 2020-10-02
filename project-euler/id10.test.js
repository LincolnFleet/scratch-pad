// The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
// Find the sum of all the primes below two million.

// ** Without Sieve of Eratosthenes
// function sumOfAllPrimesBelow(upperLimit) {
//   let runningSum = 0;
  
//   LOOP_1:
//   for (let num = 0; num < upperLimit; num++) {
//     if ((num!==2) && (num%2==0)) {
//       continue;
//     } else if (num<2) {
//       continue;
//     } else {
//       for (let i=3; i<num; i+=2) {
//         if (num % i == 0) {
//           continue LOOP_1;
//         };
//       };

//       runningSum += num;
//     };
//   };

//   return runningSum;
// };

// ** With Sieve of Eratosthenes

function sumOfAllPrimesBelow(upperLimit) {
  let arr = new Array;
  arr.length = upperLimit;
  arr.fill(true);
  arr[0]= false;
  arr[1]= false;

  for (let i = 2; i < upperLimit; i++) {
    if (arr[i]) {
      for (let e = i; e*i < upperLimit; e++) {
        arr[e*i] = false;
      };
    };
  };
  
  return arr.reduce((acc, val, index) => {if (val) {return acc+index} else {return acc}}, 0);
};

test('Find sum of all primes < 10 to be 17', () =>{
  expect(sumOfAllPrimesBelow(10)).toEqual(17)
});

test('Find sum of all primes < 2,000,000 to be 142,913,828,922', () => {
  expect(sumOfAllPrimesBelow(2000000)).toEqual(142913828922)
});