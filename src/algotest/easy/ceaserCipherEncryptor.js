// O(n) time | O(n) space
// unicode of char a = 96, char z = 122

const testStr = 'abcxyz'; // with key 2 expected output 'cdezab'
function getNewLetterFirst(letter, key) {
  const newLetterCode = letter.charCodeAt() + key;
  return newLetterCode <= 122 ? String.fromCharCode(newLetterCode) : String.fromCharCode(96 + (newLetterCode % 122));
}

function caesarCipherEncryptorFirst(string, key) {
  const newLetters = [];
  const newKey = key % 26;
  for (const letter of string) {
    newLetters.push(getNewLetterFirst(letter, newKey));
  }
  return newLetters.join('');
}

// O(n) time | O(n) space

function getNewLetterSecond(letter, key, alphabet) {
  const newLetterCode = alphabet.indexOf(letter) + key;
  return newLetterCode <= 25 ? alphabet[newLetterCode] : alphabet[-1 + (newLetterCode % 25)];
}
function caesarCipherEncryptorSecond(string, key) {
  const newLetters = [];
  const newKey = key % 26;
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  for (const letter of string) {
    newLetters.push(getNewLetterSecond(letter, newKey, alphabet));
  }
  return newLetters.join('');
}

console.log(caesarCipherEncryptorFirst(testStr, 2));
console.log(caesarCipherEncryptorSecond(testStr, 2));
