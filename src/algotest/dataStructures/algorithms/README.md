# Algorithms Collection

A comprehensive collection of essential algorithms for tech interviews, organized by technique and complexity.

## 📁 File Structure

```
algorithms/
├── BinarySearch.js           # Binary Search algorithms
├── TwoPointers.js            # Two Pointers technique
├── SlidingWindow.js          # Sliding Window technique
├── Backtracking.js           # Backtracking algorithms
├── Greedy.js                 # Greedy algorithms
├── AlgorithmsTestRunner.js   # Comprehensive test suite
└── README.md                 # This file
```

## 🚀 Quick Start

### Run All Tests
```bash
node AlgorithmsTestRunner.js
```

### Run Individual Algorithm Tests
```bash
node BinarySearch.js
node TwoPointers.js
node SlidingWindow.js
node Backtracking.js
node Greedy.js
```

### Import and Use
```javascript
const { binarySearch, findFirstOccurrence } = require('./BinarySearch');
const { twoSum, removeDuplicates } = require('./TwoPointers');
const { maxSumSubarray, minSubarrayLen } = require('./SlidingWindow');
const { permute, subsets, solveNQueens } = require('./Backtracking');
const { activitySelection, fractionalKnapsack } = require('./Greedy');
```

## 📊 Algorithm Overview

| Algorithm | Best Case | Average Case | Worst Case | Space | Category | Notes |
|-----------|-----------|--------------|------------|-------|----------|-------|
| **Binary Search** | O(1) | O(log n) | O(log n) | O(1) | Search | Sorted arrays |
| **Two Pointers** | O(n) | O(n) | O(n) | O(1) | Array/String | Pair problems |
| **Sliding Window** | O(n) | O(n) | O(n) | O(1) | Array/String | Subarray problems |
| **Backtracking** | O(b^d) | O(b^d) | O(b^d) | O(d) | Generate | All solutions |
| **Greedy** | O(n log n) | O(n log n) | O(n log n) | O(1) | Optimization | Local optimum |

*Where: n = input size, b = branching factor, d = depth*

## 🔧 Features

### Each Algorithm Includes:
- ✅ **Multiple Variants** - Different approaches and optimizations
- ✅ **Comprehensive Tests** - Edge cases and performance tests
- ✅ **Detailed Documentation** - Time/space complexity analysis
- ✅ **Error Handling** - Input validation and error messages
- ✅ **Real-world Examples** - Common interview problems

### Advanced Features:
- 🎯 **Performance Comparison** - Benchmark different approaches
- 📈 **Complexity Analysis** - Detailed complexity breakdown
- 🧪 **Test Data Generation** - Various input patterns
- 📊 **Interview Guide** - Company-specific preparation tips

## 📚 Algorithm Details

### 1. Binary Search
**Efficient search in sorted arrays**
- Basic binary search
- Find first/last occurrence
- Search in rotated arrays
- Peak finding
- Custom comparators

```javascript
const { binarySearch, findFirstOccurrence, searchRotatedArray } = require('./BinarySearch');
const index = binarySearch([1, 3, 5, 7, 9], 5); // 2
const first = findFirstOccurrence([1, 2, 2, 2, 3], 2); // 1
const rotated = searchRotatedArray([4, 5, 6, 7, 0, 1, 2], 0); // 4
```

### 2. Two Pointers
**Technique for array and string problems**
- Two sum problems
- Remove duplicates
- Palindrome checking
- Container with most water
- Trapping rain water

```javascript
const { twoSum, removeDuplicates, isPalindrome, maxArea } = require('./TwoPointers');
const indices = twoSum([2, 7, 11, 15], 9); // [0, 1]
const length = removeDuplicates([1, 1, 2, 2, 3]); // 3
const isPal = isPalindrome("A man, a plan, a canal: Panama"); // true
const area = maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]); // 49
```

### 3. Sliding Window
**Technique for subarray/substring problems**
- Maximum sum subarray
- Minimum subarray length
- Longest substring with K distinct characters
- Anagram detection
- Character replacement

```javascript
const { maxSumSubarray, minSubarrayLen, lengthOfLongestSubstringKDistinct } = require('./SlidingWindow');
const maxSum = maxSumSubarray([1, 4, 2, 10, 23, 3, 1, 0, 20], 4); // 39
const minLen = minSubarrayLen(7, [2, 3, 1, 2, 4, 3]); // 2
const maxLength = lengthOfLongestSubstringKDistinct("eceba", 2); // 3
```

### 4. Backtracking
**Systematic exploration of solution space**
- Generate all permutations
- Generate all combinations
- Generate all subsets
- N-Queens problem
- Sudoku solver
- Generate parentheses

