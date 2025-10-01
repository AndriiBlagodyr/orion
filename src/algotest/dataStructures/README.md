# Data Structures Implementation

This directory contains comprehensive implementations of fundamental data structures with detailed complexity analysis and examples.

## 📁 Directory Structure

```
dataStructures/
├── algorithms/             # Essential algorithms for interviews
│   ├── BinarySearch.js    # Binary search variants
│   ├── TwoPointers.js     # Two pointers technique
│   ├── SlidingWindow.js   # Sliding window technique
│   ├── Backtracking.js    # Backtracking algorithms
│   ├── Greedy.js          # Greedy algorithms
│   ├── AlgorithmsTestRunner.js # Comprehensive test suite
│   └── README.md          # Algorithms documentation
├── graphs/           # Graph-related data structures
│   ├── Graph.js      # Comprehensive Graph, WeightedGraph, DFS/BFS, Dijkstra
│   └── Dijkstra.js   # Advanced Dijkstra + Prim's MST algorithms
├── trees/            # Tree data structures
│   └── BinarySearchTree.js  # Complete BST implementation
├── lists/            # Linked list implementations
│   └── LinkedList.js # Singly & Doubly Linked Lists
├── heaps/            # Heap data structures
│   └── Heap.js       # MinHeap, MaxHeap, PriorityQueue
├── linear/           # Linear data structures
│   └── Stack.js      # Stack, Queue, Deque
├── sorting/          # Sorting algorithms collection
│   ├── BubbleSort.js # Bubble Sort with variants
│   ├── SelectionSort.js # Selection Sort with stable variant
│   ├── InsertionSort.js # Insertion Sort + Shell Sort + Binary Insertion
│   ├── MergeSort.js  # Merge Sort + Iterative + Bottom-up + Natural
│   ├── QuickSort.js  # Quick Sort + Multiple pivot strategies + 3-way
│   ├── HeapSort.js   # Heap Sort + Min-heap + Object sorting
│   ├── CountingSort.js # Counting Sort + String/Object variants
│   ├── RadixSort.js  # Radix Sort + MSD + String sorting
│   ├── TopologicalSort.js # Topological Sort + DFS + Kahn's algorithm
│   ├── SortingTestRunner.js # Comprehensive test suite
│   └── README.md     # Sorting algorithms documentation
├── dynamicProgramming/ # Dynamic programming algorithms
│   ├── Knapsack.js   # Knapsack algorithms (0/1, Fractional, Unbounded)
│   ├── LCS.js        # Longest Common Subsequence algorithms
│   ├── DynamicProgrammingTestRunner.js # Comprehensive test suite
│   └── README.md     # DP algorithms documentation
├── advanced/         # Advanced data structures
│   ├── HashTable.js  # Hash table implementation
│   ├── Trie.js       # Trie (prefix tree)
│   ├── SegmentTree.js # Segment tree with range queries
│   └── Union.js      # Union-Find (Disjoint Set)
└── README.md         # This file
```

## 🚀 Quick Start

### Import and Use

```javascript
// Import specific data structures
const { Graph, WeightedGraph } = require('./graphs/Graph');
const { MinHeap, MaxHeap, PriorityQueue } = require('./heaps/Heap');
const { SinglyLinkedList, DoublyLinkedList } = require('./lists/LinkedList');
const { Stack, Queue, Deque } = require('./linear/Stack');
const { BinarySearchTree } = require('./trees/BinarySearchTree');
const { HashTable } = require('./advanced/HashTable');
const { Trie } = require('./advanced/Trie');
const { SegmentTree } = require('./advanced/SegmentTree');
const { UnionFind } = require('./advanced/Union');

// Import sorting algorithms
const { mergeSort, quickSort } = require('./sorting/MergeSort');
const { heapSort } = require('./sorting/HeapSort');
const { topologicalSort } = require('./sorting/TopologicalSort');

// Import algorithms
const { binarySearch, findFirstOccurrence } = require('./algorithms/BinarySearch');
const { twoSum, removeDuplicates } = require('./algorithms/TwoPointers');
const { maxSumSubarray, minSubarrayLen } = require('./algorithms/SlidingWindow');
const { permute, subsets, solveNQueens } = require('./algorithms/Backtracking');
const { activitySelection, fractionalKnapsack } = require('./algorithms/Greedy');

// Import dynamic programming algorithms
const { knapsack01, fractionalKnapsack: knapsackFractional } = require('./dynamicProgramming/Knapsack');
const { lcsDP, longestCommonSubstring } = require('./dynamicProgramming/LCS');
```

### Basic Examples

