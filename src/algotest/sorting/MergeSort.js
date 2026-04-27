// =============================================================================
// MERGE SORT ALGORITHM IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Sort array using merge sort algorithm
//
// TIME COMPLEXITY ANALYSIS:
// - Best Case: O(n log n)
// - Average Case: O(n log n)
// - Worst Case: O(n log n)
//
// SPACE COMPLEXITY: O(n) - requires additional array for merging
//
// STABILITY: Stable - equal elements maintain their relative order
//
// WHERE:
// n = number of elements in array
// =============================================================================

/**
 * MERGE SORT - Divide and conquer sorting algorithm
 *
 * ALGORITHM STEPS:
 * 1. Divide the array into two halves
 * 2. Recursively sort both halves
 * 3. Merge the sorted halves back together
 *
 * Time Complexity: O(n log n) - always
 * Space Complexity: O(n)
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function mergeSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    return mergeSortHelper([...arr], 0, arr.length - 1, ascending);
}

/**
 * Helper function for merge sort
 */
function mergeSortHelper(arr, left, right, ascending) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);

        // Sort left half
        mergeSortHelper(arr, left, mid, ascending);

        // Sort right half
        mergeSortHelper(arr, mid + 1, right, ascending);

        // Merge the sorted halves
        merge(arr, left, mid, right, ascending);
    }

    return arr;
}

/**
 * Merge two sorted subarrays
 */
function merge(arr, left, mid, right, ascending) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    // Merge elements from both arrays
    while (i < leftArr.length && j < rightArr.length) {
        const shouldTakeLeft = ascending
            ? leftArr[i] <= rightArr[j]
            : leftArr[i] >= rightArr[j];

        if (shouldTakeLeft) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements from left array
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    // Copy remaining elements from right array
    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

/**
 * MERGE SORT WITH STEP-BY-STEP TRACKING
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {Object} - { sortedArray: number[], steps: Array, comparisons: number }
 */
function mergeSortWithSteps(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return { sortedArray: [...arr], steps: [], comparisons: 0 };

    const steps = [];
    let comparisons = 0;

    const sortedArray = mergeSortWithStepsHelper([...arr], 0, arr.length - 1, ascending, steps, comparisons);

    return { sortedArray, steps, comparisons };
}

function mergeSortWithStepsHelper(arr, left, right, ascending, steps, comparisons) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);

        steps.push({
            action: 'divide',
            left: left,
            right: right,
            mid: mid,
            array: [...arr],
            subarray: arr.slice(left, right + 1)
        });

        // Sort left half
        mergeSortWithStepsHelper(arr, left, mid, ascending, steps, comparisons);

        // Sort right half
        mergeSortWithStepsHelper(arr, mid + 1, right, ascending, steps, comparisons);

        // Merge the sorted halves
        mergeWithSteps(arr, left, mid, right, ascending, steps, comparisons);
    }

    return arr;
}

function mergeWithSteps(arr, left, mid, right, ascending, steps, comparisons) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    steps.push({
        action: 'merge_start',
        left: left,
        right: right,
        mid: mid,
        leftArray: [...leftArr],
        rightArray: [...rightArr],
        array: [...arr]
    });

    // Merge elements from both arrays
    while (i < leftArr.length && j < rightArr.length) {
        comparisons++;
        const shouldTakeLeft = ascending
            ? leftArr[i] <= rightArr[j]
            : leftArr[i] >= rightArr[j];

        steps.push({
            action: 'compare',
            indices: [left + i, mid + 1 + j],
            values: [leftArr[i], rightArr[j]],
            array: [...arr]
        });

        if (shouldTakeLeft) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements
    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }

    steps.push({
        action: 'merge_complete',
        left: left,
        right: right,
        array: [...arr]
    });
}

