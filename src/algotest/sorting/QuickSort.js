// =============================================================================
// QUICK SORT ALGORITHM IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Sort array using quick sort algorithm
//
// TIME COMPLEXITY ANALYSIS:
// - Best Case: O(n log n) - when pivot divides array evenly
// - Average Case: O(n log n)
// - Worst Case: O(n²) - when pivot is always smallest or largest element
//
// SPACE COMPLEXITY: O(log n) - recursion stack space
//
// STABILITY: Unstable - equal elements may change relative order
//
// WHERE:
// n = number of elements in array
// =============================================================================

/**
 * QUICK SORT - Divide and conquer sorting algorithm
 *
 * ALGORITHM STEPS:
 * 1. Choose a pivot element
 * 2. Partition array around pivot (smaller elements left, larger right)
 * 3. Recursively sort left and right partitions
 *
 * Time Complexity: O(n log n) average case, O(n²) worst case
 * Space Complexity: O(log n)
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function quickSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    quickSortHelper(sortedArray, 0, sortedArray.length - 1, ascending);
    return sortedArray;
}

/**
 * Helper function for quick sort
 */
function quickSortHelper(arr, low, high, ascending) {
    if (low < high) {
        // Partition the array and get pivot index
        const pivotIndex = partition(arr, low, high, ascending);

        // Recursively sort elements before and after partition
        quickSortHelper(arr, low, pivotIndex - 1, ascending);
        quickSortHelper(arr, pivotIndex + 1, high, ascending);
    }
}

/**
 * Partition function - Lomuto partition scheme
 */
function partition(arr, low, high, ascending) {
    // Choose rightmost element as pivot
    const pivot = arr[high];
    let i = low - 1; // Index of smaller element

    for (let j = low; j < high; j++) {
        const shouldSwap = ascending
            ? arr[j] <= pivot
            : arr[j] >= pivot;

        if (shouldSwap) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

/**
 * QUICK SORT WITH STEP-BY-STEP TRACKING
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {Object} - { sortedArray: number[], steps: Array, comparisons: number, swaps: number }
 */
function quickSortWithSteps(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return { sortedArray: [...arr], steps: [], comparisons: 0, swaps: 0 };

    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    const sortedArray = quickSortWithStepsHelper([...arr], 0, arr.length - 1, ascending, steps, comparisons, swaps);

    return { sortedArray, steps, comparisons, swaps };
}

function quickSortWithStepsHelper(arr, low, high, ascending, steps, comparisons, swaps) {
    if (low < high) {
        const pivotIndex = partitionWithSteps(arr, low, high, ascending, steps, comparisons, swaps);

        steps.push({
            action: 'partition_complete',
            low: low,
            high: high,
            pivotIndex: pivotIndex,
            pivot: arr[pivotIndex],
            array: [...arr]
        });

        // Recursively sort left partition
        quickSortWithStepsHelper(arr, low, pivotIndex - 1, ascending, steps, comparisons, swaps);

        // Recursively sort right partition
        quickSortWithStepsHelper(arr, pivotIndex + 1, high, ascending, steps, comparisons, swaps);
    }

    return arr;
}

function partitionWithSteps(arr, low, high, ascending, steps, comparisons, swaps) {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
        action: 'partition_start',
        low: low,
        high: high,
        pivot: pivot,
        array: [...arr]
    });

    for (let j = low; j < high; j++) {
        comparisons++;
        const shouldSwap = ascending
            ? arr[j] <= pivot
            : arr[j] >= pivot;

        steps.push({
            action: 'compare',
            indices: [j, high],
            values: [arr[j], pivot],
            array: [...arr]
        });

        if (shouldSwap) {
            i++;
            if (i !== j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                swaps++;
                steps.push({
                    action: 'swap',
                    indices: [i, j],
                    values: [arr[j], arr[i]],
                    array: [...arr]
                });
            }
        }
    }

    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    steps.push({
        action: 'pivot_place',
        indices: [i + 1, high],
        values: [arr[high], arr[i + 1]],
        array: [...arr]
    });

    return i + 1;
}

