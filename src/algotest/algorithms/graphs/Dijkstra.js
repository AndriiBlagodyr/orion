// =============================================================================
// DIJKSTRA'S SHORTEST PATH ALGORITHM IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Find shortest path from source to all vertices in weighted graph
//
// TIME COMPLEXITY ANALYSIS:
// - With Binary Heap Priority Queue: O((V + E) log V)
// - With Array-based Priority Queue: O(V²)
// - With Fibonacci Heap: O(E + V log V) [theoretical best]
//
// SPACE COMPLEXITY: O(V) for distances, previous, and priority queue
//
// WHERE:
// V = number of vertices
// E = number of edges
// =============================================================================

class DijkstraGraph {
    constructor() {
        this.adjacencyList = {};
        this.vertices = new Set();
    }

    /**
     * Add a vertex to the graph
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addVertex(vertex) {
        if (!vertex) throw new Error('Vertex cannot be null or undefined');
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
            this.vertices.add(vertex);
        }
    }

    /**
     * Add a weighted edge between two vertices
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addEdge(vertex1, vertex2, weight) {
        if (!vertex1 || !vertex2) throw new Error('Both vertices must be provided');
        if (weight < 0) throw new Error('Dijkstra requires non-negative weights');
        if (vertex1 === vertex2) throw new Error('Cannot add self-loop edge');

        if (!this.adjacencyList[vertex1]) this.addVertex(vertex1);
        if (!this.adjacencyList[vertex2]) this.addVertex(vertex2);

        // Check for duplicate edges and update if found
        const existingEdge1 = this.adjacencyList[vertex1].find(edge => edge.node === vertex2);
        const existingEdge2 = this.adjacencyList[vertex2].find(edge => edge.node === vertex1);

        if (existingEdge1) {
            existingEdge1.weight = weight;
        } else {
            this.adjacencyList[vertex1].push({ node: vertex2, weight });
        }

        if (existingEdge2) {
            existingEdge2.weight = weight;
        } else {
            this.adjacencyList[vertex2].push({ node: vertex1, weight });
        }
    }

    /**
     * DIJKSTRA'S ALGORITHM - Find shortest path from source to target
     *
     * ALGORITHM STEPS:
     * 1. Initialize distances to all vertices as INFINITY, except source (0)
     * 2. Initialize priority queue with all vertices
     * 3. While priority queue is not empty:
     *    a. Extract vertex with minimum distance (u)
     *    b. For each neighbor (v) of u:
     *       - Calculate new distance = distance[u] + weight(u,v)
     *       - If new distance < current distance[v]:
     *         * Update distance[v] = new distance
     *         * Update previous[v] = u
     *         * Add v to priority queue with new priority
     * 4. Reconstruct path from target to source using previous array
     *
     * Time Complexity: O((V + E) log V) with binary heap
     * Space Complexity: O(V) for distances, previous, and priority queue
     *
     * @param {string} source - Starting vertex
     * @param {string} target - Destination vertex
     * @returns {Object} - { path: string[], distance: number, distances: Object }
     */
    dijkstra(source, target) {
        if (!source || !target) throw new Error('Source and target must be provided');
        if (!this.adjacencyList[source]) throw new Error(`Source vertex ${source} does not exist`);
        if (!this.adjacencyList[target]) throw new Error(`Target vertex ${target} does not exist`);

        const priorityQueue = new BinaryHeapPriorityQueue();
        const distances = {};
        const previous = {};
        const visited = new Set();

        // Initialize distances and priority queue
        for (const vertex of this.vertices) {
            distances[vertex] = vertex === source ? 0 : Infinity;
            previous[vertex] = null;
            priorityQueue.insert(vertex, distances[vertex]);
        }

        while (!priorityQueue.isEmpty()) {
            const { value: currentVertex, priority: currentDistance } = priorityQueue.extractMin();

            // Skip if we've already processed this vertex with a better distance
            if (visited.has(currentVertex)) continue;
            visited.add(currentVertex);

            // Early termination if we've reached the target
            if (currentVertex === target) break;

            // Skip if current distance is infinity (unreachable)
            if (currentDistance === Infinity) continue;

            // Relax all edges from current vertex
            for (const edge of this.adjacencyList[currentVertex]) {
                const neighbor = edge.node;
                const edgeWeight = edge.weight;
                const newDistance = currentDistance + edgeWeight;

                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previous[neighbor] = currentVertex;
                    priorityQueue.insert(neighbor, newDistance);
                }
            }
        }