```javascript
const { permute, subsets, solveNQueens, generateParenthesis } = require('./Backtracking');
const permutations = permute([1, 2, 3]); // [[1,2,3], [1,3,2], ...]
const allSubsets = subsets([1, 2, 3]); // [[], [1], [2], [1,2], ...]
const queens = solveNQueens(4); // [".Q..","...Q","Q...","..Q."]
const parens = generateParenthesis(3); // ["((()))", "(()())", ...]
```

### 5. Greedy Algorithms
**Make locally optimal choices**
- Activity selection problem
- Fractional knapsack
- Interval scheduling
- Job sequencing
- Huffman coding
- Gas station problem

```javascript
const { activitySelection, fractionalKnapsack, intervalScheduling } = require('./Greedy');
const activities = activitySelection([
    { start: 1, finish: 3 }, { start: 2, finish: 5 }
]);
const knapsack = fractionalKnapsack([
    { weight: 10, value: 60 }, { weight: 20, value: 100 }
], 50);
```

## 🧪 Testing

### Individual Algorithm Tests
Each algorithm file includes comprehensive tests:
- Basic functionality
- Edge cases
- Performance tests
- Real-world examples

### Performance Comparison
The test runner provides:
- Algorithm complexity analysis
- Interview preparation guide
- Company-specific focus areas
- Quick reference guide

### Example Test Output
```
🧪 COMPREHENSIVE ALGORITHMS TEST SUITE 🧪

🔍 Testing Binary Search...
Test 1: Basic Binary Search
Array: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
Search 7: 3
Search 6: -1

👆 Testing Two Pointers...
Test 1: Two Sum
Array: [2, 7, 11, 15] Target: 9
Result: [0, 1]

🪟 Testing Sliding Window...
Test 1: Maximum Sum Subarray of Size K
Array: [1, 4, 2, 10, 23, 3, 1, 0, 20] K: 4
Max sum: 39
```

## 🎯 When to Use Each Algorithm

### **Binary Search**
- ✅ Sorted arrays
- ✅ Finding insertion position
- ✅ Peak finding
- ✅ Rotated array problems

### **Two Pointers**
- ✅ Pair/triplet problems
- ✅ Palindrome checking
- ✅ Remove duplicates
- ✅ Container problems

### **Sliding Window**
- ✅ Subarray problems
- ✅ Substring problems
- ✅ Fixed/variable window size
- ✅ Character counting

### **Backtracking**
- ✅ Generate all permutations
- ✅ Generate all combinations
- ✅ Generate all subsets
- ✅ Constraint satisfaction

### **Greedy**
- ✅ Optimization problems
- ✅ Activity selection
- ✅ Interval scheduling
- ✅ Coin change (certain systems)

## 🏢 Company-Specific Focus

### **Google/Facebook/Meta**
- Binary Search variations
- Graph algorithms
- Dynamic programming
- System design

### **Amazon**
- String manipulation (Two Pointers, Sliding Window)
- Tree problems
- Hash table usage
- Greedy algorithms

### **Microsoft**
- Array manipulation (Two Pointers, Sliding Window)
- Tree traversals
- Dynamic programming
- Backtracking problems

## 🔧 Customization

### Custom Comparators
```javascript
const { binarySearchWithComparator } = require('./BinarySearch');
const objects = [{ id: 1 }, { id: 3 }, { id: 5 }];
const target = { id: 3 };
const comparator = (a, b) => a.id - b.id;
const index = binarySearchWithComparator(objects, target, comparator);
```

### Object Sorting
```javascript
const { permuteUnique } = require('./Backtracking');
const permutations = permuteUnique([1, 1, 2]); // Handle duplicates
```

### Step-by-Step Analysis
```javascript
const { maxSumSubarray } = require('./SlidingWindow');
const result = maxSumSubarray([1, 4, 2, 10, 23, 3, 1, 0, 20], 4);
console.log('Maximum sum:', result);
```

## 📈 Performance Tips

1. **Choose the right technique** for your problem type
2. **Understand trade-offs** - time vs space complexity
3. **Practice pattern recognition** - identify which technique to use
4. **Optimize for your use case** - consider input characteristics
5. **Use hybrid approaches** - combine techniques when needed

## 🤝 Contributing

This collection is designed to be educational and comprehensive. Each algorithm includes:
- Multiple implementation variants
- Detailed complexity analysis
- Extensive test coverage
- Clear documentation
- Real-world examples

Feel free to extend with additional algorithms or optimizations!

## 📝 License

This implementation is for educational purposes. Use responsibly in production environments.

