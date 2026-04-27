# Sorting Algorithms

Self-contained implementations of classic sorting algorithms. Each file ends with demos and can be run via `node FileName.js`.

> **Note:** `TopologicalSort` is a graph algorithm, not a comparison sort — it lives in `algorithms/graphs/TopologicalSort.js`.

## Files

```
sorting/
├── BubbleSort.js       O(n²)         stable, in-place         baseline / educational
├── SelectionSort.js    O(n²)         not stable, in-place     fewest swaps
├── InsertionSort.js    O(n²)         stable, in-place         great for nearly-sorted / small n
├── MergeSort.js        O(n log n)    stable, O(n) extra       guaranteed performance
├── QuickSort.js        O(n log n)*   not stable, in-place     fastest in practice (avg)
├── HeapSort.js         O(n log n)    not stable, in-place     no recursion, deterministic
├── CountingSort.js     O(n + k)      stable, O(n + k) extra   small integer range
└── RadixSort.js        O(d·(n + b))  stable, O(n + b) extra   fixed-length keys
```

\* QuickSort is O(n²) worst-case; randomized pivot keeps the expected case O(n log n).

## Run

```bash
node src/algotest/sorting/MergeSort.js
node src/algotest/sorting/QuickSort.js
# …etc
```

## Import

```javascript
const { mergeSort }     = require('./MergeSort');
const { quickSort }     = require('./QuickSort');
const { heapSort }      = require('./HeapSort');
const { bubbleSort }    = require('./BubbleSort');
const { insertionSort } = require('./InsertionSort');
const { selectionSort } = require('./SelectionSort');
const { countingSort }  = require('./CountingSort');
const { radixSort }     = require('./RadixSort');
```

## Complexity comparison

| Algorithm      | Best       | Average    | Worst      | Space     | Stable | In-place |
| -------------- | ---------- | ---------- | ---------- | --------- | ------ | -------- |
| Bubble Sort    | O(n)       | O(n²)      | O(n²)      | O(1)      | yes    | yes      |
| Selection Sort | O(n²)      | O(n²)      | O(n²)      | O(1)      | no     | yes      |
| Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)      | yes    | yes      |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)      | yes    | no       |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n)  | no     | yes      |
| Heap Sort      | O(n log n) | O(n log n) | O(n log n) | O(1)      | no     | yes      |
| Counting Sort  | O(n + k)   | O(n + k)   | O(n + k)   | O(n + k)  | yes    | no       |
| Radix Sort     | O(d·(n+b)) | O(d·(n+b)) | O(d·(n+b)) | O(n + b)  | yes    | no       |

*n = elements, k = value range, d = digits, b = base.*

## When to use which

- **Almost sorted / very small n** → Insertion Sort
- **Need stability + guaranteed O(n log n)** → Merge Sort
- **General purpose, fastest in practice** → Quick Sort (randomized pivot)
- **Memory-constrained, no recursion** → Heap Sort
- **Small integer range or fixed-length keys** → Counting / Radix Sort
