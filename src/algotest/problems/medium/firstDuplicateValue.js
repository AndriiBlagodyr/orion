// Numbers in the array are given from (1 to N) where N is the array length
// O(N) time O(1) space

let getFirstDuplicate = nums => {
    for (const num of nums) {
        let val = Math.abs(num);
        if (nums[val - 1] < 0) return val;
        nums[val - 1] *= -1;
    }

    return -1;
};

console.log(getFirstDuplicate([2, 1, 5, 2, 3, 4, 2, 3]));
