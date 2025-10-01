// =============================================================================
// DYNAMIC PROGRAMMING ALGORITHMS TEST RUNNER
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Run all dynamic programming algorithm tests and performance comparisons
// =============================================================================

const {
    knapsack01,
    knapsack01WithSteps,
    fractionalKnapsack,
    unboundedKnapsack,
    subsetSum,
    canPartition,
    minCoinChange,
    runKnapsackTests
} = require('./Knapsack');

const {
    lcsRecursive,
    lcsMemoized,
    lcsDP,
    lcsSpaceOptimized,
    lcsWithSteps,
    longestCommonSubstring,
    longestCommonSubstringSpaceOptimized,
    editDistance,
    shortestCommonSupersequence,
    runLCSTests
} = require('./LCS');

// =============================================================================
// PERFORMANCE COMPARISON SUITE
// =============================================================================

function generateTestData(type, size) {
    switch (type) {
        case 'knapsack':
            return {
                weights: Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 1),
                values: Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1),
                capacity: Math.floor(size * 25)
            };
        case 'strings':
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return {
                str1: Array.from({ length: size }, () => chars[Math.floor(Math.random() * chars.length)]).join(''),
                str2: Array.from({ length: size }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
            };
        default:
            return {};
    }
}

function runPerformanceComparison() {
    console.log('🚀 DYNAMIC PROGRAMMING ALGORITHMS PERFORMANCE COMPARISON 🚀\n');

    // Knapsack Performance Tests
    console.log('📦 KNAPSACK ALGORITHMS PERFORMANCE');
    console.log('='.repeat(50));

    const knapsackSizes = [10, 20, 50];
    for (const size of knapsackSizes) {
        console.log(`\nSize: ${size} items`);
        console.log('-'.repeat(30));

        const testData = generateTestData('knapsack', size);

        try {
            const startTime = performance.now();
            const result = knapsack01(testData.capacity, testData.weights, testData.values);
            const endTime = performance.now();
            console.log(`✅ 0/1 Knapsack: ${(endTime - startTime).toFixed(2)}ms (Value: ${result.maxValue})`);
        } catch (error) {
            console.log(`❌ 0/1 Knapsack: Error - ${error.message}`);
        }

        try {
            const startTime = performance.now();
            const result = fractionalKnapsack(testData.capacity, testData.weights, testData.values);
            const endTime = performance.now();
            console.log(`✅ Fractional Knapsack: ${(endTime - startTime).toFixed(2)}ms (Value: ${result.maxValue})`);
        } catch (error) {
            console.log(`❌ Fractional Knapsack: Error - ${error.message}`);
        }

        try {
            const startTime = performance.now();
            const result = unboundedKnapsack(testData.capacity, testData.weights, testData.values);
            const endTime = performance.now();
            console.log(`✅ Unbounded Knapsack: ${(endTime - startTime).toFixed(2)}ms (Value: ${result.maxValue})`);
        } catch (error) {
            console.log(`❌ Unbounded Knapsack: Error - ${error.message}`);
        }
    }

    // LCS Performance Tests
    console.log('\n🔗 LCS ALGORITHMS PERFORMANCE');
    console.log('='.repeat(50));

    const stringSizes = [50, 100, 200];
    for (const size of stringSizes) {
        console.log(`\nSize: ${size} characters each`);
        console.log('-'.repeat(30));

        const testData = generateTestData('strings', size);

        try {
            const startTime = performance.now();
            const result = lcsMemoized(testData.str1, testData.str2);
            const endTime = performance.now();
            console.log(`✅ LCS Memoized: ${(endTime - startTime).toFixed(2)}ms (Length: ${result})`);
        } catch (error) {
            console.log(`❌ LCS Memoized: Error - ${error.message}`);
        }

        try {
            const startTime = performance.now();
            const result = lcsDP(testData.str1, testData.str2);
            const endTime = performance.now();
            console.log(`✅ LCS DP: ${(endTime - startTime).toFixed(2)}ms (Length: ${result.length})`);
        } catch (error) {
            console.log(`❌ LCS DP: Error - ${error.message}`);
        }

        try {
            const startTime = performance.now();
            const result = lcsSpaceOptimized(testData.str1, testData.str2);
            const endTime = performance.now();
            console.log(`✅ LCS Space Optimized: ${(endTime - startTime).toFixed(2)}ms (Length: ${result})`);
        } catch (error) {
            console.log(`❌ LCS Space Optimized: Error - ${error.message}`);
        }

        try {
            const startTime = performance.now();
            const result = longestCommonSubstring(testData.str1, testData.str2);
            const endTime = performance.now();
            console.log(
                `✅ Longest Common Substring: ${(endTime - startTime).toFixed(2)}ms (Length: ${result.length})`,
            );
        } catch (error) {
            console.log(`❌ Longest Common Substring: Error - ${error.message}`);
        }
    }
}

