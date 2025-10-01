// =============================================================================
// SORTING ALGORITHMS TEST RUNNER
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Run all sorting algorithm tests and performance comparisons
// =============================================================================

const {
    bubbleSort,
    bubbleSortWithSteps,
    recursiveBubbleSort,
    runBubbleSortTests
} = require('./BubbleSort');

const {
    selectionSort,
    selectionSortWithSteps,
    stableSelectionSort,
    recursiveSelectionSort,
    runSelectionSortTests
} = require('./SelectionSort');

const {
    insertionSort,
    insertionSortWithSteps,
    recursiveInsertionSort,
    binaryInsertionSort,
    shellSort,
    runInsertionSortTests
} = require('./InsertionSort');

const {
    mergeSort,
    mergeSortWithSteps,
    iterativeMergeSort,
    bottomUpMergeSort,
    naturalMergeSort,
    runMergeSortTests
} = require('./MergeSort');

const {
    quickSort,
    quickSortWithSteps,
    quickSortFirstPivot,
    quickSortMiddlePivot,
    quickSortRandomPivot,
    iterativeQuickSort,
    quickSort3Way,
    runQuickSortTests
} = require('./QuickSort');

const {
    heapSort,
    heapSortWithSteps,
    minHeapSort,
    heapSortWithComparator,
    heapSortObjects,
    runHeapSortTests
} = require('./HeapSort');

const {
    countingSort,
    countingSortWithSteps,
    countingSortWithRange,
    countingSortStrings,
    countingSortObjects,
    countingSortNegative,
    runCountingSortTests
} = require('./CountingSort');

const {
    radixSort,
    radixSortWithSteps,
    radixSortWithBase,
    radixSortStrings,
    radixSortNegative,
    msdRadixSort,
    runRadixSortTests
} = require('./RadixSort');

const {
    topologicalSort,
    topologicalSortWithSteps,
    topologicalSortDFS,
    topologicalSortKahn,
    isDAG,
    findAllTopologicalOrders,
    topologicalSortWeighted,
    longestPathInDAG,
    runTopologicalSortTests,
} = require('./TopologicalSort');

// =============================================================================
// PERFORMANCE COMPARISON SUITE
// =============================================================================

function generateTestData(size, type = 'random') {
    switch (type) {
        case 'random':
            return Array.from({length: size}, () => Math.floor(Math.random() * size));
        case 'sorted':
            return Array.from({length: size}, (_, i) => i);
        case 'reverse':
            return Array.from({length: size}, (_, i) => size - i - 1);
        case 'nearly_sorted':
            const arr = Array.from({length: size}, (_, i) => i);
            // Swap 10% of elements randomly
            for (let i = 0; i < Math.floor(size * 0.1); i++) {
                const idx1 = Math.floor(Math.random() * size);
                const idx2 = Math.floor(Math.random() * size);
                [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
            }
            return arr;
        case 'duplicates':
            return Array.from({length: size}, () => Math.floor(Math.random() * 10));
        default:
            return Array.from({length: size}, () => Math.floor(Math.random() * size));
    }
}

function runPerformanceComparison() {
    console.log('🚀 SORTING ALGORITHMS PERFORMANCE COMPARISON 🚀\n');

    const testSizes = [100, 500, 1000];
    const testTypes = ['random', 'sorted', 'reverse', 'nearly_sorted', 'duplicates'];

    const algorithms = [
        {name: 'Bubble Sort', fn: bubbleSort},
        {name: 'Selection Sort', fn: selectionSort},
        {name: 'Insertion Sort', fn: insertionSort},
        {name: 'Shell Sort', fn: shellSort},
        {name: 'Merge Sort', fn: mergeSort},
        {name: 'Quick Sort', fn: quickSort},
        {name: 'Heap Sort', fn: heapSort},
        {name: 'Counting Sort', fn: countingSort},
        {name: 'Radix Sort', fn: radixSort},
    ];

    for (const testType of testTypes) {
        console.log(`\n📊 Test Type: ${testType.toUpperCase()}`);
        console.log('='.repeat(50));

        for (const size of testSizes) {
            console.log(`\nSize: ${size} elements`);
            console.log('-'.repeat(30));

            const testData = generateTestData(size, testType);

            for (const algorithm of algorithms) {
                try {
                    const startTime = performance.now();
                    const sorted = algorithm.fn([...testData]);
                    const endTime = performance.now();
                    const time = (endTime - startTime).toFixed(2);

                    // Verify sorting is correct
                    const isCorrect = isSorted(sorted);
                    const status = isCorrect ? '✅' : '❌';

                    console.log(`${status} ${algorithm.name.padEnd(20)}: ${time}ms`);
                } catch (error) {
                    console.log(`❌ ${algorithm.name.padEnd(20)}: Error - ${error.message}`);
                }
            }
        }
    }
}

function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) return false;
    }
    return true;
}

