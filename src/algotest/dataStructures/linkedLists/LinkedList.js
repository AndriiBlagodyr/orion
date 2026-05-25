// Базові класи вузлів
class SinglyNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class DoublyNode {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

// =============================================================================
// SINGLY LINKED LIST
// =============================================================================
class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    get size() {
        return this.length;
    }
    isEmpty() {
        return this.length === 0;
    }

    push(val) {
        const node = new SinglyNode(val);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        return ++this.length; // Повертаємо нову довжину, як у JS Arrays
    }

    pop() {
        if (!this.head) return undefined;
        let current = this.head;
        let newTail = current;

        while (current.next) {
            newTail = current;
            current = current.next;
        }

        this.tail = newTail;
        this.tail.next = null;
        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current; // Повертаємо видалений вузол
    }

    shift() {
        if (!this.head) return undefined;
        const oldHead = this.head;
        this.head = oldHead.next;
        this.length--;
        if (this.length === 0) this.tail = null;
        return oldHead;
    }

    unshift(val) {
        const node = new SinglyNode(val);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        return ++this.length;
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current;
    }

    set(index, value) {
        const node = this.get(index);
        if (!node) return false;
        node.val = value;
        return true;
    }

    insert(index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshift(val);
        if (index === this.length) return !!this.push(val);

        const prev = this.get(index - 1);
        const node = new SinglyNode(val);

        node.next = prev.next;
        prev.next = node;
        this.length++;
        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();

        const prev = this.get(index - 1);
        const removed = prev.next;
        prev.next = removed.next;
        this.length--;
        return removed;
    }

    reverse() {
        let node = this.head;
        this.head = this.tail;
        this.tail = node;

        let prev = null;
        let next = null;
        while (node) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return this;
    }

    toArray() {
        const arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.val);
            current = current.next;
        }
        return arr;
    }
}

// =============================================================================
// DOUBLY LINKED LIST
// =============================================================================
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    get size() {
        return this.length;
    }
    isEmpty() {
        return this.length === 0;
    }

    push(val) {
        const node = new DoublyNode(val);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        return ++this.length;
    }

    pop() {
        if (!this.tail) return undefined;
        const removed = this.tail;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = removed.prev;
            this.tail.next = null;
            removed.prev = null; // Повністю ізолюємо видалений вузол
        }
        this.length--;
        return removed;
    }

    shift() {
        if (!this.head) return undefined;
        const removed = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = removed.next;
            this.head.prev = null;
            removed.next = null;
        }
        this.length--;
        return removed;
    }

    unshift(val) {
        const node = new DoublyNode(val);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        return ++this.length;
    }

    get(index) {
        if (index < 0 || index >= this.length) return null;

        // Твоя оптимізація з пошуком з двох сторін, але записана через чистіший цикл for
        const fromStart = index <= Math.floor(this.length / 2);
        let current = fromStart ? this.head : this.tail;

        if (fromStart) {
            for (let i = 0; i < index; i++) current = current.next;
        } else {
            for (let i = this.length - 1; i > index; i--) current = current.prev;
        }
        return current;
    }

    set(index, value) {
        const node = this.get(index);
        if (!node) return false;
        node.val = value;
        return true;
    }

    insert(index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshift(val);
        if (index === this.length) return !!this.push(val);

        const node = new DoublyNode(val);
        const prevNode = this.get(index - 1);
        const nextNode = prevNode.next;

        prevNode.next = node;
        node.prev = prevNode;
        node.next = nextNode;
        nextNode.prev = node;

        this.length++;
        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) return undefined;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();

        const removed = this.get(index);
        const prevNode = removed.prev;
        const nextNode = removed.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        removed.next = null;
        removed.prev = null;
        this.length--;
        return removed;
    }

    reverse() {
        let current = this.head;
        this.head = this.tail;
        this.tail = current;

        while (current) {
            const next = current.next;
            current.next = current.prev;
            current.prev = next;
            current = next;
        }
        return this;
    }

    toArray() {
        const arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.val);
            current = current.next;
        }
        return arr;
    }
}
