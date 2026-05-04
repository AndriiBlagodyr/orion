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

function quickSortInPlace(arr, low, high) {
    if (low >= high) return;

    const pivotIndex = partition(arr, low, high);
    quickSortInPlace(arr, low, pivotIndex - 1);
    quickSortInPlace(arr, pivotIndex + 1, high);
}

function partition(arr, low, high) {
    const pivot = arr[high]; // last element as pivot
    let i = low - 1;         // boundary of elements <= pivot

    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // Put the pivot right after the smaller-or-equal section.
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

console.log(quickSort([5, 3, 8, 4, 2]));   // [2, 3, 4, 5, 8]
console.log(quickSort([1, 2, 3, 4]));      // [1, 2, 3, 4]
console.log(quickSort([3, -1, 0, -1, 2])); // [-1, -1, 0, 2, 3]