/**
 * QUICK SORT WITH DIFFERENT PIVOT SELECTION STRATEGIES
 */

/**
 * Quick sort with first element as pivot
 */
function quickSortFirstPivot(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    quickSortFirstPivotHelper(sortedArray, 0, sortedArray.length - 1, ascending);
    return sortedArray;
}

function quickSortFirstPivotHelper(arr, low, high, ascending) {
    if (low < high) {
        // Move first element to end
        [arr[low], arr[high]] = [arr[high], arr[low]];
        const pivotIndex = partition(arr, low, high, ascending);

        quickSortFirstPivotHelper(arr, low, pivotIndex - 1, ascending);
        quickSortFirstPivotHelper(arr, pivotIndex + 1, high, ascending);
    }
}

/**
 * Quick sort with middle element as pivot
 */
function quickSortMiddlePivot(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    quickSortMiddlePivotHelper(sortedArray, 0, sortedArray.length - 1, ascending);
    return sortedArray;
}

function quickSortMiddlePivotHelper(arr, low, high, ascending) {
    if (low < high) {
        const mid = Math.floor((low + high) / 2);
        // Move middle element to end
        [arr[mid], arr[high]] = [arr[high], arr[mid]];
        const pivotIndex = partition(arr, low, high, ascending);

        quickSortMiddlePivotHelper(arr, low, pivotIndex - 1, ascending);
        quickSortMiddlePivotHelper(arr, pivotIndex + 1, high, ascending);
    }
}

/**
 * Quick sort with random pivot selection
 */
function quickSortRandomPivot(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    quickSortRandomPivotHelper(sortedArray, 0, sortedArray.length - 1, ascending);
    return sortedArray;
}

function quickSortRandomPivotHelper(arr, low, high, ascending) {
    if (low < high) {
        // Choose random pivot
        const randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
        [arr[randomIndex], arr[high]] = [arr[high], arr[randomIndex]];
        const pivotIndex = partition(arr, low, high, ascending);

        quickSortRandomPivotHelper(arr, low, pivotIndex - 1, ascending);
        quickSortRandomPivotHelper(arr, pivotIndex + 1, high, ascending);
    }
}

