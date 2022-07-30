const array = [-5, -3, 1, 4, 6, 7, 10];

const getDoubledArray = arr => {
  let left = 0;
  let right = arr.length - 1;
  let outIndex = arr.length - 1;
  const output = new Array(right + 1);
  while (left < right + 1) {
    const leftNum = arr[left];
    const rightNum = arr[right];
    if (Math.abs(leftNum) < Math.abs(rightNum)) {
      output[outIndex] = rightNum ** 2;
      --right;
      --outIndex;
    } else if (Math.abs(leftNum) >= Math.abs(rightNum)) {
      output[outIndex] = leftNum ** 2;
      ++left;
      --outIndex;
    }
    console.log(left, right);
  }
  return output;
};

console.log(getDoubledArray(array));
