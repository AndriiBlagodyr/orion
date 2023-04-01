const factorial = num => {
    let result = 1;
    for (let i = 2; i < num + 1; i++) {
        result *= i;
    }
    return result;
};

// O(n+m) | O(1)
const numberOfWaysTraverse = (width, height) => {
    let xDistToCorner = width - 1;
    let yDistToCorner = height - 1;

    let numerator = factorial(xDistToCorner + yDistToCorner);
    let denominator = factorial(xDistToCorner) * factorial(yDistToCorner);
    return Math.round(numerator / denominator);
};

// O(2^(n+m)) | O(n+m)
const numberOfWaysTraverse2 = (width, height) => {
    if (width === 1 || height === 1) return 1;

    return numberOfWaysTraverse2(width - 1, height) + numberOfWaysTraverse2(width, height - 1);
};

const uniquePaths = (m, n) => {
    let d = new Array(m).fill(1).map(() => Array(n).fill(1));
    for (let col = 1; col < m; ++col) {
        for (let row = 1; row < n; ++row) {
            d[col][row] = d[col - 1][row] + d[col][row - 1];
        }
    }
    // [ 1, 1, 1, 1, 1 ]
    // [ 1, 2, 3, 4, 5 ]
    // [ 1, 3, 6, 10, 15 ]
    return d[m - 1][n - 1];
};

console.log(uniquePaths(3, 5));
