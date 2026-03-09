/*
 * TREE TRAVERSAL METHODS - Complete Guide
 *
 * Example Tree Structure:
 *          10
 *        /    \
 *       6      15
 *      / \    /  \
 *     3   8  12  20
 *
 * Array representation: [10, 6, 15, 3, 8, 12, 20]
 *
 * TRAVERSAL RESULTS FOR THE TREE ABOVE:
 * - Preorder (DFS):    [10, 6, 3, 8, 15, 12, 20]  (Root → Left → Right)
 * - Inorder (DFS):     [3, 6, 8, 10, 12, 15, 20]  (Left → Root → Right) - Sorted for BST!
 * - Postorder (DFS):   [3, 8, 6, 12, 20, 15, 10]  (Left → Right → Root)
 * - Level Order (BFS): [10, 6, 15, 3, 8, 12, 20]  (Level by level, left to right)
 * - Reverse Level:     [20, 12, 8, 3, 15, 6, 10]  (Bottom to top, right to left)
 * - Zigzag Level:      [10, 15, 6, 3, 8, 12, 20]  (Alternating left-right direction)
 * - Vertical Order:    [[3], [6], [10, 8, 12], [15], [20]]  (By vertical column)
 * - Boundary:          [10, 3, 8, 12, 20]         (Outer boundary only)
 */

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class TreeTraversal {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
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

    // =============================================================================
    // DEPTH-FIRST SEARCH (DFS) TRAVERSALS
    // =============================================================================

    // PREORDER: Root → Left → Right
    // Use case: Create a copy of the tree, prefix expression evaluation, serialization
    // Time: O(n), Space: O(h) where h is height
    preorderRecursive() {
        const result = [];
        function traverse(node) {
            if (node === null) return;
            result.push(node.value);
            traverse(node.left);
            traverse(node.right);
        }
        traverse(this.root);
        return result;
    }

    preorderIterative() {
        if (this.root === null) return [];
        const stack = [this.root];
        const result = [];

        while (stack.length > 0) {
            const node = stack.pop();
            result.push(node.value);
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
        return result;
    }

    // INORDER: Left → Root → Right
    // Use case: Get sorted values from BST
    // Time: O(n), Space: O(h)
    inorderRecursive() {
        const result = [];
        function traverse(node) {
            if (node === null) return;
            traverse(node.left);
            result.push(node.value);
            traverse(node.right);
        }
        traverse(this.root);
        return result;
    }

    inorderIterative() {
        if (this.root === null) return [];
        const stack = [];
        const result = [];
        let current = this.root;

        while (stack.length > 0 || current !== null) {
            while (current !== null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            result.push(current.value);
            current = current.right;
        }
        return result;
    }

    // POSTORDER: Left → Right → Root
    // Use case: Delete tree, postfix expression evaluation
    // Time: O(n), Space: O(h)
    postorderRecursive() {
        const result = [];
        function traverse(node) {
            if (node === null) return;
            traverse(node.left);
            traverse(node.right);
            result.push(node.value);
        }
        traverse(this.root);
        return result;
    }

    postorderIterative() {
        if (this.root === null) return [];
        const stack1 = [this.root];
        const stack2 = [];

        while (stack1.length > 0) {
            const node = stack1.pop();
            stack2.push(node);
            if (node.left) stack1.push(node.left);
            if (node.right) stack1.push(node.right);
        }

        const result = [];
        while (stack2.length > 0) {
            result.push(stack2.pop().value);
        }
        return result;
    }

    // =============================================================================
    // BREADTH-FIRST SEARCH (BFS) TRAVERSALS
    // =============================================================================

    // LEVEL ORDER: Visit nodes level by level, left to right
    // Use case: Find shortest path, level-wise operations
    // Time: O(n), Space: O(w) where w is max width
    levelOrder() {
        if (this.root === null) return [];
        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return result;
    }

    // LEVEL ORDER with level separation
    // Returns array of arrays, each representing one level
    levelOrderByLevel() {
        if (this.root === null) return [];
        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const levelSize = queue.length;
            const currentLevel = [];

            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                currentLevel.push(node.value);
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            result.push(currentLevel);
        }
        return result;
    }

    // REVERSE LEVEL ORDER: Bottom to top, right to left
    // Time: O(n), Space: O(n)
    reverseLevelOrder() {
        if (this.root === null) return [];
        const queue = [this.root];
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();
            result.unshift(node.value);
            if (node.right) queue.push(node.right);
            if (node.left) queue.push(node.left);
        }
        return result;
    }

    // =============================================================================
    // ADVANCED TRAVERSALS
    // =============================================================================

    // ZIGZAG LEVEL ORDER: Alternating left-right, right-left per level
    // Time: O(n), Space: O(w)
    zigzagLevelOrder() {
        if (this.root === null) return [];
        const queue = [this.root];
        const result = [];
        let leftToRight = true;

        while (queue.length > 0) {
            const levelSize = queue.length;
            const currentLevel = [];

            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                if (leftToRight) {
                    currentLevel.push(node.value);
                } else {
                    currentLevel.unshift(node.value);
                }
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            result.push(...currentLevel);
            leftToRight = !leftToRight;
        }
        return result;
    }

    // VERTICAL ORDER: Group nodes by vertical column
    // Time: O(n log n), Space: O(n)
    verticalOrder() {
        if (this.root === null) return [];
        const columnMap = new Map();
        const queue = [[this.root, 0]];

        while (queue.length > 0) {
            const [node, column] = queue.shift();

            if (!columnMap.has(column)) {
                columnMap.set(column, []);
            }
            columnMap.get(column).push(node.value);

            if (node.left) queue.push([node.left, column - 1]);
            if (node.right) queue.push([node.right, column + 1]);
        }

        const sortedColumns = Array.from(columnMap.keys()).sort((a, b) => a - b);
        return sortedColumns.map(col => columnMap.get(col));
    }

    // BOUNDARY TRAVERSAL: Outer boundary of tree (left boundary, leaves, right boundary)
    // Time: O(n), Space: O(h)
    boundaryTraversal() {
        if (this.root === null) return [];
        const result = [];

        if (!this.isLeaf(this.root)) {
            result.push(this.root.value);
        }

        this.addLeftBoundary(this.root.left, result);
        this.addLeaves(this.root, result);
        this.addRightBoundary(this.root.right, result);

        return result;
    }

    isLeaf(node) {
        return node !== null && node.left === null && node.right === null;
    }

    addLeftBoundary(node, result) {
        let current = node;
        while (current !== null) {
            if (!this.isLeaf(current)) {
                result.push(current.value);
            }
            current = current.left !== null ? current.left : current.right;
        }
    }

    addRightBoundary(node, result) {
        const temp = [];
        let current = node;
        while (current !== null) {
            if (!this.isLeaf(current)) {
                temp.push(current.value);
            }
            current = current.right !== null ? current.right : current.left;
        }
        for (let i = temp.length - 1; i >= 0; i--) {
            result.push(temp[i]);
        }
    }

    addLeaves(node, result) {
        if (node === null) return;
        if (this.isLeaf(node)) {
            result.push(node.value);
            return;
        }
        this.addLeaves(node.left, result);
        this.addLeaves(node.right, result);
    }

    // DIAGONAL TRAVERSAL: Traverse diagonally (right-down direction)
    // Time: O(n), Space: O(n)
    diagonalTraversal() {
        if (this.root === null) return [];
        const result = [];
        const queue = [this.root];

        while (queue.length > 0) {
            let node = queue.shift();

            while (node !== null) {
                result.push(node.value);
                if (node.left) queue.push(node.left);
                node = node.right;
            }
        }
        return result;
    }

    // MORRIS TRAVERSAL: Inorder without stack/recursion
    // Time: O(n), Space: O(1) - no extra space!
    morrisInorder() {
        const result = [];
        let current = this.root;

        while (current !== null) {
            if (current.left === null) {
                result.push(current.value);
                current = current.right;
            } else {
                let predecessor = current.left;
                while (predecessor.right !== null && predecessor.right !== current) {
                    predecessor = predecessor.right;
                }

                if (predecessor.right === null) {
                    predecessor.right = current;
                    current = current.left;
                } else {
                    predecessor.right = null;
                    result.push(current.value);
                    current = current.right;
                }
            }
        }
        return result;
    }

    // MORRIS PREORDER: Preorder without stack/recursion
    // Time: O(n), Space: O(1)
    morrisPreorder() {
        const result = [];
        let current = this.root;

        while (current !== null) {
            if (current.left === null) {
                result.push(current.value);
                current = current.right;
            } else {
                let predecessor = current.left;
                while (predecessor.right !== null && predecessor.right !== current) {
                    predecessor = predecessor.right;
                }

                if (predecessor.right === null) {
                    result.push(current.value);
                    predecessor.right = current;
                    current = current.left;
                } else {
                    predecessor.right = null;
                    current = current.right;
                }
            }
        }
        return result;
    }
}

