class UnionFind {
    constructor(n) {
        // Initialize parent array where parent[i] = i (each node is its own parent)
        this.parent = Array.from({ length: n }, (_, i) => i);
        // Initialize rank array for union by rank optimization
        this.rank = new Array(n).fill(0);
        // Count of disjoint sets
        this.components = n;
    }

    // Find the root of the set containing element x
    // Uses path compression for optimization
    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    // Union two sets containing elements x and y
    // Uses union by rank for optimization
    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) {
            return false; // Already in the same set
        }

        // Union by rank: attach smaller tree to larger tree
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }

        this.components--;
        return true;
    }

    // Check if two elements are in the same set
    connected(x, y) {
        return this.find(x) === this.find(y);
    }

    // Get the number of disjoint sets
    getComponentCount() {
        return this.components;
    }

    // Get the size of the set containing element x
    getSetSize(x) {
        const root = this.find(x);
        let size = 0;
        for (let i = 0; i < this.parent.length; i++) {
            if (this.find(i) === root) {
                size++;
            }
        }
        return size;
    }
}

// Example usage and test cases
function testUnionFind() {
    console.log("=== Union-Find Data Structure Tests ===\n");

    // Test 1: Basic connectivity
    console.log("Test 1: Basic connectivity");
    const uf1 = new UnionFind(5);
    console.log("Initial components:", uf1.getComponentCount()); // 5

    uf1.union(0, 1);
    console.log("After union(0,1):", uf1.getComponentCount()); // 4
    console.log("connected(0,1):", uf1.connected(0, 1)); // true

    uf1.union(1, 2);
    console.log("After union(1,2):", uf1.getComponentCount()); // 3
    console.log("connected(0,2):", uf1.connected(0, 2)); // true

    uf1.union(3, 4);
    console.log("After union(3,4):", uf1.getComponentCount()); // 2
    console.log("connected(0,3):", uf1.connected(0, 3)); // false

    console.log("\n" + "=".repeat(50) + "\n");

    // Test 2: Graph connectivity problem
    console.log("Test 2: Graph connectivity");
    const edges = [[0, 1], [1, 2], [3, 4], [4, 5], [2, 3]];
    const n = 6;
    const uf2 = new UnionFind(n);

    console.log("Initial components:", uf2.getComponentCount());

    for (const [u, v] of edges) {
        const wasConnected = uf2.connected(u, v);
        uf2.union(u, v);
        console.log(`Union(${u}, ${v}) - Was connected: ${wasConnected}, Components: ${uf2.getComponentCount()}`);
    }

    console.log("Final components:", uf2.getComponentCount());
    console.log("All nodes connected:", uf2.getComponentCount() === 1);

    console.log("\n" + "=".repeat(50) + "\n");

    // Test 3: Cycle detection
    console.log("Test 3: Cycle detection");
    const uf3 = new UnionFind(4);
    const edgesWithCycle = [[0, 1], [1, 2], [2, 3], [0, 3]]; // Creates a cycle

    for (const [u, v] of edgesWithCycle) {
        if (uf3.connected(u, v)) {
            console.log(`Cycle detected! Edge (${u}, ${v}) creates a cycle`);
        } else {
            uf3.union(u, v);
            console.log(`Added edge (${u}, ${v})`);
        }
    }
}

// Common problems solved with Union-Find

// 1. Number of Connected Components
function countConnectedComponents(n, edges) {
    const uf = new UnionFind(n);
    for (const [u, v] of edges) {
        uf.union(u, v);
    }
    return uf.getComponentCount();
}

// 2. Redundant Connection (Cycle Detection)
function findRedundantConnection(edges) {
    const n = edges.length;
    const uf = new UnionFind(n + 1);

    for (const [u, v] of edges) {
        if (uf.connected(u, v)) {
            return [u, v]; // This edge creates a cycle
        }
        uf.union(u, v);
    }
    return null;
}

// 3. Minimum Spanning Tree (Kruskal's Algorithm)
function minimumSpanningTree(n, edges) {
    // Sort edges by weight
    edges.sort((a, b) => a[2] - b[2]);

    const uf = new UnionFind(n);
    const mst = [];
    let totalWeight = 0;

    for (const [u, v, weight] of edges) {
        if (!uf.connected(u, v)) {
            uf.union(u, v);
            mst.push([u, v, weight]);
            totalWeight += weight;
        }
    }

    return { mst, totalWeight };
}

// 4. Friend Circles (2D matrix representation)
function findCircleNum(isConnected) {
    const n = isConnected.length;
    const uf = new UnionFind(n);

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (isConnected[i][j] === 1) {
                uf.union(i, j);
            }
        }
    }

    return uf.getComponentCount();
}

// Run tests
testUnionFind();

console.log("\n=== Additional Examples ===\n");

// Example: Count connected components
console.log("Connected Components Example:");
const edges1 = [[0, 1], [1, 2], [3, 4]];
console.log("Edges:", edges1);
console.log("Number of components:", countConnectedComponents(5, edges1));

// Example: Find redundant connection
console.log("\nRedundant Connection Example:");
const edges2 = [[1, 2], [1, 3], [2, 3]];
console.log("Edges:", edges2);
console.log("Redundant edge:", findRedundantConnection(edges2));

// Example: Minimum Spanning Tree
console.log("\nMinimum Spanning Tree Example:");
const edges3 = [[0, 1, 4], [0, 2, 3], [1, 2, 1], [1, 3, 2], [2, 3, 5]];
console.log("Edges (u, v, weight):", edges3);
const mst = minimumSpanningTree(4, edges3);
console.log("MST:", mst.mst);
console.log("Total weight:", mst.totalWeight);

module.exports = { UnionFind, countConnectedComponents, findRedundantConnection, minimumSpanningTree, findCircleNum };
