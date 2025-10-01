// =============================================================================
// TOPOLOGICAL SORT ALGORITHM IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Sort vertices of a directed acyclic graph (DAG) in topological order
//
// TIME COMPLEXITY ANALYSIS:
// - Best Case: O(V + E)
// - Average Case: O(V + E)
// - Worst Case: O(V + E)
//
// SPACE COMPLEXITY: O(V) - for recursion stack and visited array
//
// STABILITY: Not applicable - topological order is unique for DAG
//
// WHERE:
// V = number of vertices
// E = number of edges
// =============================================================================

/**
 * TOPOLOGICAL SORT - Sorts vertices of a DAG in topological order
 *
 * ALGORITHM STEPS (DFS-based):
 * 1. Perform DFS on all unvisited vertices
 * 2. When DFS finishes exploring a vertex, add it to stack
 * 3. Reverse the stack to get topological order
 *
 * ALGORITHM STEPS (Kahn's Algorithm - BFS-based):
 * 1. Calculate in-degree for each vertex
 * 2. Add all vertices with in-degree 0 to queue
 * 3. While queue is not empty:
 *    a. Remove vertex from queue and add to result
 *    b. Reduce in-degree of all adjacent vertices
 *    c. Add vertices with in-degree 0 to queue
 *
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 *
 * @param {Object} graph - Adjacency list representation of DAG
 * @param {string} algorithm - 'dfs' or 'kahn' (default: 'dfs')
 * @returns {string[]} - Topologically sorted vertices
 */
function topologicalSort(graph, algorithm = 'dfs') {
    if (!graph || typeof graph !== 'object') throw new Error('Graph must be an object');

    const vertices = Object.keys(graph);
    if (vertices.length === 0) return [];

    switch (algorithm.toLowerCase()) {
        case 'dfs':
            return topologicalSortDFS(graph);
        case 'kahn':
            return topologicalSortKahn(graph);
        default:
            throw new Error('Algorithm must be "dfs" or "kahn"');
    }
}

/**
 * DFS-based Topological Sort
 */
function topologicalSortDFS(graph) {
    const vertices = Object.keys(graph);
    const visited = new Set();
    const stack = [];

    // DFS helper function
    function dfs(vertex) {
        visited.add(vertex);

        // Visit all adjacent vertices
        if (graph[vertex]) {
            for (const neighbor of graph[vertex]) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor);
                }
            }
        }

        // Push vertex to stack after all its descendants are processed
        stack.push(vertex);
    }

    // Perform DFS on all unvisited vertices
    for (const vertex of vertices) {
        if (!visited.has(vertex)) {
            dfs(vertex);
        }
    }

    // Reverse stack to get topological order
    return stack.reverse();
}

/**
 * Kahn's Algorithm (BFS-based Topological Sort)
 */
function topologicalSortKahn(graph) {
    const vertices = Object.keys(graph);
    const inDegree = {};
    const queue = [];
    const result = [];

    // Initialize in-degree for all vertices
    for (const vertex of vertices) {
        inDegree[vertex] = 0;
    }

    // Calculate in-degree for each vertex
    for (const vertex of vertices) {
        if (graph[vertex]) {
            for (const neighbor of graph[vertex]) {
                inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
            }
        }
    }

    // Add all vertices with in-degree 0 to queue
    for (const vertex of vertices) {
        if (inDegree[vertex] === 0) {
            queue.push(vertex);
        }
    }

    // Process queue
    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);

        // Reduce in-degree of adjacent vertices
        if (graph[current]) {
            for (const neighbor of graph[current]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }
    }

    // Check for cycle (if result length != vertices length, there's a cycle)
    if (result.length !== vertices.length) {
        throw new Error('Graph contains a cycle - topological sort not possible');
    }

    return result;
}

/**
 * TOPOLOGICAL SORT WITH STEP-BY-STEP TRACKING
 *
 * @param {Object} graph - Adjacency list representation of DAG
 * @param {string} algorithm - 'dfs' or 'kahn' (default: 'dfs')
 * @returns {Object} - { sortedVertices: string[], steps: Array, hasCycle: boolean }
 */
function topologicalSortWithSteps(graph, algorithm = 'dfs') {
    if (!graph || typeof graph !== 'object') throw new Error('Graph must be an object');

    const vertices = Object.keys(graph);
    if (vertices.length === 0) return { sortedVertices: [], steps: [], hasCycle: false };

    switch (algorithm.toLowerCase()) {
        case 'dfs':
            return topologicalSortDFSWithSteps(graph);
        case 'kahn':
            return topologicalSortKahnWithSteps(graph);
        default:
            throw new Error('Algorithm must be "dfs" or "kahn"');
    }
}