// =============================================================================
// EXAMPLE USAGE AND TESTS
// =============================================================================

function testTreeTraversals() {
    console.log('=== TREE TRAVERSAL METHODS ===\n');

    const tree = new TreeTraversal();
    tree.insert(10);
    tree.insert(6);
    tree.insert(15);
    tree.insert(3);
    tree.insert(8);
    tree.insert(12);
    tree.insert(20);

    console.log('Tree Structure:');
    console.log('       10');
    console.log('      /  \\');
    console.log('     6    15');
    console.log('    / \\  /  \\');
    console.log('   3  8 12  20');
    console.log('\n' + '='.repeat(60) + '\n');

    console.log('DFS TRAVERSALS (Depth-First Search):');
    console.log('-------------------------------------');
    console.log('Preorder Recursive:  ', tree.preorderRecursive());
    console.log('Preorder Iterative:  ', tree.preorderIterative());
    console.log('Inorder Recursive:   ', tree.inorderRecursive());
    console.log('Inorder Iterative:   ', tree.inorderIterative());
    console.log('Postorder Recursive: ', tree.postorderRecursive());
    console.log('Postorder Iterative: ', tree.postorderIterative());

    console.log('\n' + '='.repeat(60) + '\n');

    console.log('BFS TRAVERSALS (Breadth-First Search):');
    console.log('---------------------------------------');
    console.log('Level Order:         ', tree.levelOrder());
    console.log('Level Order by Level:', JSON.stringify(tree.levelOrderByLevel()));
    console.log('Reverse Level Order: ', tree.reverseLevelOrder());

    console.log('\n' + '='.repeat(60) + '\n');

    console.log('ADVANCED TRAVERSALS:');
    console.log('--------------------');
    console.log('Zigzag Level Order:  ', tree.zigzagLevelOrder());
    console.log('Vertical Order:      ', JSON.stringify(tree.verticalOrder()));
    console.log('Boundary Traversal:  ', tree.boundaryTraversal());
    console.log('Diagonal Traversal:  ', tree.diagonalTraversal());

    console.log('\n' + '='.repeat(60) + '\n');

    console.log('SPACE-OPTIMIZED TRAVERSALS (Morris):');
    console.log('-------------------------------------');
    console.log('Morris Inorder:      ', tree.morrisInorder());
    console.log('Morris Preorder:     ', tree.morrisPreorder());

    console.log('\n' + '='.repeat(60) + '\n');

    console.log('COMPARISON: DFS vs BFS');
    console.log('----------------------');
    const smallTree = new TreeTraversal();
    smallTree.insert(5);
    smallTree.insert(3);
    smallTree.insert(7);
    smallTree.insert(1);
    smallTree.insert(9);

    console.log('\nSmall Tree:');
    console.log('     5');
    console.log('    / \\');
    console.log('   3   7');
    console.log('  /     \\');
    console.log(' 1       9');
    console.log('');
    console.log('Preorder (DFS):  ', smallTree.preorderRecursive(), ' - Root first');
    console.log('Inorder (DFS):   ', smallTree.inorderRecursive(), '     - Sorted!');
    console.log('Postorder (DFS): ', smallTree.postorderRecursive(), ' - Root last');
    console.log('Level Order (BFS):', smallTree.levelOrder(), '     - By levels');

    console.log('\n' + '='.repeat(60) + '\n');

    console.log('KEY DIFFERENCES:');
    console.log('----------------');
    console.log('DFS (Depth-First):');
    console.log('  - Goes deep before wide');
    console.log('  - Uses stack (or recursion)');
    console.log('  - Space: O(h) - height of tree');
    console.log('  - Best for: searching, tree operations');
    console.log('');
    console.log('BFS (Breadth-First):');
    console.log('  - Goes wide before deep');
    console.log('  - Uses queue');
    console.log('  - Space: O(w) - width of tree');
    console.log('  - Best for: shortest path, level operations');
    console.log('');
    console.log('Morris Traversal:');
    console.log('  - No stack or recursion needed');
    console.log('  - Space: O(1) - constant space!');
    console.log('  - Temporarily modifies tree (then restores)');
}

testTreeTraversals();

export { Node, TreeTraversal };
