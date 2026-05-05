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
    if (low < high) {
        const p = partition(arr, low, high);
        quickSortInPlace(arr, low, p - 1);
        quickSortInPlace(arr, p + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    // 1. Обираємо pivot (найкраще — середній, щоб не було O(n^2))
    const mid = Math.floor((low + high) / 2);
    [arr[mid], arr[high]] = [arr[high], arr[mid]]; // міняємо місцями з останнім

    const pivot = arr[high];
    let i = low; // "Стіна": все, що зліва від i — менше за pivot

    // 2. j біжить по масиву і перекидає менші елементи за "стіну"
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }

    // 3. Ставимо pivot на його законне місце (на стіну)
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
}

console.log(quickSort([5, 3, 8, 4, 2]));   // [2, 3, 4, 5, 8]
console.log(quickSort([1, 2, 3, 4]));      // [1, 2, 3, 4]
console.log(quickSort([3, -1, 0, -1, 2])); // [-1, -1, 0, 2, 3]
