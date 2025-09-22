// =============================================================================
// COMPREHENSIVE GRAPH DATA STRUCTURE IMPLEMENTATION
// =============================================================================
// Includes: Basic Graph, Weighted Graph, DFS/BFS Traversal, Dijkstra's Algorithm
// Time Complexity: Varies by operation (see individual method comments)
// Space Complexity: O(V + E) for adjacency list representation

class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    // =============================================================================
    // BASIC GRAPH OPERATIONS
    // =============================================================================

    // Time Complexity: O(1) - constant time hash table insertion
    // Space Complexity: O(1) - creates one array entry
    addVertex(vertex) {
        if (!vertex) throw new Error('Vertex cannot be null or undefined');
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // Time Complexity: O(1) - constant time array push operations
    // Space Complexity: O(1) - adds two references to existing arrays
    addEdge(v1, v2) {
        if (!v1 || !v2) throw new Error('Both vertices must be provided');
        if (v1 === v2) throw new Error('Cannot add self-loop edge');
        if (!this.adjacencyList[v1]) throw new Error(`Vertex ${v1} does not exist`);
        if (!this.adjacencyList[v2]) throw new Error(`Vertex ${v2} does not exist`);

        // Avoid duplicate edges
        if (!this.adjacencyList[v1].includes(v2)) {
            this.adjacencyList[v1].push(v2);
        }
        if (!this.adjacencyList[v2].includes(v1)) {
            this.adjacencyList[v2].push(v1);
        }
    }

    // Time Complexity: O(k) where k is the degree of the vertex (number of neighbors)
    // Space Complexity: O(k) - creates new filtered arrays
    removeEdge(vertex1, vertex2) {
        if (!vertex1 || !vertex2) throw new Error('Both vertices must be provided');
        if (!this.adjacencyList[vertex1]) throw new Error(`Vertex ${vertex1} does not exist`);
        if (!this.adjacencyList[vertex2]) throw new Error(`Vertex ${vertex2} does not exist`);

        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(v => v !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(v => v !== vertex1);
    }

    // Time Complexity: O(k²) where k is the degree of the vertex
    // Space Complexity: O(k) - temporary arrays during edge removal
    removeVertex(vertex) {
        if (!vertex) throw new Error('Vertex cannot be null or undefined');
        if (!this.adjacencyList[vertex]) throw new Error(`Vertex ${vertex} does not exist`);

        // More efficient approach: remove all edges at once
        const neighbors = [...this.adjacencyList[vertex]]; // Copy to avoid mutation during iteration
        neighbors.forEach(neighbor => {
            this.adjacencyList[neighbor] = this.adjacencyList[neighbor].filter(v => v !== vertex);
        });

        delete this.adjacencyList[vertex];
    }

    // =============================================================================
    // UTILITY METHODS
    // =============================================================================

    // Time Complexity: O(1) - constant time hash table lookup
    // Space Complexity: O(1) - no additional space used
    hasVertex(vertex) {
        return this.adjacencyList.hasOwnProperty(vertex);
    }

    // Time Complexity: O(k) where k is the degree of vertex1
    // Space Complexity: O(1) - no additional space used
    hasEdge(vertex1, vertex2) {
        if (!this.hasVertex(vertex1) || !this.hasVertex(vertex2)) return false;
        return this.adjacencyList[vertex1].includes(vertex2);
    }

    // Time Complexity: O(1) - constant time array length access
    // Space Complexity: O(1) - no additional space used
    getVertexCount() {
        return Object.keys(this.adjacencyList).length;
    }

    // Time Complexity: O(V) where V is the number of vertices
    // Space Complexity: O(V) - returns array of all vertices
    getVertices() {
        return Object.keys(this.adjacencyList);
    }

    // Time Complexity: O(1) - constant time array length access
    // Space Complexity: O(1) - no additional space used
    getDegree(vertex) {
        if (!this.hasVertex(vertex)) throw new Error(`Vertex ${vertex} does not exist`);
        return this.adjacencyList[vertex].length;
    }

    // =============================================================================
    // TRAVERSAL ALGORITHMS
    // =============================================================================

    // Time Complexity: O(V + E) where V = vertices, E = edges
    // Space Complexity: O(V) for visited set + O(V) for recursion stack = O(V)
    depthFirstRecursive(start) {
        if (!start || !this.adjacencyList[start]) return [];

        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        (function dfs(vertex) {
            if (!vertex) return;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    dfs(neighbor); // Fixed: removed return statement
                }
            });
        })(start);

        return result;
    }

    // Time Complexity: O(V + E) where V = vertices, E = edges
    // Space Complexity: O(V) for visited set + O(V) for stack = O(V)
    depthFirstIterative(start) {
        if (!start || !this.adjacencyList[start]) return [];

        const stack = [start];
        const result = [];
        const visited = {};
        let currentVertex;

        visited[start] = true;
        while (stack.length) {
            currentVertex = stack.pop();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }
        return result;
    }

    // Time Complexity: O(V + E) where V = vertices, E = edges
    // Space Complexity: O(V) for visited set + O(V) for queue = O(V)
    breadthFirst(start) {
        if (!start || !this.adjacencyList[start]) return [];

        const queue = [start];
        const result = [];
        const visited = {};
        let currentVertex;
        visited[start] = true;

        while (queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);

            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
        return result;
    }
}

// =============================================================================
// WEIGHTED GRAPH FOR DIJKSTRA'S ALGORITHM
// =============================================================================

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({node: vertex2, weight});
        this.adjacencyList[vertex2].push({node: vertex1, weight});
    }

    // Time Complexity: O((V + E) log V) with binary heap, O(V²) with array
    // Space Complexity: O(V) for distances, previous, and priority queue
    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = []; //to return at end
        let smallest;

        //build up initial state
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }

        // as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                //WE ARE DONE
                //BUILD UP PATH TO RETURN AT END
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    //find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    //calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {
                        //updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate;
                        //updating previous - How we got to neighbor
                        previous[nextNeighbor] = smallest;
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
}

// =============================================================================
// PRIORITY QUEUE IMPLEMENTATIONS
// =============================================================================

// Simple Priority Queue (O(n log n) insertion due to sorting)
class SimplePriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({val, priority});
        this.sort();
    }
    dequeue() {
        return this.values.shift();
    }
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }
}

// Efficient Priority Queue using Binary Heap (O(log n) insertion)
class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

// =============================================================================
// EXAMPLE USAGE AND TESTS
// =============================================================================

// Basic Graph Example
let g = new Graph();
g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');

console.log('DFS Recursive:', g.depthFirstRecursive('A'));
console.log('DFS Iterative:', g.depthFirstIterative('A'));
console.log('BFS:', g.breadthFirst('A'));

// Weighted Graph Example
var graph = new WeightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');
graph.addVertex('F');

graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);

console.log('Dijkstra Path:', graph.Dijkstra('A', 'E'));

module.exports = { Graph, WeightedGraph, PriorityQueue, SimplePriorityQueue, Node };
