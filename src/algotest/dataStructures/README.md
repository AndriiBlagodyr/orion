# Data Structures

Implementations of fundamental data structures with complexity notes and inline tests.
Each file is self-contained — `node FileName.js` runs its own demos.

## Structure

```
dataStructures/
├── linkedLists/        SinglyLinkedList, DoublyLinkedList + practice problems
├── stacksQueues/       Stack, Queue, Deque
├── trees/              BinaryTree, BinarySearchTree, traversals, SegmentTree
├── heaps/              MinHeap, MaxHeap, PriorityQueue
├── graphs/             Graph, WeightedGraph (algorithms live in algorithms/graphs)
├── hashTables/         HashTable, LRUCache
├── tries/              Trie
└── unionFind/          UnionFind (Disjoint Set)
```

## Import examples

```javascript
const { SinglyLinkedList, DoublyLinkedList } = require('./linkedLists/LinkedList');
const { Stack, Queue, Deque } = require('./stacksQueues/Stack');
const { BinarySearchTree } = require('./trees/BinarySearchTree');
const { MinHeap, MaxHeap, PriorityQueue } = require('./heaps/Heap');
const { Graph, WeightedGraph } = require('./graphs/Graph');
const { HashTable } = require('./hashTables/HashTable');
const { LRUCache } = require('./hashTables/LRUCache');
const { Trie } = require('./tries/Trie');
const { SegmentTree } = require('./trees/SegmentTree');
const { UnionFind } = require('./unionFind/UnionFind');
```

## Complexity reference

| Structure        | Access  | Search  | Insert    | Delete    | Space |
| ---------------- | ------- | ------- | --------- | --------- | ----- |
| Linked List      | O(n)    | O(n)    | O(1)*     | O(1)*     | O(n)  |
| Stack / Queue    | O(n)    | O(n)    | O(1)      | O(1)      | O(n)  |
| BST (balanced)   | O(log n)| O(log n)| O(log n)  | O(log n)  | O(n)  |
| Min/Max Heap     | O(1)    | O(n)    | O(log n)  | O(log n)  | O(n)  |
| Hash Table       | O(1)    | O(1)    | O(1)      | O(1)      | O(n)  |
| Trie             | O(m)    | O(m)    | O(m)      | O(m)      | O(n·m)|
| Graph (adj list) | —       | O(V+E)  | O(1)      | O(V+E)    | O(V+E)|
| Segment Tree     | O(log n)| O(log n)| O(log n)  | O(log n)  | O(n)  |
| Union-Find       | O(α(n)) | O(α(n)) | O(α(n))   | O(α(n))   | O(n)  |

*If the node reference is already known. Otherwise O(n) to find it.*

## Notes

- Existing implementations are intended as **reference** while rewriting from scratch.
- Each file ends with example usage so it can be executed standalone with `node`.
