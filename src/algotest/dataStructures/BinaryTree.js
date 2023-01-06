class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(val) {
        var newNode = new Node(val);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
    }
}

let node = new Node(1);
let nodeL2 = new Node(2);
let nodeL3 = new Node(2);
let nodeL4 = new Node(4);
let nodeR2 = new Node(2);
let nodeR3 = new Node(3);
let nodeR4 = new Node(4);

nodeL2.left = nodeL3;
nodeL2.right = nodeL4;
node.left = nodeL2;

nodeR2.left = nodeR4;
nodeR2.right = nodeR3;
node.right = nodeR2;

// console.log('NODE', node);
var isSymmetric = function (root) {
    if (root == null) return true;
    function symmetryChecker(left, right) {
        if (left == null && right == null) return true;
        if (left == null || right == null) return false;
        if (left.val !== right.val) return false;

        return symmetryChecker(left.left, right.right) && symmetryChecker(left.right, right.left);
    }

    return symmetryChecker(root.left, root.right);
};

console.log(isSymmetric(node));
