// O(n) time | O(1) space - where n is the length of the array
// Monotonic is an array if it's entirely is increasing or decreasing

const arr = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001];

function breaksDirection(direction, previousInt, currentInt) {
  const difference = currentInt - previousInt;
  if (direction > 0) return difference < 0;
  return difference > 0;
}

function isMonotonicFirst(array) {
  if (array.length <= 2) return true;
  let direction = array[1] - array[0];
  for (let i = 2; i < array.length; i++) {
    if (direction === 0) {
      direction = array[i] - array[i - 1];
      continue;
    }
    if (breaksDirection(direction, array[i - 1], array[i])) {
      return false;
    }
  }
  return true;
}

// O(n) time | O(1) space - where n is the length of the array
function isMonotonicSecond(array) {
  let isNonDecreasing = true;
  let isNonIncreasing = true;
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) isNonDecreasing = false;
    if (array[i] > array[i - 1]) isNonIncreasing = false;
  }
  return isNonDecreasing || isNonIncreasing;
}

console.log(isMonotonicFirst(arr)); // true
console.log(isMonotonicSecond(arr)); // true
