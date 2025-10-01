// =============================================================================
// KNAPSACK ALGORITHMS IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Solve various knapsack problems using different approaches
//
// TIME COMPLEXITY ANALYSIS:
// - 0/1 Knapsack (DP): O(n * W) where n = items, W = capacity
// - Fractional Knapsack (Greedy): O(n log n) for sorting
// - Unbounded Knapsack (DP): O(n * W)
//
// SPACE COMPLEXITY: O(n * W) for DP approaches, O(1) for greedy
//
// WHERE:
// n = number of items
// W = knapsack capacity
// =============================================================================

/**
 * 0/1 KNAPSACK PROBLEM - Dynamic Programming Solution
 *
 * PROBLEM: Given items with weights and values, maximize value in knapsack
 * CONSTRAINT: Each item can be used at most once
 *
 * ALGORITHM STEPS:
 * 1. Create DP table dp[i][w] = max value with first i items and capacity w
 * 2. For each item, decide whether to include it or not
 * 3. dp[i][w] = max(value[i-1] + dp[i-1][w-weight[i-1]], dp[i-1][w])
 * 4. Return maximum value and reconstruct solution
 *
 * Time Complexity: O(n * W)
 * Space Complexity: O(n * W)
 *
 * @param {number} capacity - Knapsack capacity
 * @param {number[]} weights - Array of item weights
 * @param {number[]} values - Array of item values
 * @returns {Object} - { maxValue: number, selectedItems: number[], dp: number[][] }
 */
function knapsack01(capacity, weights, values) {
    if (!Array.isArray(weights) || !Array.isArray(values)) {
        throw new Error('Weights and values must be arrays');
    }
    if (weights.length !== values.length) {
        throw new Error('Weights and values arrays must have same length');
    }
    if (capacity < 0) throw new Error('Capacity must be non-negative');
    if (weights.length === 0) return { maxValue: 0, selectedItems: [], dp: [] };

    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

    // Build DP table
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            // Don't include item i-1
            dp[i][w] = dp[i - 1][w];

            // Include item i-1 if it fits
            if (weights[i - 1] <= w) {
                const valueWithItem = values[i - 1] + dp[i - 1][w - weights[i - 1]];
                dp[i][w] = Math.max(dp[i][w], valueWithItem);
            }
        }
    }

    // Reconstruct solution
    const selectedItems = [];
    let w = capacity;
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.unshift(i - 1); // Item index
            w -= weights[i - 1];
        }
    }

    return {
        maxValue: dp[n][capacity],
        selectedItems,
        dp
    };
}

/**
 * 0/1 KNAPSACK WITH STEP-BY-STEP TRACKING
 *
 * @param {number} capacity - Knapsack capacity
 * @param {number[]} weights - Array of item weights
 * @param {number[]} values - Array of item values
 * @returns {Object} - { maxValue: number, selectedItems: number[], steps: Array }
 */
