// The four adjacent digits in the 1000-digit number that have the greatest product are 9 × 9 × 8 × 9 = 5832.

const BigNumStr = '7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450';
// Find the thirteen adjacent digits in the 1000-digit number that have the greatest product. What is the value of this product?

function adjacentDigitsWithGreatestProduct(numOfDigits) {
  let currentSet = BigNumStr.slice(0, numOfDigits).split('');

  function productOfSet(currentSet) {
    return currentSet.reduce((acc, digit) => acc*digit);
  };

  let winner = {set: currentSet, product: productOfSet(currentSet)}; 

  for (let i=numOfDigits; i < BigNumStr.length; i++) {
    currentSet.push(BigNumStr[i]);
    currentSet.shift();

    let x = productOfSet(currentSet);

    if (x > winner.product) {
      winner.set = currentSet;
      winner.product = x;
    };
  };

  return winner.product;
};

// function adjacentDigitsWithGreatestProduct(numOfDigits) {
//   const sets = BigNumStr.split('0').map(
//       (set) => set.split('')
//     ).filter(
//       (set) => set.length >= numOfDigits
//     );

//   return sets.reduce((acc, set) => {
//     let highest;
//     for (let i=numOfDigits; i <= set.length; i++) {
//       let subProd = set.slice(i-numOfDigits, i-1).reduce(
//         (subacc, num) => parseInt(num)*subacc
//       );
//       if (subProd > highest) {highest = subprod}
//     };
//     return (highest > acc) ? highest : acc
//   });
// };

test('4 adjacent digits with greatest product will be 9x9x8x9 = 5832', ()=>{
  expect(adjacentDigitsWithGreatestProduct(4)).toEqual(5832)
});

console.log(adjacentDigitsWithGreatestProduct(13));