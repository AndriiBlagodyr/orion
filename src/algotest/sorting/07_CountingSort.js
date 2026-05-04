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

function countingSort(nums) {
    if (nums.length <= 1) return [...nums];

    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const count = new Array(max - min + 1).fill(0);

    for (const num of nums) count[num - min]++;

    const result = [];
    for (let value = 0; value < count.length; value++) {
        for (let k = 0; k < count[value]; k++) {
            result.push(value + min);
        }
    }

    return result;
}

console.log(countingSort([4, 2, 2, 8, 3, 3, 1])); // [1, 2, 2, 3, 3, 4, 8]
console.log(countingSort([1, 2, 3, 4]));          // [1, 2, 3, 4]
console.log(countingSort([3, -1, 0, -1, 2]));     // [-1, -1, 0, 2, 3]
