// O(n) time | O(d) space - where n is the total number of elements in
// including sub-elements, and d is the greatest depth of "special" array

const arr = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]; // 12

function productSum(array, multiplier = 1) {
  let sum = 0;
  for (const element of array) {
    if (Array.isArray(element)) {
      sum += productSum(element, multiplier + 1);
    } else {
      sum += element;
    }
  }
  return sum * multiplier;
}

console.log(productSum(arr));
