import {BST} from '../structures/BST2.js';

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

// const tree = new BST();
// tree.add(5);
// tree.add(4);
// tree.add(15);
// tree.add(3);
// tree.add(12);
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

const getBrSum = root => {
    let output = [];
    function calc(node, sum) {
        if (!node) return;
        let newSum = node.value + sum;
        if (!node.left && !node.right) {
            output.push(newSum);
        }
        calc(node.left, newSum);
        calc(node.right, newSum);
    }
    calc(root, 0);
    return output;
};

const getBrSum2 = root => {
    let output = [];
    const queue = [{node: root, sum: 0}];
    while (queue.length) {
        let data = queue.pop();
        if (!data.node) continue;
        if (!data.node.left && !data.node.right) {
            output.push(data.sum + data.node.value);
        } else {
            queue.push({node: data.node.left, sum: data.sum + data.node.value});
            queue.push({node: data.node.right, sum: data.sum + data.node.value});
        }
    }

    return output;
};

let myTree = new BST();
myTree.insert(47);
myTree.insert(21);
myTree.insert(76);
myTree.insert(18);
myTree.insert(27);
myTree.insert(52);
myTree.insert(82);

//     47
//    /  \
//   21   76
//  / \   / \
// 18 27 52 82

console.log(myTree.root);
console.log(branchSums(myTree.root)); // [ 86, 95, 175, 205 ]
console.log(getBrSum(myTree.root));
console.log(getBrSum2(myTree.root));
