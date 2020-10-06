// A pangram is a sentence that contains every single letter of the 
// alphabet at least once. For example, the sentence "The quick brown fox 
// jumps over the lazy dog" is a pangram, because it uses the letters A-Z 
// at least once (case is irrelevant).

// Given a string, detect whether or not it is a pangram. Return True if 
// it is, False if not. Ignore numbers and punctuation.

function isPangram(string) {
  return new Set(
    string.toLowerCase().match(/[a-z]/g)
  ).size == 26;
}

function isPangram2(string) {
  const az = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'];
  return az.reduce((acc, char) => {
    if (string.indexOf(char) != -1) {
      continue;
    } else {
      acc = false;
      break;
    }
  }, true);
}