function knapsack01WithSteps(capacity, weights, values) {
    if (!Array.isArray(weights) || !Array.isArray(values)) {
        throw new Error('Weights and values must be arrays');
    }
    if (weights.length !== values.length) {
        throw new Error('Weights and values arrays must have same length');
    }
    if (capacity < 0) throw new Error('Capacity must be non-negative');
    if (weights.length === 0) return { maxValue: 0, selectedItems: [], steps: [] };

    const steps = [];
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

    steps.push({
        action: 'initialize',
        capacity: capacity,
        items: weights.map((w, i) => ({ index: i, weight: w, value: values[i] })),
        dp: JSON.parse(JSON.stringify(dp))
    });

    // Build DP table
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            const itemIndex = i - 1;
            const itemWeight = weights[itemIndex];
            const itemValue = values[itemIndex];

            // Don't include item
            dp[i][w] = dp[i - 1][w];

            // Include item if it fits
            if (itemWeight <= w) {
                const valueWithItem = itemValue + dp[i - 1][w - itemWeight];
                if (valueWithItem > dp[i][w]) {
                    dp[i][w] = valueWithItem;
                    steps.push({
                        action: 'include_item',
                        itemIndex: itemIndex,
                        itemWeight: itemWeight,
                        itemValue: itemValue,
                        capacity: w,
                        newValue: valueWithItem,
                        dp: JSON.parse(JSON.stringify(dp))
                    });
                } else {
                    steps.push({
                        action: 'skip_item',
                        itemIndex: itemIndex,
                        itemWeight: itemWeight,
                        itemValue: itemValue,
                        capacity: w,
                        reason: 'not_profitable',
                        dp: JSON.parse(JSON.stringify(dp))
                    });
                }
            } else {
                steps.push({
                    action: 'skip_item',
                    itemIndex: itemIndex,
                    itemWeight: itemWeight,
                    itemValue: itemValue,
                    capacity: w,
                    reason: 'too_heavy',
                    dp: JSON.parse(JSON.stringify(dp))
                });
            }
        }
    }

    // Reconstruct solution
    const selectedItems = [];
    let w = capacity;
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.unshift(i - 1);
            w -= weights[i - 1];
            steps.push({
                action: 'select_item',
                itemIndex: i - 1,
                remainingCapacity: w,
                selectedItems: [...selectedItems]
            });
        }
    }

    steps.push({
        action: 'complete',
        maxValue: dp[n][capacity],
        selectedItems: [...selectedItems],
        finalDp: JSON.parse(JSON.stringify(dp))
    });

    return {
        maxValue: dp[n][capacity],
        selectedItems,
        steps
    };
}

/**
 * FRACTIONAL KNAPSACK PROBLEM - Greedy Solution
 *
 * PROBLEM: Given items with weights and values, maximize value in knapsack
 * CONSTRAINT: Items can be taken in fractions
 *
 * ALGORITHM STEPS:
 * 1. Calculate value-to-weight ratio for each item
 * 2. Sort items by ratio in descending order
 * 3. Take items greedily until knapsack is full
 *
 * Time Complexity: O(n log n) - dominated by sorting
 * Space Complexity: O(1)
 *
 * @param {number} capacity - Knapsack capacity
 * @param {number[]} weights - Array of item weights
 * @param {number[]} values - Array of item values
 * @returns {Object} - { maxValue: number, selectedItems: Array, totalWeight: number }
 */
function fractionalKnapsack(capacity, weights, values) {
    if (!Array.isArray(weights) || !Array.isArray(values)) {
        throw new Error('Weights and values must be arrays');
    }
    if (weights.length !== values.length) {
        throw new Error('Weights and values arrays must have same length');
    }
    if (capacity < 0) throw new Error('Capacity must be non-negative');
    if (weights.length === 0) return { maxValue: 0, selectedItems: [], totalWeight: 0 };

    const n = weights.length;
    const items = [];

    // Create items with value-to-weight ratio
    for (let i = 0; i < n; i++) {
        items.push({
            index: i,
            weight: weights[i],
            value: values[i],
            ratio: values[i] / weights[i]
        });
    }

    // Sort by ratio in descending order
    items.sort((a, b) => b.ratio - a.ratio);

    let maxValue = 0;
    let remainingCapacity = capacity;
    const selectedItems = [];

    // Take items greedily
    for (const item of items) {
        if (remainingCapacity <= 0) break;

        if (item.weight <= remainingCapacity) {
            // Take entire item
            selectedItems.push({
                index: item.index,
                weight: item.weight,
                value: item.value,
                fraction: 1.0
            });
            maxValue += item.value;
            remainingCapacity -= item.weight;
        } else {
            // Take fraction of item
            const fraction = remainingCapacity / item.weight;
            selectedItems.push({
                index: item.index,
                weight: remainingCapacity,
                value: item.value * fraction,
                fraction: fraction
            });
            maxValue += item.value * fraction;
            remainingCapacity = 0;
        }
    }

    return {
        maxValue,
        selectedItems,
        totalWeight: capacity - remainingCapacity
    };
}

