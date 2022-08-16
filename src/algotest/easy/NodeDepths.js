import BinarySearchTree from '../structures/BinarySearchTree.js';
// This is the class of the input binary tree
class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
function nodeDepths_1(root) {
    let sumOfDepths = 0;
    const stack = [{node: root, depth: 0}];
    while (stack.length > 0) {
        const {node, depth} = stack.pop();
        if (node === null) continue;
        sumOfDepths += depth;
        stack.push({node: node.left, depth: depth + 1});
        stack.push({node: node.right, depth: depth + 1});
    }
    return sumOfDepths;
}

// Average case: when the tree is balanced
// O(n) time | O(h) space - where n is the number of nodes in
// the Binary Tree and h is the height of the Binary Tree
function nodeDepths_2(root, depth = 0) {
    if (root === null) return 0;
    return depth + nodeDepths_2(root.left, depth + 1) + nodeDepths_2(root.right, depth + 1);
}

const binst = new BinarySearchTree(47);
binst.insert(21);
binst.insert(76);
binst.insert(18);
binst.insert(27);
binst.insert(52);
binst.insert(82);
binst.insert(6);
binst.insert(100);

//     47
//    /  \
//   21   76
//  / \   / \
// 18 27 52 82
// /          \
//6           100

console.log(nodeDepths_2(binst.root, 0)); // 16 nodes
