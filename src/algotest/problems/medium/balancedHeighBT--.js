// Tree is balanced if right height minus Left height
// difference is not more than 1
// This requirement is for EVERY tree Node
// O(n) time | O(n) space
class BinaryTree {
    constructor(value, left, right, parent) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class TreeInfo {
    constructor(isBalanced, height) {
        this.isBalanced = isBalanced;
        this.height = height;
    }
}

const heightBalancedBinaryTree = tree => {
    let treeInfo = getTreeInfo(tree);
    return treeInfo.isBalanced;
};

const getTreeInfo = node => {
    if (node === null) return new TreeInfo(true, -1);

    let leftSubtreeInfo = getTreeInfo(node.left);
    let rightSubtreeInfo = getTreeInfo(node.right);

    const isBalanced =
        leftSubtreeInfo.isBalanced &&
        rightSubtreeInfo.isBalanced &&
        Math.abs(leftSubtreeInfo.height - rightSubtreeInfo.height) <= 1;
    let height = Math.max(leftSubtreeInfo.height, rightSubtreeInfo.height) + 1;

    return new TreeInfo(isBalanced, height);
};
