import {stringify} from 'flatted';
import BST from '../structures/BST.js';
import BinarySearchTree from '../structures/BinarySearchTree.js';

// Average: O(log(n)) time | O(log(n)) space
// Worst: O(n) time | O(n) space

function findClosestValueInBst(tree, target) {
    return findClosestValueInBstHelper2(tree, target, Infinity);
}

function findClosestValueInBstHelper(tree, target, closest) {
    if (tree === null) return closest;
    if (Math.abs(target - closest) > Math.abs(target - tree.value)) {
        closest = tree.value;
    }
    if (target < tree.value) {
        return findClosestValueInBstHelper(tree.left, target, closest);
    } else if (target > tree.value) {
        return findClosestValueInBstHelper(tree.right, target, closest);
    } else {
        return closest;
    }
}

function findClosestValueInBstHelper2(tree, target, closest) {
    let currentNode = tree;
    while (currentNode !== null) {
        if (Math.abs(target - closest) > Math.abs(target - currentNode.value)) {
            closest = currentNode.value;
        }
        if (target < currentNode.value) {
            currentNode = currentNode.left;
        } else if (target > currentNode.value) {
            currentNode = currentNode.right;
        } else {
            break;
        }
    }
    return closest;
}

// const bst = new BST();
// bst.add(10);
// bst.add(5);
// bst.add(15);
// bst.add(2);
// bst.add(4);
// bst.add(13);
// bst.add(22);
// bst.add(1);
// bst.add(14);

// const binst = new BinarySearchTree(10);

// binst.insert(5);
// binst.insert(15);
// binst.insert(2);
// binst.insert(4);
// binst.insert(13);
// binst.insert(22);
// binst.insert(1);
// binst.insert(14);

// console.log(stringify(binst));
// console.log(findClosestValueInBst(binst.root, 10));