/**
 * UNBOUNDED KNAPSACK PROBLEM - Dynamic Programming Solution
 *
 * PROBLEM: Given items with weights and values, maximize value in knapsack
 * CONSTRAINT: Each item can be used unlimited times
 *
 * Time Complexity: O(n * W)
 * Space Complexity: O(W) - space optimized
 *
 * @param {number} capacity - Knapsack capacity
 * @param {number[]} weights - Array of item weights
 * @param {number[]} values - Array of item values
 * @returns {Object} - { maxValue: number, itemCounts: number[] }
 */
function unboundedKnapsack(capacity, weights, values) {
    if (!Array.isArray(weights) || !Array.isArray(values)) {
        throw new Error('Weights and values must be arrays');
    }
    if (weights.length !== values.length) {
        throw new Error('Weights and values arrays must have same length');
    }
    if (capacity < 0) throw new Error('Capacity must be non-negative');
    if (weights.length === 0) return { maxValue: 0, itemCounts: [] };

    const n = weights.length;
    const dp = Array(capacity + 1).fill(0);
    const itemCounts = Array(n).fill(0);

    // Build DP array
    for (let w = 1; w <= capacity; w++) {
        for (let i = 0; i < n; i++) {
            if (weights[i] <= w) {
                const valueWithItem = values[i] + dp[w - weights[i]];
                if (valueWithItem > dp[w]) {
                    dp[w] = valueWithItem;
                }
            }
        }
    }

    // Reconstruct solution to find item counts
    let remainingCapacity = capacity;
    while (remainingCapacity > 0) {
        let bestItem = -1;
        let bestValue = 0;

        for (let i = 0; i < n; i++) {
            if (weights[i] <= remainingCapacity) {
                const valueWithItem = values[i] + dp[remainingCapacity - weights[i]];
                if (valueWithItem > bestValue) {
                    bestValue = valueWithItem;
                    bestItem = i;
                }
            }
        }

        if (bestItem === -1) break;

        itemCounts[bestItem]++;
        remainingCapacity -= weights[bestItem];
    }

    return {
        maxValue: dp[capacity],
        itemCounts
    };
}

/**
 * SUBSET SUM PROBLEM - Check if subset with given sum exists
 *
 * @param {number[]} arr - Array of numbers
 * @param {number} sum - Target sum
 * @returns {boolean} - True if subset exists
 */
function subsetSum(arr, sum) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (sum < 0) throw new Error('Sum must be non-negative');
    if (arr.length === 0) return sum === 0;

    const n = arr.length;
    const dp = Array(n + 1).fill().map(() => Array(sum + 1).fill(false));

    // Initialize first column (sum = 0)
    for (let i = 0; i <= n; i++) {
        dp[i][0] = true;
    }

    // Fill DP table
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= sum; j++) {
            // Don't include current element
            dp[i][j] = dp[i - 1][j];

            // Include current element if it's not greater than sum
            if (arr[i - 1] <= j) {
                dp[i][j] = dp[i][j] || dp[i - 1][j - arr[i - 1]];
            }
        }
    }

    return dp[n][sum];
}

/**
 * PARTITION EQUAL SUBSET SUM - Check if array can be partitioned into equal sum subsets
 *
 * @param {number[]} arr - Array of numbers
 * @returns {boolean} - True if partition is possible
 */
function canPartition(arr) {
    if (!Array.isArray(arr)) throw new Error('Input must be an array');
    if (arr.length === 0) return true;

    const totalSum = arr.reduce((sum, num) => sum + num, 0);

    // If total sum is odd, can't partition into equal subsets
    if (totalSum % 2 !== 0) return false;

    const targetSum = totalSum / 2;
    return subsetSum(arr, targetSum);
}

/**
 * MINIMUM COIN CHANGE - Minimum number of coins to make amount
 *
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Target amount
 * @returns {number} - Minimum number of coins, -1 if impossible
 */
