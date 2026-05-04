// Selection Sort
// On each pass find the index of the smallest remaining element
// and swap it into the next sorted slot.
//
// Time: O(n^2) on every input (it never short-circuits).
// Space: O(1) extra (here O(n) because we copy the input)
// Stable: no (the swap can move equal elements past each other)

function selectionSort(nums) {
    const arr = [...nums];

    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}

console.log(selectionSort([5, 3, 8, 4, 2]));   // [2, 3, 4, 5, 8]
console.log(selectionSort([1, 2, 3, 4]));      // [1, 2, 3, 4]
console.log(selectionSort([3, -1, 0, -1, 2])); // [-1, -1, 0, 2, 3]
