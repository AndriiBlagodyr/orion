// =============================================================================
// COMPREHENSIVE HEAP DATA STRUCTURE IMPLEMENTATION
// =============================================================================
// Includes: MinHeap, MaxHeap, PriorityQueue
// Time Complexity: O(log n) for insert/extract, O(n) for buildHeap
// Space Complexity: O(n) for heap storage

// =============================================================================
// MIN HEAP IMPLEMENTATION
// =============================================================================

class MinHeap {
    constructor(array = []) {
        this.heap = this.buildHeap(array);
    }

    // Time Complexity: O(n) - more efficient than n insertions
    // Space Complexity: O(1) - in-place construction
    buildHeap(array) {
        const firstParentIdx = Math.floor((array.length - 2) / 2);
        for (let currentIdx = firstParentIdx; currentIdx >= 0; currentIdx--) {
            this.siftDown(currentIdx, array.length - 1, array);
        }
        return array;
    }

    // Time Complexity: O(log n) - height of tree
    // Space Complexity: O(1) - constant space
    siftDown(currentIdx, endIdx, heap) {
        let childOneIdx = currentIdx * 2 + 1;
        while (childOneIdx <= endIdx) {
            const childTwoIdx = currentIdx * 2 + 2 <= endIdx ? currentIdx * 2 + 2 : -1;
            let idxToSwap;
            if (childTwoIdx !== -1 && heap[childTwoIdx] < heap[childOneIdx]) {
                idxToSwap = childTwoIdx;
            } else {
                idxToSwap = childOneIdx;
            }
            if (heap[idxToSwap] < heap[currentIdx]) {
                this.swap(currentIdx, idxToSwap, heap);
                currentIdx = idxToSwap;
                childOneIdx = currentIdx * 2 + 1;
            } else {
                return;
            }
        }
    }

