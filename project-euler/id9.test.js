// A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

// a2 + b2 = c2
// For example, 32 + 42 = 9 + 16 = 25 = 52.

// There exists exactly one Pythagorean triplet for which a + b + c = 1000.
// Find the product abc.

function findPythagoreanTriplet(tripletSum) {
  LOOP_1:
  for (let c = tripletSum-2; c>0 ; c--) {
    LOOP_2:
    for (let b = tripletSum-c; b>0; b--) {
      LOOP_3:
      for (let a = tripletSum-b; a>0; a--) {
        if ((a+b+c==tripletSum) && (a*a + b*b == c*c)) {
          console.log('a=',a,'b=',b,'c=',c);
          return a*b*c;
        };
      };
    };
  };
};

console.log(findPythagoreanTriplet(1000));