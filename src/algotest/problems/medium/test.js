const array = [0, 1, 21, 33, 45, 48, 61, 71, 72, 84]; // 33

const search = (nums, target) => {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (target > nums[mid]) left = mid + 1;
        else if (target < nums[mid]) right = mid - 1;
        else return mid;
    }
    return -1;
};

console.log(search(array, 1));
