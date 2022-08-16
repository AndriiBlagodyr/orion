import {stringify} from 'flatted';
// TREE DATA STRUCTURE CONCEPTS
// root: Root node of a tree; no parent node for root.
// parent node: Direct node of the upper layer; only has one
// child node: Direct node(s) of the lower layer; can have multiple
// siblings: Share the same parent node
// leaf: Node with no child
// Edge: Branch or link between nodes
// Path: The edges from a starting node to the target node
// Height of Node: Number of edges of the longest path of a specific node to leaf node
// Height of Tree: Number of edges of the longest path of the root node to the leaf node
// Depth of Node: Number of edges from root node to specific node
// Degree of Node: Number of child nodes
class TreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.children = [];
    }

    get isLeaf() {
        return this.children.length === 0;
    }

    get hasChildren() {
        return !this.isLeaf;
    }
}

export class Tree {
    constructor(key, value = key) {
        this.root = new TreeNode(key, value);
    }

    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.preOrderTraversal(child);
            }
        }
    }

    *postOrderTraversal(node = this.root) {
        if (node.children.length) {
            for (let child of node.children) {
                yield* this.postOrderTraversal(child);
            }
        }
        yield node;
    }

    insert(parentNodeKey, key, value = key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                node.children.push(new TreeNode(key, value, node));
                return true;
            }
        }
        return false;
    }

    remove(key) {
        for (let node of this.preOrderTraversal()) {
            const filtered = node.children.filter(c => c.key !== key);
            if (filtered.length !== node.children.length) {
                node.children = filtered;
                return true;
            }
        }
        return false;
    }

    find(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }
}

const tree = new Tree(1, 'AB');

tree.insert(1, 11, 'AC');
tree.insert(1, 12, 'BC');
tree.insert(12, 121, 'BG');

// console.log([...tree.preOrderTraversal()].map(x => x.value));
// ['AB', 'AC', 'BC', 'BCG']
