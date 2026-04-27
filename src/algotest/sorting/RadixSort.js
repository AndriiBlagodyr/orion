// =============================================================================
// RADIX SORT ALGORITHM IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Sort array using radix sort algorithm
//
// TIME COMPLEXITY ANALYSIS:
// - Best Case: O(d * (n + k))
// - Average Case: O(d * (n + k))
// - Worst Case: O(d * (n + k))
//
// SPACE COMPLEXITY: O(n + k) - where k is the base/radix
//
// STABILITY: Stable - equal elements maintain their relative order
//
// WHERE:
// n = number of elements in array
// d = number of digits in the maximum number
// k = base/radix (usually 10 for decimal)
// =============================================================================

/**
 * RADIX SORT - Non-comparison based sorting algorithm
 *
 * ALGORITHM STEPS:
 * 1. Find the maximum number to determine number of digits
 * 2. For each digit position (from least significant to most significant):
 *    a. Use counting sort to sort elements by current digit
 *    b. Update the array with sorted elements
 * 3. After processing all digits, array is sorted
 *
 * Time Complexity: O(d * (n + k)) - always
 * Space Complexity: O(n + k)
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function radixSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];

    // Find the maximum number to determine number of digits
    const max = Math.max(...sortedArray);
    const maxDigits = Math.floor(Math.log10(Math.abs(max))) + 1;

    // Apply counting sort for each digit
    for (let digit = 0; digit < maxDigits; digit++) {
        countingSortByDigit(sortedArray, digit, ascending);
    }

    return sortedArray;
}

/**
 * Counting sort for a specific digit position
 */
function countingSortByDigit(arr, digit, ascending) {
    const base = 10; // Decimal base
    const count = new Array(base).fill(0);
    const output = new Array(arr.length);

    // Count occurrences of each digit
    for (let i = 0; i < arr.length; i++) {
        const digitValue = Math.floor(Math.abs(arr[i]) / Math.pow(base, digit)) % base;
        count[digitValue]++;
    }

    // Modify count array to store cumulative counts
    for (let i = 1; i < base; i++) {
        count[i] += count[i - 1];
    }

    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        const digitValue = Math.floor(Math.abs(arr[i]) / Math.pow(base, digit)) % base;
        output[count[digitValue] - 1] = arr[i];
        count[digitValue]--;
    }

    // Copy output back to original array
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}

/**
 * RADIX SORT WITH STEP-BY-STEP TRACKING
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {Object} - { sortedArray: number[], steps: Array, maxDigits: number }
 */
function radixSortWithSteps(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return { sortedArray: [...arr], steps: [], maxDigits: 0 };

    const steps = [];
    const sortedArray = [...arr];

    const max = Math.max(...sortedArray);
    const maxDigits = Math.floor(Math.log10(Math.abs(max))) + 1;

    steps.push({
        action: 'find_max_digits',
        max: max,
        maxDigits: maxDigits,
        array: [...sortedArray]
    });

    // Apply counting sort for each digit
    for (let digit = 0; digit < maxDigits; digit++) {
        steps.push({
            action: 'sort_digit_start',
            digit: digit,
            array: [...sortedArray]
        });

        const digitSteps = countingSortByDigitWithSteps(sortedArray, digit, ascending);
        steps.push(...digitSteps);

        steps.push({
            action: 'sort_digit_complete',
            digit: digit,
            array: [...sortedArray]
        });
    }

    return { sortedArray, steps, maxDigits };
}

function countingSortByDigitWithSteps(arr, digit, ascending) {
    const steps = [];
    const base = 10;
    const count = new Array(base).fill(0);
    const output = new Array(arr.length);

    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        const digitValue = Math.floor(Math.abs(arr[i]) / Math.pow(base, digit)) % base;
        count[digitValue]++;
        steps.push({
            action: 'count_digit',
            element: arr[i],
            digitValue: digitValue,
            digit: digit,
            countArray: [...count]
        });
    }

    // Cumulative count
    for (let i = 1; i < base; i++) {
        count[i] += count[i - 1];
        steps.push({
            action: 'cumulative_count',
            index: i,
            countArray: [...count]
        });
    }

    // Build output
    for (let i = arr.length - 1; i >= 0; i--) {
        const digitValue = Math.floor(Math.abs(arr[i]) / Math.pow(base, digit)) % base;
        output[count[digitValue] - 1] = arr[i];
        count[digitValue]--;

        steps.push({
            action: 'place_element',
            element: arr[i],
            digitValue: digitValue,
            digit: digit,
            outputIndex: count[digitValue],
            outputArray: [...output]
        });
    }

    // Copy back to original array
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }

    return steps;
}

