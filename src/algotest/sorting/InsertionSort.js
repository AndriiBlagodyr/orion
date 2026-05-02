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

console.log(insertionSort([5, 3, 8, 4, 2]));   // [2, 3, 4, 5, 8]
console.log(insertionSort([1, 2, 3, 4]));      // [1, 2, 3, 4]
console.log(insertionSort([3, -1, 0, -1, 2])); // [-1, -1, 0, 2, 3]
