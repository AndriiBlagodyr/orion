// O(n^2) time | O(n) space

// [12,3,1,2,-6,5,-8,6]  sum value 0. Expected output [[-8,2,6],[-8,3,5],[-6,1,5]]
const arr = [12, 3, 1, 2, -6, 5, -8, 6];
function threeNumberSum(array, targetSum) {
  array.sort((a, b) => a - b);
  const triplets = [];
  for (let i = 0; i < array.length - 2; i++) {
    let left = i + 1;
    let right = array.length - 1;
    while (left < right) {
      const currentSum = array[i] + array[left] + array[right];
      if (currentSum === targetSum) {
        triplets.push([array[i], array[left], array[right]]);
        left++;
        right--;
      } else if (currentSum < targetSum) {
        left++;
      } else if (currentSum > targetSum) {
        right--;
      }
    }
  }
  return triplets;
}

console.log(threeNumberSum(arr, 0));
