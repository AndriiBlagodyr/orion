/**
 * Backtracking Algorithms
 *
 * Backtracking is a systematic way to explore all possible solutions to a problem
 * by building solutions incrementally and abandoning paths that don't lead to valid solutions.
 *
 * Common Patterns:
 * - Generate all permutations/combinations
 * - Solve constraint satisfaction problems
 * - Find all possible paths
 * - N-Queens problem
 * - Sudoku solver
 *
 * Time Complexity: Usually exponential O(b^d) where b is branching factor, d is depth
 * Space Complexity: Usually O(d) for recursion stack
 */

// Generate All Permutations
function permute(nums) {
    const result = [];

    function backtrack(currentPermutation) {
        if (currentPermutation.length === nums.length) {
            result.push([...currentPermutation]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (currentPermutation.includes(nums[i])) {
                continue; // Skip if already used
            }

            currentPermutation.push(nums[i]);
            backtrack(currentPermutation);
            currentPermutation.pop(); // Backtrack
        }
    }

    backtrack([]);
    return result;
}

// Generate All Combinations
function combine(n, k) {
    const result = [];

    function backtrack(start, currentCombination) {
        if (currentCombination.length === k) {
            result.push([...currentCombination]);
            return;
        }

        for (let i = start; i <= n; i++) {
            currentCombination.push(i);
            backtrack(i + 1, currentCombination);
            currentCombination.pop(); // Backtrack
        }
    }

    backtrack(1, []);
    return result;
}

// Generate All Subsets
function subsets(nums) {
    const result = [];

    function backtrack(start, currentSubset) {
        result.push([...currentSubset]);

        for (let i = start; i < nums.length; i++) {
            currentSubset.push(nums[i]);
            backtrack(i + 1, currentSubset);
            currentSubset.pop(); // Backtrack
        }
    }

    backtrack(0, []);
    return result;
}

// Generate All Subsets with Duplicates
function subsetsWithDup(nums) {
    nums.sort((a, b) => a - b); // Sort to handle duplicates
    const result = [];

    function backtrack(start, currentSubset) {
        result.push([...currentSubset]);

        for (let i = start; i < nums.length; i++) {
            // Skip duplicates
            if (i > start && nums[i] === nums[i - 1]) {
                continue;
            }

            currentSubset.push(nums[i]);
            backtrack(i + 1, currentSubset);
            currentSubset.pop(); // Backtrack
        }
    }

    backtrack(0, []);
    return result;
}

// Generate All Permutations with Duplicates
function permuteUnique(nums) {
    nums.sort((a, b) => a - b); // Sort to handle duplicates
    const result = [];
    const used = new Array(nums.length).fill(false);

    function backtrack(currentPermutation) {
        if (currentPermutation.length === nums.length) {
            result.push([...currentPermutation]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;

            // Skip duplicates
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue;
            }

            used[i] = true;
            currentPermutation.push(nums[i]);
            backtrack(currentPermutation);
            currentPermutation.pop(); // Backtrack
            used[i] = false;
        }
    }

    backtrack([]);
    return result;
}

// Combination Sum
function combinationSum(candidates, target) {
    const result = [];

    function backtrack(start, currentCombination, remainingTarget) {
        if (remainingTarget === 0) {
            result.push([...currentCombination]);
            return;
        }

        if (remainingTarget < 0) {
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            currentCombination.push(candidates[i]);
            backtrack(i, currentCombination, remainingTarget - candidates[i]);
            currentCombination.pop(); // Backtrack
        }
    }

    backtrack(0, [], target);
    return result;
}

// Combination Sum II (No Duplicates)
function combinationSum2(candidates, target) {
    candidates.sort((a, b) => a - b); // Sort to handle duplicates
    const result = [];

    function backtrack(start, currentCombination, remainingTarget) {
        if (remainingTarget === 0) {
            result.push([...currentCombination]);
            return;
        }

        if (remainingTarget < 0) {
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            // Skip duplicates
            if (i > start && candidates[i] === candidates[i - 1]) {
                continue;
            }

            currentCombination.push(candidates[i]);
            backtrack(i + 1, currentCombination, remainingTarget - candidates[i]);
            currentCombination.pop(); // Backtrack
        }
    }

    backtrack(0, [], target);
    return result;
}

// N-Queens Problem
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));

    function isValid(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }

        // Check diagonal (top-left to bottom-right)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Check diagonal (top-right to bottom-left)
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }

        return true;
    }

    function backtrack(row) {
        if (row === n) {
            result.push(board.map(row => row.join('')));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (isValid(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.'; // Backtrack
            }
        }
    }

    backtrack(0);
    return result;
}

