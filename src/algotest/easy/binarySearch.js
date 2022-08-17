const array = [0, 1, 21, 33, 45, 48, 61, 71, 72, 84]; // 33

function binarySearch1(arr, el) {
    let left = 0;
    let right = array.length - 1;
    while (left <= right) {
        let middle = Math.floor((left + right) / 2);
        if (arr[middle] < el) {
            left = middle;
        } else if (arr[middle] > el) {
            right = middle;
        } else {
            return middle;
        }
    }
    return -1;
}

// O(log(n)) time | O(log(n)) space
function binarySearch2(array, target) {
    return binarySearchHelper(array, target, 0, array.length - 1);
}

function binarySearchHelper(array, target, left, right) {
    if (left > right) return -1;
    const middle = Math.floor((left + right) / 2);
    const potentialMatch = array[middle];
    if (target === potentialMatch) {
        return middle;
    } else if (target < potentialMatch) {
        return binarySearchHelper(array, target, left, middle - 1);
    } else {
        return binarySearchHelper(array, target, middle + 1, right);
    }
}

console.log(binarySearch2(array, 33)); //3
