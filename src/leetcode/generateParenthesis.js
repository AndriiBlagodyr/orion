var generateParenthesis = function (n) {
    const output = [];

    var addP = function (str, left, right) {
        if (left === right && left !== 0) {
            addP(str + '(', left - 1, right);
        } else if (left === 0 && right === 0) {
            output.push(str);
        } else if (left < right && left !== 0 && right !== 0) {
            addP(str + '(', left - 1, right);
            addP(str + ')', left, right - 1);
        } else if (left === 0 && right > 0) {
            addP(str + ')', left, right - 1);
        }
    };
    addP('', n, n);

    return output;
};

console.log(generateParenthesis(3));