```javascript
// Graph with DFS/BFS
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addEdge('A', 'B');
console.log(graph.depthFirstRecursive('A'));

// MinHeap
const heap = new MinHeap([3, 1, 4, 1, 5]);
console.log(heap.remove()); // 1

// Linked List
const list = new SinglyLinkedList();
list.push(1).push(2).push(3);
list.print(); // [1, 2, 3]

// Stack
const stack = new Stack();
stack.push(1).push(2);
console.log(stack.pop()); // 2

// Binary Search Tree
const bst = new BinarySearchTree();
bst.insert(5).insert(3).insert(7);
console.log(bst.find(3)); // Node with value 3

// Sorting algorithms
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(arr)); // [11, 12, 22, 25, 34, 64, 90]

// Algorithms
const index = binarySearch([1, 3, 5, 7, 9], 5); // 2
const indices = twoSum([2, 7, 11, 15], 9); // [0, 1]
const maxSum = maxSumSubarray([1, 4, 2, 10, 23, 3, 1, 0, 20], 4); // 39
const permutations = permute([1, 2, 3]); // [[1,2,3], [1,3,2], ...]

// Dynamic programming
const weights = [10, 20, 30];
const values = [60, 100, 120];
const capacity = 50;
const knapsackResult = knapsack01(capacity, weights, values);
console.log('Max value:', knapsackResult.maxValue); // 220
```

## 📊 Complexity Analysis

| Data Structure | Access | Search | Insertion | Deletion | Space |
|---------------|--------|--------|-----------|----------|-------|
| **Graph** | - | O(V+E) | O(1) | O(k) | O(V+E) |
| **BST** | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| **Linked List** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Min/Max Heap** | O(1) | O(n) | O(log n) | O(log n) | O(n) |
| **Stack/Queue** | O(n) | O(n) | O(1) | O(1) | O(n) |
| **Hash Table** | O(1) | O(1) | O(1) | O(1) | O(n) |
| **Trie** | O(m) | O(m) | O(m) | O(m) | O(ALPHABET_SIZE * N * M) |
| **Segment Tree** | O(log n) | O(log n) | O(log n) | O(log n) | O(n) |
| **Union-Find** | O(α(n)) | O(α(n)) | O(α(n)) | O(α(n)) | O(n) |

*Where: V = vertices, E = edges, n = number of elements, m = string length, α = inverse Ackermann function*

## 🔧 Features

### ✅ Implemented Features

- **Comprehensive Error Handling**: All methods include proper validation and error messages
- **Complexity Analysis**: Detailed time and space complexity comments for each method
- **Multiple Implementations**: Different approaches for the same data structure (e.g., recursive vs iterative DFS)
- **Utility Functions**: Helper functions for common operations
- **Example Usage**: Complete examples and test cases for each data structure
- **Production Ready**: Robust implementations suitable for real-world use

### 🎯 Key Improvements Made

1. **Consolidated Duplicates**: Merged 18 files into 8 comprehensive files
2. **Fixed Bugs**: Corrected typos and logic errors in original implementations
3. **Added Validation**: Comprehensive input validation and error handling
4. **Enhanced Documentation**: Detailed complexity analysis and usage examples
5. **Organized Structure**: Logical folder organization by data structure type
6. **Standardized Code**: Consistent coding style and naming conventions

## 📚 Data Structure Details

### Graphs (`graphs/Graph.js`)
- **Basic Graph**: Adjacency list representation with CRUD operations
- **Weighted Graph**: For Dijkstra's shortest path algorithm
- **Traversal Algorithms**: DFS (recursive/iterative), BFS
- **Shortest Path**: Dijkstra's algorithm with two PriorityQueue implementations

### Trees (`trees/BinarySearchTree.js`)
- **Complete BST**: Insert, find, contains operations
- **Traversal Methods**: Pre-order, in-order, post-order, level-order (BFS)
- **Balanced Operations**: Maintains BST property

### Lists (`lists/LinkedList.js`)
- **Singly Linked List**: Full CRUD operations with head/tail pointers
- **Doubly Linked List**: Bidirectional traversal with optimized get operations
- **Utility Functions**: Merge sorted lists, cycle detection, find middle

### Heaps (`heaps/Heap.js`)
- **MinHeap**: Efficient heap operations with siftUp/siftDown
- **MaxHeap**: Maximum element at root
- **PriorityQueue**: MinHeap-based priority queue for Dijkstra's algorithm
- **Heap Sort**: In-place sorting algorithm

### Linear (`linear/Stack.js`)
- **Stack**: LIFO operations with linked list implementation
- **Queue**: FIFO operations with linked list implementation
- **Deque**: Double-ended queue for bidirectional operations
- **Stack Utilities**: Parentheses validation, postfix evaluation, infix conversion

### Advanced (`advanced/`)
- **HashTable**: Separate chaining collision resolution
- **Trie**: Prefix tree for string operations
- **SegmentTree**: Range query data structure with lazy propagation
- **UnionFind**: Disjoint set with path compression and union by rank

## 🧪 Testing

Each data structure includes comprehensive test cases demonstrating:
- Basic operations
- Edge cases
- Error handling
- Performance characteristics

Run individual files to see test output, or import and use in your own projects.

## 📝 Notes

- All implementations use modern JavaScript (ES6+)
- Time and space complexity are documented for each method
- Error handling includes descriptive error messages
- Code is production-ready with proper validation
- Examples demonstrate real-world usage patterns
