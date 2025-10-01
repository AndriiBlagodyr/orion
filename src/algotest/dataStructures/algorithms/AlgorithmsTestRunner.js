/**
 * Comprehensive Algorithms Test Runner
 *
 * This test runner covers all major algorithm categories needed for tech interviews:
 * - Binary Search
 * - Two Pointers
 * - Sliding Window
 * - Backtracking
 * - Greedy Algorithms
 */

const {
    binarySearch,
    binarySearchRecursive,
    findFirstOccurrence,
    findLastOccurrence,
    findInsertionPosition,
    searchRotatedArray,
    findPeakElement,
    findMinInRotatedArray,
    binarySearchWithComparator,
    countOccurrences,
    runBinarySearchTests,
} = require('./BinarySearch');

const {
    twoSum,
    threeSum,
    removeDuplicates,
    moveZeros,
    isPalindrome,
    maxArea,
    trapRainWater,
    findAnagrams,
    lengthOfLongestSubstring,
    minWindow,
    runTwoPointersTests,
} = require('./TwoPointers');

const {
    maxSumSubarray,
    minSubarrayLen,
    lengthOfLongestSubstringKDistinct,
    lengthOfLongestSubstringTwoDistinct,
    maxVowels,
    checkInclusion,
    findAnagrams: findAnagramsSW,
    findMaxAverage,
    numSubarrayProductLessThanK,
    characterReplacement,
    runSlidingWindowTests,
} = require('./SlidingWindow');

const {
    permute,
    combine,
    subsets,
    subsetsWithDup,
    permuteUnique,
    combinationSum,
    combinationSum2,
    solveNQueens,
    solveSudoku,
    generateParenthesis,
    letterCombinations,
    runBacktrackingTests,
} = require('./Backtracking');

const {
    activitySelection,
    fractionalKnapsack,
    minCoinsGreedy,
    intervalScheduling,
    minPlatforms,
    jobSequencing,
    huffmanCoding,
    canCompleteCircuit,
    maxProductSubarray,
    runGreedyTests,
} = require('./Greedy');

// =============================================================================
// MAIN TEST RUNNER
// =============================================================================

function runAllAlgorithmTests() {
    console.log('🧪 COMPREHENSIVE ALGORITHMS TEST SUITE 🧪');
    console.log('=' .repeat(60));
    console.log('Testing all major algorithm categories for tech interviews');
    console.log('=' .repeat(60));

    try {
        console.log('\n🔍 Testing Binary Search...');
        runBinarySearchTests();

        console.log('\n👆 Testing Two Pointers...');
        runTwoPointersTests();

        console.log('\n🪟 Testing Sliding Window...');
        runSlidingWindowTests();

        console.log('\n🔄 Testing Backtracking...');
        runBacktrackingTests();

        console.log('\n💰 Testing Greedy Algorithms...');
        runGreedyTests();

        console.log('\n🎉 ALL ALGORITHM TESTS COMPLETED SUCCESSFULLY! 🎉');
    } catch (error) {
        console.error('❌ Test suite failed:', error.message);
        console.error(error.stack);
    }
}

// =============================================================================
// ALGORITHM COMPLEXITY ANALYSIS
// =============================================================================

function displayAlgorithmComplexity() {
    console.log('\n📊 ALGORITHM COMPLEXITY ANALYSIS');
    console.log('=' .repeat(80));

    const complexities = [
        {name: 'Binary Search', best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', space: 'O(1)', category: 'Search'},
        {name: 'Two Pointers', best: 'O(n)', avg: 'O(n)', worst: 'O(n)', space: 'O(1)', category: 'Array/String'},
        {name: 'Sliding Window', best: 'O(n)', avg: 'O(n)', worst: 'O(n)', space: 'O(1)', category: 'Array/String'},
        {name: 'Backtracking', best: 'O(b^d)', avg: 'O(b^d)', worst: 'O(b^d)', space: 'O(d)', category: 'Generate'},
        {name: 'Greedy', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)', category: 'Optimization'},
    ];

    console.log(
        'Algorithm'.padEnd(20) +
            'Best'.padEnd(12) +
            'Average'.padEnd(12) +
            'Worst'.padEnd(12) +
            'Space'.padEnd(12) +
            'Category',
    );
    console.log('-'.repeat(80));

    complexities.forEach(comp => {
        console.log(
            comp.name.padEnd(20) +
                comp.best.padEnd(12) +
                comp.avg.padEnd(12) +
                comp.worst.padEnd(12) +
                comp.space.padEnd(12) +
                comp.category,
        );
    });
}

// =============================================================================
// INTERVIEW PREPARATION GUIDE
// =============================================================================

function displayInterviewGuide() {
    console.log('\n🎯 TECH INTERVIEW PREPARATION GUIDE');
    console.log('=' .repeat(60));

    console.log('\n📚 HIGH PRIORITY ALGORITHMS (Must Know):');
    console.log('1. Binary Search - Search in sorted arrays');
    console.log('2. Two Pointers - Array/string manipulation');
    console.log('3. Sliding Window - Subarray/substring problems');
    console.log('4. Backtracking - Generate all solutions');

    console.log('\n🏢 COMPANY-SPECIFIC FOCUS:');
    console.log('Google/Facebook: Graph algorithms, DP, Binary Search');
    console.log('Amazon: String manipulation, Two Pointers, Sliding Window');
    console.log('Microsoft: Array problems, Tree traversals, Backtracking');

    console.log('\n⚡ QUICK REFERENCE:');
    console.log('• Binary Search: O(log n) - Use when array is sorted');
    console.log('• Two Pointers: O(n) - Use for pair/triplet problems');
    console.log('• Sliding Window: O(n) - Use for subarray problems');
    console.log('• Backtracking: O(b^d) - Use to generate all solutions');
    console.log('• Greedy: O(n log n) - Use for optimization problems');
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

if (require.main === module) {
    runAllAlgorithmTests();
    displayAlgorithmComplexity();
    displayInterviewGuide();
}

module.exports = {
    runAllAlgorithmTests,
    displayAlgorithmComplexity,
    displayInterviewGuide,
};

