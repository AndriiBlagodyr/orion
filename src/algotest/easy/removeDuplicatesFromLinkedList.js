// O(n) time and O(1) space
var removeDuplicatesFromLinkedList = function (head) {
    let currentNode = head;
    while (currentNode) {
        let nextDistinctNode = currentNode.next;
        while (nextDistinctNode && nextDistinctNode.value === currentNode.value) {
            nextDistinctNode = nextDistinctNode.next;
        }
        currentNode.next = nextDistinctNode;
        currentNode = nextDistinctNode;
    }
    return head;
};

/* var removeDuplicatesFromLinkedList = function(head) {
    let newHead = head;
    let newCurrent = newHead;
    let current = newHead;
    while(current){
      if(current.value !== newCurrent.value){
        newCurrent.next = current;
        newCurrent = newCurrent.next
      }
      current = current.next;
    }
    return newHead;
}; */