function topologicalSortDFSWithSteps(graph) {
    const steps = [];
    const vertices = Object.keys(graph);
    const visited = new Set();
    const stack = [];
    let hasCycle = false;

    function dfs(vertex, path = []) {
        if (path.includes(vertex)) {
            hasCycle = true;
            steps.push({
                action: 'cycle_detected',
                vertex: vertex,
                path: [...path, vertex],
                message: 'Cycle detected in graph'
            });
            return;
        }

        if (visited.has(vertex)) return;

        visited.add(vertex);
        const currentPath = [...path, vertex];

        steps.push({
            action: 'visit_vertex',
            vertex: vertex,
            path: currentPath,
            visited: [...visited]
        });

        // Visit all adjacent vertices
        if (graph[vertex]) {
            for (const neighbor of graph[vertex]) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor, currentPath);
                }
            }
        }

        // Push vertex to stack after all its descendants are processed
        stack.push(vertex);
        steps.push({
            action: 'finish_vertex',
            vertex: vertex,
            stack: [...stack]
        });
    }

    // Perform DFS on all unvisited vertices
    for (const vertex of vertices) {
        if (!visited.has(vertex)) {
            dfs(vertex);
        }
    }

    const sortedVertices = stack.reverse();

    steps.push({
        action: 'sort_complete',
        sortedVertices: [...sortedVertices],
        hasCycle: hasCycle
    });

    return { sortedVertices, steps, hasCycle };
}

function topologicalSortKahnWithSteps(graph) {
    const steps = [];
    const vertices = Object.keys(graph);
    const inDegree = {};
    const queue = [];
    const result = [];

    // Initialize in-degree
    for (const vertex of vertices) {
        inDegree[vertex] = 0;
    }

    steps.push({
        action: 'initialize_indegree',
        inDegree: { ...inDegree }
    });

    // Calculate in-degree
    for (const vertex of vertices) {
        if (graph[vertex]) {
            for (const neighbor of graph[vertex]) {
                inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
                steps.push({
                    action: 'update_indegree',
                    from: vertex,
                    to: neighbor,
                    inDegree: { ...inDegree }
                });
            }
        }
    }

    // Add vertices with in-degree 0 to queue
    for (const vertex of vertices) {
        if (inDegree[vertex] === 0) {
            queue.push(vertex);
        }
    }

    steps.push({
        action: 'initial_queue',
        queue: [...queue],
        inDegree: { ...inDegree }
    });

    // Process queue
    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);

        steps.push({
            action: 'process_vertex',
            vertex: current,
            result: [...result],
            queue: [...queue]
        });

        // Reduce in-degree of adjacent vertices
        if (graph[current]) {
            for (const neighbor of graph[current]) {
                inDegree[neighbor]--;
                steps.push({
                    action: 'reduce_indegree',
                    from: current,
                    to: neighbor,
                    newInDegree: inDegree[neighbor],
                    inDegree: { ...inDegree }
                });

                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                    steps.push({
                        action: 'add_to_queue',
                        vertex: neighbor,
                        queue: [...queue]
                    });
                }
            }
        }
    }

    const hasCycle = result.length !== vertices.length;

    steps.push({
        action: 'sort_complete',
        sortedVertices: [...result],
        hasCycle: hasCycle,
        message: hasCycle ? 'Graph contains a cycle' : 'Topological sort completed'
    });

    return { sortedVertices: result, steps, hasCycle };
}

/**
 * CHECK IF GRAPH IS DAG (Directed Acyclic Graph)
 *
 * @param {Object} graph - Adjacency list representation
 * @returns {boolean} - True if graph is DAG
 */
