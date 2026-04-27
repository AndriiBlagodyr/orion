var preorderTraversal = function (root) {
    const output = [];

    function serachTree(node) {
        if (!node) return;

        output.push(node.val);
        serachTree(node.left);
        serachTree(node.right);
    }
    serachTree(root);

    return output;
};