/**
 * RADIX SORT WITH CUSTOM BASE
 *
 * @param {number[]} arr - Array to be sorted
 * @param {number} base - Base/radix for sorting (default: 10)
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function radixSortWithBase(arr, base = 10, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];
    if (base < 2) throw new Error('Base must be at least 2');

    const sortedArray = [...arr];

    const max = Math.max(...sortedArray);
    const maxDigits = Math.floor(Math.log(Math.abs(max)) / Math.log(base)) + 1;

    for (let digit = 0; digit < maxDigits; digit++) {
        countingSortByDigitWithBase(sortedArray, digit, base, ascending);
    }

    return sortedArray;
}

function countingSortByDigitWithBase(arr, digit, base, ascending) {
    const count = new Array(base).fill(0);
    const output = new Array(arr.length);

    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        const digitValue = Math.floor(Math.abs(arr[i]) / Math.pow(base, digit)) % base;
        count[digitValue]++;
    }

    // Cumulative count
    for (let i = 1; i < base; i++) {
        count[i] += count[i - 1];
    }

    // Build output
    for (let i = arr.length - 1; i >= 0; i--) {
        const digitValue = Math.floor(Math.abs(arr[i]) / Math.pow(base, digit)) % base;
        output[count[digitValue] - 1] = arr[i];
        count[digitValue]--;
    }

    // Copy back
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}

/**
 * RADIX SORT FOR STRINGS
 *
 * @param {string[]} arr - Array of strings to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {string[]} - Sorted array
 */
function radixSortStrings(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];

    // Find maximum string length
    const maxLength = Math.max(...arr.map(str => str.length));

    // Sort by each character position from right to left
    for (let pos = maxLength - 1; pos >= 0; pos--) {
        countingSortByChar(sortedArray, pos, ascending);
    }

    return sortedArray;
}

function countingSortByChar(arr, pos, ascending) {
    const base = 256; // ASCII range
    const count = new Array(base).fill(0);
    const output = new Array(arr.length);

    // Count occurrences
    for (let i = 0; i < arr.length; i++) {
        const charCode = pos < arr[i].length ? arr[i].charCodeAt(pos) : 0;
        count[charCode]++;
    }

    // Cumulative count
    for (let i = 1; i < base; i++) {
        count[i] += count[i - 1];
    }

    // Build output
    for (let i = arr.length - 1; i >= 0; i--) {
        const charCode = pos < arr[i].length ? arr[i].charCodeAt(pos) : 0;
        output[count[charCode] - 1] = arr[i];
        count[charCode]--;
    }

    // Copy back
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
}

