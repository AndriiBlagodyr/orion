// Method 1: Head Insertion
function reverseHeadInsertion(head) {
    let newHead = null;
    let curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = newHead;
        newHead = curr;
        curr = next;
    }
    return newHead;
}

let reversed1 = reverseHeadInsertion(head);
console.log('Reversed by Head Insertion:');
printList(reversed1);

// Method 2: Classic Iterative
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

// Recreate original list first
head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
let reversed2 = reverseIterative(head);
console.log('Reversed by Iterative Method:');
printList(reversed2);

// Method 3: Recursive
function reverseRecursive(head) {
    if (!head || !head.next) return head;
    let newHead = reverseRecursive(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}

// Recreate original list again
head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
let reversed3 = reverseRecursive(head);
console.log('Reversed by Recursive Method:');
printList(reversed3);

/*
 * ┌──────────────────┬────────────┬─────────────┬────────┬────────┐
 * │ Method           │ Whole List │ Sublist     │ Time   │ Space  │
 * ├──────────────────┼────────────┼─────────────┼────────┼────────┤
 * │ Head Insertion   │ ✅         │ ✅          │ O(n)   │ O(1)    │
 * │ Classic Iterative│ ✅         │ ✅          │ O(n)   │ O(1)    │
 * │ Recursive        │ ✅         │ ✅ (hard)   │ O(n)   │ O(n)    │
 * └──────────────────┴────────────┴─────────────┴────────┴────────┘
 */
