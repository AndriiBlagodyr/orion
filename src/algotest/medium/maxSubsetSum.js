// O(n) time | O(n) space
// [7,10,12,7,9,14]  => 7+12+14=33 numbers which are not neighbours
function maxSubsetSumNoAdjacent1st(array) {
    if (!array.length) return 0;
    if (array.length === 1) return array[0];
    const maxSums = array.slice();
    maxSums[1] = Math.max(array[0], array[1]);
    for (let i = 2; i < array.length; i++) {
      maxSums[i] = Math.max(maxSums[i - 1], maxSums[i - 2] + array[i]);
    }
    return maxSums[maxSums.length - 1];
}

  // O(n) time | O(1) space
function maxSubsetSumNoAdjacent2nd(array) {
    if (!array.length) return 0;
    if (array.length === 1) return array[0];
    let second = array[0];
    let first = Math.max(array[0], array[1]);
    for (let i = 2; i < array.length; i++) {
        const current = Math.max(first, second + array[i]);
        second = first;
        first = current;
    }
    return first;
}
