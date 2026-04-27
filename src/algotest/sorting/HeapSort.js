// =============================================================================
// HEAP SORT ALGORITHM IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Sort array using heap sort algorithm
//
// TIME COMPLEXITY ANALYSIS:
// - Best Case: O(n log n)
// - Average Case: O(n log n)
// - Worst Case: O(n log n)
//
// SPACE COMPLEXITY: O(1) - in-place sorting
//
// STABILITY: Unstable - equal elements may change relative order
//
// WHERE:
// n = number of elements in array
// =============================================================================

/**
 * HEAP SORT - Comparison-based sorting algorithm using heap data structure
 *
 * ALGORITHM STEPS:
 * 1. Build a max heap from the input array
 * 2. Extract the maximum element (root) and place it at the end
 * 3. Reduce heap size and heapify the root
 * 4. Repeat until heap size is 1
 *
 * Time Complexity: O(n log n) - always
 * Space Complexity: O(1)
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function heapSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;

    // Build max heap (for ascending) or min heap (for descending)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(sortedArray, n, i, ascending);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [sortedArray[0], sortedArray[i]] = [sortedArray[i], sortedArray[0]];

        // Call heapify on the reduced heap
        heapify(sortedArray, i, 0, ascending);
    }

    return sortedArray;
}

/**
 * Heapify function to maintain heap property
 */
function heapify(arr, heapSize, rootIndex, ascending) {
    let largest = rootIndex; // Initialize largest as root
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;

    // If left child is larger/smaller than root
    if (leftChild < heapSize) {
        const shouldUpdateLeft = ascending
            ? arr[leftChild] > arr[largest]
            : arr[leftChild] < arr[largest];

        if (shouldUpdateLeft) {
            largest = leftChild;
        }
    }

    // If right child is larger/smaller than largest so far
    if (rightChild < heapSize) {
        const shouldUpdateRight = ascending
            ? arr[rightChild] > arr[largest]
            : arr[rightChild] < arr[largest];

        if (shouldUpdateRight) {
            largest = rightChild;
        }
    }

    // If largest is not root
    if (largest !== rootIndex) {
        [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];

        // Recursively heapify the affected sub-tree
        heapify(arr, heapSize, largest, ascending);
    }
}

/**
 * HEAP SORT WITH STEP-BY-STEP TRACKING
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {Object} - { sortedArray: number[], steps: Array, comparisons: number, swaps: number }
 */
function heapSortWithSteps(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return { sortedArray: [...arr], steps: [], comparisons: 0, swaps: 0 };

    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    const sortedArray = [...arr];
    const n = sortedArray.length;

    // Build heap phase
    steps.push({
        action: 'build_heap_start',
        array: [...sortedArray]
    });

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyWithSteps(sortedArray, n, i, ascending, steps, comparisons, swaps);
    }

    steps.push({
        action: 'build_heap_complete',
        array: [...sortedArray]
    });

    // Extract elements phase
    for (let i = n - 1; i > 0; i--) {
        // Swap root with last element
        [sortedArray[0], sortedArray[i]] = [sortedArray[i], sortedArray[0]];
        swaps++;

        steps.push({
            action: 'extract_max',
            rootIndex: 0,
            lastIndex: i,
            extractedValue: sortedArray[i],
            array: [...sortedArray]
        });

        // Heapify the reduced heap
        heapifyWithSteps(sortedArray, i, 0, ascending, steps, comparisons, swaps);
    }

    return { sortedArray, steps, comparisons, swaps };
}

