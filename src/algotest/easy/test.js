// Best: O(n) time | O(1) space
// Average: O(n^2) time | O(1) space
// Worst: O(n^2) time | O(1) space

const arr = [8, 5, 2, 9, 5, 6, 3]; // [2, 3, 5, 5, 6, 8, 9]

function swap(array, left, right) {
    const temp = array[left];
    array[left] = array[right];
    array[right] = temp;
    return array;
}
// console.log(swap(arr, 1, 2));
function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                array = swap(array, j, j + 1);
            }
        }
    }
    return array;
}

console.log(bubbleSort(arr));