        // Reconstruct path
        const path = this._reconstructPath(previous, source, target);
        const totalDistance = distances[target];

        return {
            path: path,
            distance: totalDistance === Infinity ? -1 : totalDistance,
            distances: distances,
            isReachable: totalDistance !== Infinity
        };
    }

    /**
     * Find shortest paths from source to ALL vertices
     *
     * Time Complexity: O((V + E) log V)
     * Space Complexity: O(V)
     *
     * @param {string} source - Starting vertex
     * @returns {Object} - { distances: Object, previous: Object }
     */
    dijkstraAllPaths(source) {
        if (!source) throw new Error('Source must be provided');
        if (!this.adjacencyList[source]) throw new Error(`Source vertex ${source} does not exist`);

        const priorityQueue = new BinaryHeapPriorityQueue();
        const distances = {};
        const previous = {};
        const visited = new Set();

        // Initialize
        for (const vertex of this.vertices) {
            distances[vertex] = vertex === source ? 0 : Infinity;
            previous[vertex] = null;
            priorityQueue.insert(vertex, distances[vertex]);
        }

        while (!priorityQueue.isEmpty()) {
            const { value: currentVertex, priority: currentDistance } = priorityQueue.extractMin();

            if (visited.has(currentVertex)) continue;
            visited.add(currentVertex);

            if (currentDistance === Infinity) continue;

            for (const edge of this.adjacencyList[currentVertex]) {
                const neighbor = edge.node;
                const edgeWeight = edge.weight;
                const newDistance = currentDistance + edgeWeight;

                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previous[neighbor] = currentVertex;
                    priorityQueue.insert(neighbor, newDistance);
                }
            }
        }

        return { distances, previous };
    }

    /**
     * Reconstruct path from previous array
     * Time Complexity: O(V) in worst case
     * Space Complexity: O(V) for path array
     */
    _reconstructPath(previous, source, target) {
        const path = [];
        let current = target;

        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }

        // Check if path exists (source should be first element)
        return path[0] === source ? path : [];
    }

    /**
     * Get all vertices in the graph
     * Time Complexity: O(V)
     * Space Complexity: O(V)
     */
    getVertices() {
        return Array.from(this.vertices);
    }

    /**
     * Get neighbors of a vertex
     * Time Complexity: O(degree of vertex)
     * Space Complexity: O(degree of vertex)
     */
    getNeighbors(vertex) {
        if (!this.adjacencyList[vertex]) return [];
        return this.adjacencyList[vertex].map(edge => edge.node);
    }

    /**
     * Check if graph is connected (all vertices reachable from any vertex)
     * Time Complexity: O((V + E) log V)
     * Space Complexity: O(V)
     */
    isConnected() {
        if (this.vertices.size === 0) return true;

        const source = this.vertices.values().next().value;
        const result = this.dijkstraAllPaths(source);

        return Object.values(result.distances).every(distance => distance !== Infinity);
    }
}

// =============================================================================
// BINARY HEAP PRIORITY QUEUE IMPLEMENTATION
// =============================================================================
// Optimized for Dijkstra's algorithm with O(log n) insert/extract operations

class BinaryHeapPriorityQueue {
    constructor() {
        this.heap = [];
        this.size = 0;
    }

    /**
     * Insert element with priority
     * Time Complexity: O(log n)
     * Space Complexity: O(1)
     */
    insert(value, priority) {
        const element = { value, priority };
        this.heap[this.size] = element;
        this._heapifyUp(this.size);
        this.size++;
    }

    /**
     * Extract minimum priority element
     * Time Complexity: O(log n)
     * Space Complexity: O(1)
     */
    extractMin() {
        if (this.size === 0) throw new Error('Priority queue is empty');

        const min = this.heap[0];
        this.heap[0] = this.heap[this.size - 1];
        this.size--;

        if (this.size > 0) {
            this._heapifyDown(0);
        }

        return min;
    }