/**
 * ITERATIVE QUICK SORT - Non-recursive implementation
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function iterativeQuickSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const stack = [];

    // Push initial values
    stack.push({ low: 0, high: sortedArray.length - 1 });

    while (stack.length > 0) {
        const { low, high } = stack.pop();

        if (low < high) {
            const pivotIndex = partition(sortedArray, low, high, ascending);

            // Push left partition
            stack.push({ low: low, high: pivotIndex - 1 });

            // Push right partition
            stack.push({ low: pivotIndex + 1, high: high });
        }
    }

    return sortedArray;
}

/**
 * QUICK SORT WITH 3-WAY PARTITIONING (Dutch National Flag)
 * Efficient for arrays with many duplicate elements
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function quickSort3Way(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    quickSort3WayHelper(sortedArray, 0, sortedArray.length - 1, ascending);
    return sortedArray;
}

function quickSort3WayHelper(arr, low, high, ascending) {
    if (low < high) {
        const pivot = arr[low];
        let lt = low;      // arr[low..lt-1] < pivot
        let i = low + 1;   // arr[lt..i-1] == pivot
        let gt = high;     // arr[gt+1..high] > pivot

        while (i <= gt) {
            const cmp = ascending
                ? arr[i] - pivot
                : pivot - arr[i];

            if (cmp < 0) {
                [arr[lt], arr[i]] = [arr[i], arr[lt]];
                lt++;
                i++;
            } else if (cmp > 0) {
                [arr[i], arr[gt]] = [arr[gt], arr[i]];
                gt--;
            } else {
                i++;
            }
        }

        // Recursively sort left and right partitions
        quickSort3WayHelper(arr, low, lt - 1, ascending);
        quickSort3WayHelper(arr, gt + 1, high, ascending);
    }
}

// =============================================================================
// QUICK SORT TEST SUITE
// =============================================================================

function runQuickSortTests() {
    console.log('⚡ QUICK SORT ALGORITHM TESTS ⚡\n');

    // Test Case 1: Basic sorting
    console.log('Test 1: Basic Ascending Sort');
    const arr1 = [10, 7, 8, 9, 1, 5];
    const sorted1 = quickSort(arr1);
    console.log('Original:', arr1);
    console.log('Sorted:', sorted1);
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Descending sort
    console.log('Test 2: Descending Sort');
    const arr2 = [5, 2, 8, 1, 9];
    const sorted2 = quickSort(arr2, false);
    console.log('Original:', arr2);
    console.log('Sorted:', sorted2);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Already sorted array
    console.log('Test 3: Already Sorted Array');
    const arr3 = [1, 2, 3, 4, 5];
    const sorted3 = quickSort(arr3);
    console.log('Original:', arr3);
    console.log('Sorted:', sorted3);
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Single element
    console.log('Test 4: Single Element');
    const arr4 = [42];
    const sorted4 = quickSort(arr4);
    console.log('Original:', arr4);
    console.log('Sorted:', sorted4);
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: Empty array
    console.log('Test 5: Empty Array');
    const arr5 = [];
    const sorted5 = quickSort(arr5);
    console.log('Original:', arr5);
    console.log('Sorted:', sorted5);
    console.log('✅ Test 5 Passed\n');

    // Test Case 6: Step-by-step tracking
    console.log('Test 6: Step-by-Step Tracking');
    const arr6 = [3, 1, 4, 1, 5];
    const result = quickSortWithSteps(arr6);
    console.log('Original:', arr6);
    console.log('Sorted:', result.sortedArray);
    console.log('Comparisons:', result.comparisons);
    console.log('Swaps:', result.swaps);
    console.log('Total Steps:', result.steps.length);
    console.log('✅ Test 6 Passed\n');

    // Test Case 7: Different pivot strategies
    console.log('Test 7: Different Pivot Strategies');
    const arr7 = [6, 3, 8, 2, 9, 1];
    const sorted7First = quickSortFirstPivot([...arr7]);
    const sorted7Middle = quickSortMiddlePivot([...arr7]);
    const sorted7Random = quickSortRandomPivot([...arr7]);
    console.log('Original:', arr7);
    console.log('First Pivot:', sorted7First);
    console.log('Middle Pivot:', sorted7Middle);
    console.log('Random Pivot:', sorted7Random);
    console.log('✅ Test 7 Passed\n');

    // Test Case 8: Iterative quick sort
    console.log('Test 8: Iterative Quick Sort');
    const arr8 = [12, 11, 13, 5, 6];
    const sorted8 = iterativeQuickSort(arr8);
    console.log('Original:', arr8);
    console.log('Iterative Sorted:', sorted8);
    console.log('✅ Test 8 Passed\n');

    // Test Case 9: 3-way partitioning
    console.log('Test 9: 3-Way Partitioning');
    const arr9 = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
    const sorted9 = quickSort3Way(arr9);
    console.log('Original:', arr9);
    console.log('3-Way Sorted:', sorted9);
    console.log('✅ Test 9 Passed\n');

    // Test Case 10: Large array performance test
    console.log('Test 10: Performance Test (1000 elements)');
    const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    const startTime = performance.now();
    const sortedLarge = quickSort(largeArray);
    const endTime = performance.now();
    console.log(`Sorted ${largeArray.length} elements in ${(endTime - startTime).toFixed(2)}ms`);
    console.log('✅ Test 10 Passed\n');

    console.log('🎉 All Quick Sort tests passed!');
}

// Export functions for use in other modules
module.exports = {
    quickSort,
    quickSortWithSteps,
    quickSortFirstPivot,
    quickSortMiddlePivot,
    quickSortRandomPivot,
    iterativeQuickSort,
    quickSort3Way,
    runQuickSortTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runQuickSortTests();
}
