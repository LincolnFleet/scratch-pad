// By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13,
// we can see that the 6th prime is 13.

// What is the 10 001st prime number?

function NthPrime(nth) {
  let primesArr = [2]
  
  function isPrime(num) {
    if (num<2) {
      return false;
    } else if ((num!==2) && (num%2===0)) {
      return false;
    } else {
      for (let i=3; i<num; i+=2) {
        if (num % i === 0) {
          return false;
        };
      };
      return true;
    };
  };

  for (let i=3; primesArr.length < nth; i+=2) {
    isPrime(i) ? primesArr.push(i) : null;
  };

  return primesArr.pop()
};

test('NthPrime will find the 6th prime number to be 13 when counting from 0, ascending', ()=>{
  expect(NthPrime(6)).toEqual(13)
});

test('NthPrime will find the 1st prime number to be 2 when counting from 0, ascending', ()=>{
  expect(NthPrime(1)).toEqual(2)
});

console.log('prime #10001 is: ', NthPrime(10001)); // 104743