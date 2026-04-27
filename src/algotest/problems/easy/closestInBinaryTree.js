// Average: O(log(n)) time | O(log(n)) space
// Worst: O(n) time | O(n) space
function findClosestValueInBstFirst(tree, target) {
  return findClosestValueInBstFirstHelper(tree, target, Infinity);
}
function findClosestValueInBstFirstHelper(tree, target, closest) {
  if (tree === null) return closest;
  if (Math.abs(target - closest) > Math.abs(target - tree.value)) {
    closest = tree.value;
  }
  if (target < tree.value) {
    return findClosestValueInBstFirstHelper(tree.left, target, closest);
  } else if (target > tree.value) {
    return findClosestValueInBstFirstHelper(tree.right, target, closest);
  } else {
    return closest;
  }
}

// Average: O(log(n)) time | O(1) space
// Worst: O(n) time | O(1) space
function findClosestValueInBstSecond(tree, target) {
  return findClosestValueInBstSecondHelper(tree, target, Infinity);
}

function findClosestValueInBstSecondHelper(tree, target, closest) {
  let currentNode = tree;
  while (currentNode !== null) {
    if (Math.abs(target - closest) > Math.abs(target - currentNode.val)) {
      closest = currentNode.value;
    }
    if (target < currentNode.value) {
      currentNode = currentNode.left;
    } else if (target > currentNode.value) {
      currentNode = currentNode.right;
    } else {
      break;
    }
  }
  return closest;
}
