class SegmentTree {
    constructor(arr, operation = 'sum', defaultValue = 0) {
        this.n = arr.length;
        this.operation = operation;
        this.defaultValue = defaultValue;

        // Calculate tree size (next power of 2)
        this.treeSize = 1;
        while (this.treeSize < this.n) {
            this.treeSize *= 2;
        }

        // Initialize tree array
        this.tree = new Array(2 * this.treeSize).fill(this.defaultValue);

        // Build the tree
        this.build(arr);
    }

    // Build the segment tree from the input array
    build(arr) {
        // Fill leaves
        for (let i = 0; i < this.n; i++) {
            this.tree[this.treeSize + i] = arr[i];
        }

        // Build internal nodes bottom-up
        for (let i = this.treeSize - 1; i > 0; i--) {
            this.tree[i] = this.combine(this.tree[2 * i], this.tree[2 * i + 1]);
        }
    }

    // Combine two values based on the operation
    combine(left, right) {
        switch (this.operation) {
            case 'sum':
                return left + right;
            case 'min':
                return Math.min(left, right);
            case 'max':
                return Math.max(left, right);
            case 'gcd':
                return this.gcd(left, right);
            case 'lcm':
                return this.lcm(left, right);
            case 'xor':
                return left ^ right;
            case 'or':
                return left | right;
            case 'and':
                return left & right;
            default:
                return left + right; // Default to sum
        }
    }

    // Helper function for GCD
    gcd(a, b) {
        if (b === 0) return a;
        return this.gcd(b, a % b);
    }

    // Helper function for LCM
    lcm(a, b) {
        return (a * b) / this.gcd(a, b);
    }

    // Update value at index
    update(index, value) {
        if (index < 0 || index >= this.n) {
            throw new Error('Index out of bounds');
        }

        // Update leaf node
        let pos = this.treeSize + index;
        this.tree[pos] = value;

        // Update parent nodes
        pos = Math.floor(pos / 2);
        while (pos > 0) {
            this.tree[pos] = this.combine(this.tree[2 * pos], this.tree[2 * pos + 1]);
            pos = Math.floor(pos / 2);
        }
    }

    // Range query from left to right (inclusive)
    query(left, right) {
        if (left < 0 || right >= this.n || left > right) {
            throw new Error('Invalid range');
        }

        return this.queryHelper(left, right, 0, this.treeSize - 1, 1);
    }

    // Helper function for range query
    queryHelper(queryLeft, queryRight, nodeLeft, nodeRight, nodeIndex) {
        // Complete overlap
        if (queryLeft <= nodeLeft && nodeRight <= queryRight) {
            return this.tree[nodeIndex];
        }

        // No overlap
        if (queryRight < nodeLeft || queryLeft > nodeRight) {
            return this.defaultValue;
        }

        // Partial overlap - recurse on children
        const mid = Math.floor((nodeLeft + nodeRight) / 2);
        const leftResult = this.queryHelper(queryLeft, queryRight, nodeLeft, mid, 2 * nodeIndex);
        const rightResult = this.queryHelper(queryLeft, queryRight, mid + 1, nodeRight, 2 * nodeIndex + 1);

        return this.combine(leftResult, rightResult);
    }

    // Range update (lazy propagation)
    rangeUpdate(left, right, value) {
        if (left < 0 || right >= this.n || left > right) {
            throw new Error('Invalid range');
        }

        this.rangeUpdateHelper(left, right, value, 0, this.treeSize - 1, 1);
    }

    // Helper function for range update
    rangeUpdateHelper(queryLeft, queryRight, value, nodeLeft, nodeRight, nodeIndex) {
        // Complete overlap
        if (queryLeft <= nodeLeft && nodeRight <= queryRight) {
            this.tree[nodeIndex] = value;
            return;
        }

        // No overlap
        if (queryRight < nodeLeft || queryLeft > nodeRight) {
            return;
        }

        // Partial overlap - recurse on children
        const mid = Math.floor((nodeLeft + nodeRight) / 2);
        this.rangeUpdateHelper(queryLeft, queryRight, value, nodeLeft, mid, 2 * nodeIndex);
        this.rangeUpdateHelper(queryLeft, queryRight, value, mid + 1, nodeRight, 2 * nodeIndex + 1);

        // Update current node
        this.tree[nodeIndex] = this.combine(this.tree[2 * nodeIndex], this.tree[2 * nodeIndex + 1]);
    }

