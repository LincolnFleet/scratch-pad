#!/usr/bin/env node
// const open = require('open');
const { stdin, stdout } = require('process');
const dictionary = require('./assets/words_dictionary.json');

let required;
let others;
const barneyABC = 'https://www.youtube.com/watch?v=lblaHVKRyH4';

function main(phase=1, failCount=0) {  
  switch(phase) {
    case 2:
      stdin.resume();
      stdout.write("Other letters: ");

      stdin.once('data', (data)=>{
        others = data.toString().trim();
        if ( /^[A-Za-z]+$/g.test(others) ) {
          main(phase+1, failCount);
        } else {
          failResponse(failCount, phase);
        };
      });
      break;
    case 3:
      console.table( scanDictionaryForMatches(required, others) );
      process.exit();
      break;
    default:
      stdin.resume();
      stdout.write("Type your answer with no spaces or commas between them, then press the enter (return) key.\n");
      stdout.write("Required letter: ");

      stdin.once('data', (data)=>{
        required = data.toString().trim() || "";
        if ( /^[A-Za-z]+$/g.test(required) ) {
          main(phase+1, failCount);
        } else {
          failResponse(failCount, phase);
        };
      });
      break;
  };
};

function failResponse(failCount, phase) {
  switch(failCount) {
    case 0:
      stdin.resume();
      stdout.write("Words are usually made up of just letters. Let's stick to those.\n\n");
      setTimeout(()=>{stdout.write(">:[\n")}, 1000);
      setTimeout(()=>{stdout.write("\n")}, 2000);
      setTimeout(()=>{main(phase, failCount+1)}, 3000);
      break;
    case 1:
      stdin.resume();
      stdout.write("No, seriously. This is being looked up in an English dictionary, not on the walls of a pharaoh's tomb. Letters please.");
      setTimeout(()=>{stdout.write("Do I need to bring someone in to sing about the letters of the alphabet? You'll be sorry.")}, 2000);
      setTimeout(()=>{main(phase, failCount+1)}, 1000);
      break;
    case 3:
      stdin.resume();
      stdout.write("You brought this on yourself.");
      // setTimeout(()=>{open(barneyABC)}, 2000);
    default:
      return;
  }
};

function scanDictionaryForMatches(essential, nonessential) {
  const letters = essential + nonessential.toLowerCase();
  const regex = `^[${letters.split('').map( (x) => x ).join('|')}]+$`;
  const matches = new Set();
  for (const word in dictionary) {
    if (new RegExp(regex, 'g').test(word) && word.includes(required) && word.length>3) {
      matches.add(word);
    };
  };
  return [...matches];
};

main();