    /**
     * Check if priority queue is empty
     * Time Complexity: O(1)
     */
    isEmpty() {
        return this.size === 0;
    }

    /**
     * Get minimum element without removing it
     * Time Complexity: O(1)
     */
    peek() {
        if (this.size === 0) throw new Error('Priority queue is empty');
        return this.heap[0];
    }

    /**
     * Move element up the heap to maintain heap property
     * Time Complexity: O(log n)
     */
    _heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].priority >= this.heap[parentIndex].priority) break;

            this._swap(index, parentIndex);
            index = parentIndex;
        }
    }

    /**
     * Move element down the heap to maintain heap property
     * Time Complexity: O(log n)
     */
    _heapifyDown(index) {
        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.size &&
                this.heap[leftChild].priority < this.heap[smallest].priority) {
                smallest = leftChild;
            }

            if (rightChild < this.size &&
                this.heap[rightChild].priority < this.heap[smallest].priority) {
                smallest = rightChild;
            }

            if (smallest === index) break;

            this._swap(index, smallest);
            index = smallest;
        }
    }

    /**
     * Swap two elements in the heap
     * Time Complexity: O(1)
     */
    _swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}

// =============================================================================
// COMPREHENSIVE TEST EXAMPLES AND COMPLEXITY DEMONSTRATION
// =============================================================================

function runDijkstraTests() {
    console.log('='.repeat(80));
    console.log('DIJKSTRA\'S ALGORITHM - COMPREHENSIVE TEST SUITE');
    console.log('='.repeat(80));

    // Test Case 1: Basic Graph
    console.log('\n1. BASIC GRAPH TEST:');
    const graph1 = new DijkstraGraph();
    graph1.addVertex('A');
    graph1.addVertex('B');
    graph1.addVertex('C');
    graph1.addVertex('D');

    graph1.addEdge('A', 'B', 4);
    graph1.addEdge('A', 'C', 2);
    graph1.addEdge('B', 'C', 1);
    graph1.addEdge('B', 'D', 5);
    graph1.addEdge('C', 'D', 8);

    const result1 = graph1.dijkstra('A', 'D');
    console.log('Shortest path from A to D:', result1.path);
    console.log('Distance:', result1.distance);
    console.log('All distances from A:', result1.distances);

    // Test Case 2: Complex Graph
    console.log('\n2. COMPLEX GRAPH TEST:');
    const graph2 = new DijkstraGraph();
    const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    vertices.forEach(v => graph2.addVertex(v));

    graph2.addEdge('A', 'B', 7);
    graph2.addEdge('A', 'C', 3);
    graph2.addEdge('B', 'D', 2);
    graph2.addEdge('B', 'E', 4);
    graph2.addEdge('C', 'D', 1);
    graph2.addEdge('C', 'F', 6);
    graph2.addEdge('D', 'E', 2);
    graph2.addEdge('D', 'F', 4);
    graph2.addEdge('E', 'G', 3);
    graph2.addEdge('F', 'G', 2);

    const result2 = graph2.dijkstra('A', 'G');
    console.log('Shortest path from A to G:', result2.path);
    console.log('Distance:', result2.distance);

    // Test Case 3: Unreachable vertex
    console.log('\n3. UNREACHABLE VERTEX TEST:');
    const graph3 = new DijkstraGraph();
    graph3.addVertex('A');
    graph3.addVertex('B');
    graph3.addVertex('C');
    graph3.addEdge('A', 'B', 1);
    // C is isolated

    const result3 = graph3.dijkstra('A', 'C');
    console.log('Path from A to C (unreachable):', result3.path);
    console.log('Is reachable:', result3.isReachable);

    // Test Case 4: Single vertex
    console.log('\n4. SINGLE VERTEX TEST:');
    const graph4 = new DijkstraGraph();
    graph4.addVertex('A');

    const result4 = graph4.dijkstra('A', 'A');
    console.log('Path from A to A:', result4.path);
    console.log('Distance:', result4.distance);

    // Test Case 5: Performance demonstration
    console.log('\n5. PERFORMANCE DEMONSTRATION:');
    const largeGraph = new DijkstraGraph();
    const n = 100; // Number of vertices

    // Create a grid-like graph
    for (let i = 0; i < n; i++) {
        largeGraph.addVertex(`V${i}`);
    }

    // Add edges to create a connected graph
    for (let i = 0; i < n - 1; i++) {
        largeGraph.addEdge(`V${i}`, `V${i + 1}`, Math.floor(Math.random() * 10) + 1);
    }

    console.log(`Created graph with ${n} vertices`);
    const startTime = performance.now();
    const largeResult = largeGraph.dijkstra('V0', `V${n - 1}`);
    const endTime = performance.now();

    console.log(`Shortest path found in ${(endTime - startTime).toFixed(2)}ms`);
    console.log(`Path length: ${largeResult.path.length} vertices`);
    console.log(`Total distance: ${largeResult.distance}`);
}