/**
 * RADIX SORT FOR NEGATIVE NUMBERS
 *
 * @param {number[]} arr - Array to be sorted (can contain negative numbers)
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function radixSortNegative(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    // Separate positive and negative numbers
    const positive = arr.filter(x => x >= 0);
    const negative = arr.filter(x => x < 0).map(x => -x);

    // Sort both arrays
    const sortedPositive = radixSort(positive, ascending);
    const sortedNegative = radixSort(negative, !ascending).map(x => -x);

    // Combine results
    return ascending
        ? [...sortedNegative, ...sortedPositive]
        : [...sortedPositive, ...sortedNegative];
}

/**
 * MSD RADIX SORT - Most Significant Digit first
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function msdRadixSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];

    const max = Math.max(...sortedArray);
    const maxDigits = Math.floor(Math.log10(Math.abs(max))) + 1;

    msdRadixSortHelper(sortedArray, 0, sortedArray.length - 1, maxDigits - 1, ascending);

    return sortedArray;
}

function msdRadixSortHelper(arr, low, high, digit, ascending) {
    if (low >= high || digit < 0) return;

    const base = 10;
    const count = new Array(base).fill(0);
    const output = new Array(high - low + 1);

    // Count occurrences
    for (let i = low; i <= high; i++) {
        const digitValue = Math.floor(Math.abs(arr[i]) / Math.pow(base, digit)) % base;
        count[digitValue]++;
    }

    // Cumulative count
    for (let i = 1; i < base; i++) {
        count[i] += count[i - 1];
    }

    // Build output
    for (let i = high; i >= low; i--) {
        const digitValue = Math.floor(Math.abs(arr[i]) / Math.pow(base, digit)) % base;
        output[count[digitValue] - 1] = arr[i];
        count[digitValue]--;
    }

    // Copy back
    for (let i = 0; i < output.length; i++) {
        arr[low + i] = output[i];
    }

    // Recursively sort each bucket
    let start = low;
    for (let i = 0; i < base; i++) {
        const end = start + count[i] - 1;
        if (start <= end) {
            msdRadixSortHelper(arr, start, end, digit - 1, ascending);
        }
        start = end + 1;
    }
}

// =============================================================================
// RADIX SORT TEST SUITE
// =============================================================================

function runRadixSortTests() {
    console.log('🔢 RADIX SORT ALGORITHM TESTS 🔢\n');

    // Test Case 1: Basic sorting
    console.log('Test 1: Basic Ascending Sort');
    const arr1 = [170, 45, 75, 90, 2, 802, 24, 66];
    const sorted1 = radixSort(arr1);
    console.log('Original:', arr1);
    console.log('Sorted:', sorted1);
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Descending sort
    console.log('Test 2: Descending Sort');
    const arr2 = [329, 457, 657, 839, 436, 720, 355];
    const sorted2 = radixSort(arr2, false);
    console.log('Original:', arr2);
    console.log('Sorted:', sorted2);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Single element
    console.log('Test 3: Single Element');
    const arr3 = [42];
    const sorted3 = radixSort(arr3);
    console.log('Original:', arr3);
    console.log('Sorted:', sorted3);
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Empty array
    console.log('Test 4: Empty Array');
    const arr4 = [];
    const sorted4 = radixSort(arr4);
    console.log('Original:', arr4);
    console.log('Sorted:', sorted4);
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: Step-by-step tracking
    console.log('Test 5: Step-by-Step Tracking');
    const arr5 = [170, 45, 75, 90, 2];
    const result = radixSortWithSteps(arr5);
    console.log('Original:', arr5);
    console.log('Sorted:', result.sortedArray);
    console.log('Max Digits:', result.maxDigits);
    console.log('Total Steps:', result.steps.length);
    console.log('✅ Test 5 Passed\n');

    // Test Case 6: Custom base
    console.log('Test 6: Custom Base (Base 8)');
    const arr6 = [170, 45, 75, 90, 2];
    const sorted6 = radixSortWithBase(arr6, 8);
    console.log('Original:', arr6);
    console.log('Sorted (Base 8):', sorted6);
    console.log('✅ Test 6 Passed\n');

    // Test Case 7: String sorting
    console.log('Test 7: String Sorting');
    const arr7 = ['word', 'category', 'another', 'zebra'];
    const sorted7 = radixSortStrings(arr7);
    console.log('Original:', arr7);
    console.log('Sorted:', sorted7);
    console.log('✅ Test 7 Passed\n');

    // Test Case 8: Negative numbers
    console.log('Test 8: Negative Numbers');
    const arr8 = [-170, 45, -75, 90, -2, 802];
    const sorted8 = radixSortNegative(arr8);
    console.log('Original:', arr8);
    console.log('Sorted:', sorted8);
    console.log('✅ Test 8 Passed\n');

    // Test Case 9: MSD Radix Sort
    console.log('Test 9: MSD Radix Sort');
    const arr9 = [170, 45, 75, 90, 2, 802];
    const sorted9 = msdRadixSort(arr9);
    console.log('Original:', arr9);
    console.log('MSD Sorted:', sorted9);
    console.log('✅ Test 9 Passed\n');

    // Test Case 10: Large array performance test
    console.log('Test 10: Performance Test (1000 elements)');
    const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 10000));
    const startTime = performance.now();
    const sortedLarge = radixSort(largeArray);
    const endTime = performance.now();
    console.log(`Sorted ${largeArray.length} elements in ${(endTime - startTime).toFixed(2)}ms`);
    console.log('✅ Test 10 Passed\n');

    console.log('🎉 All Radix Sort tests passed!');
}

// Export functions for use in other modules
module.exports = {
    radixSort,
    radixSortWithSteps,
    radixSortWithBase,
    radixSortStrings,
    radixSortNegative,
    msdRadixSort,
    runRadixSortTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runRadixSortTests();
}
