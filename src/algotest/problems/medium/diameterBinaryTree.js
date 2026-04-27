// O(n) time | O(h) avg space, O(n) worst space
class BinaryTree {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class TreeInfo {
    constructor(diameter, height) {
        this.diameter = diameter;
        this.height = height;
    }
}

const binaryTreeDiameter = tree => {
    return getTreeInfo(tree).diameter;
};

const getTreeInfo = tree => {
    if ((tree = null)) return new TreeInfo(0, 0);
    let leftTreeInfo = getTreeInfo(tree.left);
    let rightTreeInfo = getTreeInfo(tree.right);

    let longestPathThroughRoot = leftTreeInfo.height + rightTreeInfo.height;
    let maxDiameterSoFar = Math.max(leftTreeInfo.diameter, rightTreeInfo.diameter);
    let currentDiameter = Math.max(longestPathThroughRoot, maxDiameterSoFar);
    let currentHeight = 1 + Math.max(leftTreeInfo.height, rightTreeInfo.height);

    return new TreeInfo(currentDiameter, currentHeight);
};
