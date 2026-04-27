class BinaryTree {
    constructor(value, left, right, parent) {
        this.value = value;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}

// Space O(n) | Time O(n)
// const findSuccessor = (tree, node) => {
//     let inOrderTraversalOrder = getInOrderTraversalOrder(tree);

//     for (let i = 0; i < inorderTraversalOrder.length; i++) {
//         const element = array[i];
//         if (element !== node) {
//             continue;
//         }
//         if (i === inOrderTraversalOrder.length - 1) return null;

//         return inorderTraversalOrder[i + 1];
//     }
// };

// const getInorderTraversalOrder = (node, order = []) => {
//     if (node === null) return order;

//     getInOrderTraversalOrder(node.left, order);
//     order.append(node);
//     getInOrderTraversalOrder(node.right, order);

//     return order;
// };

// Time O(h) | Space O(1)
const findSuccessor = (tree, node) => {
    if (node.right !== null) return getLeftmostChild(node.right);

    return getRightmostParent(node);
};

const getLeftmostChild = node => {
    let currentNode = node;
    while (current.left) {
        currentNode = currentNode.left;
    }

    return currentNode;
};

const getRightmostParent = node => {
    let currentNode = node;
    while (currentNode.parent && currentNode.parent.right === currentNode) {
        currentNode = currentNode.parent;
    }

    return currentNode.parent;
};
