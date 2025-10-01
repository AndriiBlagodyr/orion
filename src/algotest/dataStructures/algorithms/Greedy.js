/**
 * Greedy Algorithms
 *
 * Greedy algorithms make locally optimal choices at each step with the hope
 * that these choices will lead to a globally optimal solution.
 *
 * Common Patterns:
 * - Activity Selection Problem
 * - Fractional Knapsack
 * - Minimum Spanning Tree (Prim's, Kruskal's)
 * - Huffman Coding
 * - Interval Scheduling
 * - Coin Change (greedy approach)
 *
 * Time Complexity: Usually O(n log n) due to sorting
 * Space Complexity: Usually O(1) or O(n)
 */

// Activity Selection Problem
function activitySelection(activities) {
    // Sort by finish time
    activities.sort((a, b) => a.finish - b.finish);

    const selected = [activities[0]];
    let lastFinishTime = activities[0].finish;

    for (let i = 1; i < activities.length; i++) {
        if (activities[i].start >= lastFinishTime) {
            selected.push(activities[i]);
            lastFinishTime = activities[i].finish;
        }
    }

    return selected;
}

// Fractional Knapsack (Greedy Approach)
function fractionalKnapsack(items, capacity) {
    // Sort by value/weight ratio in descending order
    items.sort((a, b) => (b.value / b.weight) - (a.value / a.weight));

    let totalValue = 0;
    let remainingCapacity = capacity;
    const selectedItems = [];

    for (let item of items) {
        if (remainingCapacity >= item.weight) {
            // Take the entire item
            selectedItems.push({
                ...item,
                fraction: 1,
                takenValue: item.value
            });
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else if (remainingCapacity > 0) {
            // Take a fraction of the item
            const fraction = remainingCapacity / item.weight;
            selectedItems.push({
                ...item,
                fraction: fraction,
                takenValue: item.value * fraction
            });
            totalValue += item.value * fraction;
            remainingCapacity = 0;
        }
    }

    return {
        totalValue: totalValue,
        selectedItems: selectedItems
    };
}

// Minimum Number of Coins (Greedy - works for certain coin systems)
function minCoinsGreedy(coins, amount) {
    // Sort coins in descending order
    coins.sort((a, b) => b - a);

    let count = 0;
    let remaining = amount;
    const usedCoins = [];

    for (let coin of coins) {
        if (remaining >= coin) {
            const numCoins = Math.floor(remaining / coin);
            count += numCoins;
            remaining -= numCoins * coin;
            usedCoins.push({ coin, count: numCoins });
        }
    }

    return remaining === 0 ? { count, usedCoins } : -1;
}

// Interval Scheduling (Maximum Number of Non-overlapping Intervals)
function intervalScheduling(intervals) {
    // Sort by end time
    intervals.sort((a, b) => a.end - b.end);

    const selected = [];
    let lastEndTime = -Infinity;

    for (let interval of intervals) {
        if (interval.start >= lastEndTime) {
            selected.push(interval);
            lastEndTime = interval.end;
        }
    }

    return selected;
}

// Minimum Platforms Required
function minPlatforms(arrivals, departures) {
    arrivals.sort((a, b) => a - b);
    departures.sort((a, b) => a - b);

    let platforms = 1;
    let maxPlatforms = 1;
    let arrivalIndex = 1;
    let departureIndex = 0;

    while (arrivalIndex < arrivals.length && departureIndex < departures.length) {
        if (arrivals[arrivalIndex] <= departures[departureIndex]) {
            platforms++;
            arrivalIndex++;
        } else {
            platforms--;
            departureIndex++;
        }

        maxPlatforms = Math.max(maxPlatforms, platforms);
    }

    return maxPlatforms;
}

// Job Sequencing with Deadlines
function jobSequencing(jobs) {
    // Sort by profit in descending order
    jobs.sort((a, b) => b.profit - a.profit);

    const maxDeadline = Math.max(...jobs.map(job => job.deadline));
    const schedule = new Array(maxDeadline).fill(null);
    let totalProfit = 0;

    for (let job of jobs) {
        // Find latest available slot
        for (let i = job.deadline - 1; i >= 0; i--) {
            if (schedule[i] === null) {
                schedule[i] = job;
                totalProfit += job.profit;
                break;
            }
        }
    }

    return {
        schedule: schedule.filter(job => job !== null),
        totalProfit: totalProfit
    };
}

// Huffman Coding (Simplified)
function huffmanCoding(frequencies) {
    // Create priority queue (min heap)
    const heap = [];

    for (let char in frequencies) {
        heap.push({
            char: char,
            freq: frequencies[char],
            left: null,
            right: null
        });
    }

    // Sort by frequency
    heap.sort((a, b) => a.freq - b.freq);

    // Build Huffman tree
    while (heap.length > 1) {
        const left = heap.shift();
        const right = heap.shift();

        const merged = {
            char: null,
            freq: left.freq + right.freq,
            left: left,
            right: right
        };

        heap.push(merged);
        heap.sort((a, b) => a.freq - b.freq);
    }

    // Generate codes
    const codes = {};
    function generateCodes(node, code = '') {
        if (node.char !== null) {
            codes[node.char] = code;
            return;
        }

        generateCodes(node.left, code + '0');
        generateCodes(node.right, code + '1');
    }

    generateCodes(heap[0]);
    return codes;
}

// Gas Station Problem
function canCompleteCircuit(gas, cost) {
    let totalTank = 0;
    let currentTank = 0;
    let startStation = 0;

    for (let i = 0; i < gas.length; i++) {
        totalTank += gas[i] - cost[i];
        currentTank += gas[i] - cost[i];

        if (currentTank < 0) {
            startStation = i + 1;
            currentTank = 0;
        }
    }

    return totalTank >= 0 ? startStation : -1;
}

// Maximum Product Subarray
function maxProductSubarray(nums) {
    let maxProduct = nums[0];
    let minProduct = nums[0];
    let result = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < 0) {
            [maxProduct, minProduct] = [minProduct, maxProduct];
        }

        maxProduct = Math.max(nums[i], maxProduct * nums[i]);
        minProduct = Math.min(nums[i], minProduct * nums[i]);

        result = Math.max(result, maxProduct);
    }

    return result;
}