    // Get the entire array
    getArray() {
        const result = [];
        for (let i = 0; i < this.n; i++) {
            result.push(this.tree[this.treeSize + i]);
        }
        return result;
    }

    // Print the tree structure (for debugging)
    printTree() {
        console.log('Segment Tree Structure:');
        let level = 0;
        let nodesInLevel = 1;
        let index = 1;

        while (index < 2 * this.treeSize) {
            const levelNodes = [];
            for (let i = 0; i < nodesInLevel && index < 2 * this.treeSize; i++) {
                levelNodes.push(this.tree[index++]);
            }
            console.log(`Level ${level}:`, levelNodes);
            level++;
            nodesInLevel *= 2;
        }
    }
}

// Specialized Segment Trees for common operations

class SumSegmentTree extends SegmentTree {
    constructor(arr) {
        super(arr, 'sum', 0);
    }
}

class MinSegmentTree extends SegmentTree {
    constructor(arr) {
        super(arr, 'min', Infinity);
    }
}

class MaxSegmentTree extends SegmentTree {
    constructor(arr) {
        super(arr, 'max', -Infinity);
    }
}

class XorSegmentTree extends SegmentTree {
    constructor(arr) {
        super(arr, 'xor', 0);
    }
}

// Test functions and examples
function testSegmentTree() {
    console.log("=== Segment Tree Data Structure Tests ===\n");

    // Test 1: Sum Segment Tree
    console.log("Test 1: Sum Segment Tree");
    const arr1 = [1, 3, 5, 7, 9, 11];
    const sumST = new SumSegmentTree(arr1);

    console.log("Original array:", arr1);
    console.log("Sum [0, 2]:", sumST.query(0, 2)); // 1 + 3 + 5 = 9
    console.log("Sum [1, 4]:", sumST.query(1, 4)); // 3 + 5 + 7 + 9 = 24
    console.log("Sum [0, 5]:", sumST.query(0, 5)); // All elements = 36

    sumST.update(2, 10);
    console.log("After updating index 2 to 10:");
    console.log("New array:", sumST.getArray());
    console.log("Sum [0, 2]:", sumST.query(0, 2)); // 1 + 3 + 10 = 14

    console.log("\n" + "=".repeat(50) + "\n");

    // Test 2: Min Segment Tree
    console.log("Test 2: Min Segment Tree");
    const arr2 = [5, 2, 8, 1, 9, 3];
    const minST = new MinSegmentTree(arr2);

    console.log("Original array:", arr2);
    console.log("Min [0, 2]:", minST.query(0, 2)); // min(5, 2, 8) = 2
    console.log("Min [1, 4]:", minST.query(1, 4)); // min(2, 8, 1, 9) = 1
    console.log("Min [0, 5]:", minST.query(0, 5)); // min of all = 1

    console.log("\n" + "=".repeat(50) + "\n");

    // Test 3: Max Segment Tree
    console.log("Test 3: Max Segment Tree");
    const arr3 = [3, 7, 2, 9, 1, 6];
    const maxST = new MaxSegmentTree(arr3);

    console.log("Original array:", arr3);
    console.log("Max [0, 2]:", maxST.query(0, 2)); // max(3, 7, 2) = 7
    console.log("Max [1, 4]:", maxST.query(1, 4)); // max(7, 2, 9, 1) = 9
    console.log("Max [0, 5]:", maxST.query(0, 5)); // max of all = 9

    console.log("\n" + "=".repeat(50) + "\n");

    // Test 4: Range Update
    console.log("Test 4: Range Update");
    const arr4 = [1, 2, 3, 4, 5];
    const st4 = new SumSegmentTree(arr4);

    console.log("Original array:", arr4);
    console.log("Sum [0, 4]:", st4.query(0, 4)); // 15

    st4.rangeUpdate(1, 3, 10);
    console.log("After range update [1,3] to 10:");
    console.log("New array:", st4.getArray());
    console.log("Sum [0, 4]:", st4.query(0, 4)); // 1 + 10 + 10 + 10 + 5 = 36

    console.log("\n" + "=".repeat(50) + "\n");

    // Test 5: XOR Segment Tree
    console.log("Test 5: XOR Segment Tree");
    const arr5 = [1, 2, 3, 4, 5];
    const xorST = new XorSegmentTree(arr5);

    console.log("Original array:", arr5);
    console.log("XOR [0, 2]:", xorST.query(0, 2)); // 1 ^ 2 ^ 3 = 0
    console.log("XOR [1, 4]:", xorST.query(1, 4)); // 2 ^ 3 ^ 4 ^ 5 = 0
    console.log("XOR [0, 4]:", xorST.query(0, 4)); // All elements XOR = 1
}

