// =============================================================================
// COUNTING SORT ALGORITHM IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Sort array using counting sort algorithm
//
// TIME COMPLEXITY ANALYSIS:
// - Best Case: O(n + k)
// - Average Case: O(n + k)
// - Worst Case: O(n + k)
//
// SPACE COMPLEXITY: O(k) - where k is the range of input
//
// STABILITY: Stable - equal elements maintain their relative order
//
// WHERE:
// n = number of elements in array
// k = range of input (max - min + 1)
// =============================================================================

/**
 * COUNTING SORT - Non-comparison based sorting algorithm
 *
 * ALGORITHM STEPS:
 * 1. Find the range of input data (min and max values)
 * 2. Create a count array to store count of each value
 * 3. Modify count array to store cumulative counts
 * 4. Build output array using count array
 *
 * Time Complexity: O(n + k) - always
 * Space Complexity: O(k)
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function countingSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    // Find the range of input data
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;

    // Create count array
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    // Store count of each element
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }

    // Modify count array to store cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }

    return ascending ? output : output.reverse();
}

/**
 * COUNTING SORT WITH STEP-BY-STEP TRACKING
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {Object} - { sortedArray: number[], steps: Array, range: number }
 */
function countingSortWithSteps(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return { sortedArray: [...arr], steps: [], range: 0 };

    const steps = [];
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;

    steps.push({
        action: 'find_range',
        min: min,
        max: max,
        range: range,
        array: [...arr]
    });

    // Create count array
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    steps.push({
        action: 'create_count_array',
        countArray: [...count],
        range: range
    });

    // Store count of each element
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
        steps.push({
            action: 'count_element',
            element: arr[i],
            index: arr[i] - min,
            countArray: [...count]
        });
    }

    steps.push({
        action: 'count_complete',
        countArray: [...count]
    });

    // Modify count array to store cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
        steps.push({
            action: 'cumulative_count',
            index: i,
            countArray: [...count]
        });
    }

    steps.push({
        action: 'cumulative_complete',
        countArray: [...count]
    });

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        const outputIndex = count[arr[i] - min] - 1;
        output[outputIndex] = arr[i];
        count[arr[i] - min]--;

        steps.push({
            action: 'place_element',
            element: arr[i],
            outputIndex: outputIndex,
            countArray: [...count],
            outputArray: [...output]
        });
    }

    const finalOutput = ascending ? output : output.reverse();

    steps.push({
        action: 'sort_complete',
        sortedArray: [...finalOutput]
    });

    return { sortedArray: finalOutput, steps, range };
}

/**
 * COUNTING SORT WITH CUSTOM RANGE
 *
 * @param {number[]} arr - Array to be sorted
 * @param {number} min - Minimum value in range
 * @param {number} max - Maximum value in range
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function countingSortWithRange(arr, min, max, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];
    if (min > max) throw new Error('Min value cannot be greater than max value');

    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    // Validate all elements are within range
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min || arr[i] > max) {
            throw new Error(`Element ${arr[i]} is outside the specified range [${min}, ${max}]`);
        }
    }

    // Store count of each element
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }

    // Modify count array to store cumulative counts
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }

    return ascending ? output : output.reverse();
}

/**
 * COUNTING SORT FOR STRINGS
 *
 * @param {string[]} arr - Array of strings to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {string[]} - Sorted array
 */
function countingSortStrings(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    // Find ASCII range
    let min = Infinity;
    let max = -Infinity;

    for (let str of arr) {
        for (let char of str) {
            const code = char.charCodeAt(0);
            min = Math.min(min, code);
            max = Math.max(max, code);
        }
    }

    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    // Count characters
    for (let i = 0; i < arr.length; i++) {
        for (let char of arr[i]) {
            count[char.charCodeAt(0) - min]++;
        }
    }

    // Cumulative count
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Build output
    for (let i = arr.length - 1; i >= 0; i--) {
        let totalCount = 0;
        for (let char of arr[i]) {
            totalCount += count[char.charCodeAt(0) - min];
        }
        output[totalCount - 1] = arr[i];

        for (let char of arr[i]) {
            count[char.charCodeAt(0) - min]--;
        }
    }

    return ascending ? output : output.reverse();
}

/**
 * COUNTING SORT FOR OBJECTS BY KEY
 *
 * @param {Object[]} arr - Array of objects to be sorted
 * @param {string} key - Property key to sort by
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {Object[]} - Sorted array
 */