// Sudoku Solver
function solveSudoku(board) {
    function isValid(board, row, col, num) {
        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === num) return false;
        }

        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }

        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;

        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] === num) return false;
            }
        }

        return true;
    }

    function solve() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        if (isValid(board, row, col, num.toString())) {
                            board[row][col] = num.toString();

                            if (solve()) {
                                return true;
                            }

                            board[row][col] = '.'; // Backtrack
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    return solve();
}

// Generate Parentheses
function generateParenthesis(n) {
    const result = [];

    function backtrack(currentString, openCount, closeCount) {
        if (currentString.length === 2 * n) {
            result.push(currentString);
            return;
        }

        if (openCount < n) {
            backtrack(currentString + '(', openCount + 1, closeCount);
        }

        if (closeCount < openCount) {
            backtrack(currentString + ')', openCount, closeCount + 1);
        }
    }

    backtrack('', 0, 0);
    return result;
}

// Letter Combinations of Phone Number
function letterCombinations(digits) {
    if (digits.length === 0) return [];

    const phoneMap = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };

    const result = [];

    function backtrack(index, currentString) {
        if (index === digits.length) {
            result.push(currentString);
            return;
        }

        const digit = digits[index];
        const letters = phoneMap[digit];

        for (let letter of letters) {
            backtrack(index + 1, currentString + letter);
        }
    }

    backtrack(0, '');
    return result;
}

// Test Functions
function runBacktrackingTests() {
    console.log('🔄 Backtracking Tests\n');

    // Test 1: Generate All Permutations
    console.log('Test 1: Generate All Permutations');
    const nums1 = [1, 2, 3];
    console.log('Input:', nums1);
    console.log('Permutations:', permute(nums1));
    console.log();

    // Test 2: Generate All Combinations
    console.log('Test 2: Generate All Combinations');
    console.log('n=4, k=2');
    console.log('Combinations:', combine(4, 2));
    console.log();

    // Test 3: Generate All Subsets
    console.log('Test 3: Generate All Subsets');
    const nums2 = [1, 2, 3];
    console.log('Input:', nums2);
    console.log('Subsets:', subsets(nums2));
    console.log();

    // Test 4: Generate All Subsets with Duplicates
    console.log('Test 4: Generate All Subsets with Duplicates');
    const nums3 = [1, 2, 2];
    console.log('Input:', nums3);
    console.log('Subsets:', subsetsWithDup(nums3));
    console.log();

    // Test 5: Generate All Permutations with Duplicates
    console.log('Test 5: Generate All Permutations with Duplicates');
    const nums4 = [1, 1, 2];
    console.log('Input:', nums4);
    console.log('Permutations:', permuteUnique(nums4));
    console.log();

    // Test 6: Combination Sum
    console.log('Test 6: Combination Sum');
    const candidates1 = [2, 3, 6, 7];
    const target1 = 7;
    console.log('Candidates:', candidates1, 'Target:', target1);
    console.log('Combinations:', combinationSum(candidates1, target1));
    console.log();

    // Test 7: Combination Sum II
    console.log('Test 7: Combination Sum II');
    const candidates2 = [10, 1, 2, 7, 6, 1, 5];
    const target2 = 8;
    console.log('Candidates:', candidates2, 'Target:', target2);
    console.log('Combinations:', combinationSum2(candidates2, target2));
    console.log();

    // Test 8: N-Queens (4x4)
    console.log('Test 8: N-Queens (4x4)');
    console.log('Solutions:', solveNQueens(4));
    console.log();

    // Test 9: Generate Parentheses
    console.log('Test 9: Generate Parentheses');
    console.log('n=3');
    console.log('Parentheses:', generateParenthesis(3));
    console.log();

    // Test 10: Letter Combinations
    console.log('Test 10: Letter Combinations');
    const digits = "23";
    console.log('Digits:', digits);
    console.log('Combinations:', letterCombinations(digits));
    console.log();
}

// Export functions
module.exports = {
    permute,
    combine,
    subsets,
    subsetsWithDup,
    permuteUnique,
    combinationSum,
    combinationSum2,
    solveNQueens,
    solveSudoku,
    generateParenthesis,
    letterCombinations,
    runBacktrackingTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runBacktrackingTests();
}
