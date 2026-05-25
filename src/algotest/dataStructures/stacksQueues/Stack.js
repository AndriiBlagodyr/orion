// =============================================================================
// ОПТИМІЗОВАНІ ЛІНІЙНІ СТРУКТУРИ ДАНИХ
// =============================================================================

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null; // Використовується для Deque
    }
}

// =============================================================================
// STACK (LIFO)
// =============================================================================
class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this._size = 0;
    }

    // Геттер замість методу getSize()
    get size() {
        return this._size;
    }

    push(val) {
        const node = new Node(val);
        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            node.next = this.first;
            this.first = node;
        }
        return ++this._size;
    }

    pop() {
        if (!this.first) return null;
        const temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this._size--;
        return temp.value;
    }

    peek() {
        return this.first ? this.first.value : null;
    }

    toArray() {
        const arr = [];
        let current = this.first;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }
}

// =============================================================================
// QUEUE (FIFO)
// =============================================================================
class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this._size = 0;
    }

    get size() {
        return this._size;
    }

    enqueue(val) {
        const node = new Node(val);
        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }
        return ++this._size;
    }

    dequeue() {
        if (!this.first) return null;
        const temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this._size--;
        return temp.value;
    }

    peek() {
        return this.first ? this.first.value : null;
    }
}

// =============================================================================
// DEQUE (Double-Ended Queue)
// =============================================================================
class Deque {
    constructor() {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    get size() {
        return this._size;
    }

    addFront(value) {
        const node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this._size++;
        return this;
    }

    addBack(value) {
        const node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this._size++;
        return this;
    }

    removeFront() {
        if (!this.head) return null;
        const temp = this.head;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this._size--;
        return temp.value;
    }

    removeBack() {
        if (!this.head) return null;
        const temp = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this._size--;
        return temp.value;
    }

    peekFront() {
        return this.head ? this.head.value : null;
    }
    peekBack() {
        return this.tail ? this.tail.value : null;
    }
}

// =============================================================================
// MIN STACK (Безпечна реалізація через Single Stack)
// =============================================================================
class MinStack {
    constructor() {
        this.stack = new Stack();
    }

    get size() {
        return this.stack.size;
    }

    push(val) {
        // Використовуємо опціональний ланцюжок ?. для уникнення крашу
        const currentMin = this.stack.peek()?.min ?? val;
        const min = Math.min(val, currentMin);

        this.stack.push({value: val, min: min});
        return this.stack.size;
    }

    pop() {
        const pair = this.stack.pop();
        return pair ? pair.value : null;
    }

    top() {
        return this.stack.peek()?.value ?? null; // Захищено від крашу порожнього стеку
    }

    getMin() {
        return this.stack.peek()?.min ?? null; // Захищено від крашу порожнього стеку
    }
}