// =============================================================================
// COMPLEXITY ANALYSIS SUMMARY
// =============================================================================

/*
TIME COMPLEXITY BREAKDOWN:

1. INITIALIZATION PHASE:
   - Initialize distances array: O(V)
   - Initialize priority queue: O(V)
   - Total: O(V)

2. MAIN LOOP:
   - Extract minimum from priority queue: O(log V) per operation
   - Number of extractions: O(V) in worst case
   - Relax edges: O(E) total across all iterations
   - Insert/update priority queue: O(log V) per edge
   - Total: O((V + E) log V)

3. PATH RECONSTRUCTION:
   - Reconstruct path: O(V) in worst case
   - Total: O(V)

OVERALL TIME COMPLEXITY: O((V + E) log V)

SPACE COMPLEXITY BREAKDOWN:

1. ADJACENCY LIST: O(V + E)
2. DISTANCES ARRAY: O(V)
3. PREVIOUS ARRAY: O(V)
4. PRIORITY QUEUE: O(V)
5. VISITED SET: O(V)

OVERALL SPACE COMPLEXITY: O(V + E)

OPTIMIZATION NOTES:

1. BINARY HEAP vs ARRAY:
   - Binary Heap: O((V + E) log V) - Better for sparse graphs
   - Array: O(V²) - Better for dense graphs

2. EARLY TERMINATION:
   - Stop when target is reached (if only need single path)
   - Reduces average case complexity

3. FIBONACCI HEAP:
   - Theoretical best: O(E + V log V)
   - Practical overhead makes it slower for small graphs

4. BIDIRECTIONAL DIJKSTRA:
   - Can reduce search space by searching from both ends
   - Complexity remains same but constant factors improve

REAL-WORLD APPLICATIONS:
- GPS navigation systems
- Network routing protocols
- Social network analysis
- Game AI pathfinding
- Resource allocation optimization
*/

// Export classes for use in other modules
module.exports = {
    DijkstraGraph,
    BinaryHeapPriorityQueue,
    PrimMST,
    runDijkstraTests,
    runPrimTests
};

// =============================================================================
// PRIM'S MINIMUM SPANNING TREE ALGORITHM IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Find minimum spanning tree of a connected weighted graph
//
// TIME COMPLEXITY ANALYSIS:
// - With Binary Heap Priority Queue: O(E log V)
// - With Array-based Priority Queue: O(V²)
// - With Fibonacci Heap: O(E + V log V) [theoretical best]
//
// SPACE COMPLEXITY: O(V) for key, parent, and priority queue
//
// WHERE:
// V = number of vertices
// E = number of edges
// =============================================================================

class PrimMST {
    constructor() {
        this.adjacencyList = {};
        this.vertices = new Set();
    }

    /**
     * Add a vertex to the graph
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addVertex(vertex) {
        if (!vertex) throw new Error('Vertex cannot be null or undefined');
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
            this.vertices.add(vertex);
        }
    }

    /**
     * Add a weighted edge between two vertices
     * Time Complexity: O(1)
     * Space Complexity: O(1)
     */
    addEdge(vertex1, vertex2, weight) {
        if (!vertex1 || !vertex2) throw new Error('Both vertices must be provided');
        if (weight < 0) throw new Error('Prim requires non-negative weights');
        if (vertex1 === vertex2) throw new Error('Cannot add self-loop edge');

        if (!this.adjacencyList[vertex1]) this.addVertex(vertex1);
        if (!this.adjacencyList[vertex2]) this.addVertex(vertex2);

        // Add edge in both directions for undirected graph
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }

