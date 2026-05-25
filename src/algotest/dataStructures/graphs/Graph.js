// =============================================================================
// МІНІ-КУЧА ДЛЯ ПРІОРИТЕТНОЇ ЧЕРГИ (З попереднього кроку)
// =============================================================================
class PriorityQueue {
    constructor() {
        this.heap = [];
    }
    get size() {
        return this.heap.length;
    }

    enqueue(val, priority) {
        this.heap.push({val, priority});
        this._siftUp(this.heap.length - 1);
    }

    dequeue() {
        if (this.size === 0) return null;
        this._swap(0, this.heap.length - 1);
        const item = this.heap.pop();
        this._siftDown(0);
        return item;
    }

    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    _siftUp(idx) {
        while (idx > 0) {
            const pIdx = Math.floor((idx - 1) / 2);
            if (this.heap[idx].priority >= this.heap[pIdx].priority) break;
            this._swap(idx, pIdx);
            idx = pIdx;
        }
    }

    _siftDown(idx) {
        const end = this.heap.length - 1;
        while (true) {
            let left = idx * 2 + 1,
                right = idx * 2 + 2,
                target = idx;
            if (left <= end && this.heap[left].priority < this.heap[target].priority) target = left;
            if (right <= end && this.heap[right].priority < this.heap[target].priority) target = right;
            if (target === idx) break;
            this._swap(idx, target);
            idx = target;
        }
    }
}

// =============================================================================
// УНІВЕРСАЛЬНИЙ ГРАФ (УНВЕЙТЕД + ВЕЙТЕД)
// =============================================================================
class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    get vertexCount() {
        return Object.keys(this.adjacencyList).length;
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    // Третій параметр weight за замовчуванням 1. Граф тепер універсальний!
    addEdge(v1, v2, weight = 1) {
        this.addVertex(v1);
        this.addVertex(v2);

        // Уникаємо дублікатів ребер
        if (!this.adjacencyList[v1].some(edge => edge.node === v2)) {
            this.adjacencyList[v1].push({node: v2, weight});
            this.adjacencyList[v2].push({node: v1, weight});
        }
    }

    removeEdge(v1, v2) {
        if (this.adjacencyList[v1]) this.adjacencyList[v1] = this.adjacencyList[v1].filter(e => e.node !== v2);
        if (this.adjacencyList[v2]) this.adjacencyList[v2] = this.adjacencyList[v2].filter(e => e.node !== v1);
    }

    removeVertex(vertex) {
        if (!this.adjacencyList[vertex]) return;
        for (const neighbor of this.adjacencyList[vertex]) {
            this.adjacencyList[neighbor.node] = this.adjacencyList[neighbor.node].filter(e => e.node !== vertex);
        }
        delete this.adjacencyList[vertex];
    }

    // =============================================================================
    // ОБХОДИ (TRAVERSALS)
    // =============================================================================

    dfs(start) {
        if (!this.adjacencyList[start]) return [];
        const result = [];
        const visited = new Set();

        const traverse = vertex => {
            visited.add(vertex);
            result.push(vertex);
            for (const edge of this.adjacencyList[vertex]) {
                if (!visited.has(edge.node)) traverse(edge.node);
            }
        };

        traverse(start);
        return result;
    }

    // Оптимізований BFS без O(n) методу shift()
    bfs(start) {
        if (!this.adjacencyList[start]) return [];
        const result = [];
        const queue = [start];
        const visited = new Set([start]);
        let head = 0; // Вказівник на початок черги для O(1) вилучення

        while (head < queue.length) {
            const current = queue[head++]; // Чисте O(1) замість shift()
            result.push(current);

            for (const edge of this.adjacencyList[current]) {
                if (!visited.has(edge.node)) {
                    visited.add(edge.node);
                    queue.push(edge.node);
                }
            }
        }
        return result;
    }

    // =============================================================================
    // АЛГОРИТМ ДЕЙКСТРИ
    // =============================================================================
    dijkstra(start, finish) {
        const pq = new PriorityQueue();
        const distances = {};
        const previous = {};
        const path = [];

        // Ініціалізація вершин
        for (const vertex in this.adjacencyList) {
            distances[vertex] = vertex === start ? 0 : Infinity;
            previous[vertex] = null;
            pq.enqueue(vertex, distances[vertex]);
        }

        while (pq.size > 0) {
            const current = pq.dequeue().val;

            if (current === finish) {
                let temp = current;
                while (temp) {
                    path.push(temp);
                    temp = previous[temp];
                }
                return path.reverse();
            }

            if (distances[current] === Infinity) break;

            for (const neighbor of this.adjacencyList[current]) {
                const candidate = distances[current] + neighbor.weight;

                if (candidate < distances[neighbor.node]) {
                    distances[neighbor.node] = candidate;
                    previous[neighbor.node] = current;
                    pq.enqueue(neighbor.node, candidate);
                }
            }
        }
        return [];
    }
}
