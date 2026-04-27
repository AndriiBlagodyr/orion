const arr = [-8, -5, -2, 5, 6, 7, 9]; // [4, 25, 25, 36, 49, 64, 81]

// O(nlog(n)) time | O(n) space
function sortedSquareArrayFirst(array) {
    const sortedArr = Array(array.length);
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        sortedArr[i] = element ** 2;
    }
    return sortedArr.sort((a, b) => a - b);
}

// O(n) time | O(n) space
function sortedSquareArraySecond(array) {
    let left = 0;
    let right = array.length - 1;
    const sortedArr = Array(array.length);
    while (left <= right) {
        let idx = right - left;
        if (Math.abs(array[left]) > Math.abs(array[right])) {
            sortedArr[idx] = array[left] ** 2;
            ++left;
        } else if (Math.abs(array[left]) <= Math.abs(array[right])) {
            sortedArr[idx] = array[right] ** 2;
            --idx;
            --right;
        }
    }
    return sortedArr;
}

console.log(sortedSquareArrayFirst(arr));
console.log(sortedSquareArraySecond(arr));