// =============================================================================
// COMPREHENSIVE TEST SUITE
// =============================================================================

function runAllDynamicProgrammingTests() {
    console.log('🧪 COMPREHENSIVE DYNAMIC PROGRAMMING ALGORITHMS TEST SUITE 🧪\n');
    console.log('='.repeat(70));

    try {
        console.log('\n🎒 Testing Knapsack Algorithms...');
        runKnapsackTests();

        console.log('\n🔗 Testing LCS Algorithms...');
        runLCSTests();

        console.log('\n🚀 Running Performance Comparison...');
        runPerformanceComparison();

        console.log('\n🎉 ALL DYNAMIC PROGRAMMING ALGORITHM TESTS COMPLETED SUCCESSFULLY! 🎉');
    } catch (error) {
        console.error('❌ Test suite failed:', error.message);
        console.error(error.stack);
    }
}

// =============================================================================
// ALGORITHM COMPARISON UTILITIES
// =============================================================================

function compareKnapsackAlgorithms(capacity, weights, values) {
    console.log(`\n🎒 Comparing Knapsack algorithms:`);
    console.log(`Capacity: ${capacity}, Items: ${weights.length}`);
    console.log('='.repeat(60));

    const algorithms = [
        {name: '0/1 Knapsack', fn: knapsack01},
        {name: 'Fractional Knapsack', fn: fractionalKnapsack},
        {name: 'Unbounded Knapsack', fn: unboundedKnapsack},
    ];

    const results = [];

    for (const algorithm of algorithms) {
        try {
            const startTime = performance.now();
            const result = algorithm.fn(capacity, weights, values);
            const endTime = performance.now();
            const time = endTime - startTime;

            results.push({
                name: algorithm.name,
                time: time,
                value: result.maxValue || result.maxValue,
                correct: true,
            });

            console.log(
                `${algorithm.name.padEnd(25)}: ${time.toFixed(2)}ms (Value: ${result.maxValue || result.maxValue}) ✅`,
            );
        } catch (error) {
            console.log(`${algorithm.name.padEnd(25)}: Error - ${error.message} ❌`);
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

function compareLCSAlgorithms(str1, str2) {
    console.log(`\n🔗 Comparing LCS algorithms:`);
    console.log(`String 1: "${str1}" (${str1.length} chars)`);
    console.log(`String 2: "${str2}" (${str2.length} chars)`);
    console.log('='.repeat(60));

    const algorithms = [
        {name: 'LCS Recursive', fn: lcsRecursive},
        {name: 'LCS Memoized', fn: lcsMemoized},
        {name: 'LCS DP', fn: (s1, s2) => lcsDP(s1, s2).length},
        {name: 'LCS Space Optimized', fn: lcsSpaceOptimized},
    ];

    const results = [];

    for (const algorithm of algorithms) {
        try {
            const startTime = performance.now();
            const result = algorithm.fn(str1, str2);
            const endTime = performance.now();
            const time = endTime - startTime;

            results.push({
                name: algorithm.name,
                time: time,
                length: result,
                correct: true,
            });

            console.log(`${algorithm.name.padEnd(25)}: ${time.toFixed(2)}ms (Length: ${result}) ✅`);
        } catch (error) {
            console.log(`${algorithm.name.padEnd(25)}: Error - ${error.message} ❌`);
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

function analyzeDPComplexity() {
    console.log('\n📈 DYNAMIC PROGRAMMING COMPLEXITY ANALYSIS 📈');
    console.log('='.repeat(60));

    const complexities = [
        {name: '0/1 Knapsack', time: 'O(n × W)', space: 'O(n × W)', notes: 'n = items, W = capacity'},
        {name: 'Fractional Knapsack', time: 'O(n log n)', space: 'O(1)', notes: 'Greedy approach'},
        {name: 'Unbounded Knapsack', time: 'O(n × W)', space: 'O(W)', notes: 'Space optimized'},
        {name: 'LCS Recursive', time: 'O(2^(m+n))', space: 'O(m+n)', notes: 'Exponential - avoid for large inputs'},
        {name: 'LCS Memoized', time: 'O(m × n)', space: 'O(m × n)', notes: 'm, n = string lengths'},
        {name: 'LCS DP', time: 'O(m × n)', space: 'O(m × n)', notes: 'Optimal solution'},
        {name: 'LCS Space Optimized', time: 'O(m × n)', space: 'O(min(m,n))', notes: 'Space efficient'},
        {name: 'Longest Common Substring', time: 'O(m × n)', space: 'O(m × n)', notes: 'Contiguous characters'},
        {name: 'Edit Distance', time: 'O(m × n)', space: 'O(m × n)', notes: 'Levenshtein distance'},
        {name: 'Subset Sum', time: 'O(n × sum)', space: 'O(n × sum)', notes: 'sum = target sum'},
    ];

    console.log('Algorithm'.padEnd(25) + 'Time'.padEnd(15) + 'Space'.padEnd(15) + 'Notes');
    console.log('-'.repeat(80));

    complexities.forEach(comp => {
        console.log(comp.name.padEnd(25) + comp.time.padEnd(15) + comp.space.padEnd(15) + comp.notes);
    });
}

// =============================================================================
// PRACTICAL EXAMPLES
// =============================================================================

function runPracticalExamples() {
    console.log('\n💼 PRACTICAL EXAMPLES 💼');
    console.log('='.repeat(50));

    // Example 1: Investment Portfolio Optimization
    console.log('\n📈 Example 1: Investment Portfolio Optimization');
    const investments = {
        weights: [10, 20, 30, 15, 25], // Investment amounts
        values: [15, 25, 35, 20, 30], // Expected returns
        capacity: 50, // Available capital
    };

    const portfolio = knapsack01(investments.capacity, investments.weights, investments.values);
    console.log('Investment amounts:', investments.weights);
    console.log('Expected returns:', investments.values);
    console.log('Available capital:', investments.capacity);
    console.log('Optimal portfolio value:', portfolio.maxValue);
    console.log(
        'Selected investments:',
        portfolio.selectedItems.map(i => `Investment ${i + 1}`),
    );

    // Example 2: DNA Sequence Alignment
    console.log('\n🧬 Example 2: DNA Sequence Alignment');
    const dna1 = 'ATCGATCG';
    const dna2 = 'TCGATCG';
    const alignment = lcsDP(dna1, dna2);
    console.log('DNA Sequence 1:', dna1);
    console.log('DNA Sequence 2:', dna2);
    console.log('Common subsequence length:', alignment.length);
    console.log('Common subsequence:', alignment.subsequence);

    // Example 3: Text Similarity
    console.log('\n📝 Example 3: Text Similarity Analysis');
    const text1 = 'algorithm';
    const text2 = 'logarithm';
    const similarity = editDistance(text1, text2);
    console.log('Text 1:', text1);
    console.log('Text 2:', text2);
    console.log('Edit distance:', similarity.distance);
    console.log('Similarity score:', (1 - similarity.distance / Math.max(text1.length, text2.length)) * 100 + '%');

    // Example 4: Resource Allocation
    console.log('\n⚖️ Example 4: Resource Allocation');
    const resources = {
        weights: [5, 10, 15, 20], // Resource requirements
        values: [10, 20, 30, 40], // Resource values
        capacity: 30, // Available resources
    };

    const allocation = fractionalKnapsack(resources.capacity, resources.weights, resources.values);
    console.log('Resource requirements:', resources.weights);
    console.log('Resource values:', resources.values);
    console.log('Available resources:', resources.capacity);
    console.log('Optimal allocation value:', allocation.maxValue);
    console.log('Allocation details:', allocation.selectedItems);
}

// Export functions for use in other modules
module.exports = {
    runAllDynamicProgrammingTests,
    runPerformanceComparison,
    compareKnapsackAlgorithms,
    compareLCSAlgorithms,
    analyzeDPComplexity,
    runPracticalExamples,
    generateTestData
};

// Run all tests if this file is executed directly
if (require.main === module) {
    runAllDynamicProgrammingTests();
    analyzeDPComplexity();
    runPracticalExamples();
}
