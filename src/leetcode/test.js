var containsDuplicate = function (nums) {
    const map = {};
    for (const num of nums) {
        if (map[num]) return true;
        else map[num] = true;
    }
    return false;
};

console.log(containsDuplicate([1, 2, 3, 1, 5, 6]));