function isDAG(graph) {
    if (!graph || typeof graph !== 'object') return false;

    try {
        topologicalSortKahn(graph);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * FIND ALL POSSIBLE TOPOLOGICAL ORDERS
 *
 * @param {Object} graph - Adjacency list representation of DAG
 * @returns {string[][]} - Array of all possible topological orders
 */
function findAllTopologicalOrders(graph) {
    if (!graph || typeof graph !== 'object') throw new Error('Graph must be an object');

    const vertices = Object.keys(graph);
    if (vertices.length === 0) return [[]];

    const inDegree = {};
    const result = [];

    // Initialize in-degree
    for (const vertex of vertices) {
        inDegree[vertex] = 0;
    }

    // Calculate in-degree
    for (const vertex of vertices) {
        if (graph[vertex]) {
            for (const neighbor of graph[vertex]) {
                inDegree[neighbor] = (inDegree[neighbor] || 0) + 1;
            }
        }
    }

    function findAllOrders(currentOrder, remainingInDegree) {
        if (currentOrder.length === vertices.length) {
            result.push([...currentOrder]);
            return;
        }

        // Find all vertices with in-degree 0
        const candidates = vertices.filter(vertex =>
            !currentOrder.includes(vertex) && remainingInDegree[vertex] === 0
        );

        for (const candidate of candidates) {
            // Add candidate to current order
            currentOrder.push(candidate);

            // Update in-degree for adjacent vertices
            const newInDegree = { ...remainingInDegree };
            if (graph[candidate]) {
                for (const neighbor of graph[candidate]) {
                    newInDegree[neighbor]--;
                }
            }

            // Recursively find remaining orders
            findAllOrders(currentOrder, newInDegree);

            // Backtrack
            currentOrder.pop();
        }
    }

    findAllOrders([], { ...inDegree });
    return result;
}

/**
 * TOPOLOGICAL SORT FOR WEIGHTED GRAPH
 *
 * @param {Object} graph - Weighted adjacency list representation
 * @param {string} algorithm - 'dfs' or 'kahn' (default: 'dfs')
 * @returns {Object} - { sortedVertices: string[], totalWeight: number }
 */
function topologicalSortWeighted(graph, algorithm = 'dfs') {
    if (!graph || typeof graph !== 'object') throw new Error('Graph must be an object');

    const sortedVertices = topologicalSort(graph, algorithm);
    let totalWeight = 0;

    // Calculate total weight of edges in topological order
    for (let i = 0; i < sortedVertices.length - 1; i++) {
        const current = sortedVertices[i];
        const next = sortedVertices[i + 1];

        if (graph[current]) {
            for (const edge of graph[current]) {
                if (edge.node === next) {
                    totalWeight += edge.weight || 0;
                    break;
                }
            }
        }
    }

    return { sortedVertices, totalWeight };
}

/**
 * LONGEST PATH IN DAG USING TOPOLOGICAL SORT
 *
 * @param {Object} graph - Weighted adjacency list representation
 * @param {string} start - Starting vertex
 * @returns {Object} - { longestPath: string[], maxDistance: number }
 */
function longestPathInDAG(graph, start) {
    if (!graph || typeof graph !== 'object') throw new Error('Graph must be an object');
    if (!start || !graph[start]) throw new Error('Start vertex must exist in graph');

    const vertices = Object.keys(graph);
    const distances = {};
    const previous = {};
    const topoOrder = topologicalSort(graph);

    // Initialize distances
    for (const vertex of vertices) {
        distances[vertex] = vertex === start ? 0 : -Infinity;
        previous[vertex] = null;
    }

    // Process vertices in topological order
    for (const vertex of topoOrder) {
        if (distances[vertex] !== -Infinity && graph[vertex]) {
            for (const edge of graph[vertex]) {
                const newDistance = distances[vertex] + (edge.weight || 1);
                if (newDistance > distances[edge.node]) {
                    distances[edge.node] = newDistance;
                    previous[edge.node] = vertex;
                }
            }
        }
    }

    // Find vertex with maximum distance
    let maxDistance = -Infinity;
    let endVertex = null;
    for (const vertex of vertices) {
        if (distances[vertex] > maxDistance) {
            maxDistance = distances[vertex];
            endVertex = vertex;
        }
    }

    // Reconstruct path
    const longestPath = [];
    let current = endVertex;
    while (current !== null) {
        longestPath.unshift(current);
        current = previous[current];
    }

    return { longestPath, maxDistance };
}

// =============================================================================
// TOPOLOGICAL SORT TEST SUITE
// =============================================================================

function runTopologicalSortTests() {
    console.log('🔗 TOPOLOGICAL SORT ALGORITHM TESTS 🔗\n');

    // Test Case 1: Basic DAG
    console.log('Test 1: Basic DAG');
    const graph1 = {
        'A': ['B', 'C'],
        'B': ['D'],
        'C': ['D'],
        'D': []
    };
    const sorted1 = topologicalSort(graph1);
    console.log('Graph:', graph1);
    console.log('Topological Order:', sorted1);
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Course Prerequisites Example
    console.log('Test 2: Course Prerequisites');
    const courses = {
        'CS101': ['CS102'],
        'CS102': ['CS201', 'CS202'],
        'CS201': ['CS301'],
        'CS202': ['CS301'],
        'CS301': []
    };
    const courseOrder = topologicalSort(courses);
    console.log('Course Graph:', courses);
    console.log('Course Order:', courseOrder);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Kahn\'s Algorithm
    console.log('Test 3: Kahn\'s Algorithm');
    const graph3 = {
        '1': ['2', '3'],
        '2': ['4'],
        '3': ['4'],
        '4': ['5'],
        '5': []
    };
    const sorted3 = topologicalSort(graph3, 'kahn');
    console.log('Graph:', graph3);
    console.log('Kahn\'s Order:', sorted3);
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Step-by-step tracking
    console.log('Test 4: Step-by-Step Tracking');
    const graph4 = {
        'A': ['B'],
        'B': ['C'],
        'C': []
    };
    const result = topologicalSortWithSteps(graph4);
    console.log('Graph:', graph4);
    console.log('Sorted:', result.sortedVertices);
    console.log('Has Cycle:', result.hasCycle);
    console.log('Total Steps:', result.steps.length);
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: Cycle Detection
    console.log('Test 5: Cycle Detection');
    const cyclicGraph = {
        'A': ['B'],
        'B': ['C'],
        'C': ['A']
    };
    try {
        topologicalSort(cyclicGraph);
        console.log('❌ Should have detected cycle');
    } catch (error) {
        console.log('Graph:', cyclicGraph);
        console.log('Cycle detected:', error.message);
        console.log('✅ Test 5 Passed\n');
    }

    // Test Case 6: DAG Check
    console.log('Test 6: DAG Check');
    console.log('Graph1 is DAG:', isDAG(graph1));
    console.log('CyclicGraph is DAG:', isDAG(cyclicGraph));
    console.log('✅ Test 6 Passed\n');

    // Test Case 7: All Possible Orders
    console.log('Test 7: All Possible Orders');
    const graph7 = {
        'A': ['C'],
        'B': ['C'],
        'C': []
    };
    const allOrders = findAllTopologicalOrders(graph7);
    console.log('Graph:', graph7);
    console.log('All Possible Orders:', allOrders);
    console.log('✅ Test 7 Passed\n');

    // Test Case 8: Weighted Graph
    console.log('Test 8: Weighted Graph');
    const weightedGraph = {
        'A': [{ node: 'B', weight: 3 }, { node: 'C', weight: 2 }],
        'B': [{ node: 'D', weight: 1 }],
        'C': [{ node: 'D', weight: 4 }],
        'D': []
    };
    const weightedResult = topologicalSortWeighted(weightedGraph);
    console.log('Weighted Graph:', weightedGraph);
    console.log('Sorted:', weightedResult.sortedVertices);
    console.log('Total Weight:', weightedResult.totalWeight);
    console.log('✅ Test 8 Passed\n');

    // Test Case 9: Longest Path
    console.log('Test 9: Longest Path in DAG');
    const pathGraph = {
        'A': [{ node: 'B', weight: 5 }, { node: 'C', weight: 3 }],
        'B': [{ node: 'D', weight: 2 }],
        'C': [{ node: 'D', weight: 1 }],
        'D': []
    };
    const longestPath = longestPathInDAG(pathGraph, 'A');
    console.log('Graph:', pathGraph);
    console.log('Longest Path:', longestPath.longestPath);
    console.log('Max Distance:', longestPath.maxDistance);
    console.log('✅ Test 9 Passed\n');

    // Test Case 10: Empty Graph
    console.log('Test 10: Empty Graph');
    const emptyGraph = {};
    const emptySorted = topologicalSort(emptyGraph);
    console.log('Empty Graph:', emptyGraph);
    console.log('Sorted:', emptySorted);
    console.log('✅ Test 10 Passed\n');

    console.log('🎉 All Topological Sort tests passed!');
}

// Export functions for use in other modules
module.exports = {
    topologicalSort,
    topologicalSortWithSteps,
    topologicalSortDFS,
    topologicalSortKahn,
    isDAG,
    findAllTopologicalOrders,
    topologicalSortWeighted,
    longestPathInDAG,
    runTopologicalSortTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runTopologicalSortTests();
}
