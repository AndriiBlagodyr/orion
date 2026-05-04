// Bubble Sort
// Repeatedly compare neighbors and swap them if they are in the wrong order.
//
// Time:
// - Best: O(n) when the array is already sorted and we use the swapped check
// - Average/Worst: O(n^2)
// Space: O(1) extra if sorting in place, O(n) here because we copy the array
// Stable: yes

function bubbleSort(nums) {
    const arr = [...nums]; // remove this line if you want to sort nums in place

    for (let i = 0; i < arr.length - 1; i++) {
        let swapped = false;

        // After every pass, the biggest remaining number is already at the end.
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // If we made no swaps, the array is already sorted.
        if (!swapped) break;
    }

    return arr;
}

console.log(bubbleSort([5, 3, 8, 4, 2]));     // [2, 3, 4, 5, 8]
console.log(bubbleSort([1, 2, 3, 4]));        // [1, 2, 3, 4]
console.log(bubbleSort([3, -1, 0, -1, 2]));   // [-1, -1, 0, 2, 3]
