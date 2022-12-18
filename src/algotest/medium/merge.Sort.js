var merge = function (sorted1, sorted2) {
    let i = 0;
    let j = 0;
    const output = [];

    while (i < sorted1.length && j < sorted2.length) {
        if (sorted1[i] <= sorted2[j]) {
            output.push(sorted1[i]);
            ++i;
        } else {
            output.push(sorted2[j]);
            ++j;
        }
    }

    return output.concat(sorted1.slice(i)).concat(sorted2.slice(j));
};

var mergeSort = function (nums) {
    if (nums.length <= 1) return nums;

    var mid = Math.floor(nums.length / 2);
    let left = mergeSort(nums.slice(0, mid));
    let right = mergeSort(nums.slice(mid));

    return merge(left, right);
};

console.log(mergeSort([10, 3, 42, 5, 63, 88, 9]));
