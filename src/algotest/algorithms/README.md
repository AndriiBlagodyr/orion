# Algorithms

Non-sort algorithms grouped by technique. Each file is self-contained — `node FileName.js` runs its own tests.

## Structure

```
algorithms/
├── searching/          BinarySearch + variants (first/last occurrence, rotated, peak)
├── twoPointers/        TwoPointers (twoSum, threeSum, palindrome, trap rain water)
├── slidingWindow/      SlidingWindow (max subarray, min window substring, longest k-distinct)
├── backtracking/       Backtracking (permutations, subsets, N-Queens, Sudoku)
├── greedy/             Greedy (activity selection, Huffman, fractional knapsack)
├── dynamicProgramming/ Knapsack, LCS  (see folder README for details)
└── graphs/             Dijkstra, TopologicalSort, plus future BFS/DFS, MST
```

## Run

```bash
node src/algotest/algorithms/searching/BinarySearch.js
node src/algotest/algorithms/twoPointers/TwoPointers.js
node src/algotest/algorithms/slidingWindow/SlidingWindow.js
node src/algotest/algorithms/backtracking/Backtracking.js
node src/algotest/algorithms/greedy/Greedy.js
node src/algotest/algorithms/graphs/Dijkstra.js
node src/algotest/algorithms/graphs/TopologicalSort.js
```

## Import examples

```javascript
const { binarySearch, findFirstOccurrence } = require('./searching/BinarySearch');
const { twoSum, threeSum }                   = require('./twoPointers/TwoPointers');
const { maxSumSubarray, minWindow }          = require('./slidingWindow/SlidingWindow');
const { permute, subsets, solveNQueens }     = require('./backtracking/Backtracking');
const { activitySelection, huffmanCoding }   = require('./greedy/Greedy');
const { knapsack01 }                         = require('./dynamicProgramming/Knapsack');
const { lcsDP }                              = require('./dynamicProgramming/LCS');
const { dijkstra }                           = require('./graphs/Dijkstra');
const { topologicalSort }                    = require('./graphs/TopologicalSort');
```

## Complexity overview

| Technique         | Typical Time | Space  | When to use                              |
| ----------------- | ------------ | ------ | ---------------------------------------- |
| Binary Search     | O(log n)     | O(1)   | sorted input, "find x" or boundary       |
| Two Pointers      | O(n)         | O(1)   | sorted array, pair/triplet, palindromes  |
| Sliding Window    | O(n)         | O(k)   | contiguous subarray/substring            |
| Backtracking      | O(b^d)       | O(d)   | enumerate all valid configurations       |
| Greedy            | O(n log n)   | O(1)   | local optimum implies global optimum     |
| Dynamic Prog.     | O(n·m)       | O(n·m) | overlapping subproblems + optimal substr |
| Dijkstra          | O((V+E) log V)| O(V)  | shortest path, non-negative weights      |
| Topological Sort  | O(V+E)       | O(V)   | DAG ordering / dependency resolution     |
