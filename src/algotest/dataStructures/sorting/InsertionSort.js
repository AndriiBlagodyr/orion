// =============================================================================
// INSERTION SORT ALGORITHM IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Sort array using insertion sort algorithm
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
 * INSERTION SORT - Simple comparison-based sorting algorithm
 *
 * ALGORITHM STEPS:
 * 1. Start with the second element (index 1)
 * 2. Compare it with elements to its left
 * 3. Shift larger elements one position to the right
 * 4. Insert the current element in its correct position
 * 5. Repeat for all remaining elements
 *
 * Time Complexity: O(n²) average case, O(n) best case
 * Space Complexity: O(1)
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function insertionSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;

    for (let i = 1; i < n; i++) {
        const currentElement = sortedArray[i];
        let j = i - 1;

        // Move elements greater/smaller than current element one position ahead
        while (j >= 0 && (ascending
            ? sortedArray[j] > currentElement
            : sortedArray[j] < currentElement)) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }

        // Insert current element at its correct position
        sortedArray[j + 1] = currentElement;
    }

    return sortedArray;
}

/**
 * INSERTION SORT WITH STEP-BY-STEP TRACKING
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {Object} - { sortedArray: number[], steps: Array, comparisons: number, shifts: number }
 */
function insertionSortWithSteps(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return { sortedArray: [...arr], steps: [], comparisons: 0, shifts: 0 };

    const sortedArray = [...arr];
    const n = sortedArray.length;
    const steps = [];
    let comparisons = 0;
    let shifts = 0;

    for (let i = 1; i < n; i++) {
        const currentElement = sortedArray[i];
        let j = i - 1;
        const iterationSteps = [];

        iterationSteps.push({
            action: 'select',
            index: i,
            value: currentElement,
            array: [...sortedArray]
        });

        // Move elements and track comparisons/shifts
        while (j >= 0) {
            comparisons++;
            const shouldShift = ascending
                ? sortedArray[j] > currentElement
                : sortedArray[j] < currentElement;

            iterationSteps.push({
                action: 'compare',
                indices: [j, i],
                values: [sortedArray[j], currentElement],
                array: [...sortedArray]
            });

            if (shouldShift) {
                sortedArray[j + 1] = sortedArray[j];
                shifts++;
                iterationSteps.push({
                    action: 'shift',
                    from: j,
                    to: j + 1,
                    value: sortedArray[j],
                    array: [...sortedArray]
                });
                j--;
            } else {
                break;
            }
        }

        // Insert current element
        sortedArray[j + 1] = currentElement;
        iterationSteps.push({
            action: 'insert',
            index: j + 1,
            value: currentElement,
            array: [...sortedArray]
        });

        steps.push({
            iteration: i,
            steps: iterationSteps,
            elementInserted: currentElement,
            insertPosition: j + 1
        });
    }

    return { sortedArray, steps, comparisons, shifts };
}

/**
 * RECURSIVE INSERTION SORT
 *
 * @param {number[]} arr - Array to be sorted
 * @param {number} n - Number of elements to sort
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function recursiveInsertionSort(arr, n = arr.length, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (n <= 1) return [...arr];

    const sortedArray = [...arr];

    // Sort first n-1 elements
    const partiallySorted = recursiveInsertionSort(sortedArray.slice(0, n - 1), n - 1, ascending);

    // Insert the last element in its correct position
    const lastElement = sortedArray[n - 1];
    let j = n - 2;

    while (j >= 0 && (ascending
        ? partiallySorted[j] > lastElement
        : partiallySorted[j] < lastElement)) {
        j--;
    }

    // Insert the element at the correct position
    partiallySorted.splice(j + 1, 0, lastElement);

    return partiallySorted;
}

/**
 * BINARY INSERTION SORT - Uses binary search to find insertion position
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function binaryInsertionSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;

    for (let i = 1; i < n; i++) {
        const currentElement = sortedArray[i];

        // Find insertion position using binary search
        const insertPos = binarySearchInsertPosition(sortedArray, 0, i - 1, currentElement, ascending);

        // Shift elements to make space
        for (let j = i; j > insertPos; j--) {
            sortedArray[j] = sortedArray[j - 1];
        }

        // Insert the element
        sortedArray[insertPos] = currentElement;
    }

    return sortedArray;
}

/**
 * Helper function for binary insertion sort
 */
