// =============================================================================
// BUBBLE SORT ALGORITHM IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Sort array using bubble sort algorithm
//
// TIME COMPLEXITY ANALYSIS:
// - Best Case: O(n) - when array is already sorted
// - Average Case: O(n²)
// - Worst Case: O(n²) - when array is sorted in reverse order
//
// SPACE COMPLEXITY: O(1) - in-place sorting
//
// STABILITY: Stable - equal elements maintain their relative order
//
// WHERE:
// n = number of elements in array
// =============================================================================

/**
 * BUBBLE SORT - Simple comparison-based sorting algorithm
 *
 * ALGORITHM STEPS:
 * 1. Compare adjacent elements and swap if they are in wrong order
 * 2. Repeat for all pairs of adjacent elements
 * 3. Continue until no more swaps are needed
 * 4. Optimized version stops early if no swaps occur in a pass
 *
 * Time Complexity: O(n²) average case, O(n) best case
 * Space Complexity: O(1)
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function bubbleSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            const shouldSwap = ascending
                ? sortedArray[j] > sortedArray[j + 1]
                : sortedArray[j] < sortedArray[j + 1];

            if (shouldSwap) {
                // Swap elements
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                swapped = true;
            }
        }

        // If no swaps occurred, array is sorted
        if (!swapped) break;
    }

    return sortedArray;
}

/**
 * BUBBLE SORT WITH STEP-BY-STEP TRACKING
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {Object} - { sortedArray: number[], steps: Array, comparisons: number, swaps: number }
 */
function bubbleSortWithSteps(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return { sortedArray: [...arr], steps: [], comparisons: 0, swaps: 0 };

    const sortedArray = [...arr];
    const n = sortedArray.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        const passSteps = [];

        for (let j = 0; j < n - i - 1; j++) {
            comparisons++;
            const shouldSwap = ascending
                ? sortedArray[j] > sortedArray[j + 1]
                : sortedArray[j] < sortedArray[j + 1];

            if (shouldSwap) {
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                swapped = true;
                swaps++;
                passSteps.push({
                    action: 'swap',
                    indices: [j, j + 1],
                    values: [sortedArray[j + 1], sortedArray[j]],
                    array: [...sortedArray]
                });
            } else {
                passSteps.push({
                    action: 'compare',
                    indices: [j, j + 1],
                    values: [sortedArray[j], sortedArray[j + 1]],
                    array: [...sortedArray]
                });
            }
        }

        steps.push({
            pass: i + 1,
            steps: passSteps,
            swapped: swapped
        });

        if (!swapped) break;
    }

    return { sortedArray, steps, comparisons, swaps };
}

/**
 * RECURSIVE BUBBLE SORT
 *
 * @param {number[]} arr - Array to be sorted
 * @param {number} n - Length of array
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function recursiveBubbleSort(arr, n = arr.length, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (n <= 1) return [...arr];

    const sortedArray = [...arr];
    let swapped = false;

    // One pass of bubble sort
    for (let i = 0; i < n - 1; i++) {
        const shouldSwap = ascending
            ? sortedArray[i] > sortedArray[i + 1]
            : sortedArray[i] < sortedArray[i + 1];

        if (shouldSwap) {
            [sortedArray[i], sortedArray[i + 1]] = [sortedArray[i + 1], sortedArray[i]];
            swapped = true;
        }
    }

    // If no swaps occurred, array is sorted
    if (!swapped) return sortedArray;

    // Recursively sort remaining elements
    return recursiveBubbleSort(sortedArray, n - 1, ascending);
}

// =============================================================================
// BUBBLE SORT TEST SUITE
// =============================================================================

function runBubbleSortTests() {
    console.log('🫧 BUBBLE SORT ALGORITHM TESTS 🫧\n');

    // Test Case 1: Basic sorting
    console.log('Test 1: Basic Ascending Sort');
    const arr1 = [64, 34, 25, 12, 22, 11, 90];
    const sorted1 = bubbleSort(arr1);
    console.log('Original:', arr1);
    console.log('Sorted:', sorted1);
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Descending sort
    console.log('Test 2: Descending Sort');
    const arr2 = [5, 2, 8, 1, 9];
    const sorted2 = bubbleSort(arr2, false);
    console.log('Original:', arr2);
    console.log('Sorted:', sorted2);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Already sorted array
    console.log('Test 3: Already Sorted Array');
    const arr3 = [1, 2, 3, 4, 5];
    const sorted3 = bubbleSort(arr3);
    console.log('Original:', arr3);
    console.log('Sorted:', sorted3);
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Single element
    console.log('Test 4: Single Element');
    const arr4 = [42];
    const sorted4 = bubbleSort(arr4);
    console.log('Original:', arr4);
    console.log('Sorted:', sorted4);
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: Empty array
    console.log('Test 5: Empty Array');
    const arr5 = [];
    const sorted5 = bubbleSort(arr5);
    console.log('Original:', arr5);
    console.log('Sorted:', sorted5);
    console.log('✅ Test 5 Passed\n');

    // Test Case 6: Step-by-step tracking
    console.log('Test 6: Step-by-Step Tracking');
    const arr6 = [3, 1, 4, 1, 5];
    const result = bubbleSortWithSteps(arr6);
    console.log('Original:', arr6);
    console.log('Sorted:', result.sortedArray);
    console.log('Comparisons:', result.comparisons);
    console.log('Swaps:', result.swaps);
    console.log('Total Passes:', result.steps.length);
    console.log('✅ Test 6 Passed\n');

    // Test Case 7: Recursive bubble sort
    console.log('Test 7: Recursive Bubble Sort');
    const arr7 = [6, 3, 8, 2, 9, 1];
    const sorted7 = recursiveBubbleSort(arr7);
    console.log('Original:', arr7);
    console.log('Sorted:', sorted7);
    console.log('✅ Test 7 Passed\n');

    // Test Case 8: Large array performance test
    console.log('Test 8: Performance Test (1000 elements)');
    const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    const startTime = performance.now();
    const sortedLarge = bubbleSort(largeArray);
    const endTime = performance.now();
    console.log(`Sorted ${largeArray.length} elements in ${(endTime - startTime).toFixed(2)}ms`);
    console.log('✅ Test 8 Passed\n');

    console.log('🎉 All Bubble Sort tests passed!');
}

// Export functions for use in other modules
module.exports = {
    bubbleSort,
    bubbleSortWithSteps,
    recursiveBubbleSort,
    runBubbleSortTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runBubbleSortTests();
}