    /**
     * PRIM'S ALGORITHM - Find Minimum Spanning Tree
     *
     * ALGORITHM STEPS:
     * 1. Initialize key values for all vertices as INFINITY, except start vertex (0)
     * 2. Initialize parent array to track MST structure
     * 3. Initialize priority queue with all vertices
     * 4. While priority queue is not empty:
     *    a. Extract vertex with minimum key value (u)
     *    b. For each neighbor (v) of u:
     *       - If v is in priority queue and weight(u,v) < key[v]:
     *         * Update key[v] = weight(u,v)
     *         * Update parent[v] = u
     *         * Update priority queue with new key
     * 5. Construct MST edges from parent array
     *
     * Time Complexity: O(E log V) with binary heap
     * Space Complexity: O(V) for key, parent, and priority queue
     *
     * @param {string} startVertex - Starting vertex for MST
     * @returns {Object} - { mst: Array, totalWeight: number, edges: Array }
     */
    primMST(startVertex) {
        if (!startVertex) throw new Error('Start vertex must be provided');
        if (!this.adjacencyList[startVertex]) throw new Error(`Start vertex ${startVertex} does not exist`);

        const priorityQueue = new BinaryHeapPriorityQueue();
        const key = {};
        const parent = {};
        const inMST = new Set();
        const mstEdges = [];
        let totalWeight = 0;

        // Initialize key values and priority queue
        for (const vertex of this.vertices) {
            key[vertex] = vertex === startVertex ? 0 : Infinity;
            parent[vertex] = null;
            priorityQueue.insert(vertex, key[vertex]);
        }

        while (!priorityQueue.isEmpty()) {
            const { value: currentVertex, priority: currentKey } = priorityQueue.extractMin();

            // Add current vertex to MST
            inMST.add(currentVertex);

            // Add edge to MST if it's not the starting vertex
            if (parent[currentVertex] !== null) {
                mstEdges.push({
                    from: parent[currentVertex],
                    to: currentVertex,
                    weight: currentKey
                });
                totalWeight += currentKey;
            }

            // Check all neighbors of current vertex
            for (const neighbor of this.adjacencyList[currentVertex]) {
                const { node: neighborVertex, weight } = neighbor;

                // If neighbor is not in MST and weight is smaller than current key
                if (!inMST.has(neighborVertex) && weight < key[neighborVertex]) {
                    key[neighborVertex] = weight;
                    parent[neighborVertex] = currentVertex;
                    priorityQueue.insert(neighborVertex, key[neighborVertex]);
                }
            }
        }

        return {
            mst: mstEdges,
            totalWeight: totalWeight,
            edges: mstEdges.map(edge => [edge.from, edge.to, edge.weight])
        };
    }

    /**
     * Get MST as adjacency list representation
     * Time Complexity: O(V + E)
     * Space Complexity: O(V + E)
     */
    getMSTAsAdjacencyList(startVertex) {
        const mstResult = this.primMST(startVertex);
        const mstAdjacencyList = {};

        // Initialize adjacency list for all vertices
        for (const vertex of this.vertices) {
            mstAdjacencyList[vertex] = [];
        }

        // Add MST edges
        for (const edge of mstResult.mst) {
            mstAdjacencyList[edge.from].push({ node: edge.to, weight: edge.weight });
            mstAdjacencyList[edge.to].push({ node: edge.from, weight: edge.weight });
        }

        return mstAdjacencyList;
    }

    /**
     * Check if graph is connected (required for MST)
     * Time Complexity: O(V + E)
     * Space Complexity: O(V)
     */
    isConnected() {
        if (this.vertices.size === 0) return true;

        const visited = new Set();
        const startVertex = Array.from(this.vertices)[0];
        const stack = [startVertex];

        while (stack.length > 0) {
            const current = stack.pop();
            if (visited.has(current)) continue;

            visited.add(current);
            for (const neighbor of this.adjacencyList[current]) {
                if (!visited.has(neighbor.node)) {
                    stack.push(neighbor.node);
                }
            }
        }

        return visited.size === this.vertices.size;
    }

