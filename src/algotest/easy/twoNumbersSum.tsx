// Given an array of n int unique numbers and int value x
// Check if sum of any two numbers from array equal to x

// Solution 1
// O(n^2) time | O(1) space
// for loop in for loop

// setting all numbers in the hash table will
// give us a possibility to get each number
// for const time

const arr1 = [3, 5, -4, 8, 11, 1, -1, 6];
const arr2 = [3, 5, 12, 8, 11, 1, 6];

const findTwoNumbers1 = (array, searchSum) => {
  const arrLength = array.length;
  for (let i = 0; i < arrLength; i++) {
    const element = array[i];
    for (let j = i + 1; j < arrLength; j++) {
      if (element + array[j] === searchSum) {
        return [element, array[j]];
      }
    }
  }
  return [];
};

// Time Complexity O(n) - where n the array length
// Space Complexity O(n)
const findTwoNumbers2 = (array, searchSum) => {
  const hashMap = {};
  for (const num of array) {
    const searchValue = searchSum - num;
    if (hashMap[searchValue]) {
      return [num, searchValue];
    }
    hashMap[num] = true;
  }
  return [];
};

// Time O(nlog(n)) | Space O(1)
const findTwoNumbers3 = (array, searchSum) => {
  array.sort((a, b) => a - b);
  let left = 0;
  let right = array.length - 1;
  while (left < right) {
    const currentSum = array[left] + array[right];
    if (currentSum === searchSum) {
      return [array[left], array[right]];
    } if (currentSum < searchSum) {
      left += 1;
    } else if (currentSum > searchSum) {
      right -= 1;
    }
  }
  return [];
};

console.log(findTwoNumbers1(arr1, 10));
console.log(findTwoNumbers1(arr2, 10));
console.log(findTwoNumbers2(arr1, 10));
console.log(findTwoNumbers2(arr2, 10));
console.log(findTwoNumbers3(arr1, 10));
console.log(findTwoNumbers3(arr2, 10));
