import BinarySearchTree from './BinarySearchTree.js';

const tree = new BinarySearchTree(30);

tree.insert(10);
tree.insert(15);
tree.insert(12);
tree.insert(40);
tree.insert(35);
tree.insert(50);

console.log([...tree.preOrderTraversal()].map(x => x.value));
// [30, 10, 15, 12, 40, 35, 50]

console.log([...tree.inOrderTraversal()].map(x => x.value));
// [10, 12, 15, 30, 35, 40, 50]

console.log([...tree.postOrderTraversal()].map(x => x.value));
// [12, 15, 10, 35, 50, 40, 30]

console.log(tree.root.value); // 30
console.log(tree.root.hasChildren); // true

console.log(tree.find(12).isLeaf); // true
console.log(tree.find(40).isLeaf); // false
console.log(tree.find(50).parent.value); // 40
console.log(tree.find(15).left.value); // 12
console.log(tree.find(12).right); // null

tree.remove(12);

console.log([...tree.preOrderTraversal()].map(x => x.value));
// [30, 10, 15, 40, 35, 50]

tree.remove(10);

console.log(
  [...tree.preOrderTraversal()].map(v => ({
    key: v.key,
    parent: v.parent ? v.parent.key : null,
  })),
); // [30, 15, 40, 35, 50]

tree.remove(40);

console.log([...tree.preOrderTraversal()].map(x => x.value));
// [30, 15, 40, 35, 50]

tree.remove(30);

console.log([...tree.preOrderTraversal()].map(x => x.value));
// [15, 35, 50]
