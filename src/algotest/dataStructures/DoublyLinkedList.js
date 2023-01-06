const {current} = require('@reduxjs/toolkit');

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val) {
        let node = new Node(val);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.length += 1;
        return this;
    }
    pop() {
        if (this.length <= 1) {
            let node = this.head;
            this.head = null;
            this.tail = null;
            this.length = 0;
            return node;
        }
        let current = this.tail;
        let newTail = current.prev;
        current.prev = null;
        newTail.next = null;
        this.tail = newTail;
        this.length--;
        return current;
    }

    shift() {
        if (!this.head) return undefined;
        let currentHead = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return currentHead;
        }
        let newHead = this.head.next;
        currentHead.next = null;
        newHead.prev = null;
        this.length--;
        return currentHead;
    }

    unshift(val) {
        let newNode = new Node(val);
        if (!this.length) {
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
            return this;
        }
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
        this.length += 1;
        return this;
    }

    get(index) {
        if (index < 0 || index > this.length - 1) {
            return null;
        }
        let mid = Math.floor(this.length / 2);
        if (index <= mid) {
            let counter = 0;
            let current = this.head;
            while (counter < index) {
                current = current.next;
                ++counter;
            }
            return current;
        }
        let counter = this.length;
        current = this.tail;
        while (counter > index) {
            current = current.prev;
            --counter;
        }
        return current;
    }

    set(index, value) {
        const node = this.get(index);
        if (node) {
            node.val = value;
            return true;
        }
        return false;
    }

    insert(index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshift(val);
        if (index === this.length) return !!this.push(val);
        const newNode = new Node(val);
        const prev = get(index - 1);
        const temp = prev.next;
        prev.next = newNode;
        newNode.prev = prev;
        newNode.next = temp;
        temp.prev = newNode;
        this.length++;
        return true;
    }

    remove(index) {
        if (index < 0 || index > this.length - 1) return false;
        if (index === 0) return this.shift(val);
        if (index === this.length - 1) return this.pop(val);
        const prewNode = this.get(index - 1);
        const removed = prewNode.next;
        const next = removed.next;
        prevNode.next = next;
        next.prev = prevNode;
        removed.next = null;
        removed.prev = null;
        this.length--;
        return removed;
    }

    traverse() {
        let current = this.head;
        while (current) {
            console.log(current.val);
            current = current.next;
        }
    }

    reverse() {
        let node = this.head;
        this.head = this.tail;
        this.tail = node;

        let current = node;
        let prev = null;
        let next = null;
        for (let i = 0; i < this.length; i++) {
            console.log('Iteration', i);
            next = current.next;
            console.log('next = current.next', next);
            current.next = prev;
            console.log('current.next = prev', current.next);
            prev = current;
            console.log('prev = current', prev);
            current = next;
            console.log('current = next', current);
        }
        return this;
    }

    print() {
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.val);
            current = current.next;
        }
        console.log(arr);
    }
}

const myList = new LinkedList();
myList.push(8);
myList.push(10);
myList.push(15);
myList.push(20);
myList.print();
myList.reverse();
myList.print();