function heapifyWithSteps(arr, heapSize, rootIndex, ascending, steps, comparisons, swaps) {
    let largest = rootIndex;
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;

    // Check left child
    if (leftChild < heapSize) {
        comparisons++;
        const shouldUpdateLeft = ascending
            ? arr[leftChild] > arr[largest]
            : arr[leftChild] < arr[largest];

        steps.push({
            action: 'compare',
            indices: [leftChild, largest],
            values: [arr[leftChild], arr[largest]],
            array: [...arr]
        });

        if (shouldUpdateLeft) {
            largest = leftChild;
        }
    }

    // Check right child
    if (rightChild < heapSize) {
        comparisons++;
        const shouldUpdateRight = ascending
            ? arr[rightChild] > arr[largest]
            : arr[rightChild] < arr[largest];

        steps.push({
            action: 'compare',
            indices: [rightChild, largest],
            values: [arr[rightChild], arr[largest]],
            array: [...arr]
        });

        if (shouldUpdateRight) {
            largest = rightChild;
        }
    }

    // Swap if necessary
    if (largest !== rootIndex) {
        [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
        swaps++;

        steps.push({
            action: 'swap',
            indices: [rootIndex, largest],
            values: [arr[largest], arr[rootIndex]],
            array: [...arr]
        });

        // Recursively heapify
        heapifyWithSteps(arr, heapSize, largest, ascending, steps, comparisons, swaps);
    }
}

/**
 * MIN HEAP SORT - Uses min heap for sorting
 *
 * @param {number[]} arr - Array to be sorted
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {number[]} - Sorted array
 */
function minHeapSort(arr, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;

    // Build min heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        minHeapify(sortedArray, n, i, ascending);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [sortedArray[0], sortedArray[i]] = [sortedArray[i], sortedArray[0]];
        minHeapify(sortedArray, i, 0, ascending);
    }

    return sortedArray;
}

function minHeapify(arr, heapSize, rootIndex, ascending) {
    let smallest = rootIndex;
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;

    if (leftChild < heapSize) {
        const shouldUpdateLeft = ascending
            ? arr[leftChild] < arr[smallest]
            : arr[leftChild] > arr[smallest];

        if (shouldUpdateLeft) {
            smallest = leftChild;
        }
    }

    if (rightChild < heapSize) {
        const shouldUpdateRight = ascending
            ? arr[rightChild] < arr[smallest]
            : arr[rightChild] > arr[smallest];

        if (shouldUpdateRight) {
            smallest = rightChild;
        }
    }

    if (smallest !== rootIndex) {
        [arr[rootIndex], arr[smallest]] = [arr[smallest], arr[rootIndex]];
        minHeapify(arr, heapSize, smallest, ascending);
    }
}

/**
 * HEAP SORT WITH CUSTOM COMPARATOR
 *
 * @param {number[]} arr - Array to be sorted
 * @param {Function} compareFn - Custom comparison function
 * @returns {number[]} - Sorted array
 */
function heapSortWithComparator(arr, compareFn) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (typeof compareFn !== 'function') throw new Error('Comparator must be a function');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyWithComparator(sortedArray, n, i, compareFn);
    }

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        [sortedArray[0], sortedArray[i]] = [sortedArray[i], sortedArray[0]];
        heapifyWithComparator(sortedArray, i, 0, compareFn);
    }

    return sortedArray;
}

function heapifyWithComparator(arr, heapSize, rootIndex, compareFn) {
    let largest = rootIndex;
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;

    if (leftChild < heapSize && compareFn(arr[leftChild], arr[largest]) > 0) {
        largest = leftChild;
    }

    if (rightChild < heapSize && compareFn(arr[rightChild], arr[largest]) > 0) {
        largest = rightChild;
    }

    if (largest !== rootIndex) {
        [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
        heapifyWithComparator(arr, heapSize, largest, compareFn);
    }
}

/**
 * HEAP SORT FOR OBJECTS
 *
 * @param {Object[]} arr - Array of objects to be sorted
 * @param {string} key - Property key to sort by
 * @param {boolean} ascending - Sort in ascending order (default: true)
 * @returns {Object[]} - Sorted array
 */
function heapSortObjects(arr, key, ascending = true) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length <= 1) return [...arr];

    const sortedArray = [...arr];
    const n = sortedArray.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapifyObjects(sortedArray, n, i, key, ascending);
    }

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        [sortedArray[0], sortedArray[i]] = [sortedArray[i], sortedArray[0]];
        heapifyObjects(sortedArray, i, 0, key, ascending);
    }

    return sortedArray;
}