// Test Functions
function runGreedyTests() {
    console.log('💰 Greedy Algorithms Tests\n');

    // Test 1: Activity Selection
    console.log('Test 1: Activity Selection');
    const activities = [
        { start: 1, finish: 3, name: 'A' },
        { start: 2, finish: 5, name: 'B' },
        { start: 0, finish: 6, name: 'C' },
        { start: 5, finish: 7, name: 'D' },
        { start: 8, finish: 9, name: 'E' },
        { start: 5, finish: 9, name: 'F' }
    ];
    console.log('Activities:', activities);
    console.log('Selected activities:', activitySelection(activities));
    console.log();

    // Test 2: Fractional Knapsack
    console.log('Test 2: Fractional Knapsack');
    const items = [
        { weight: 10, value: 60, name: 'A' },
        { weight: 20, value: 100, name: 'B' },
        { weight: 30, value: 120, name: 'C' }
    ];
    const capacity = 50;
    console.log('Items:', items, 'Capacity:', capacity);
    console.log('Result:', fractionalKnapsack(items, capacity));
    console.log();

    // Test 3: Minimum Coins (Greedy)
    console.log('Test 3: Minimum Coins (Greedy)');
    const coins = [1, 5, 10, 25];
    const amount = 67;
    console.log('Coins:', coins, 'Amount:', amount);
    console.log('Result:', minCoinsGreedy(coins, amount));
    console.log();

    // Test 4: Interval Scheduling
    console.log('Test 4: Interval Scheduling');
    const intervals = [
        { start: 1, end: 3 },
        { start: 2, end: 5 },
        { start: 4, end: 6 },
        { start: 7, end: 9 }
    ];
    console.log('Intervals:', intervals);
    console.log('Selected intervals:', intervalScheduling(intervals));
    console.log();

    // Test 5: Minimum Platforms
    console.log('Test 5: Minimum Platforms');
    const arrivals = [900, 940, 950, 1100, 1500, 1800];
    const departures = [910, 1200, 1120, 1130, 1900, 2000];
    console.log('Arrivals:', arrivals);
    console.log('Departures:', departures);
    console.log('Minimum platforms:', minPlatforms(arrivals, departures));
    console.log();

    // Test 6: Job Sequencing
    console.log('Test 6: Job Sequencing');
    const jobs = [
        { id: 'A', deadline: 2, profit: 100 },
        { id: 'B', deadline: 1, profit: 19 },
        { id: 'C', deadline: 2, profit: 27 },
        { id: 'D', deadline: 1, profit: 25 },
        { id: 'E', deadline: 3, profit: 15 }
    ];
    console.log('Jobs:', jobs);
    console.log('Result:', jobSequencing(jobs));
    console.log();

    // Test 7: Huffman Coding
    console.log('Test 7: Huffman Coding');
    const frequencies = { 'a': 5, 'b': 9, 'c': 12, 'd': 13, 'e': 16, 'f': 45 };
    console.log('Frequencies:', frequencies);
    console.log('Huffman codes:', huffmanCoding(frequencies));
    console.log();

    // Test 8: Gas Station
    console.log('Test 8: Gas Station');
    const gas = [1, 2, 3, 4, 5];
    const cost = [3, 4, 5, 1, 2];
    console.log('Gas:', gas);
    console.log('Cost:', cost);
    console.log('Start station:', canCompleteCircuit(gas, cost));
    console.log();

    // Test 9: Maximum Product Subarray
    console.log('Test 9: Maximum Product Subarray');
    const nums = [2, 3, -2, 4];
    console.log('Array:', nums);
    console.log('Max product:', maxProductSubarray(nums));
    console.log();
}

// Export functions
module.exports = {
    activitySelection,
    fractionalKnapsack,
    minCoinsGreedy,
    intervalScheduling,
    minPlatforms,
    jobSequencing,
    huffmanCoding,
    canCompleteCircuit,
    maxProductSubarray,
    runGreedyTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runGreedyTests();
}
