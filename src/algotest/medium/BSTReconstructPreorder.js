// const preorderValues[10,4,2,1,5,17,19,18]

class BST {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
// O(n^2) time (recursive and for loop for each of it)
// O(h) space.
// const reconstructBST = preorderValues => {
//     if (preorderValues.length === 0) return null;
//     let current = preorderValues[0];
//     let rightSubtreeRootIdx = preorderValues.length;

//     for (let i = 1; i < preorderValues.length; i++) {
//         if (preorderValues[i] >= current) {
//             rightSubtreeRootIdx = idx;
//         }
//         break;
//     }

//     let leftSubtree = reconstructBST(preorderValues.slice(0, rightSubtreeRootIdx));
//     let rightSubtree = reconstructBST(preorderValues.slice(rightSubtreeRootIdx));

//     return BST(current, leftSubtree, rightSubtree);
// };

class TreeInfo {
    constructor(rootIdx) {
        this.rootIdx = rootIdx;
    }
}

const reconstructBST = preorderValues => {
    const treeInfor = TreeInfo(0);

    return reconstructFromRange(-Infinity, Infinity);
};

// O(n) time | O(h) space
var reconstructFromRange = function (lowerBound, upperBound, preorderValues, currentSubreeInfo) {
    if (currentSubreeInfo === preorderValues.length) return null;
    let rootValue = preorderValues[currentSubreeInfo.rootIdx];
    if (rootValue < lowerBound || rootValue >= upperBound) return null;
    currentSubreeInfo.rootIdx += 1;
    const leftSubtree = reconstructFromRange(lowerBound, rootValue, preorderValues, currentSubreeInfo);
    const rightSubtree = reconstructFromRange(rootValue, upperBound, preorderValues, currentSubreeInfo);

    return BST(rootValue, leftSubtree, rightSubtree);
};