    // Time Complexity: O(log n) - height of tree
    // Space Complexity: O(1) - constant space
    siftUp(currentIdx, heap) {
        let parentIdx = Math.floor((currentIdx - 1) / 2);
        while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
            this.swap(currentIdx, parentIdx, heap);
            currentIdx = parentIdx;
            parentIdx = Math.floor((currentIdx - 1) / 2);
        }
    }

    // Time Complexity: O(1) - constant time access
    // Space Complexity: O(1) - no additional space
    peek() {
        return this.heap[0];
    }

    // Time Complexity: O(log n) - siftDown operation
    // Space Complexity: O(1) - constant space
    remove() {
        this.swap(0, this.heap.length - 1, this.heap);
        const valueToRemove = this.heap.pop();
        this.siftDown(0, this.heap.length - 1, this.heap);
        return valueToRemove;
    }

    // Time Complexity: O(log n) - siftUp operation
    // Space Complexity: O(1) - constant space
    insert(value) {
        this.heap.push(value);
        this.siftUp(this.heap.length - 1, this.heap);
    }

    // Time Complexity: O(1) - constant time swap
    // Space Complexity: O(1) - constant space
    swap(i, j, heap) {
        const temp = heap[j];
        heap[j] = heap[i];
        heap[i] = temp;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    size() {
        return this.heap.length;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    isEmpty() {
        return this.heap.length === 0;
    }
}

// =============================================================================
// MAX HEAP IMPLEMENTATION
// =============================================================================

class MaxHeap {
    constructor() {
        this.values = [];
    }

    // Time Complexity: O(log n) - height of tree
    // Space Complexity: O(1) - constant space
    insert(element) {
        this.values.push(element);
        this.bubbleUp();
    }

    // Time Complexity: O(log n) - height of tree
    // Space Complexity: O(1) - constant space
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element <= parent) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    // Time Complexity: O(log n) - sinkDown operation
    // Space Complexity: O(1) - constant space
    extractMax() {
        const max = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return max;
    }

    // Time Complexity: O(log n) - height of tree
    // Space Complexity: O(1) - constant space
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild > element) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if ((swap === null && rightChild > element) || (swap !== null && rightChild > leftChild)) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }

    // Time Complexity: O(1) - constant time access
    // Space Complexity: O(1) - no additional space
    peek() {
        return this.values[0];
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    size() {
        return this.values.length;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    isEmpty() {
        return this.values.length === 0;
    }
}

// =============================================================================
// PRIORITY QUEUE IMPLEMENTATION (MinHeap-based)
// =============================================================================

class PriorityQueueNode {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    // Time Complexity: O(log n) - heap insertion
    // Space Complexity: O(1) - constant space
    enqueue(val, priority) {
        let newNode = new PriorityQueueNode(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }

    // Time Complexity: O(log n) - height of tree
    // Space Complexity: O(1) - constant space
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }

    // Time Complexity: O(log n) - heap extraction
    // Space Complexity: O(1) - constant space
    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }

    // Time Complexity: O(log n) - height of tree
    // Space Complexity: O(1) - constant space
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }

    // Time Complexity: O(1) - constant time access
    // Space Complexity: O(1) - no additional space
    peek() {
        return this.values[0];
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    size() {
        return this.values.length;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    isEmpty() {
        return this.values.length === 0;
    }
}

// Note: Comprehensive heap sort implementation is available in
// dataStructures/sorting/HeapSort.js with multiple variants and optimizations

// =============================================================================
// HEAP UTILITY FUNCTIONS
// =============================================================================

// Time Complexity: O(n) - single pass through array
// Space Complexity: O(1) - constant space
function isMinHeap(heap) {
    const n = heap.length;
    for (let i = 0; i < Math.floor(n / 2); i++) {
        const leftChild = 2 * i + 1;
        const rightChild = 2 * i + 2;

        if (leftChild < n && heap[i] > heap[leftChild]) return false;
        if (rightChild < n && heap[i] > heap[rightChild]) return false;
    }
    return true;
}

// Time Complexity: O(n) - single pass through array
// Space Complexity: O(1) - constant space
function isMaxHeap(heap) {
    const n = heap.length;
    for (let i = 0; i < Math.floor(n / 2); i++) {
        const leftChild = 2 * i + 1;
        const rightChild = 2 * i + 2;

        if (leftChild < n && heap[i] < heap[leftChild]) return false;
        if (rightChild < n && heap[i] < heap[rightChild]) return false;
    }
    return true;
}

// =============================================================================
// EXAMPLE USAGE AND TESTS
// =============================================================================

function testHeaps() {
    console.log('=== HEAP DATA STRUCTURE TESTS ===\n');

    // Test MinHeap
    console.log('Test 1: MinHeap');
    const minHeap = new MinHeap([8, 12, 23, 17, 31, 30, 44, 102, 18]);
    console.log('Initial heap:', minHeap.heap);
    console.log('Peek (min):', minHeap.peek());
    console.log('Extract min:', minHeap.remove());
    console.log('After extraction:', minHeap.heap);
    minHeap.insert(5);
    console.log('After inserting 5:', minHeap.heap);

    console.log('\n' + '='.repeat(50) + '\n');

    // Test MaxHeap
    console.log('Test 2: MaxHeap');
    const maxHeap = new MaxHeap();
    maxHeap.insert(41);
    maxHeap.insert(39);
    maxHeap.insert(33);
    maxHeap.insert(18);
    maxHeap.insert(27);
    maxHeap.insert(12);
    maxHeap.insert(55);
    console.log('Max heap:', maxHeap.values);
    console.log('Peek (max):', maxHeap.peek());
    console.log('Extract max:', maxHeap.extractMax());
    console.log('After extraction:', maxHeap.values);

    console.log('\n' + '='.repeat(50) + '\n');

    // Test PriorityQueue
    console.log('Test 3: PriorityQueue');
    const pq = new PriorityQueue();
    pq.enqueue('common cold', 5);
    pq.enqueue('gunshot wound', 1);
    pq.enqueue('high fever', 4);
    pq.enqueue('broken arm', 2);
    pq.enqueue('glass in foot', 3);

    console.log('Priority queue (by priority):');
    while (!pq.isEmpty()) {
        const item = pq.dequeue();
        console.log(`Priority ${item.priority}: ${item.val}`);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Note: Heap sort tests are available in dataStructures/sorting/HeapSort.js
}

// Run tests
testHeaps();

module.exports = {
    MinHeap,
    MaxHeap,
    PriorityQueue,
    PriorityQueueNode,
    isMinHeap,
    isMaxHeap,
};