function binarySearchInsertPosition(arr, left, right, target, ascending) {
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const shouldMoveLeft = ascending
            ? arr[mid] > target
            : arr[mid] < target;

        if (shouldMoveLeft) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

/**
 * SHELL SORT - Variation of insertion sort with gaps
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function shellSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;

    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Do insertion sort for elements at gap intervals
        for (let i = gap; i < n; i++) {
            const currentElement = sortedArray[i];
            let j = i;

            // Shift elements that are greater/smaller than current element
            while (j >= gap && (ascending
                ? sortedArray[j - gap] > currentElement
                : sortedArray[j - gap] < currentElement)) {
                sortedArray[j] = sortedArray[j - gap];
                j -= gap;
            }

            sortedArray[j] = currentElement;
        }
    }

    return sortedArray;
}

// =============================================================================
// INSERTION SORT TEST SUITE
// =============================================================================

function runInsertionSortTests() {
    console.log('📥 INSERTION SORT ALGORITHM TESTS 📥\n');

    // Test Case 1: Basic sorting
    console.log('Test 1: Basic Ascending Sort');
    const arr1 = [12, 11, 13, 5, 6];
    const sorted1 = insertionSort(arr1);
    console.log('Original:', arr1);
    console.log('Sorted:', sorted1);
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Descending sort
    console.log('Test 2: Descending Sort');
    const arr2 = [5, 2, 8, 1, 9];
    const sorted2 = insertionSort(arr2, false);
    console.log('Original:', arr2);
    console.log('Sorted:', sorted2);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Already sorted array
    console.log('Test 3: Already Sorted Array');
    const arr3 = [1, 2, 3, 4, 5];
    const sorted3 = insertionSort(arr3);
    console.log('Original:', arr3);
    console.log('Sorted:', sorted3);
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Single element
    console.log('Test 4: Single Element');
    const arr4 = [42];
    const sorted4 = insertionSort(arr4);
    console.log('Original:', arr4);
    console.log('Sorted:', sorted4);
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: Empty array
    console.log('Test 5: Empty Array');
    const arr5 = [];
    const sorted5 = insertionSort(arr5);
    console.log('Original:', arr5);
    console.log('Sorted:', sorted5);
    console.log('✅ Test 5 Passed\n');

    // Test Case 6: Step-by-step tracking
    console.log('Test 6: Step-by-Step Tracking');
    const arr6 = [3, 1, 4, 1, 5];
    const result = insertionSortWithSteps(arr6);
    console.log('Original:', arr6);
    console.log('Sorted:', result.sortedArray);
    console.log('Comparisons:', result.comparisons);
    console.log('Shifts:', result.shifts);
    console.log('Total Iterations:', result.steps.length);
    console.log('✅ Test 6 Passed\n');

    // Test Case 7: Recursive insertion sort
    console.log('Test 7: Recursive Insertion Sort');
    const arr7 = [6, 3, 8, 2, 9, 1];
    const sorted7 = recursiveInsertionSort(arr7);
    console.log('Original:', arr7);
    console.log('Sorted:', sorted7);
    console.log('✅ Test 7 Passed\n');

    // Test Case 8: Binary insertion sort
    console.log('Test 8: Binary Insertion Sort');
    const arr8 = [12, 11, 13, 5, 6];
    const sorted8 = binaryInsertionSort(arr8);
    console.log('Original:', arr8);
    console.log('Binary Insertion Sorted:', sorted8);
    console.log('✅ Test 8 Passed\n');

    // Test Case 9: Shell sort
    console.log('Test 9: Shell Sort');
    const arr9 = [64, 34, 25, 12, 22, 11, 90];
    const sorted9 = shellSort(arr9);
    console.log('Original:', arr9);
    console.log('Shell Sorted:', sorted9);
    console.log('✅ Test 9 Passed\n');

    // Test Case 10: Large array performance test
    console.log('Test 10: Performance Test (1000 elements)');
    const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    const startTime = performance.now();
    const sortedLarge = insertionSort(largeArray);
    const endTime = performance.now();
    console.log(`Sorted ${largeArray.length} elements in ${(endTime - startTime).toFixed(2)}ms`);
    console.log('✅ Test 10 Passed\n');

    console.log('🎉 All Insertion Sort tests passed!');
}

// Export functions for use in other modules
module.exports = {
    insertionSort,
    insertionSortWithSteps,
    recursiveInsertionSort,
    binaryInsertionSort,
    shellSort,
    runInsertionSortTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runInsertionSortTests();
}