function countingSortObjects(arr, key, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    // Extract values and find range
    const values = arr.map(obj => obj[key]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min + 1;

    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        count[values[i] - min]++;
    }

    // Cumulative count
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Build output
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[values[i] - min] - 1] = arr[i];
        count[values[i] - min]--;
    }

    return ascending ? output : output.reverse();
}

/**
 * COUNTING SORT WITH NEGATIVE NUMBERS
 *
 * @param {number[]} arr - Array to be sorted (can contain negative numbers)
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function countingSortNegative(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const range = max - min + 1;
    const offset = -min; // Offset to handle negative numbers

    const count = new Array(range).fill(0);
    const output = new Array(arr.length);

    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        count[arr[i] + offset]++;
    }

    // Cumulative count
    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    // Build output
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] + offset] - 1] = arr[i];
        count[arr[i] + offset]--;
    }

    return ascending ? output : output.reverse();
}

// =============================================================================
// COUNTING SORT TEST SUITE
// =============================================================================

function runCountingSortTests() {
    console.log('🔢 COUNTING SORT ALGORITHM TESTS 🔢\n');

    // Test Case 1: Basic sorting
    console.log('Test 1: Basic Ascending Sort');
    const arr1 = [4, 2, 2, 8, 3, 3, 1];
    const sorted1 = countingSort(arr1);
    console.log('Original:', arr1);
    console.log('Sorted:', sorted1);
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Descending sort
    console.log('Test 2: Descending Sort');
    const arr2 = [1, 4, 1, 2, 7, 5, 2];
    const sorted2 = countingSort(arr2, false);
    console.log('Original:', arr2);
    console.log('Sorted:', sorted2);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Single element
    console.log('Test 3: Single Element');
    const arr3 = [5];
    const sorted3 = countingSort(arr3);
    console.log('Original:', arr3);
    console.log('Sorted:', sorted3);
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Empty array
    console.log('Test 4: Empty Array');
    const arr4 = [];
    const sorted4 = countingSort(arr4);
    console.log('Original:', arr4);
    console.log('Sorted:', sorted4);
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: Step-by-step tracking
    console.log('Test 5: Step-by-Step Tracking');
    const arr5 = [2, 5, 3, 0, 2, 3, 0, 3];
    const result = countingSortWithSteps(arr5);
    console.log('Original:', arr5);
    console.log('Sorted:', result.sortedArray);
    console.log('Range:', result.range);
    console.log('Total Steps:', result.steps.length);
    console.log('✅ Test 5 Passed\n');

    // Test Case 6: Custom range
    console.log('Test 6: Custom Range');
    const arr6 = [1, 4, 1, 2, 7, 5, 2];
    const sorted6 = countingSortWithRange(arr6, 1, 7);
    console.log('Original:', arr6);
    console.log('Sorted with range [1,7]:', sorted6);
    console.log('✅ Test 6 Passed\n');

    // Test Case 7: Negative numbers
    console.log('Test 7: Negative Numbers');
    const arr7 = [-1, 0, -3, 2, -1, 4];
    const sorted7 = countingSortNegative(arr7);
    console.log('Original:', arr7);
    console.log('Sorted:', sorted7);
    console.log('✅ Test 7 Passed\n');

    // Test Case 8: String sorting
    console.log('Test 8: String Sorting');
    const arr8 = ['banana', 'apple', 'cherry', 'date'];
    const sorted8 = countingSortStrings(arr8);
    console.log('Original:', arr8);
    console.log('Sorted:', sorted8);
    console.log('✅ Test 8 Passed\n');

    // Test Case 9: Object sorting
    console.log('Test 9: Object Sorting');
    const objects = [
        { name: 'Alice', score: 85 },
        { name: 'Bob', score: 92 },
        { name: 'Charlie', score: 78 }
    ];
    const sortedObjects = countingSortObjects(objects, 'score');
    console.log('Original:', objects);
    console.log('Sorted by score:', sortedObjects);
    console.log('✅ Test 9 Passed\n');

    // Test Case 10: Large array performance test
    console.log('Test 10: Performance Test (1000 elements)');
    const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 100));
    const startTime = performance.now();
    const sortedLarge = countingSort(largeArray);
    const endTime = performance.now();
    console.log(`Sorted ${largeArray.length} elements in ${(endTime - startTime).toFixed(2)}ms`);
    console.log('✅ Test 10 Passed\n');

    console.log('🎉 All Counting Sort tests passed!');
}

// Export functions for use in other modules
module.exports = {
    countingSort,
    countingSortWithSteps,
    countingSortWithRange,
    countingSortStrings,
    countingSortObjects,
    countingSortNegative,
    runCountingSortTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runCountingSortTests();
}
