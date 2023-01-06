// O(n) time | O(d) space - where n is the total number of elements in
// including sub-elements, and d is the greatest depth of "special" array

// O(n) - 12 elements of array ineer and outer
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

// var sumProduct = function (arr, mult = 1) {
//     let result = 0;

//     var getSum = function (ar, mul) {
//         for (const num of ar) {
//             if (Array.isArray(num)) {
//                 getSum(num, mul + 1);
//             } else {
//                 result += num * mul;
//                 console.log('Result', result);
//             }
//         }
//     };
//     getSum(arr, 1);

//     return result;
// };
