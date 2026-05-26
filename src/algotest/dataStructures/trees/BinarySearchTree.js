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

    // Геттери для красивого JS-API
    get size() {
        return this._getSizeHelper(this.root);
    }
    get height() {
        return this._getHeightHelper(this.root);
    }
    get isBalanced() {
        return this._isBalancedHelper(this.root) !== -1;
    }

    // =============================================================================
    // ІТЕРАТИВНІ МЕТОДИ (INSERT / FIND)
    // =============================================================================

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

    find(value) {
        let current = this.root;
        while (current) {
            if (value < current.value) current = current.left;
            else if (value > current.value) current = current.right;
            else return current; // Знайшли вузол
        }
        return undefined;
    }

    contains(value) {
        return this.find(value) !== undefined; // Нуль дублювання коду!
    }

    // =============================================================================
    // РЕКУРСИВНІ МЕТОДИ
    // =============================================================================

    insertRecursive(value) {
        if (!this.root) {
            this.root = new Node(value);
            return this;
        }
        this._insertHelper(this.root, value);
        return this;
    }

    _insertHelper(node, value) {
        if (value === node.value) return;
        if (value < node.value) {
            if (!node.left) node.left = new Node(value);
            else this._insertHelper(node.left, value);
        } else {
            if (!node.right) node.right = new Node(value);
            else this._insertHelper(node.right, value);
        }
    }

    findRecursive(value, node = this.root) {
        if (!node) return undefined;
        if (value === node.value) return node;
        return value < node.value ? this.findRecursive(value, node.left) : this.findRecursive(value, node.right);
    }

    containsRecursive(value) {
        return this.findRecursive(value) !== undefined;
    }

    // =============================================================================
    // ОПТИМІЗОВАНИЙ ОБХІД В ШИРИНУ (BFS)
    // =============================================================================
    BFS() {
        if (!this.root) return [];
        const result = [];
        const queue = [this.root];
        let head = 0; // Вказівник усуває O(n) від shift()

        while (head < queue.length) {
            const node = queue[head++];
            result.push(node.value);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return result;
    }

    // =============================================================================
    // DFS ОБХОДИ (РЕКУРСИВНІ ЗОСТАЛИСЬ ЧИСТИМИ)
    // =============================================================================
    DFSPreOrder(node = this.root, data = []) {
        if (!node) return data;
        data.push(node.value);
        this.DFSPreOrder(node.left, data);
        this.DFSPreOrder(node.right, data);
        return data;
    }

    DFSInOrder(node = this.root, data = []) {
        if (!node) return data;
        this.DFSInOrder(node.left, data);
        data.push(node.value);
        this.DFSInOrder(node.right, data);
        return data;
    }

    DFSPostOrder(node = this.root, data = []) {
        if (!node) return data;
        this.DFSPostOrder(node.left, data);
        this.DFSPostOrder(node.right, data);
        data.push(node.value);
        return data;
    }

    // =============================================================================
    // МІНІМУМ / МАКСИМУМ (ОПТИМІЗАЦІЯ ДО O(1) ПАМ'ЯТІ)
    // =============================================================================
    findMin() {
        if (!this.root) return null;
        let current = this.root;
        while (current.left) current = current.left; // Простий і швидкий цикл
        return current.value;
    }

    findMax() {
        if (!this.root) return null;
        let current = this.root;
        while (current.right) current = current.right;
        return current.value;
    }

    // =============================================================================
    // ДОПОМІЖНІ МЕТОДИ ДЛЯ ГЕТТЕРІВ
    // =============================================================================
    _getHeightHelper(node) {
        if (!node) return 0;
        return Math.max(this._getHeightHelper(node.left), this._getHeightHelper(node.right)) + 1;
    }

    _getSizeHelper(node) {
        if (!node) return 0;
        return 1 + this._getSizeHelper(node.left) + this._getSizeHelper(node.right);
    }

    _isBalancedHelper(node) {
        if (!node) return 0;

        const left = this._isBalancedHelper(node.left);
        if (left === -1) return -1;

        const right = this._isBalancedHelper(node.right);
        if (right === -1) return -1;

        if (Math.abs(left - right) > 1) return -1;
        return Math.max(left, right) + 1;
    }
}