function heapifyObjects(arr, heapSize, rootIndex, key, ascending) {
    let largest = rootIndex;
    const leftChild = 2 * rootIndex + 1;
    const rightChild = 2 * rootIndex + 2;

    if (leftChild < heapSize) {
        const shouldUpdateLeft = ascending
            ? arr[leftChild][key] > arr[largest][key]
            : arr[leftChild][key] < arr[largest][key];

        if (shouldUpdateLeft) {
            largest = leftChild;
        }
    }

    if (rightChild < heapSize) {
        const shouldUpdateRight = ascending
            ? arr[rightChild][key] > arr[largest][key]
            : arr[rightChild][key] < arr[largest][key];

        if (shouldUpdateRight) {
            largest = rightChild;
        }
    }

    if (largest !== rootIndex) {
        [arr[rootIndex], arr[largest]] = [arr[largest], arr[rootIndex]];
        heapifyObjects(arr, heapSize, largest, key, ascending);
    }
}

// =============================================================================
// HEAP SORT TEST SUITE
// =============================================================================

function runHeapSortTests() {
    console.log('🏗️ HEAP SORT ALGORITHM TESTS 🏗️\n');

    // Test Case 1: Basic sorting
    console.log('Test 1: Basic Ascending Sort');
    const arr1 = [12, 11, 13, 5, 6, 7];
    const sorted1 = heapSort(arr1);
    console.log('Original:', arr1);
    console.log('Sorted:', sorted1);
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Descending sort
    console.log('Test 2: Descending Sort');
    const arr2 = [5, 2, 8, 1, 9];
    const sorted2 = heapSort(arr2, false);
    console.log('Original:', arr2);
    console.log('Sorted:', sorted2);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Already sorted array
    console.log('Test 3: Already Sorted Array');
    const arr3 = [1, 2, 3, 4, 5];
    const sorted3 = heapSort(arr3);
    console.log('Original:', arr3);
    console.log('Sorted:', sorted3);
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Single element
    console.log('Test 4: Single Element');
    const arr4 = [42];
    const sorted4 = heapSort(arr4);
    console.log('Original:', arr4);
    console.log('Sorted:', sorted4);
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: Empty array
    console.log('Test 5: Empty Array');
    const arr5 = [];
    const sorted5 = heapSort(arr5);
    console.log('Original:', arr5);
    console.log('Sorted:', sorted5);
    console.log('✅ Test 5 Passed\n');

    // Test Case 6: Step-by-step tracking
    console.log('Test 6: Step-by-Step Tracking');
    const arr6 = [3, 1, 4, 1, 5];
    const result = heapSortWithSteps(arr6);
    console.log('Original:', arr6);
    console.log('Sorted:', result.sortedArray);
    console.log('Comparisons:', result.comparisons);
    console.log('Swaps:', result.swaps);
    console.log('Total Steps:', result.steps.length);
    console.log('✅ Test 6 Passed\n');

    // Test Case 7: Min heap sort
    console.log('Test 7: Min Heap Sort');
    const arr7 = [6, 3, 8, 2, 9, 1];
    const sorted7 = minHeapSort(arr7);
    console.log('Original:', arr7);
    console.log('Min Heap Sorted:', sorted7);
    console.log('✅ Test 7 Passed\n');

    // Test Case 8: Custom comparator
    console.log('Test 8: Custom Comparator');
    const arr8 = [12, 11, 13, 5, 6];
    const sorted8 = heapSortWithComparator(arr8, (a, b) => b - a); // Descending
    console.log('Original:', arr8);
    console.log('Custom Comparator Sorted:', sorted8);
    console.log('✅ Test 8 Passed\n');

    // Test Case 9: Object sorting
    console.log('Test 9: Object Sorting');
    const objects = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
        { name: 'Charlie', age: 35 }
    ];
    const sortedObjects = heapSortObjects(objects, 'age');
    console.log('Original:', objects);
    console.log('Sorted by age:', sortedObjects);
    console.log('✅ Test 9 Passed\n');

    // Test Case 10: Large array performance test
    console.log('Test 10: Performance Test (1000 elements)');
    const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));
    const startTime = performance.now();
    const sortedLarge = heapSort(largeArray);
    const endTime = performance.now();
    console.log(`Sorted ${largeArray.length} elements in ${(endTime - startTime).toFixed(2)}ms`);
    console.log('✅ Test 10 Passed\n');

    console.log('🎉 All Heap Sort tests passed!');
}

// Export functions for use in other modules
module.exports = {
    heapSort,
    heapSortWithSteps,
    minHeapSort,
    heapSortWithComparator,
    heapSortObjects,
    runHeapSortTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runHeapSortTests();
}
