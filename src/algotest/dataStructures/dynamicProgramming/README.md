# Dynamic Programming Algorithms Collection

A comprehensive collection of dynamic programming algorithms implemented in JavaScript with detailed documentation, performance analysis, and extensive test suites.

## 📁 File Structure

```
dynamicProgramming/
├── Knapsack.js                    # Knapsack algorithms (0/1, Fractional, Unbounded)
├── LCS.js                         # Longest Common Subsequence algorithms
├── DynamicProgrammingTestRunner.js # Comprehensive test suite
└── README.md                      # This file
```

## 🚀 Quick Start

### Run All Tests
```bash
node DynamicProgrammingTestRunner.js
```

### Run Individual Algorithm Tests
```bash
node Knapsack.js
node LCS.js
```

### Import and Use
```javascript
const { knapsack01, fractionalKnapsack } = require('./Knapsack');
const { lcsDP, longestCommonSubstring } = require('./LCS');

// Knapsack example
const weights = [10, 20, 30];
const values = [60, 100, 120];
const capacity = 50;
const result = knapsack01(capacity, weights, values);

// LCS example
const str1 = 'ABCDGH';
const str2 = 'AEDFHR';
const lcs = lcsDP(str1, str2);
```

## 📊 Algorithm Overview

| Algorithm | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| **0/1 Knapsack** | O(n × W) | O(n × W) | n = items, W = capacity |
| **Fractional Knapsack** | O(n log n) | O(1) | Greedy approach |
| **Unbounded Knapsack** | O(n × W) | O(W) | Space optimized |
| **LCS Recursive** | O(2^(m+n)) | O(m+n) | Exponential - avoid for large inputs |
| **LCS Memoized** | O(m × n) | O(m × n) | m, n = string lengths |
| **LCS DP** | O(m × n) | O(m × n) | Optimal solution |
| **LCS Space Optimized** | O(m × n) | O(min(m,n)) | Space efficient |
| **Longest Common Substring** | O(m × n) | O(m × n) | Contiguous characters |
| **Edit Distance** | O(m × n) | O(m × n) | Levenshtein distance |
| **Subset Sum** | O(n × sum) | O(n × sum) | sum = target sum |

## 🔧 Features

### Each Algorithm Includes:
- ✅ **Basic Implementation** - Standard algorithm function
- ✅ **Step-by-Step Tracking** - Detailed execution steps
- ✅ **Multiple Variants** - Different approaches and optimizations
- ✅ **Comprehensive Tests** - Edge cases and performance tests
- ✅ **Detailed Documentation** - Time/space complexity analysis
- ✅ **Error Handling** - Input validation and error messages

### Advanced Features:
- 🎯 **Performance Comparison** - Benchmark different algorithms
- 📈 **Complexity Analysis** - Detailed complexity breakdown
- 🔍 **Algorithm Comparison** - Side-by-side performance testing
- 🧪 **Test Data Generation** - Various input patterns
- 📊 **Visualization Support** - Step-by-step execution tracking

## 📚 Algorithm Details

### 1. Knapsack Problems
**Optimization problems with capacity constraints**

#### 0/1 Knapsack
- Each item can be used at most once
- Dynamic programming solution
- Includes step-by-step tracking

```javascript
const { knapsack01 } = require('./Knapsack');
const result = knapsack01(capacity, weights, values);
// Returns: { maxValue, selectedItems, dp }
```

#### Fractional Knapsack
- Items can be taken in fractions
- Greedy algorithm (sort by value/weight ratio)
- Always optimal

```javascript
const { fractionalKnapsack } = require('./Knapsack');
const result = fractionalKnapsack(capacity, weights, values);
// Returns: { maxValue, selectedItems, totalWeight }
```

#### Unbounded Knapsack
- Each item can be used unlimited times
- Space-optimized DP solution

```javascript
const { unboundedKnapsack } = require('./Knapsack');
const result = unboundedKnapsack(capacity, weights, values);
// Returns: { maxValue, itemCounts }
```

### 2. Longest Common Subsequence (LCS)
**Find longest subsequence common to both strings**

