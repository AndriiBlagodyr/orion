# algotest

Personal sandbox for algorithm & data-structure practice and JavaScript drills.

## Structure

```
src/algotest/
├── dataStructures/          implementations of fundamental DS (study + reimplement)
│   ├── linkedLists/         SinglyLinkedList, DoublyLinkedList, list problems
│   ├── stacksQueues/        Stack, Queue, Deque
│   ├── trees/               BinaryTree, BST, traversals
│   ├── heaps/               MinHeap, MaxHeap, PriorityQueue
│   ├── graphs/              Graph, WeightedGraph
│   ├── hashTables/          HashTable, LRUCache
│   ├── tries/               Trie
│   └── unionFind/           UnionFind (Disjoint Set)
│   (SegmentTree lives in trees/)
│
├── sorting/                 sorting algorithms (BubbleSort, MergeSort, …)
│
├── algorithms/              non-sort algorithms grouped by technique
│   ├── searching/           BinarySearch + variants
│   ├── twoPointers/
│   ├── slidingWindow/
│   ├── backtracking/
│   ├── greedy/
│   ├── dynamicProgramming/  Knapsack, LCS, …
│   └── graphs/              Dijkstra, TopologicalSort, BFS/DFS, MST
│
├── frequent/                JS-language drills (currying, iterations, regexp)
│
└── problems/                interview problems by difficulty
    ├── easy/
    └── medium/
```

## Run any file

```bash
node src/algotest/sorting/MergeSort.js
node src/algotest/algorithms/searching/BinarySearch.js
node src/algotest/dataStructures/heaps/Heap.js
```

## Roadmap

Full phased plan with checkboxes and per-file ordering: [LEARNING_ROADMAP.md](./LEARNING_ROADMAP.md).

- **Now**: Phase 1 — sorting algorithms in `sorting/`.
- **Next**: Phase 2 — linear data structures (`linkedLists/`, `stacksQueues/`).
- **Ongoing**: `frequent/` — keep current on common JS patterns; pick problems from `problems/` to validate each phase.
