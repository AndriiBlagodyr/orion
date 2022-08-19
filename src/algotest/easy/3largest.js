// O(n) time | O(1) space
const array1 = [141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]; // [18, 141, 541]

function insertVal(arr, val) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (val > arr[i]) {
            let idx = 0;
            while (idx <= i) {
                arr[idx] = arr[idx + 1];
                idx++;
            }
            arr[i] = val;
            break;
        }
    }
    return arr;
}

function get3Largest(arr) {
    let largest = arr.slice(0, 3);
    largest.sort((a, b) => a - b);
    console.log('largest', largest);

    for (let index = 3; index < arr.length; index++) {
        const element = arr[index];
        if (element > largest[0]) {
            largest = insertVal(largest, element);
        }
    }

    return largest;
}
console.log(get3Largest(array1));
