// 'abcdcba' --> true   'abcdcba' === 'abcdcba'
// 'abcedba' --> false  'abcedba' !== 'abdecba'
let str = 'abcdcba';
// O(n^2) time | O(n) space
function isPalindromeFirst(string) {
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return string === reversedString;
}

// O(n) time | O(n) space
function isPalindromeSecond(string) {
  const reversedChars = [];
  for (let i = string.length - 1; i >= 0; i--) {
    reversedChars.push(string[i]);
  }
  return string === reversedChars.join('');
}

// O(n) time | O(n) space
function isPalindromeThird(string, i = 0) {
  const j = string.length - 1 - i;
  return i >= j ? true : string[i] === string[j] && isPalindromeThird(string, i + 1);
}

// O(n) time | O(1) space
function isPalindromeFourth(string) {
  let leftIdx = 0;
  let rightIdx = string.length - 1;
  while (leftIdx < rightIdx) {
    if (string[leftIdx] !== string[rightIdx]) return false;
    leftIdx++;
    rightIdx--;
  }
  return true;
}

var isPalindrome5 = function (palStr) {
    let left = 0;
    var getChar = function (right) {
        if (right === palStr.length) {
            return true;
        }
        let next = getChar(right + 1);
        const currIsSame = palStr[left] === palStr[right];
        ++left;

        return currIsSame && next;
    };

    return getChar(0);
};

console.log(isPalindromeFirst(str));
console.log(isPalindromeSecond(str));
console.log(isPalindromeThird(str));
console.log(isPalindromeFourth(str));
