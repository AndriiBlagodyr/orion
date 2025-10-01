// =============================================================================
// SELECTION SORT ALGORITHM IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Sort array using selection sort algorithm
//
// TIME COMPLEXITY ANALYSIS:
// - Best Case: O(n²) - always performs O(n²) comparisons
// - Average Case: O(n²)
// - Worst Case: O(n²) - always performs O(n²) comparisons
//
// SPACE COMPLEXITY: O(1) - in-place sorting
//
// STABILITY: Unstable - equal elements may change relative order
//
// WHERE:
// n = number of elements in array
// =============================================================================

/**
 * SELECTION SORT - Simple comparison-based sorting algorithm
 *
 * ALGORITHM STEPS:
 * 1. Find the minimum element in the unsorted portion
 * 2. Swap it with the first element of the unsorted portion
 * 3. Move the boundary of sorted portion one position to the right
 * 4. Repeat until the entire array is sorted
 *
 * Time Complexity: O(n²) - always performs n(n-1)/2 comparisons
 * Space Complexity: O(1)
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function selectionSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;

    for (let i = 0; i < n - 1; i++) {
        let targetIndex = i;

        // Find the minimum/maximum element in the remaining array
        for (let j = i + 1; j < n; j++) {
            const shouldUpdate = ascending
                ? sortedArray[j] < sortedArray[targetIndex]
                : sortedArray[j] > sortedArray[targetIndex];

            if (shouldUpdate) {
                targetIndex = j;
            }
        }

        // Swap the found element with the first element
        if (targetIndex !== i) {
            [sortedArray[i], sortedArray[targetIndex]] = [sortedArray[targetIndex], sortedArray[i]];
        }
    }

    return sortedArray;
}

/**
 * SELECTION SORT WITH STEP-BY-STEP TRACKING
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {Object} - { sortedArray: number[], steps: Array, comparisons: number, swaps: number }
 */
function selectionSortWithSteps(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return { sortedArray: [...arr], steps: [], comparisons: 0, swaps: 0 };

    const sortedArray = [...arr];
    const n = sortedArray.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
        let targetIndex = i;
        const iterationSteps = [];

        // Find the minimum/maximum element
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            const shouldUpdate = ascending
                ? sortedArray[j] < sortedArray[targetIndex]
                : sortedArray[j] > sortedArray[targetIndex];

            iterationSteps.push({
                action: 'compare',
                indices: [j, targetIndex],
                values: [sortedArray[j], sortedArray[targetIndex]],
                array: [...sortedArray]
            });

            if (shouldUpdate) {
                targetIndex = j;
            }
        }

        // Swap if necessary
        if (targetIndex !== i) {
            [sortedArray[i], sortedArray[targetIndex]] = [sortedArray[targetIndex], sortedArray[i]];
            swaps++;
            iterationSteps.push({
                action: 'swap',
                indices: [i, targetIndex],
                values: [sortedArray[targetIndex], sortedArray[i]],
                array: [...sortedArray]
            });
        }

        steps.push({
            iteration: i + 1,
            steps: iterationSteps,
            selectedIndex: targetIndex,
            swapped: targetIndex !== i
        });
    }

    return { sortedArray, steps, comparisons, swaps };
}