function minCoinChange(coins, amount) {
    if (!Array.isArray(coins)) throw new Error('Coins must be an array');
    if (amount < 0) throw new Error('Amount must be non-negative');
    if (amount === 0) return 0;

    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

// =============================================================================
// KNAPSACK ALGORITHMS TEST SUITE
// =============================================================================

function runKnapsackTests() {
    console.log('🎒 KNAPSACK ALGORITHMS TESTS 🎒\n');

    // Test Case 1: Basic 0/1 Knapsack
    console.log('Test 1: Basic 0/1 Knapsack');
    const weights1 = [10, 20, 30];
    const values1 = [60, 100, 120];
    const capacity1 = 50;
    const result1 = knapsack01(capacity1, weights1, values1);
    console.log('Weights:', weights1);
    console.log('Values:', values1);
    console.log('Capacity:', capacity1);
    console.log('Max Value:', result1.maxValue);
    console.log('Selected Items:', result1.selectedItems);
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Fractional Knapsack
    console.log('Test 2: Fractional Knapsack');
    const weights2 = [10, 20, 30];
    const values2 = [60, 100, 120];
    const capacity2 = 50;
    const result2 = fractionalKnapsack(capacity2, weights2, values2);
    console.log('Weights:', weights2);
    console.log('Values:', values2);
    console.log('Capacity:', capacity2);
    console.log('Max Value:', result2.maxValue);
    console.log('Selected Items:', result2.selectedItems);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Unbounded Knapsack
    console.log('Test 3: Unbounded Knapsack');
    const weights3 = [1, 3, 4, 5];
    const values3 = [10, 40, 50, 70];
    const capacity3 = 8;
    const result3 = unboundedKnapsack(capacity3, weights3, values3);
    console.log('Weights:', weights3);
    console.log('Values:', values3);
    console.log('Capacity:', capacity3);
    console.log('Max Value:', result3.maxValue);
    console.log('Item Counts:', result3.itemCounts);
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Step-by-step tracking
    console.log('Test 4: 0/1 Knapsack with Steps');
    const weights4 = [2, 3, 4, 5];
    const values4 = [3, 4, 5, 6];
    const capacity4 = 5;
    const result4 = knapsack01WithSteps(capacity4, weights4, values4);
    console.log('Weights:', weights4);
    console.log('Values:', values4);
    console.log('Capacity:', capacity4);
    console.log('Max Value:', result4.maxValue);
    console.log('Selected Items:', result4.selectedItems);
    console.log('Total Steps:', result4.steps.length);
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: Subset Sum
    console.log('Test 5: Subset Sum');
    const arr5 = [3, 34, 4, 12, 5, 2];
    const sum5 = 9;
    const result5 = subsetSum(arr5, sum5);
    console.log('Array:', arr5);
    console.log('Target Sum:', sum5);
    console.log('Subset exists:', result5);
    console.log('✅ Test 5 Passed\n');

    // Test Case 6: Partition Equal Subset Sum
    console.log('Test 6: Partition Equal Subset Sum');
    const arr6 = [1, 5, 11, 5];
    const result6 = canPartition(arr6);
    console.log('Array:', arr6);
    console.log('Can partition:', result6);
    console.log('✅ Test 6 Passed\n');

    // Test Case 7: Minimum Coin Change
    console.log('Test 7: Minimum Coin Change');
    const coins7 = [1, 3, 4];
    const amount7 = 6;
    const result7 = minCoinChange(coins7, amount7);
    console.log('Coins:', coins7);
    console.log('Amount:', amount7);
    console.log('Minimum coins:', result7);
    console.log('✅ Test 7 Passed\n');

    // Test Case 8: Edge Cases
    console.log('Test 8: Edge Cases');
    const emptyResult = knapsack01(10, [], []);
    console.log('Empty arrays:', emptyResult);

    const zeroCapacity = knapsack01(0, [1, 2], [3, 4]);
    console.log('Zero capacity:', zeroCapacity);
    console.log('✅ Test 8 Passed\n');

    console.log('🎉 All Knapsack tests passed!');
}

// Export functions for use in other modules
module.exports = {
    knapsack01,
    knapsack01WithSteps,
    fractionalKnapsack,
    unboundedKnapsack,
    subsetSum,
    canPartition,
    minCoinChange,
    runKnapsackTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runKnapsackTests();
}
