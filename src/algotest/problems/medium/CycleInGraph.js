// Need to test #56
const cycleInGraph = edges => {
    let numberOfNodes = edges.length;
    let visited = Array.from({length: numberOfNodes}, () => false);
    let currentlyInStack = Array.from({length: numberOfNodes}, () => false);
    for (let i = 0; i < numberOfNodes; i++) {
        if (visited[i]) continue;
        let containCyle = isNodeInCycle(edges, node, visited, currentlyInStack);
        if (containCyle) return true;
    }
    return false;
};

const isNodeInCycle = (edges, node, visited, currentlyInStack) => {
    visited[node] = true;
    currentlyInStack = true;

    let neighbours = edges[node];
    for (const neighbour of neighbours) {
        if (!visited[neighbour]) {
            let containCycle = isNodeInCycle(edges, node, visited, currentlyInStack);
            if (containCycle) return true;
        } else if (currentlyInStack[neighbour]) {
            return true;
        }
    }
    currentlyInStack[node] = false;
    return false;
};
