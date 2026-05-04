// Merge Sort
// Split the array in half, sort each half recursively, then merge the two
// sorted halves into one.
//
// Time: O(n log n) on every input.
// Space: O(n) for the temporary arrays.
// Stable: yes (we take from the left half on ties).

function mergeSort(nums) {
    if (nums.length <= 1) return [...nums];

    const mid = Math.floor(nums.length / 2);
    const left = mergeSort(nums.slice(0, mid));
    const right = mergeSort(nums.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }

    // One of these will be empty; the other still has the remaining sorted tail.
    while (i < left.length) result.push(left[i++]);
    while (j < right.length) result.push(right[j++]);

    return result;
}

console.log(mergeSort([5, 3, 8, 4, 2]));   // [2, 3, 4, 5, 8]
console.log(mergeSort([1, 2, 3, 4]));      // [1, 2, 3, 4]
console.log(mergeSort([3, -1, 0, -1, 2])); // [-1, -1, 0, 2, 3]
