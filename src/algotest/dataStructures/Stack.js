// The easiest way to implement is to use arrays. Stack - it's just a concept
// Approach two is to use shift - unshift and Linked List Classes
// Stacks expects to have CONST time on removing and adding a new item
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.lesizength = 0;
    }
    push(val) {
        let node = new Node(val);
        if (this.first === null) {
            this.first = node;
            this.last = node;
        } else {
            let temp = this.first;
            this.first = node;
            this.first.next = temp;
        }
        return ++this.size;
    }
    pop() {
        if (!this.first) return null;
        let temp = this.first;
        if (this.first == this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }
}
