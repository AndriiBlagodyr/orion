// Counting Sort
// Non-comparison sort. Count how many times each value appears,
// then write the values back in order.
//
// Time: O(n + k) where k is (max - min + 1).
// Space: O(n + k) for the count and output arrays.
// Stable: yes when we walk the input from right to left while writing the output.
//
// Use it only when k is small compared to n. Great for small integer ranges
// (e.g. ages, scores 0..100). Bad when values can be huge or floating point.

function countSort(array) {
    if (array.length <= 1) return [...array];

    const min = Math.min(...array);
    const max = Math.max(...array);

    const count = new Array(max - min + 1).fill(0);

    // Count frequencies
    for (const num of array) {
        count[num - min]++;
    }

    const res = [];

    // Reconstruct sorted array
    for (let i = 0; i < count.length; i++) {
        for (let j = 0; j < count[i]; j++) {
            res.push(i + min);
        }
    }

    return res;
}

console.log(countingSort([4, 2, 2, 8, 3, 3, 1])); // [1, 2, 2, 3, 3, 4, 8]
console.log(countingSort([1, 2, 3, 4]));          // [1, 2, 3, 4]
console.log(countingSort([3, -1, 0, -1, 2]));     // [-1, -1, 0, 2, 3]
