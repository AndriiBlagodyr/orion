// Check if one array is a subsequence of another
// O(n) time n - main array length | O(1) space - where n is the length of the array

const array = [5, 1, 22, 25, 6, -1, 8, 10];
const searchArr = [1, 6, -1, 10];

const isArraySubsequenceFirst = (baseArray, searchArray) => {
  let searchArrayIndex = 0;
  let searchArrayLength = searchArray.length;

  for (let index = 0; index < baseArray.length; index++) {
    if (baseArray[index] === searchArray[searchArrayIndex]) {
      ++searchArrayIndex;
      if (searchArrayIndex === searchArrayLength) {
        return true;
      }
    }
  }
  return false;
};

const isArraySubsequenceSecond = (baseArray, searchArray) => {
  let baseArrayIndex = 0;
  let searchArrayIndex = 0;

  while (baseArrayIndex < baseArray.length && searchArrayIndex < searchArray.length) {
    if (baseArray[baseArrayIndex] === searchArray[searchArrayIndex]) {
      searchArrayIndex++;
    }
    baseArrayIndex++;
  }
  return searchArrayIndex === searchArray.length;
};

console.log(isArraySubsequenceFirst(array, searchArr));
console.log(isArraySubsequenceSecond(array, searchArr));
