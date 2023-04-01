// Best: O(n) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space

// Two Solutions. One is using 2 for loops with i = 0 and j = i+1;
// Second check each iteration i and i+1 and swap them.
// In the first one we'll get min value on the first position after the first iteration
// In a second one we'll get max val on the last position after the first iteration.

function bubbleSort1(array) {
  let isSorted = false;
  for (let i = 0; i < array.length, isSorted === false; i++) {
      isSorted = true;
      for (let j = i + 1; j < array.length; j++) {
          if (array[i] > array[j]) {
              swap(i, j, array);
              isSorted = false;
          }
      }
  }
  return array;
}

const arr = [8, 5, 2, 9, 5, 6, 3]; // [2, 3, 5, 5, 6, 8, 9]

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function bubbleSort(array) {
  let isSorted = false;
  let counter = 0;
  while (!isSorted) {
    isSorted = true;
    for (let i = 0; i < array.length - 1 - counter; i++) {
      if (array[i] > array[i + 1]) {
        swap(i, i + 1, array);
        isSorted = false;
      }
    }
    counter++;
  }
  return array;
}

console.log(bubbleSort(arr));
