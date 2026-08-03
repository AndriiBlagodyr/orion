// Quick Sort
// Pick a pivot, move smaller elements to the left and bigger ones to the right,
// then recurse on each side.
//
// Time:
// - Average: O(n log n)
// - Worst: O(n^2) when the pivot is always the smallest or largest element.
//   Picking a random pivot makes the worst case extremely unlikely.
// Space: O(log n) average for the recursion stack.
// Stable: no.
//
// This uses the Lomuto partition scheme: it is the simplest to write and explain
// in an interview.

function quickSort(nums) {
    const arr = [...nums];
    quickSortInPlace(arr, 0, arr.length - 1);
    return arr;
}

function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
    if (low >= high) return arr;

    // Lomuto partition — middle element as pivot
    const mid = Math.floor((low + high) / 2);
    [arr[mid], arr[high]] = [arr[high], arr[mid]];

    const pivot = arr[high];
    let i = low;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }

    [arr[i], arr[high]] = [arr[high], arr[i]];

    quickSortInPlace(arr, low, i - 1);
    quickSortInPlace(arr, i + 1, high);

    return arr;
}

console.log(quickSort([5, 3, 8, 4, 2]));   // [2, 3, 4, 5, 8]
console.log(quickSort([1, 2, 3, 4]));      // [1, 2, 3, 4]
console.log(quickSort([3, -1, 0, -1, 2])); // [-1, -1, 0, 2, 3]