// =============================================================================
// COMPREHENSIVE TEST SUITE
// =============================================================================

function runAllSortingTests() {
    console.log('🧪 COMPREHENSIVE SORTING ALGORITHMS TEST SUITE 🧪\n');
    console.log('='.repeat(60));

    try {
        console.log('\n🫧 Testing Bubble Sort...');
        runBubbleSortTests();

        console.log('\n🎯 Testing Selection Sort...');
        runSelectionSortTests();

        console.log('\n📥 Testing Insertion Sort...');
        runInsertionSortTests();

        console.log('\n🔀 Testing Merge Sort...');
        runMergeSortTests();

        console.log('\n⚡ Testing Quick Sort...');
        runQuickSortTests();

        console.log('\n🏗️ Testing Heap Sort...');
        runHeapSortTests();

        console.log('\n🔢 Testing Counting Sort...');
        runCountingSortTests();

        console.log('\n🔢 Testing Radix Sort...');
        runRadixSortTests();

        console.log('\n🔗 Testing Topological Sort...');
        runTopologicalSortTests();

        console.log('\n🚀 Running Performance Comparison...');
        runPerformanceComparison();

        console.log('\n🎉 ALL SORTING ALGORITHM TESTS COMPLETED SUCCESSFULLY! 🎉');
    } catch (error) {
        console.error('❌ Test suite failed:', error.message);
        console.error(error.stack);
    }
}

// =============================================================================
// ALGORITHM COMPARISON UTILITIES
// =============================================================================

function compareAlgorithms(arr, algorithms) {
    console.log(`\n🔍 Comparing algorithms on array: [${arr.slice(0, 10).join(', ')}${arr.length > 10 ? '...' : ''}]`);
    console.log('='.repeat(60));

    const results = [];

    for (const algorithm of algorithms) {
        try {
            const startTime = performance.now();
            const sorted = algorithm.fn([...arr]);
            const endTime = performance.now();
            const time = endTime - startTime;

            results.push({
                name: algorithm.name,
                time: time,
                sorted: sorted,
                correct: isSorted(sorted),
            });

            console.log(`${algorithm.name.padEnd(20)}: ${time.toFixed(2)}ms ${isSorted(sorted) ? '✅' : '❌'}`);
        } catch (error) {
            console.log(`${algorithm.name.padEnd(20)}: Error - ${error.message}`);
        }
    }

    // Sort by performance
    results.sort((a, b) => a.time - b.time);

    console.log('\n🏆 Performance Ranking:');
    results.forEach((result, index) => {
        console.log(`${index + 1}. ${result.name}: ${result.time.toFixed(2)}ms`);
    });

    return results;
}

function analyzeAlgorithmComplexity() {
    console.log('\n📈 ALGORITHM COMPLEXITY ANALYSIS 📈');
    console.log('='.repeat(60));

    const complexities = [
        {name: 'Bubble Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'Yes'},
        {name: 'Selection Sort', best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'No'},
        {name: 'Insertion Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)', stable: 'Yes'},
        {name: 'Shell Sort', best: 'O(n log n)', avg: 'O(n^1.5)', worst: 'O(n²)', space: 'O(1)', stable: 'No'},
        {name: 'Merge Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)', stable: 'Yes'},
        {name: 'Quick Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)', stable: 'No'},
        {name: 'Heap Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', stable: 'No'},
        {name: 'Counting Sort', best: 'O(n + k)', avg: 'O(n + k)', worst: 'O(n + k)', space: 'O(k)', stable: 'Yes'},
        {
            name: 'Radix Sort',
            best: 'O(d × (n + k))',
            avg: 'O(d × (n + k))',
            worst: 'O(d × (n + k))',
            space: 'O(n + k)',
            stable: 'Yes',
        },
        {name: 'Topological Sort', best: 'O(V + E)', avg: 'O(V + E)', worst: 'O(V + E)', space: 'O(V)', stable: 'N/A'},
    ];

    console.log(
        'Algorithm'.padEnd(20) +
            'Best'.padEnd(12) +
            'Average'.padEnd(12) +
            'Worst'.padEnd(12) +
            'Space'.padEnd(12) +
            'Stable',
    );
    console.log('-'.repeat(80));

    complexities.forEach(comp => {
        console.log(
            comp.name.padEnd(20) +
                comp.best.padEnd(12) +
                comp.avg.padEnd(12) +
                comp.worst.padEnd(12) +
                comp.space.padEnd(12) +
                comp.stable,
        );
    });
}

// Export functions for use in other modules
module.exports = {
    runAllSortingTests,
    runPerformanceComparison,
    compareAlgorithms,
    analyzeAlgorithmComplexity,
    generateTestData,
    isSorted
};

// Run all tests if this file is executed directly
if (require.main === module) {
    runAllSortingTests();
    analyzeAlgorithmComplexity();
}