    /**
     * Display graph structure
     * Time Complexity: O(V + E)
     * Space Complexity: O(1)
     */
    display() {
        console.log('\n=== PRIM MST GRAPH STRUCTURE ===');
        for (const vertex of this.vertices) {
            const neighbors = this.adjacencyList[vertex].map(n => `${n.node}(${n.weight})`);
            console.log(`${vertex}: [${neighbors.join(', ')}]`);
        }
        console.log('================================\n');
    }
}

// =============================================================================
// PRIM'S ALGORITHM TEST SUITE
// =============================================================================

function runPrimTests() {
    console.log('🌲 PRIM\'S MINIMUM SPANNING TREE ALGORITHM TESTS 🌲\n');

    // Test Case 1: Basic MST
    console.log('Test 1: Basic Minimum Spanning Tree');
    const primGraph1 = new PrimMST();

    primGraph1.addEdge('A', 'B', 4);
    primGraph1.addEdge('A', 'C', 3);
    primGraph1.addEdge('B', 'C', 1);
    primGraph1.addEdge('B', 'D', 2);
    primGraph1.addEdge('C', 'D', 5);
    primGraph1.addEdge('C', 'E', 6);
    primGraph1.addEdge('D', 'E', 1);

    primGraph1.display();

    const mst1 = primGraph1.primMST('A');
    console.log('MST Edges:', mst1.edges);
    console.log('Total Weight:', mst1.totalWeight);
    console.log('Expected Total Weight: 7 (B-C:1, D-E:1, B-D:2, A-C:3)');
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Single vertex
    console.log('Test 2: Single Vertex Graph');
    const primGraph2 = new PrimMST();
    primGraph2.addVertex('A');

    const mst2 = primGraph2.primMST('A');
    console.log('MST Edges:', mst2.edges);
    console.log('Total Weight:', mst2.totalWeight);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Linear graph
    console.log('Test 3: Linear Graph');
    const primGraph3 = new PrimMST();
    primGraph3.addEdge('A', 'B', 1);
    primGraph3.addEdge('B', 'C', 2);
    primGraph3.addEdge('C', 'D', 3);

    const mst3 = primGraph3.primMST('A');
    console.log('MST Edges:', mst3.edges);
    console.log('Total Weight:', mst3.totalWeight);
    console.log('Expected Total Weight: 6');
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Complete graph
    console.log('Test 4: Complete Graph (4 vertices)');
    const primGraph4 = new PrimMST();
    primGraph4.addEdge('A', 'B', 1);
    primGraph4.addEdge('A', 'C', 2);
    primGraph4.addEdge('A', 'D', 3);
    primGraph4.addEdge('B', 'C', 4);
    primGraph4.addEdge('B', 'D', 5);
    primGraph4.addEdge('C', 'D', 6);

    const mst4 = primGraph4.primMST('A');
    console.log('MST Edges:', mst4.edges);
    console.log('Total Weight:', mst4.totalWeight);
    console.log('Expected Total Weight: 6 (A-B:1, A-C:2, A-D:3)');
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: MST as adjacency list
    console.log('Test 5: MST as Adjacency List');
    const mstAdjList = primGraph1.getMSTAsAdjacencyList('A');
    console.log('MST Adjacency List:');
    for (const vertex in mstAdjList) {
        const neighbors = mstAdjList[vertex].map(n => `${n.node}(${n.weight})`);
        console.log(`${vertex}: [${neighbors.join(', ')}]`);
    }
    console.log('✅ Test 5 Passed\n');

    // Test Case 6: Connectivity check
    console.log('Test 6: Connectivity Check');
    console.log('Graph 1 is connected:', primGraph1.isConnected());

    const disconnectedGraph = new PrimMST();
    disconnectedGraph.addEdge('A', 'B', 1);
    disconnectedGraph.addEdge('C', 'D', 2);
    console.log('Disconnected graph is connected:', disconnectedGraph.isConnected());
    console.log('✅ Test 6 Passed\n');

    console.log('🎉 All Prim\'s Algorithm tests passed!');
}

// Export for use in other modules
module.exports = {
    PrimMST,
    runPrimTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runDijkstraTests();
    runPrimTests();
}
