// Radix Sort (LSD - Least Significant Digit first)
// Sort numbers digit by digit, from the rightmost digit to the leftmost.
// Each pass is a stable counting sort by one digit.
//
// Time: O(d * (n + b)) where d is the number of digits and b is the base (10).
// Space: O(n + b).
// Stable: yes (counting sort by digit is stable).
//
// This basic version handles non-negative integers only. For negatives,
// split the array into negatives and non-negatives, sort each, then combine.

function radixSort(nums) {
    if (nums.length <= 1) return [...nums];

    let arr = [...nums];
    const max = Math.max(...arr);

    // exp = 1, 10, 100, ... while there is still a digit at that position.
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        arr = countingSortByDigit(arr, exp);
    }

    return arr;
}

function countingSortByDigit(arr, exp) {
    const count = new Array(10).fill(0);
    const output = new Array(arr.length);

    for (const num of arr) {
        const digit = Math.floor(num / exp) % 10;
        count[digit]++;
    }

    // Cumulative counts: count[d] becomes the index right after the last d.
    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    // Walk the input from right to left to keep the sort stable.
    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]--;
        output[count[digit]] = arr[i];
    }

    return output;
}

console.log(radixSort([170, 45, 75, 90, 2, 802, 24, 66])); // [2, 24, 45, 66, 75, 90, 170, 802]
console.log(radixSort([1, 2, 3, 4]));                      // [1, 2, 3, 4]
console.log(radixSort([329, 457, 657, 839, 436]));         // [329, 436, 457, 657, 839]
