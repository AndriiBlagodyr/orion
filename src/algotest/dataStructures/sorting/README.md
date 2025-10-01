# Sorting Algorithms Collection

A comprehensive collection of sorting algorithms implemented in JavaScript with detailed documentation, performance analysis, and extensive test suites.

## 📁 File Structure

```
sorting/
├── BubbleSort.js          # Bubble Sort implementation
├── SelectionSort.js       # Selection Sort implementation
├── InsertionSort.js       # Insertion Sort implementation
├── MergeSort.js          # Merge Sort implementation
├── QuickSort.js          # Quick Sort implementation
├── HeapSort.js           # Heap Sort implementation
├── CountingSort.js       # Counting Sort implementation
├── RadixSort.js          # Radix Sort implementation
├── TopologicalSort.js    # Topological Sort implementation
├── SortingTestRunner.js  # Comprehensive test suite
└── README.md             # This file
```

## 🚀 Quick Start

### Run All Tests
```bash
node SortingTestRunner.js
```

### Run Individual Algorithm Tests
```bash
node BubbleSort.js
node MergeSort.js
# ... etc
```

### Import and Use
```javascript
const { mergeSort, quickSort } = require('./MergeSort');
const { quickSort } = require('./QuickSort');

const arr = [64, 34, 25, 12, 22, 11, 90];
const sorted = mergeSort(arr);
console.log(sorted); // [11, 12, 22, 25, 34, 64, 90]
```

## 📊 Algorithm Overview

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable | Notes |
|-----------|-----------|--------------|------------|-------|--------|-------|
| **Bubble Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ | Simple, educational |
| **Selection Sort** | O(n²) | O(n²) | O(n²) | O(1) | ❌ | Always O(n²) comparisons |
| **Insertion Sort** | O(n) | O(n²) | O(n²) | O(1) | ✅ | Good for small arrays |
| **Shell Sort** | O(n log n) | O(n^1.5) | O(n²) | O(1) | ❌ | Improved insertion sort |
| **Merge Sort** | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ | Consistent performance |
| **Quick Sort** | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ | Fast in practice |
| **Heap Sort** | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ | Guaranteed O(n log n) |
| **Counting Sort** | O(n + k) | O(n + k) | O(n + k) | O(k) | ✅ | Non-comparison based |
| **Radix Sort** | O(d × (n + k)) | O(d × (n + k)) | O(d × (n + k)) | O(n + k) | ✅ | Non-comparison based |
| **Topological Sort** | O(V + E) | O(V + E) | O(V + E) | O(V) | N/A | For directed acyclic graphs |

*Where: n = array size, k = range of values, d = number of digits*

## 🔧 Features

### Each Algorithm Includes:
- ✅ **Basic Implementation** - Standard sorting function
- ✅ **Step-by-Step Tracking** - Detailed execution steps
- ✅ **Multiple Variants** - Different approaches and optimizations
- ✅ **Comprehensive Tests** - Edge cases and performance tests
- ✅ **Detailed Documentation** - Time/space complexity analysis
- ✅ **Error Handling** - Input validation and error messages

### Advanced Features:
- 🎯 **Performance Comparison** - Benchmark different algorithms
- 📈 **Complexity Analysis** - Detailed complexity breakdown
- 🔍 **Algorithm Comparison** - Side-by-side performance testing
- 🧪 **Test Data Generation** - Various input patterns (random, sorted, reverse, etc.)
- 📊 **Visualization Support** - Step-by-step execution tracking

## 📚 Algorithm Details

### 1. Bubble Sort
**Simple comparison-based algorithm**
- Swaps adjacent elements if they're in wrong order
- Optimized version stops early if no swaps occur
- Includes recursive implementation

```javascript
const { bubbleSort, bubbleSortWithSteps } = require('./BubbleSort');
const sorted = bubbleSort([3, 1, 4, 1, 5]);
const detailed = bubbleSortWithSteps([3, 1, 4, 1, 5]);
```

### 2. Selection Sort
**Finds minimum/maximum and places it at correct position**
- Always performs O(n²) comparisons
- Includes stable variant and recursive implementation

```javascript
const { selectionSort, stableSelectionSort } = require('./SelectionSort');
const sorted = selectionSort([64, 25, 12, 22, 11]);
```

### 3. Insertion Sort
**Builds sorted array one element at a time**
- Excellent for small arrays
- Includes binary insertion sort and shell sort variants

```javascript
const { insertionSort, shellSort, binaryInsertionSort } = require('./InsertionSort');
const sorted = insertionSort([12, 11, 13, 5, 6]);
```

### 4. Merge Sort
**Divide and conquer algorithm**
- Consistent O(n log n) performance
- Includes iterative, bottom-up, and natural merge sort