// Common problems solved with Segment Trees

// 1. Range Sum Queries
function rangeSumQueries(arr, queries) {
    const st = new SumSegmentTree(arr);
    const results = [];

    for (const [left, right] of queries) {
        results.push(st.query(left, right));
    }

    return results;
}

// 2. Range Minimum Queries
function rangeMinQueries(arr, queries) {
    const st = new MinSegmentTree(arr);
    const results = [];

    for (const [left, right] of queries) {
        results.push(st.query(left, right));
    }

    return results;
}

// 3. Sliding Window Maximum
function slidingWindowMaximum(arr, k) {
    const st = new MaxSegmentTree(arr);
    const result = [];

    for (let i = 0; i <= arr.length - k; i++) {
        result.push(st.query(i, i + k - 1));
    }

    return result;
}

// 4. Count of Smaller Numbers After Self
function countSmaller(arr) {
    const n = arr.length;
    const result = new Array(n).fill(0);
    const st = new SumSegmentTree(new Array(n).fill(0));

    // Coordinate compression
    const sorted = [...arr].sort((a, b) => a - b);
    const compressed = new Map();
    let compressedIndex = 0;

    for (let i = 0; i < sorted.length; i++) {
        if (!compressed.has(sorted[i])) {
            compressed.set(sorted[i], compressedIndex++);
        }
    }

    // Process from right to left
    for (let i = n - 1; i >= 0; i--) {
        const compressedVal = compressed.get(arr[i]);
        result[i] = st.query(0, compressedVal - 1);
        st.update(compressedVal, st.tree[st.treeSize + compressedVal] + 1);
    }

    return result;
}

// Run tests
testSegmentTree();

console.log("\n=== Additional Examples ===\n");

// Example: Range Sum Queries
console.log("Range Sum Queries Example:");
const arr1 = [1, 2, 3, 4, 5];
const queries1 = [[0, 2], [1, 3], [0, 4]];
console.log("Array:", arr1);
console.log("Queries:", queries1);
console.log("Results:", rangeSumQueries(arr1, queries1));

// Example: Range Min Queries
console.log("\nRange Min Queries Example:");
const arr2 = [5, 2, 8, 1, 9, 3];
const queries2 = [[0, 2], [1, 4], [2, 5]];
console.log("Array:", arr2);
console.log("Queries:", queries2);
console.log("Results:", rangeMinQueries(arr2, queries2));

// Example: Sliding Window Maximum
console.log("\nSliding Window Maximum Example:");
const arr3 = [1, 3, -1, -3, 5, 3, 6, 7];
const k = 3;
console.log("Array:", arr3);
console.log("Window size:", k);
console.log("Sliding window maximum:", slidingWindowMaximum(arr3, k));

module.exports = {
    SegmentTree,
    SumSegmentTree,
    MinSegmentTree,
    MaxSegmentTree,
    XorSegmentTree,
    rangeSumQueries,
    rangeMinQueries,
    slidingWindowMaximum,
    countSmaller
};
