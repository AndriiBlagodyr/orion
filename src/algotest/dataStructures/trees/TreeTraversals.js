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
        if (!this.root) {
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while (true) {
            if (value === current.value) return undefined;
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    // =============================================================================
    // ЧИСТІ DFS TRAVERSALS (Без внутрішніх замикань)
    // =============================================================================

    preorderRecursive(node = this.root, result = []) {
        if (!node) return result;
        result.push(node.value);
        this.preorderRecursive(node.left, result);
        this.preorderRecursive(node.right, result);
        return result;
    }

    preorderIterative() {
        if (!this.root) return [];
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

    inorderRecursive(node = this.root, result = []) {
        if (!node) return result;
        this.inorderRecursive(node.left, result);
        result.push(node.value);
        this.inorderRecursive(node.right, result);
        return result;
    }

    inorderIterative() {
        if (!this.root) return [];
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

    postorderRecursive(node = this.root, result = []) {
        if (!node) return result;
        this.postorderRecursive(node.left, result);
        this.postorderRecursive(node.right, result);
        result.push(node.value);
        return result;
    }

    postorderIterative() {
        if (!this.root) return [];
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
    // ОПТИМІЗОВАНІ BFS TRAVERSALS (Чесне O(n) завдяки head pointers)
    // =============================================================================

    levelOrder() {
        if (!this.root) return [];
        const result = [];
        const queue = [this.root];
        let head = 0; // O(1) вилучення замість shift()

        while (head < queue.length) {
            const node = queue[head++];
            result.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return result;
    }

    levelOrderByLevel() {
        if (!this.root) return [];
        const result = [];
        let currentLevel = [this.root];

        while (currentLevel.length > 0) {
            const levelValues = [];
            const nextLevel = [];

            // Ітеруємося по поточному рівню без використання shift()
            for (let i = 0; i < currentLevel.length; i++) {
                const node = currentLevel[i];
                levelValues.push(node.value);
                if (node.left) nextLevel.push(node.left);
                if (node.right) nextLevel.push(node.right);
            }
            result.push(levelValues);
            currentLevel = nextLevel;
        }
        return result;
    }

    // Правильний Reverse Level Order: Зліва-направо, знизу-вгору
    reverseLevelOrder() {
        const levels = this.levelOrderByLevel();
        return levels.reverse().flat();
    }

    zigzagLevelOrder() {
        if (!this.root) return [];
        const result = [];
        let currentLevel = [this.root];
        let leftToRight = true;

        while (currentLevel.length > 0) {
            const levelValues = new Array(currentLevel.length);
            const nextLevel = [];

            for (let i = 0; i < currentLevel.length; i++) {
                const node = currentLevel[i];

                // Пряме заповнення масиву за індексами замість повільного unshift()
                const index = leftToRight ? i : currentLevel.length - 1 - i;
                levelValues[index] = node.value;

                if (node.left) nextLevel.push(node.left);
                if (node.right) nextLevel.push(node.right);
            }
            result.push(...levelValues);
            currentLevel = nextLevel;
            leftToRight = !leftToRight;
        }
        return result;
    }

    // =============================================================================
    // СКЛАДНІ АЛГОРИТМИ СТРУКТУР
    // =============================================================================

    verticalOrder() {
        if (!this.root) return [];
        const columnMap = new Map();
        const queue = [[this.root, 0]];
        let head = 0;

        while (head < queue.length) {
            const [node, column] = queue[head++];

            if (!columnMap.has(column)) columnMap.set(column, []);
            columnMap.get(column).push(node.value);

            if (node.left) queue.push([node.left, column - 1]);
            if (node.right) queue.push([node.right, column + 1]);
        }

        const sortedColumns = Array.from(columnMap.keys()).sort((a, b) => a - b);
        return sortedColumns.map(col => columnMap.get(col));
    }

    boundaryTraversal() {
        if (!this.root) return [];
        const result = [];

        if (!this._isLeaf(this.root)) result.push(this.root.value);

        this._addLeftBoundary(this.root.left, result);
        this._addLeaves(this.root, result);
        this._addRightBoundary(this.root.right, result);

        return result;
    }

    _isLeaf(node) {
        return node && !node.left && !node.right;
    }

    _addLeftBoundary(node, result) {
        let current = node;
        while (current) {
            if (!this._isLeaf(current)) result.push(current.value);
            current = current.left ? current.left : current.right;
        }
    }

    _addRightBoundary(node, result) {
        const temp = [];
        let current = node;
        while (current) {
            if (!this._isLeaf(current)) temp.push(current.value);
            current = current.right ? current.right : current.left;
        }
        for (let i = temp.length - 1; i >= 0; i--) result.push(temp[i]);
    }

    _addLeaves(node, result) {
        if (!node) return;
        if (this._isLeaf(node)) {
            result.push(node.value);
            return;
        }
        this._addLeaves(node.left, result);
        this._addLeaves(node.right, result);
    }

    diagonalTraversal() {
        if (!this.root) return [];
        const result = [];
        const queue = [this.root];
        let head = 0;

        while (head < queue.length) {
            let node = queue[head++];
            while (node) {
                result.push(node.value);
                if (node.left) queue.push(node.left);
                node = node.right;
            }
        }
        return result;
    }

    // =============================================================================
    // MORRIS TRAVERSALS (O(1) Додаткова пам'ять)
    // =============================================================================

    morrisInorder() {
        const result = [];
        let current = this.root;

        while (current) {
            if (!current.left) {
                result.push(current.value);
                current = current.right;
            } else {
                let predecessor = current.left;
                while (predecessor.right && predecessor.right !== current) {
                    predecessor = predecessor.right;
                }

                if (!predecessor.right) {
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

    morrisPreorder() {
        const result = [];
        let current = this.root;

        while (current) {
            if (!current.left) {
                result.push(current.value);
                current = current.right;
            } else {
                let predecessor = current.left;
                while (predecessor.right && predecessor.right !== current) {
                    predecessor = predecessor.right;
                }

                if (!predecessor.right) {
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
