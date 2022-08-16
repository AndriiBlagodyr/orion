import BST from '../structures/BST.js';
import BST from '../structures/BST.js';

class BinaryTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
// O(n) time | O(n) space - where n is the number of nodes in the Binary tree
function branchSums(root) {
    const sums = [];
    calculateBranchSums(root, 0, sums);
    return sums;
}
function calculateBranchSums(node, runningSum, sums) {
    if (!node) return;
    const newRunningSum = runningSum + node.value;
    if (!node.left && !node.right) {
        sums.push(newRunningSum);
        return;
    }
    calculateBranchSums(node.left, newRunningSum, sums);
    calculateBranchSums(node.right, newRunningSum, sums);
}

const tree = new BST();
tree.add(5);
tree.add(4);
tree.add(15);
tree.add(3);
tree.add(12);
// tree.add(1);
// tree.add(22);
// tree.add(14);

//         5
//       /   \
//      4     15
//     / \    / \
//   3    12 1   22
//    \
//    14

console.log(tree.root);
console.log(branchSums(tree.root)); // [15,16,18,10,11]