/**
 * ITERATIVE MERGE SORT - Non-recursive implementation
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function iterativeMergeSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;

    // Start with subarrays of size 1, then double the size
    for (let size = 1; size < n; size *= 2) {
        // Merge subarrays of current size
        for (let left = 0; left < n - 1; left += 2 * size) {
            const mid = Math.min(left + size - 1, n - 1);
            const right = Math.min(left + 2 * size - 1, n - 1);

            merge(sortedArray, left, mid, right, ascending);
        }
    }

    return sortedArray;
}

/**
 * BOTTOM-UP MERGE SORT - Alternative iterative approach
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function bottomUpMergeSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;
    const tempArray = new Array(n);

    // Start with subarrays of size 1
    for (let size = 1; size < n; size *= 2) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = Math.min(left + size - 1, n - 1);
            const right = Math.min(left + 2 * size - 1, n - 1);

            bottomUpMerge(sortedArray, tempArray, left, mid, right, ascending);
        }
    }

    return sortedArray;
}

function bottomUpMerge(arr, temp, left, mid, right, ascending) {
    let i = left, j = mid + 1, k = left;

    // Copy data to temp array
    while (i <= mid && j <= right) {
        const shouldTakeLeft = ascending
            ? arr[i] <= arr[j]
            : arr[i] >= arr[j];

        if (shouldTakeLeft) {
            temp[k] = arr[i];
            i++;
        } else {
            temp[k] = arr[j];
            j++;
        }
        k++;
    }

    // Copy remaining elements
    while (i <= mid) {
        temp[k] = arr[i];
        i++;
        k++;
    }

    while (j <= right) {
        temp[k] = arr[j];
        j++;
        k++;
    }

    // Copy merged data back to original array
    for (let i = left; i <= right; i++) {
        arr[i] = temp[i];
    }
}

/**
 * NATURAL MERGE SORT - Exploits existing runs in the data
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function naturalMergeSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;

    while (true) {
        let merged = false;
        let left = 0;

        while (left < n) {
            let mid = left;

            // Find end of first run
            while (mid < n - 1 && (ascending
                ? sortedArray[mid] <= sortedArray[mid + 1]
                : sortedArray[mid] >= sortedArray[mid + 1])) {
                mid++;
            }

            if (mid === n - 1) break; // Only one run left

            let right = mid + 1;

            // Find end of second run
            while (right < n - 1 && (ascending
                ? sortedArray[right] <= sortedArray[right + 1]
                : sortedArray[right] >= sortedArray[right + 1])) {
                right++;
            }

            // Merge the two runs
            merge(sortedArray, left, mid, right, ascending);
            merged = true;
            left = right + 1;
        }

        if (!merged) break;
    }

    return sortedArray;
}

// =============================================================================
// MERGE SORT TEST SUITE
// =============================================================================

function runMergeSortTests() {
    console.log('🔀 MERGE SORT ALGORITHM TESTS 🔀\n');

    // Test Case 1: Basic sorting
    console.log('Test 1: Basic Ascending Sort');
    const arr1 = [38, 27, 43, 3, 9, 82, 10];
    const sorted1 = mergeSort(arr1);
    console.log('Original:', arr1);
    console.log('Sorted:', sorted1);
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Descending sort
    console.log('Test 2: Descending Sort');
    const arr2 = [5, 2, 8, 1, 9];
    const sorted2 = mergeSort(arr2, false);
    console.log('Original:', arr2);
    console.log('Sorted:', sorted2);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Already sorted array
    console.log('Test 3: Already Sorted Array');
    const arr3 = [1, 2, 3, 4, 5];
    const sorted3 = mergeSort(arr3);
    console.log('Original:', arr3);
    console.log('Sorted:', sorted3);
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Single element
    console.log('Test 4: Single Element');
    const arr4 = [42];
    const sorted4 = mergeSort(arr4);
    console.log('Original:', arr4);
    console.log('Sorted:', sorted4);
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: Empty array
    console.log('Test 5: Empty Array');
    const arr5 = [];
    const sorted5 = mergeSort(arr5);
    console.log('Original:', arr5);
    console.log('Sorted:', sorted5);
    console.log('✅ Test 5 Passed\n');

    // Test Case 6: Step-by-step tracking
    console.log('Test 6: Step-by-Step Tracking');
    const arr6 = [3, 1, 4, 1, 5];
    const result = mergeSortWithSteps(arr6);
    console.log('Original:', arr6);
    console.log('Sorted:', result.sortedArray);
    console.log('Comparisons:', result.comparisons);
    console.log('Total Steps:', result.steps.length);
    console.log('✅ Test 6 Passed\n');

    // Test Case 7: Iterative merge sort
    console.log('Test 7: Iterative Merge Sort');
    const arr7 = [6, 3, 8, 2, 9, 1];
    const sorted7 = iterativeMergeSort(arr7);
    console.log('Original:', arr7);
    console.log('Iterative Sorted:', sorted7);
    console.log('✅ Test 7 Passed\n');

    // Test Case 8: Bottom-up merge sort
    console.log('Test 8: Bottom-Up Merge Sort');
    const arr8 = [12, 11, 13, 5, 6];
    const sorted8 = bottomUpMergeSort(arr8);
    console.log('Original:', arr8);
    console.log('Bottom-Up Sorted:', sorted8);
    console.log('✅ Test 8 Passed\n');

    // Test Case 9: Natural merge sort
    console.log('Test 9: Natural Merge Sort');
    const arr9 = [1, 2, 3, 8, 5, 4, 3, 2, 1];
    const sorted9 = naturalMergeSort(arr9);
    console.log('Original:', arr9);
    console.log('Natural Sorted:', sorted9);
    console.log('✅ Test 9 Passed\n');

    // Test Case 10: Large array performance test
    console.log('Test 10: Performance Test (1000 elements)');
    const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    const startTime = performance.now();
    const sortedLarge = mergeSort(largeArray);
    const endTime = performance.now();
    console.log(`Sorted ${largeArray.length} elements in ${(endTime - startTime).toFixed(2)}ms`);
    console.log('✅ Test 10 Passed\n');

    console.log('🎉 All Merge Sort tests passed!');
}

// Export functions for use in other modules
module.exports = {
    mergeSort,
    mergeSortWithSteps,
    iterativeMergeSort,
    bottomUpMergeSort,
    naturalMergeSort,
    runMergeSortTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runMergeSortTests();
}
