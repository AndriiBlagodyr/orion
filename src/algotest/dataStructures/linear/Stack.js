// =============================================================================
// COMPREHENSIVE LINEAR DATA STRUCTURES IMPLEMENTATION
// =============================================================================
// Includes: Stack, Queue
// Time Complexity: O(1) for most operations
// Space Complexity: O(n) for n elements

// =============================================================================
// STACK IMPLEMENTATION (LIFO - Last In, First Out)
// =============================================================================

class StackNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0; // Fixed typo: was 'lesizength'
    }

    // Time Complexity: O(1) - constant time insertion at beginning
    // Space Complexity: O(1) - constant space for new node
    push(val) {
        let node = new StackNode(val);
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

    // Time Complexity: O(1) - constant time removal from beginning
    // Space Complexity: O(1) - constant space
    pop() {
        if (!this.first) return null;
        let temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }

    // Time Complexity: O(1) - constant time access
    // Space Complexity: O(1) - no additional space
    peek() {
        return this.first ? this.first.value : null;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    isEmpty() {
        return this.size === 0;
    }

    // Time Complexity: O(n) - traverse entire stack
    // Space Complexity: O(n) - create array
    print() {
        let arr = [];
        let current = this.first;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        console.log(arr);
        return arr;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    getSize() {
        return this.size;
    }
}

// =============================================================================
// QUEUE IMPLEMENTATION (FIFO - First In, First Out)
// =============================================================================

class QueueNode {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    // Time Complexity: O(1) - constant time insertion at end
    // Space Complexity: O(1) - constant space for new node
    enqueue(val) {
        let node = new QueueNode(val);
        if (!this.first) {
            this.first = node;
            this.last = node;
        } else {
            this.last.next = node;
            this.last = node;
        }
        return ++this.size;
    }

    // Time Complexity: O(1) - constant time removal from beginning
    // Space Complexity: O(1) - constant space
    dequeue() {
        if (!this.first) return null;
        let temp = this.first;
        if (this.first === this.last) {
            this.last = null;
        }
        this.first = this.first.next;
        this.size--;
        return temp.value;
    }

    // Time Complexity: O(1) - constant time access
    // Space Complexity: O(1) - no additional space
    peek() {
        return this.first ? this.first.value : null;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    isEmpty() {
        return this.size === 0;
    }

    // Time Complexity: O(n) - traverse entire queue
    // Space Complexity: O(n) - create array
    print() {
        let arr = [];
        let current = this.first;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        console.log(arr);
        return arr;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    getSize() {
        return this.size;
    }
}

// =============================================================================
// DEQUE IMPLEMENTATION (Double-Ended Queue)
// =============================================================================

class DequeNode {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class Deque {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Time Complexity: O(1) - constant time insertion at front
    // Space Complexity: O(1) - constant space for new node
    addFront(value) {
        let node = new DequeNode(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this.size++;
        return this;
    }

    // Time Complexity: O(1) - constant time insertion at back
    // Space Complexity: O(1) - constant space for new node
    addBack(value) {
        let node = new DequeNode(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.size++;
        return this;
    }

    // Time Complexity: O(1) - constant time removal from front
    // Space Complexity: O(1) - constant space
    removeFront() {
        if (!this.head) return null;
        let temp = this.head;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this.size--;
        return temp.value;
    }

    // Time Complexity: O(1) - constant time removal from back
    // Space Complexity: O(1) - constant space
    removeBack() {
        if (!this.head) return null;
        let temp = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.size--;
        return temp.value;
    }

    // Time Complexity: O(1) - constant time access
    // Space Complexity: O(1) - no additional space
    peekFront() {
        return this.head ? this.head.value : null;
    }

    // Time Complexity: O(1) - constant time access
    // Space Complexity: O(1) - no additional space
    peekBack() {
        return this.tail ? this.tail.value : null;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    isEmpty() {
        return this.size === 0;
    }

    // Time Complexity: O(1) - constant time
    // Space Complexity: O(1) - no additional space
    getSize() {
        return this.size;
    }
}

// =============================================================================
// STACK UTILITY FUNCTIONS
// =============================================================================

// Time Complexity: O(n) - traverse string once
// Space Complexity: O(n) - stack storage
function isValidParentheses(s) {
    const stack = new Stack();
    const pairs = {
        '(': ')',
        '[': ']',
        '{': '}'
    };

    for (let char of s) {
        if (pairs[char]) {
            stack.push(char);
        } else if (char === ')' || char === ']' || char === '}') {
            if (stack.isEmpty()) return false;
            const last = stack.pop();
            if (pairs[last] !== char) return false;
        }
    }

    return stack.isEmpty();
}

// Time Complexity: O(n) - traverse string once
// Space Complexity: O(n) - stack storage
function evaluatePostfix(expression) {
    const stack = new Stack();
    const tokens = expression.split(' ');

    for (let token of tokens) {
        if (!isNaN(token)) {
            stack.push(parseInt(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            let result;

            switch (token) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = Math.floor(a / b);
                    break;
                default:
                    throw new Error('Invalid operator');
            }
            stack.push(result);
        }
    }

    return stack.pop();
}

// Time Complexity: O(n) - traverse string once
// Space Complexity: O(n) - stack storage
function infixToPostfix(infix) {
    const stack = new Stack();
    const output = [];
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3,
    };

    for (let char of infix) {
        if (char.match(/[a-zA-Z0-9]/)) {
            output.push(char);
        } else if (char === '(') {
            stack.push(char);
        } else if (char === ')') {
            while (!stack.isEmpty() && stack.peek() !== '(') {
                output.push(stack.pop());
            }
            stack.pop(); // Remove '('
        } else if (precedence[char]) {
            while (!stack.isEmpty() && precedence[stack.peek()] >= precedence[char] && stack.peek() !== '(') {
                output.push(stack.pop());
            }
            stack.push(char);
        }
    }

    while (!stack.isEmpty()) {
        output.push(stack.pop());
    }

    return output.join(' ');
}

// =============================================================================
// EXAMPLE USAGE AND TESTS
// =============================================================================

function testLinearStructures() {
    console.log('=== LINEAR DATA STRUCTURES TESTS ===\n');

    // Test Stack
    console.log('Test 1: Stack');
    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    console.log('After push(1,2,3):');
    stack.print();
    console.log('Peek:', stack.peek());
    console.log('Pop:', stack.pop());
    console.log('After pop:');
    stack.print();

    console.log('\n' + '='.repeat(50) + '\n');

    // Test Queue
    console.log('Test 2: Queue');
    const queue = new Queue();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    console.log('After enqueue(1,2,3):');
    queue.print();
    console.log('Peek:', queue.peek());
    console.log('Dequeue:', queue.dequeue());
    console.log('After dequeue:');
    queue.print();

    console.log('\n' + '='.repeat(50) + '\n');

    // Test Deque
    console.log('Test 3: Deque');
    const deque = new Deque();
    deque.addFront(1);
    deque.addBack(2);
    deque.addFront(0);
    deque.addBack(3);
    console.log('After addFront(1), addBack(2), addFront(0), addBack(3):');
    console.log('Front:', deque.peekFront(), 'Back:', deque.peekBack());
    console.log('Remove front:', deque.removeFront());
    console.log('Remove back:', deque.removeBack());
    console.log('Front:', deque.peekFront(), 'Back:', deque.peekBack());

    console.log('\n' + '='.repeat(50) + '\n');

    // Test Stack utilities
    console.log('Test 4: Stack Utilities');
    console.log("Valid parentheses '()[]{}':", isValidParentheses('()[]{}'));
    console.log("Valid parentheses '([)]':", isValidParentheses('([)]'));

    console.log("Postfix evaluation '3 4 + 2 *':", evaluatePostfix('3 4 + 2 *'));
    console.log("Infix to postfix 'a+b*c':", infixToPostfix('a+b*c'));
}

// Run tests
testLinearStructures();

module.exports = {
    Stack,
    StackNode,
    Queue,
    QueueNode,
    Deque,
    DequeNode,
    isValidParentheses,
    evaluatePostfix,
    infixToPostfix,
};
