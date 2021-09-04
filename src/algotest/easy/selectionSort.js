// Best: O(n^2) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space

const arr = [8, 5, 2, 9, 5, 6, 3]; // [2, 3, 5, 5, 6, 8, 9]

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function selectionSort(array) {
  let startIdx = 0;
  while (startIdx < array.length - 1) {
    let smallestIdx = startIdx;
    for (let i = startIdx + 1; i < array.length; i++) {
      if (array[smallestIdx] > array[i]) smallestIdx = i;
    }
    swap(startIdx, smallestIdx, array);
    startIdx++;
  }
  return array;
}

console.log(selectionSort(arr));
