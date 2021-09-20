// O(n) time | O(1) space - where n is the length of the array
//[2,1,3,4,2,2,6] --> [1,3,4,6,2,2,2]

function swap(i, j, array) {
  const temp = array[j];
  array[j] = array[i];
  array[i] = temp;
}

function moveElementToEnd(array, toMove) {
  let i = 0;
  let j = array.length - 1;
  while (i < j) {
    while (i < j && array[j] === toMove) j--;
    if (array[i] === toMove) swap(i, j, array);
    i++;
  }
  return array;
}

console.log(moveElementToEnd([2, 1, 3, 4, 2, 2, 6], 2));
