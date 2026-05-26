// =============================================================================
// УНІВЕРСАЛЬНА КУЧА (HEAP) НА БАЗІ КОМПАРАТОРА
// =============================================================================
class Heap {
    /**
     * @param {function} compareFunction - Функція для визначення пріоритету.
     * Семпли: (a, b) => a - b (для MinHeap), (a, b) => b - a (для MaxHeap)
     */
    constructor(compareFunction, array = []) {
        this.compare = compareFunction;
        this.heap = array;
        if (this.heap.length > 0) this._buildHeap();
    }

    get size() {
        return this.heap.length;
    }
    isEmpty() {
        return this.heap.length === 0;
    }
    peek() {
        return this.heap[0] ?? null;
    }

    _swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    _buildHeap() {
        const firstParent = Math.floor((this.heap.length - 2) / 2);
        for (let i = firstParent; i >= 0; i--) {
            this._siftDown(i);
        }
    }

    _siftUp(idx) {
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            // Якщо поточний елемент має вищий пріоритет за батька — міняємо
            if (this.compare(this.heap[idx], this.heap[parentIdx]) >= 0) break;
            this._swap(idx, parentIdx);
            idx = parentIdx;
        }
    }

    _siftDown(idx) {
        const endIdx = this.heap.length - 1;
        while (true) {
            let leftChildIdx = idx * 2 + 1;
            let rightChildIdx = idx * 2 + 2;
            let targetIdx = idx;

            // Перевіряємо лівого сусіда
            if (leftChildIdx <= endIdx && this.compare(this.heap[leftChildIdx], this.heap[targetIdx]) < 0) {
                targetIdx = leftChildIdx;
            }
            // Перевіряємо правого сусіда
            if (rightChildIdx <= endIdx && this.compare(this.heap[rightChildIdx], this.heap[targetIdx]) < 0) {
                targetIdx = rightChildIdx;
            }

            if (targetIdx === idx) break; // Баланс відновлено
            this._swap(idx, targetIdx);
            idx = targetIdx;
        }
    }

    insert(value) {
        this.heap.push(value);
        this._siftUp(this.heap.length - 1);
    }

    extract() {
        if (this.isEmpty()) return null;
        this._swap(0, this.heap.length - 1);
        const value = this.heap.pop();
        this._siftDown(0);
        return value;
    }
}

// =============================================================================
// СУПЕР-СПРОЩЕНІ СПЕЦІАЛІЗОВАНІ КЛАСИ
// =============================================================================

// 1. MinHeap — батько завжди менший за дітей
class MinHeap extends Heap {
    constructor(array = []) {
        super((a, b) => a - b, array);
    }
}

// 2. MaxHeap — батько завжди більший за дітей
class MaxHeap extends Heap {
    constructor(array = []) {
        super((a, b) => b - a, array);
    }
}

// 3. PriorityQueue — черга на базі пріоритетів об'єктів
class PriorityQueue extends Heap {
    constructor() {
        // Черга з найменшим числом пріоритету нагорі (Min-Priority)
        super((a, b) => a.priority - b.priority);
    }

    enqueue(val, priority) {
        this.insert({val, priority});
    }

    dequeue() {
        return this.extract();
    }
}

// =============================================================================
// УТИЛІТИ (ВАЛІДАТОРИ)
// =============================================================================
function isMinHeap(heap) {
    for (let i = 0; i < Math.floor(heap.length / 2); i++) {
        if (heap[i] > heap[2 * i + 1]) return false;
        if (2 * i + 2 < heap.length && heap[i] > heap[2 * i + 2]) return false;
    }
    return true;
}

function isMaxHeap(heap) {
    for (let i = 0; i < Math.floor(heap.length / 2); i++) {
        if (heap[i] < heap[2 * i + 1]) return false;
        if (2 * i + 2 < heap.length && heap[i] < heap[2 * i + 2]) return false;
    }
    return true;
}
