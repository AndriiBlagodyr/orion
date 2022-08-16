class Node {
    constructor(name) {
        this.name = name;
        this.children = [];
    }
    insertNode(nodes, parentName, name) {
        for (let node of nodes) {
            if (node.name === parentName) {
                node.children.push(new Node(name));
                return true;
            } else if (node.children.length) {
                this.insertNode(node.children, parentName, name);
            }
        }
    }
    addChild(parentName, name) {
        if (this.name === parentName) {
            this.children.push(new Node(name));
            return this;
        }
        this.insertNode(this.children, parentName, name);
        return this;
    }
    gerArr() {
        return this.children;
    }
    // O(v + e) time | O(v) space
    depthFirstSearch(array) {
        array.push(this.name);
        for (const child of this.children) {
            child.depthFirstSearch(array);
        }
        return array;
    }
}

const graph = new Node('A');
graph.addChild('A', 'B');
graph.addChild('A', 'C');
graph.addChild('A', 'D');
graph.addChild('B', 'E');
graph.addChild('B', 'F');
graph.addChild('D', 'G');
graph.addChild('D', 'H');
graph.addChild('F', 'I');
graph.addChild('F', 'J');
graph.addChild('G', 'K');
// console.log(graph);
let output = [];
graph.depthFirstSearch(output);
console.log(output);

//      A
//    / | \
//   B  C  D
//  / \   / \
// E  F  G   H
//   / \  \
//  I   J   K

// [
//   'A', 'B', 'E', 'F',
//   'I', 'J', 'C', 'D',
//   'G', 'K', 'H'
// ]