#### Basic LCS
- Multiple implementations (recursive, memoized, DP)
- Space-optimized versions
- Step-by-step tracking

```javascript
const { lcsDP, lcsMemoized, lcsSpaceOptimized } = require('./LCS');
const result = lcsDP(str1, str2);
// Returns: { length, subsequence, dp }
```

#### Longest Common Substring
- Find longest contiguous substring
- Different from subsequence (must be contiguous)

```javascript
const { longestCommonSubstring } = require('./LCS');
const result = longestCommonSubstring(str1, str2);
// Returns: { length, substring, endIndex }
```

#### Edit Distance
- Minimum operations to convert str1 to str2
- Operations: Insert, Delete, Replace

```javascript
const { editDistance } = require('./LCS');
const result = editDistance(str1, str2);
// Returns: { distance, dp }
```

### 3. Additional DP Problems
**Subset Sum, Partition, Coin Change**

```javascript
const { subsetSum, canPartition, minCoinChange } = require('./Knapsack');

// Check if subset with given sum exists
const hasSubset = subsetSum([3, 34, 4, 12, 5, 2], 9);

// Check if array can be partitioned into equal sum subsets
const canPart = canPartition([1, 5, 11, 5]);

// Minimum coins to make amount
const minCoins = minCoinChange([1, 3, 4], 6);
```

## 🧪 Testing

### Individual Algorithm Tests
Each algorithm file includes comprehensive tests:
- Basic functionality
- Edge cases (empty inputs, single elements)
- Performance tests
- Step-by-step execution tracking

### Performance Comparison
The test runner provides:
- Multiple test data patterns
- Performance benchmarking
- Algorithm ranking
- Complexity analysis

### Example Test Output
```
🧪 COMPREHENSIVE DYNAMIC PROGRAMMING ALGORITHMS TEST SUITE 🧪

🎒 Testing Knapsack Algorithms...
Test 1: Basic 0/1 Knapsack
Weights: [10, 20, 30]
Values: [60, 100, 120]
Capacity: 50
Max Value: 220
Selected Items: [0, 1]
✅ Test 1 Passed

🔗 Testing LCS Algorithms...
Test 1: Basic LCS
String 1: ABCDGH
String 2: AEDFHR
LCS Length: 3
LCS: ADH
✅ Test 1 Passed
```

## 🎯 When to Use Each Algorithm

### **Knapsack Problems**
- **0/1 Knapsack** - Resource allocation, investment optimization
- **Fractional Knapsack** - When items can be divided (liquids, materials)
- **Unbounded Knapsack** - When unlimited quantities available

### **LCS Problems**
- **LCS** - DNA sequence alignment, version control diff
- **Longest Common Substring** - Plagiarism detection, pattern matching
- **Edit Distance** - Spell checking, fuzzy string matching

### **Special Cases**
- **Subset Sum** - Partition problems, target sum problems
- **Coin Change** - Currency systems, minimum change problems

## 🔧 Customization

### Custom Comparators
```javascript
const { knapsack01WithSteps } = require('./Knapsack');
const result = knapsack01WithSteps(capacity, weights, values);
console.log('Steps:', result.steps);
```

### Step-by-Step Analysis
```javascript
const { lcsWithSteps } = require('./LCS');
const result = lcsWithSteps(str1, str2);
console.log('Steps:', result.steps);
console.log('Comparisons:', result.comparisons);
```

## 📈 Performance Tips

1. **Choose the right algorithm** for your problem characteristics
2. **Use space-optimized versions** when memory is constrained
3. **Consider memoization** for recursive approaches
4. **Profile your specific use case** - theoretical complexity doesn't always match real-world performance
5. **Use iterative approaches** for very large inputs to avoid stack overflow

## 🤝 Contributing

This collection is designed to be educational and comprehensive. Each algorithm includes:
- Multiple implementation variants
- Detailed complexity analysis
- Extensive test coverage
- Clear documentation

Feel free to extend with additional DP algorithms or optimizations!

## 📝 License

This implementation is for educational purposes. Use responsibly in production environments.