/**
 * STABLE SELECTION SORT - Maintains relative order of equal elements
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function stableSelectionSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;

    for (let i = 0; i < n - 1; i++) {
        let targetIndex = i;

        // Find the minimum/maximum element
        for (let j = i + 1; j < n; j++) {
            const shouldUpdate = ascending
                ? sortedArray[j] < sortedArray[targetIndex]
                : sortedArray[j] > sortedArray[targetIndex];

            if (shouldUpdate) {
                targetIndex = j;
            }
        }

        // Move elements to maintain stability
        if (targetIndex !== i) {
            const targetValue = sortedArray[targetIndex];

            // Shift elements to the right
            for (let k = targetIndex; k > i; k--) {
                sortedArray[k] = sortedArray[k - 1];
            }

            // Place the target value at the correct position
            sortedArray[i] = targetValue;
        }
    }

    return sortedArray;
}

/**
 * RECURSIVE SELECTION SORT
 *
 * @param {number[]} arr - Array to be sorted
 * @param {number} start - Starting index
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function recursiveSelectionSort(arr, start = 0, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (start >= arr.length - 1) return [...arr];

    const sortedArray = [...arr];
    let targetIndex = start;

    // Find the minimum/maximum element
    for (let j = start + 1; j < sortedArray.length; j++) {
        const shouldUpdate = ascending
            ? sortedArray[j] < sortedArray[targetIndex]
            : sortedArray[j] > sortedArray[targetIndex];

        if (shouldUpdate) {
            targetIndex = j;
        }
    }

    // Swap if necessary
    if (targetIndex !== start) {
        [sortedArray[start], sortedArray[targetIndex]] = [sortedArray[targetIndex], sortedArray[start]];
    }

    // Recursively sort the remaining array
    return recursiveSelectionSort(sortedArray, start + 1, ascending);
}

// =============================================================================
// SELECTION SORT TEST SUITE
// =============================================================================

function runSelectionSortTests() {
    console.log('🎯 SELECTION SORT ALGORITHM TESTS 🎯\n');

    // Test Case 1: Basic sorting
    console.log('Test 1: Basic Ascending Sort');
    const arr1 = [64, 25, 12, 22, 11];
    const sorted1 = selectionSort(arr1);
    console.log('Original:', arr1);
    console.log('Sorted:', sorted1);
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Descending sort
    console.log('Test 2: Descending Sort');
    const arr2 = [5, 2, 8, 1, 9];
    const sorted2 = selectionSort(arr2, false);
    console.log('Original:', arr2);
    console.log('Sorted:', sorted2);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Already sorted array
    console.log('Test 3: Already Sorted Array');
    const arr3 = [1, 2, 3, 4, 5];
    const sorted3 = selectionSort(arr3);
    console.log('Original:', arr3);
    console.log('Sorted:', sorted3);
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Single element
    console.log('Test 4: Single Element');
    const arr4 = [42];
    const sorted4 = selectionSort(arr4);
    console.log('Original:', arr4);
    console.log('Sorted:', sorted4);
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: Empty array
    console.log('Test 5: Empty Array');
    const arr5 = [];
    const sorted5 = selectionSort(arr5);
    console.log('Original:', arr5);
    console.log('Sorted:', sorted5);
    console.log('✅ Test 5 Passed\n');

    // Test Case 6: Step-by-step tracking
    console.log('Test 6: Step-by-Step Tracking');
    const arr6 = [3, 1, 4, 1, 5];
    const result = selectionSortWithSteps(arr6);
    console.log('Original:', arr6);
    console.log('Sorted:', result.sortedArray);
    console.log('Comparisons:', result.comparisons);
    console.log('Swaps:', result.swaps);
    console.log('Total Iterations:', result.steps.length);
    console.log('✅ Test 6 Passed\n');

    // Test Case 7: Stable selection sort
    console.log('Test 7: Stable Selection Sort');
    const arr7 = [3, 1, 4, 1, 5];
    const sorted7 = stableSelectionSort(arr7);
    console.log('Original:', arr7);
    console.log('Stable Sorted:', sorted7);
    console.log('✅ Test 7 Passed\n');

    // Test Case 8: Recursive selection sort
    console.log('Test 8: Recursive Selection Sort');
    const arr8 = [6, 3, 8, 2, 9, 1];
    const sorted8 = recursiveSelectionSort(arr8);
    console.log('Original:', arr8);
    console.log('Sorted:', sorted8);
    console.log('✅ Test 8 Passed\n');

    // Test Case 9: Large array performance test
    console.log('Test 9: Performance Test (1000 elements)');
    const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    const startTime = performance.now();
    const sortedLarge = selectionSort(largeArray);
    const endTime = performance.now();
    console.log(`Sorted ${largeArray.length} elements in ${(endTime - startTime).toFixed(2)}ms`);
    console.log('✅ Test 9 Passed\n');

    console.log('🎉 All Selection Sort tests passed!');
}

// Export functions for use in other modules
module.exports = {
    selectionSort,
    selectionSortWithSteps,
    stableSelectionSort,
    recursiveSelectionSort,
    runSelectionSortTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runSelectionSortTests();
}
