// Method 1: Classic Iterative
function reverseIterative(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// Method 2: Recursive  1 -> 2 -> 3
function reverseRecursive(head) {
    if (!head || !head.next) return head;
    let newHead = reverseRecursive(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}

// Method 3: Doubly Linked List Iterative
function reverseDoublyIterative(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        curr.prev = next;
        prev = curr;
        curr = next;
    }
    return prev;
}

// Method 4: Doubly Linked List Recursive
function reverseDoublyRecursive(head) {
    if (!head) return null;

    let next = head.next;
    head.next = head.prev;
    head.prev = next;

    if (!head.prev) return head;
    return reverseDoublyRecursive(head.prev);
}
