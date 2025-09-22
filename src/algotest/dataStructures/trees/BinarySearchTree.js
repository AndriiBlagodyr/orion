class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // =============================================================================
    // ITERATIVE METHODS
    // =============================================================================

    // Time Complexity: O(log n) average, O(n) worst case (unbalanced tree)
    // Space Complexity: O(1) - constant space
    insert(value) {
        var newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        var current = this.root;
        while (true) {
            if (value === current.value) return undefined;
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    // Time Complexity: O(log n) average, O(n) worst case
    // Space Complexity: O(1) - constant space
    find(value) {
        if (this.root === null) return false;
        var current = this.root,
            found = false;
        while (current && !found) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                found = true;
            }
        }
        if (!found) return undefined;
        return current;
    }

    // Time Complexity: O(log n) average, O(n) worst case
    // Space Complexity: O(1) - constant space
    contains(value) {
        if (this.root === null) return false;
        var current = this.root,
            found = false;
        while (current && !found) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                return true;
            }
        }
        return false;
    }

    // =============================================================================
    // RECURSIVE METHODS
    // =============================================================================

    // Time Complexity: O(log n) average, O(n) worst case
    // Space Complexity: O(log n) average, O(n) worst case (recursion stack)
    insertRecursive(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        this._insertRecursiveHelper(this.root, newNode);
        return this;
    }

    _insertRecursiveHelper(current, newNode) {
        if (newNode.value === current.value) return undefined;

        if (newNode.value < current.value) {
            if (current.left === null) {
                current.left = newNode;
            } else {
                this._insertRecursiveHelper(current.left, newNode);
            }
        } else {
            if (current.right === null) {
                current.right = newNode;
            } else {
                this._insertRecursiveHelper(current.right, newNode);
            }
        }
    }

    // Time Complexity: O(log n) average, O(n) worst case
    // Space Complexity: O(log n) average, O(n) worst case (recursion stack)
    findRecursive(value) {
        if (this.root === null) return undefined;
        return this._findRecursiveHelper(this.root, value);
    }

    _findRecursiveHelper(node, value) {
        if (node === null) return undefined;
        if (value === node.value) return node;
        if (value < node.value) {
            return this._findRecursiveHelper(node.left, value);
        } else {
            return this._findRecursiveHelper(node.right, value);
        }
    }

    // Time Complexity: O(log n) average, O(n) worst case
    // Space Complexity: O(log n) average, O(n) worst case (recursion stack)
    containsRecursive(value) {
        if (this.root === null) return false;
        return this._containsRecursiveHelper(this.root, value);
    }

    _containsRecursiveHelper(node, value) {
        if (node === null) return false;
        if (value === node.value) return true;
        if (value < node.value) {
            return this._containsRecursiveHelper(node.left, value);
        } else {
            return this._containsRecursiveHelper(node.right, value);
        }
    }

    // =============================================================================
    // TRAVERSAL METHODS
    // =============================================================================

    // Time Complexity: O(n) - visit every node once
    // Space Complexity: O(w) where w is the maximum width of the tree
    BFS() {
        if (this.root === null) return [];
        var node = this.root,
            data = [],
            queue = [];
        queue.push(node);

        while (queue.length) {
            node = queue.shift();
            data.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return data;
    }

    // =============================================================================
    // RECURSIVE DFS TRAVERSALS
    // =============================================================================

    // Time Complexity: O(n) - visit every node once
    // Space Complexity: O(h) where h is the height of the tree (recursion stack)
    DFSPreOrder() {
        if (this.root === null) return [];
        var data = [];
        function traverse(node) {
            data.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }

    // Time Complexity: O(n) - visit every node once
    // Space Complexity: O(h) where h is the height of the tree (recursion stack)
    DFSInOrder() {
        if (this.root === null) return [];
        var data = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            data.push(node.value);
            if (node.right) traverse(node.right);
        }
        traverse(this.root);
        return data;
    }

    // Time Complexity: O(n) - visit every node once
    // Space Complexity: O(h) where h is the height of the tree (recursion stack)
    DFSPostOrder() {
        if (this.root === null) return [];
        var data = [];
        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            data.push(node.value);
        }
        traverse(this.root);
        return data;
    }

    // =============================================================================
    // ITERATIVE DFS TRAVERSALS
    // =============================================================================

    // Time Complexity: O(n) - visit every node once
    // Space Complexity: O(h) where h is the height of the tree (stack storage)
    DFSPreOrderIterative() {
        if (this.root === null) return [];
        const stack = [this.root];
        const result = [];

        while (stack.length > 0) {
            const node = stack.pop();
            result.push(node.value);

            // Push right first, then left (so left is processed first)
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
        return result;
    }

    // Time Complexity: O(n) - visit every node once
    // Space Complexity: O(h) where h is the height of the tree (stack storage)
    DFSInOrderIterative() {
        if (this.root === null) return [];
        const stack = [];
        const result = [];
        let current = this.root;

        while (stack.length > 0 || current !== null) {
            // Go to the leftmost node
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }

            // Process the node
            current = stack.pop();
            result.push(current.value);

            // Move to right subtree
            current = current.right;
        }
        return result;
    }

    // Time Complexity: O(n) - visit every node once
    // Space Complexity: O(h) where h is the height of the tree (stack storage)
    DFSPostOrderIterative() {
        if (this.root === null) return [];
        const stack1 = [this.root];
        const stack2 = [];
        const result = [];

        while (stack1.length > 0) {
            const node = stack1.pop();
            stack2.push(node);

            if (node.left) stack1.push(node.left);
            if (node.right) stack1.push(node.right);
        }

        while (stack2.length > 0) {
            result.push(stack2.pop().value);
        }
        return result;
    }

    // =============================================================================
    // UTILITY METHODS
    // =============================================================================

    // Time Complexity: O(n) - visit every node once
    // Space Complexity: O(h) where h is the height of the tree (recursion stack)
    getHeight() {
        if (this.root === null) return 0;
        return this._getHeightHelper(this.root);
    }

    _getHeightHelper(node) {
        if (node === null) return 0;
        const leftHeight = this._getHeightHelper(node.left);
        const rightHeight = this._getHeightHelper(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Time Complexity: O(n) - visit every node once
    // Space Complexity: O(h) where h is the height of the tree (recursion stack)
    getSize() {
        if (this.root === null) return 0;
        return this._getSizeHelper(this.root);
    }

    _getSizeHelper(node) {
        if (node === null) return 0;
        return 1 + this._getSizeHelper(node.left) + this._getSizeHelper(node.right);
    }

    // Time Complexity: O(n) - visit every node once
    // Space Complexity: O(h) where h is the height of the tree (recursion stack)
    isBalanced() {
        if (this.root === null) return true;
        return this._isBalancedHelper(this.root) !== -1;
    }

    _isBalancedHelper(node) {
        if (node === null) return 0;

        const leftHeight = this._isBalancedHelper(node.left);
        if (leftHeight === -1) return -1;

        const rightHeight = this._isBalancedHelper(node.right);
        if (rightHeight === -1) return -1;

        if (Math.abs(leftHeight - rightHeight) > 1) return -1;

        return Math.max(leftHeight, rightHeight) + 1;
    }

    // Time Complexity: O(log n) average, O(n) worst case
    // Space Complexity: O(log n) average, O(n) worst case (recursion stack)
    findMin() {
        if (this.root === null) return null;
        return this._findMinHelper(this.root);
    }

    _findMinHelper(node) {
        if (node.left === null) return node.value;
        return this._findMinHelper(node.left);
    }

    // Time Complexity: O(log n) average, O(n) worst case
    // Space Complexity: O(log n) average, O(n) worst case (recursion stack)
    findMax() {
        if (this.root === null) return null;
        return this._findMaxHelper(this.root);
    }

    _findMaxHelper(node) {
        if (node.right === null) return node.value;
        return this._findMaxHelper(node.right);
    }
}

// =============================================================================
// EXAMPLE USAGE AND TESTS
// =============================================================================

function testBinarySearchTree() {
    console.log('=== BINARY SEARCH TREE TESTS ===\n');

    // Test Iterative Methods
    console.log('Test 1: Iterative Methods');
    const tree1 = new BinarySearchTree();
    tree1.insert(10);
    tree1.insert(6);
    tree1.insert(15);
    tree1.insert(3);
    tree1.insert(8);
    tree1.insert(20);

    console.log('BFS:', tree1.BFS());
    console.log('DFS PreOrder:', tree1.DFSPreOrder());
    console.log('DFS InOrder:', tree1.DFSInOrder());
    console.log('DFS PostOrder:', tree1.DFSPostOrder());
    console.log('Find 8:', tree1.find(8));
    console.log('Contains 5:', tree1.contains(5));

    console.log('\n' + '='.repeat(50) + '\n');

    // Test Recursive Methods
    console.log('Test 2: Recursive Methods');
    const tree2 = new BinarySearchTree();
    tree2.insertRecursive(10);
    tree2.insertRecursive(6);
    tree2.insertRecursive(15);
    tree2.insertRecursive(3);
    tree2.insertRecursive(8);
    tree2.insertRecursive(20);

    console.log('Find Recursive 8:', tree2.findRecursive(8));
    console.log('Contains Recursive 5:', tree2.containsRecursive(5));

    console.log('\n' + '='.repeat(50) + '\n');

    // Test Iterative DFS Traversals
    console.log('Test 3: Iterative DFS Traversals');
    console.log('DFS PreOrder Iterative:', tree1.DFSPreOrderIterative());
    console.log('DFS InOrder Iterative:', tree1.DFSInOrderIterative());
    console.log('DFS PostOrder Iterative:', tree1.DFSPostOrderIterative());

    console.log('\n' + '='.repeat(50) + '\n');

    // Test Utility Methods
    console.log('Test 4: Utility Methods');
    console.log('Height:', tree1.getHeight());
    console.log('Size:', tree1.getSize());
    console.log('Is Balanced:', tree1.isBalanced());
    console.log('Min Value:', tree1.findMin());
    console.log('Max Value:', tree1.findMax());

    console.log('\n' + '='.repeat(50) + '\n');

    // Test Comparison: Recursive vs Iterative
    console.log('Test 5: Recursive vs Iterative Comparison');
    const tree3 = new BinarySearchTree();
    tree3.insert(5);
    tree3.insert(3);
    tree3.insert(7);
    tree3.insert(1);
    tree3.insert(4);
    tree3.insert(6);
    tree3.insert(9);

    console.log('Recursive PreOrder:', tree3.DFSPreOrder());
    console.log('Iterative PreOrder:', tree3.DFSPreOrderIterative());
    console.log('Recursive InOrder:', tree3.DFSInOrder());
    console.log('Iterative InOrder:', tree3.DFSInOrderIterative());
    console.log('Recursive PostOrder:', tree3.DFSPostOrder());
    console.log('Iterative PostOrder:', tree3.DFSPostOrderIterative());
}

// Run tests
testBinarySearchTree();

export {Node, BinarySearchTree};