```javascript
const { mergeSort, iterativeMergeSort, naturalMergeSort } = require('./MergeSort');
const sorted = mergeSort([38, 27, 43, 3, 9, 82, 10]);
```

### 5. Quick Sort
**Divide and conquer with pivot selection**
- Fast in practice, multiple pivot strategies
- Includes 3-way partitioning and iterative implementation

```javascript
const { quickSort, quickSortRandomPivot, quickSort3Way } = require('./QuickSort');
const sorted = quickSort([10, 7, 8, 9, 1, 5]);
```

### 6. Heap Sort
**Uses heap data structure**
- Guaranteed O(n log n) performance
- Includes min-heap variant and object sorting

```javascript
const { heapSort, minHeapSort, heapSortObjects } = require('./HeapSort');
const sorted = heapSort([12, 11, 13, 5, 6, 7]);
```

### 7. Counting Sort
**Non-comparison based sorting**
- Efficient for small range of values
- Includes string and object sorting variants

```javascript
const { countingSort, countingSortStrings, countingSortObjects } = require('./CountingSort');
const sorted = countingSort([4, 2, 2, 8, 3, 3, 1]);
```

### 8. Radix Sort
**Sorts by individual digits**
- Efficient for integers with limited digits
- Includes MSD variant and string sorting

```javascript
const { radixSort, msdRadixSort, radixSortStrings } = require('./RadixSort');
const sorted = radixSort([170, 45, 75, 90, 2, 802, 24, 66]);
```

### 9. Topological Sort
**Sorts vertices of directed acyclic graphs**
- Used for dependency resolution and task scheduling
- Includes DFS and Kahn's algorithm variants

```javascript
const { topologicalSort, isDAG, longestPathInDAG } = require('./TopologicalSort');
const graph = { 'A': ['B', 'C'], 'B': ['D'], 'C': ['D'], 'D': [] };
const sorted = topologicalSort(graph);
```

## 🧪 Testing

### Individual Algorithm Tests
Each algorithm file includes comprehensive tests:
- Basic functionality
- Edge cases (empty array, single element, already sorted)
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
🧪 COMPREHENSIVE SORTING ALGORITHMS TEST SUITE 🧪

🫧 Testing Bubble Sort...
Test 1: Basic Ascending Sort
Original: [64, 34, 25, 12, 22, 11, 90]
Sorted: [11, 12, 22, 25, 34, 64, 90]
✅ Test 1 Passed

🚀 Running Performance Comparison...
📊 Test Type: RANDOM
Size: 1000 elements
✅ Merge Sort           : 2.45ms
✅ Quick Sort           : 1.23ms
✅ Heap Sort            : 3.67ms
✅ Radix Sort           : 4.12ms
```

## 🎯 When to Use Each Algorithm

### **Small Arrays (< 50 elements)**
- **Insertion Sort** - Simple and efficient
- **Selection Sort** - When you need minimal swaps

### **Medium Arrays (50-1000 elements)**
- **Quick Sort** - Fast average performance
- **Merge Sort** - Consistent performance, stable
- **Heap Sort** - Guaranteed O(n log n)

### **Large Arrays (> 1000 elements)**
- **Quick Sort** - Best average performance
- **Merge Sort** - When stability is required
- **Radix Sort** - For integers with limited digits

### **Special Cases**
- **Counting Sort** - Small range of values
- **Radix Sort** - Integers with few digits
- **Topological Sort** - Directed acyclic graphs (DAGs)
- **Bubble Sort** - Educational purposes only

## 🔧 Customization

### Custom Comparators
```javascript
const { heapSortWithComparator } = require('./HeapSort');
const sorted = heapSortWithComparator(arr, (a, b) => b - a); // Descending
```

### Object Sorting
```javascript
const { heapSortObjects } = require('./HeapSort');
const sorted = heapSortObjects(users, 'age'); // Sort by age property
```

### Step-by-Step Analysis
```javascript
const { mergeSortWithSteps } = require('./MergeSort');
const result = mergeSortWithSteps([3, 1, 4, 1, 5]);
console.log('Steps:', result.steps);
console.log('Comparisons:', result.comparisons);
```

## 📈 Performance Tips

1. **Choose the right algorithm** for your data characteristics
2. **Use stable sorts** when maintaining relative order is important
3. **Consider space constraints** - some algorithms use O(n) extra space
4. **Profile your specific use case** - theoretical complexity doesn't always match real-world performance
5. **Hybrid approaches** - combine algorithms for optimal performance

## 🤝 Contributing

This collection is designed to be educational and comprehensive. Each algorithm includes:
- Multiple implementation variants
- Detailed complexity analysis
- Extensive test coverage
- Clear documentation

Feel free to extend with additional algorithms or optimizations!

## 📝 License

This implementation is for educational purposes. Use responsibly in production environments.
