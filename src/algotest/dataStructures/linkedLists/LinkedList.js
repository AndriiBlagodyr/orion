// =============================================================================
// COMPREHENSIVE LINKED LIST DATA STRUCTURE IMPLEMENTATION
// =============================================================================
// Includes: Singly Linked List, Doubly Linked List
// Time Complexity: Varies by operation (see individual method comments)
// Space Complexity: O(n) for n nodes

// =============================================================================
// SINGLY LINKED LIST IMPLEMENTATION
// =============================================================================

class SinglyLinkedListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Time Complexity: O(1) - constant time insertion at end
    // Space Complexity: O(1) - constant space for new node
    push(val) {
        let node = new SinglyLinkedListNode(val);
        if (this.head === null) {
            this.head = node;
            this.tail = this.head;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length += 1;
        return this;
    }

    // Time Complexity: O(n) - must traverse to find second-to-last node
    // Space Complexity: O(1) - constant space
    pop() {
        if (this.length <= 1) {
            this.head = null;
            this.tail = null;
            this.length = 0;
            return undefined;
        }
        let current = this.head;
        let newTail = this.head;
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        newTail.next = null;
        this.tail = newTail;
        this.length -= 1;
        return current;
    }

    // Time Complexity: O(1) - constant time removal from beginning
    // Space Complexity: O(1) - constant space
    shift() {
        if (!this.head) return undefined;
        let currentHead = this.head;
        this.head = currentHead.next;
        this.length -= 1;
        if (this.length === 0) {
            this.tail = null;
        }
        return currentHead;
    }

    // Time Complexity: O(1) - constant time insertion at beginning
    // Space Complexity: O(1) - constant space
    unshift(val) {
        let newNode = new SinglyLinkedListNode(val);
        if (!this.length) {
            this.head = newNode;
            this.tail = newNode;
            this.length = 1;
            return this;
        }
        newNode.next = this.head;
        this.head = newNode;
        this.length += 1;
        return this;
    }

    // Time Complexity: O(n) - must traverse to find node at index
    // Space Complexity: O(1) - constant space
    get(index) {
        if (index < 0 || index > this.length - 1) {
            return undefined;
        }
        let counter = 0;
        let current = this.head;
        while (counter < index) {
            current = current.next;
            ++counter;
        }
        return current;
    }

    // Time Complexity: O(n) - get operation + O(1) assignment
    // Space Complexity: O(1) - constant space
    set(index, value) {
        const node = this.get(index);
        if (node) {
            node.val = value;
            return true;
        }
        return false;
    }

    // Time Complexity: O(n) - get operation + O(1) insertion
    // Space Complexity: O(1) - constant space
    insert(index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshift(val);
        if (index === this.length) return !!this.push(val);
        const newNode = new SinglyLinkedListNode(val);
        const prev = this.get(index - 1);
        const temp = prev.next;
        prev.next = newNode;
        newNode.next = temp;
        this.length++;
        return true;
    }

    // Time Complexity: O(n) - get operation + O(1) removal
    // Space Complexity: O(1) - constant space
    remove(index) {
        if (index < 0 || index > this.length - 1) return false;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        const prevNode = this.get(index - 1);
        const removed = prevNode.next;
        prevNode.next = removed.next;
        this.length--;
        return removed;
    }

    // Time Complexity: O(n) - traverse entire list
    // Space Complexity: O(1) - constant space
    traverse() {
        let current = this.head;
        while (current) {
            console.log(current.val);
            current = current.next;
        }
    }

    // Time Complexity: O(n) - traverse entire list
    // Space Complexity: O(1) - constant space
    reverse() {
        let node = this.head;
        this.head = this.tail;
        this.tail = node;

        let current = node;
        let prev = null;
        let next = null;
        for (let i = 0; i < this.length; i++) {
            next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return this;
    }

    // Time Complexity: O(n) - traverse entire list
    // Space Complexity: O(n) - create array
    print() {
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.val);
            current = current.next;
        }
        console.log(arr);
        return arr;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - constant space
    size() {
        return this.length;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - constant space
    isEmpty() {
        return this.length === 0;
    }
}

// =============================================================================
// DOUBLY LINKED LIST IMPLEMENTATION
// =============================================================================

class DoublyLinkedListNode {
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

    // Time Complexity: O(1) - constant time insertion at end
    // Space Complexity: O(1) - constant space for new node
    push(val) {
        let node = new DoublyLinkedListNode(val);
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

    // Time Complexity: O(1) - constant time removal from end (has prev pointer)
    // Space Complexity: O(1) - constant space
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

    // Time Complexity: O(1) - constant time removal from beginning
    // Space Complexity: O(1) - constant space
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
        this.head = newHead;
        this.length--;
        return currentHead;
    }

    // Time Complexity: O(1) - constant time insertion at beginning
    // Space Complexity: O(1) - constant space
    unshift(val) {
        let newNode = new DoublyLinkedListNode(val);
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

    // Time Complexity: O(n/2) - can traverse from either end (optimized)
    // Space Complexity: O(1) - constant space
    get(index) {
        if (index < 0 || index > this.length - 1) {
            return null;
        }
        let mid = Math.floor(this.length / 2);
        if (index <= mid) {
            // Traverse from head
            let counter = 0;
            let current = this.head;
            while (counter < index) {
                current = current.next;
                ++counter;
            }
            return current;
        } else {
            // Traverse from tail
            let counter = this.length - 1;
            let current = this.tail;
            while (counter > index) {
                current = current.prev;
                --counter;
            }
            return current;
        }
    }

    // Time Complexity: O(n/2) - get operation + O(1) assignment
    // Space Complexity: O(1) - constant space
    set(index, value) {
        const node = this.get(index);
        if (node) {
            node.val = value;
            return true;
        }
        return false;
    }

    // Time Complexity: O(n/2) - get operation + O(1) insertion
    // Space Complexity: O(1) - constant space
    insert(index, val) {
        if (index < 0 || index > this.length) return false;
        if (index === 0) return !!this.unshift(val);
        if (index === this.length) return !!this.push(val);
        const newNode = new DoublyLinkedListNode(val);
        const prev = this.get(index - 1);
        const temp = prev.next;
        prev.next = newNode;
        newNode.prev = prev;
        newNode.next = temp;
        temp.prev = newNode;
        this.length++;
        return true;
    }

    // Time Complexity: O(n/2) - get operation + O(1) removal
    // Space Complexity: O(1) - constant space
    remove(index) {
        if (index < 0 || index > this.length - 1) return false;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();
        const prevNode = this.get(index - 1);
        const removed = prevNode.next;
        const next = removed.next;
        prevNode.next = next;
        next.prev = prevNode;
        removed.next = null;
        removed.prev = null;
        this.length--;
        return removed;
    }

    // Time Complexity: O(n) - traverse entire list
    // Space Complexity: O(1) - constant space
    traverse() {
        let current = this.head;
        while (current) {
            console.log(current.val);
            current = current.next;
        }
    }

    // Time Complexity: O(n) - traverse entire list
    // Space Complexity: O(1) - constant space
    reverse() {
        let node = this.head;
        this.head = this.tail;
        this.tail = node;

        let current = node;
        let prev = null;
        let next = null;
        for (let i = 0; i < this.length; i++) {
            next = current.next;
            current.next = prev;
            current.prev = next; // Update prev pointer for doubly linked
            prev = current;
            current = next;
        }
        return this;
    }

    // Time Complexity: O(n) - traverse entire list
    // Space Complexity: O(n) - create array
    print() {
        let arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.val);
            current = current.next;
        }
        console.log(arr);
        return arr;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - constant space
    size() {
        return this.length;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - constant space
    isEmpty() {
        return this.length === 0;
    }
}

// =============================================================================
// LINKED LIST UTILITY FUNCTIONS
// =============================================================================

// Time Complexity: O(n + m) where n, m are lengths of lists
// Space Complexity: O(1) - constant space
function mergeTwoSortedLists(list1, list2) {
    if (!list1) return list2;
    if (!list2) return list1;

    let result = null;
    let prev = null;

    if (list1.val <= list2.val) {
        prev = list1;
        list1 = list1.next;
    } else {
        prev = list2;
        list2 = list2.next;
    }
    result = prev;

    while (list1 && list2) {
        if (list1.val <= list2.val) {
            prev.next = list1;
            list1 = list1.next;
        } else {
            prev.next = list2;
            list2 = list2.next;
        }
        prev = prev.next;
    }
    prev.next = list1 || list2;

    return result;
}

// Time Complexity: O(n) - traverse entire list
// Space Complexity: O(1) - constant space
function hasCycle(head) {
    if (!head || !head.next) return false;

    let slow = head;
    let fast = head.next;

    while (fast && fast.next) {
        if (slow === fast) return true;
        slow = slow.next;
        fast = fast.next.next;
    }

    return false;
}

// Time Complexity: O(n) - traverse entire list
// Space Complexity: O(1) - constant space
function findMiddle(head) {
    if (!head) return null;

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

// =============================================================================
// EXAMPLE USAGE AND TESTS
// =============================================================================

function testLinkedLists() {
    console.log('=== LINKED LIST DATA STRUCTURE TESTS ===\n');

    // Test SinglyLinkedList
    console.log('Test 1: SinglyLinkedList');
    const sll = new SinglyLinkedList();
    sll.push(1);
    sll.push(2);
    sll.push(3);
    sll.push(4);
    console.log('After push(1,2,3,4):');
    sll.print();

    sll.unshift(0);
    console.log('After unshift(0):');
    sll.print();

    console.log('Pop:', sll.pop().val);
    console.log('Shift:', sll.shift().val);
    sll.print();

    console.log('\n' + '='.repeat(50) + '\n');

    // Test DoublyLinkedList
    console.log('Test 2: DoublyLinkedList');
    const dll = new DoublyLinkedList();
    dll.push(8);
    dll.push(10);
    dll.push(15);
    dll.push(20);
    console.log('After push(8,10,15,20):');
    dll.print();

    dll.unshift(5);
    console.log('After unshift(5):');
    dll.print();

    console.log('Pop:', dll.pop().val);
    console.log('Shift:', dll.shift().val);
    dll.print();

    console.log('\n' + '='.repeat(50) + '\n');

    // Test merge function
    console.log('Test 3: Merge Two Sorted Lists');
    const list1 = new SinglyLinkedList();
    list1.push(1);
    list1.push(2);
    list1.push(4);

    const list2 = new SinglyLinkedList();
    list2.push(1);
    list2.push(3);
    list2.push(4);

    console.log('List 1:');
    list1.print();
    console.log('List 2:');
    list2.print();

    const merged = mergeTwoSortedLists(list1.head, list2.head);
    console.log('Merged result:');
    let current = merged;
    let result = [];
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    console.log(result);
}

// Run tests
testLinkedLists();

module.exports = {
    SinglyLinkedList,
    SinglyLinkedListNode,
    DoublyLinkedList,
    DoublyLinkedListNode,
    mergeTwoSortedLists,
    hasCycle,
    findMiddle,
};
