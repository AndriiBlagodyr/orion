function pairSums(head) {
    const result = [];
    let left = head;

    function dfs(right) {
        if (!right) return;

        dfs(right.next);

        // Stop when pointers meet or cross
        if (!left || left === right || left.next === right) {
            return;
        }

        result.push(left.val + right.val);
        left = left.next;
    }

    dfs(head);
    return result;
}
