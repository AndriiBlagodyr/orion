// Insertion Sort
// Build the sorted part one element at a time by shifting bigger elements right
// and dropping the current element into its place.
//
// Time:
// - Best: O(n) when the array is already sorted
// - Average/Worst: O(n^2)
// Space: O(1) extra (here O(n) because we copy the input)
// Stable: yes
//
// Good when the array is small or nearly sorted.

// Shift approach: one write per moved element, then drop `current` into the hole.
// Shift - 2 operations while swap 3 operations. More effective than Bubble but still O(n^2).
function insertionSort(nums) {
    const arr = [...nums];

    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;

        // Shift everything bigger than current one position to the right.
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = current;
    }

    return arr;
}

// Swap approach: bubble the new element left by swapping with its left neighbor
// until it sits next to something smaller or equal. Same algorithm, more swaps.
// Still stable if you only swap when arr[j - 1] > arr[j] (strictly greater).
function insertionSortBySwap(nums) {
    const arr = [...nums];

    for (let i = 1; i < arr.length; i++) {
        let j = i;

        // Поки ми не на початку масиву
        // І попередній елемент більший за поточний — міняємо їх місцями
        while (j > 0 && arr[j - 1] > arr[j]) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
            j--; // Рухаємось далі вліво
        }
    }

    return arr;
}

function insertionSortBySwap(nums) {
    const arr = [...nums];

    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0 && arr[j - 1] > arr[j]; j--) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
        }
    }

    return arr;
}

console.log(insertionSort([5, 3, 8, 4, 2]));         // [2, 3, 4, 5, 8]
console.log(insertionSortBySwap([5, 3, 8, 4, 2]));   // [2, 3, 4, 5, 8]
console.log(insertionSort([1, 2, 3, 4]));            // [1, 2, 3, 4]
console.log(insertionSortBySwap([1, 2, 3, 4]));      // [1, 2, 3, 4]
console.log(insertionSort([3, -1, 0, -1, 2]));       // [-1, -1, 0, 2, 3]
console.log(insertionSortBySwap([3, -1, 0, -1, 2])); // [-1, -1, 0, 2, 3]
