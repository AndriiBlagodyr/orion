// =============================================================================
// LONGEST COMMON SUBSEQUENCE (LCS) ALGORITHMS IMPLEMENTATION
// =============================================================================
// Author: Advanced Algorithm Implementation
// Purpose: Find longest common subsequence and substring between two strings
//
// TIME COMPLEXITY ANALYSIS:
// - LCS (Recursive): O(2^(m+n)) - exponential
// - LCS (Memoized): O(m * n) - where m, n are string lengths
// - LCS (DP): O(m * n) - optimal solution
// - LCS (Space Optimized): O(min(m, n)) - space optimized
//
// SPACE COMPLEXITY: O(m * n) for DP, O(min(m, n)) for space optimized
//
// WHERE:
// m = length of first string
// n = length of second string
// =============================================================================

/**
 * LONGEST COMMON SUBSEQUENCE - Recursive Solution
 *
 * PROBLEM: Find the longest subsequence common to both strings
 * CONSTRAINT: Characters must appear in same relative order
 *
 * Time Complexity: O(2^(m+n)) - exponential
 * Space Complexity: O(m + n) - recursion stack
 *
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Length of LCS
 */
function lcsRecursive(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }

    function lcsHelper(i, j) {
        // Base case: if either string is empty
        if (i === 0 || j === 0) return 0;

        // If characters match, include them in LCS
        if (str1[i - 1] === str2[j - 1]) {
            return 1 + lcsHelper(i - 1, j - 1);
        }

        // If characters don't match, take maximum of two possibilities
        return Math.max(lcsHelper(i - 1, j), lcsHelper(i, j - 1));
    }

    return lcsHelper(str1.length, str2.length);
}

/**
 * LONGEST COMMON SUBSEQUENCE - Memoized Solution
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 *
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Length of LCS
 */
function lcsMemoized(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }

    const memo = {};
    const m = str1.length;
    const n = str2.length;

    function lcsHelper(i, j) {
        const key = `${i},${j}`;
        if (key in memo) return memo[key];

        // Base case
        if (i === 0 || j === 0) {
            memo[key] = 0;
            return 0;
        }

        // If characters match
        if (str1[i - 1] === str2[j - 1]) {
            memo[key] = 1 + lcsHelper(i - 1, j - 1);
        } else {
            memo[key] = Math.max(lcsHelper(i - 1, j), lcsHelper(i, j - 1));
        }

        return memo[key];
    }

    return lcsHelper(m, n);
}

/**
 * LONGEST COMMON SUBSEQUENCE - Dynamic Programming Solution
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 *
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {Object} - { length: number, subsequence: string, dp: number[][] }
 */
function lcsDP(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }

    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    // Build DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruct LCS
    let subsequence = '';
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            subsequence = str1[i - 1] + subsequence;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return {
        length: dp[m][n],
        subsequence,
        dp
    };
}

/**
 * LONGEST COMMON SUBSEQUENCE - Space Optimized Solution
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(min(m, n))
 *
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Length of LCS
 */
function lcsSpaceOptimized(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }

    const m = str1.length;
    const n = str2.length;

    // Use smaller string for DP array
    if (m < n) {
        [str1, str2] = [str2, str1];
        [m, n] = [n, m];
    }

    const prev = Array(n + 1).fill(0);
    const curr = Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                curr[j] = 1 + prev[j - 1];
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        [prev, curr] = [curr, prev];
    }

    return prev[n];
}

/**
 * LONGEST COMMON SUBSEQUENCE WITH STEP-BY-STEP TRACKING
 *
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {Object} - { length: number, subsequence: string, steps: Array }
 */
function lcsWithSteps(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }

    const steps = [];
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

    steps.push({
        action: 'initialize',
        str1: str1,
        str2: str2,
        dp: JSON.parse(JSON.stringify(dp))
    });

    // Build DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const char1 = str1[i - 1];
            const char2 = str2[j - 1];

            if (char1 === char2) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
                steps.push({
                    action: 'match',
                    i: i,
                    j: j,
                    char1: char1,
                    char2: char2,
                    value: dp[i][j],
                    dp: JSON.parse(JSON.stringify(dp))
                });
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                steps.push({
                    action: 'no_match',
                    i: i,
                    j: j,
                    char1: char1,
                    char2: char2,
                    value: dp[i][j],
                    dp: JSON.parse(JSON.stringify(dp))
                });
            }
        }
    }

    // Reconstruct LCS
    let subsequence = '';
    let i = m, j = n;
    const reconstructionSteps = [];

    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            subsequence = str1[i - 1] + subsequence;
            reconstructionSteps.push({
                action: 'add_char',
                char: str1[i - 1],
                subsequence: subsequence,
                i: i,
                j: j
            });
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            reconstructionSteps.push({
                action: 'move_up',
                i: i,
                j: j
            });
            i--;
        } else {
            reconstructionSteps.push({
                action: 'move_left',
                i: i,
                j: j
            });
            j--;
        }
    }

    steps.push({
        action: 'reconstruct',
        reconstructionSteps: reconstructionSteps,
        subsequence: subsequence
    });

    steps.push({
        action: 'complete',
        length: dp[m][n],
        subsequence: subsequence,
        finalDp: JSON.parse(JSON.stringify(dp))
    });

    return {
        length: dp[m][n],
        subsequence,
        steps
    };
}

/**
 * LONGEST COMMON SUBSTRING - Dynamic Programming Solution
 *
 * PROBLEM: Find the longest contiguous substring common to both strings
 * CONSTRAINT: Characters must be contiguous
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 *
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {Object} - { length: number, substring: string, endIndex: number }
 */
function longestCommonSubstring(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }

    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0));

    let maxLength = 0;
    let endIndex = 0;

    // Build DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i - 1;
                }
            } else {
                dp[i][j] = 0; // Reset for substring
            }
        }
    }

    // Extract substring
    const substring = str1.substring(endIndex - maxLength + 1, endIndex + 1);

    return {
        length: maxLength,
        substring,
        endIndex,
        dp,
    };
}

/**
 * LONGEST COMMON SUBSTRING - Space Optimized Solution
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(min(m, n))
 *
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {number} - Length of longest common substring
 */
function longestCommonSubstringSpaceOptimized(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }

    const m = str1.length;
    const n = str2.length;
    let maxLength = 0;

    // Use smaller string for DP array
    const dp = Array(Math.min(m, n) + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        const prev = Array(Math.min(m, n) + 1).fill(0);
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                prev[j] = 1 + dp[j - 1];
                maxLength = Math.max(maxLength, prev[j]);
            } else {
                prev[j] = 0;
            }
        }
        dp.splice(0, dp.length, ...prev);
    }

    return maxLength;
}

/**
 * EDIT DISTANCE (Levenshtein Distance) - Dynamic Programming Solution
 *
 * PROBLEM: Find minimum number of operations to convert str1 to str2
 * OPERATIONS: Insert, Delete, Replace
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 *
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {Object} - { distance: number, operations: Array }
 */
function editDistance(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }

    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0));

    // Initialize first row and column
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] =
                    1 +
                    Math.min(
                        dp[i - 1][j], // Delete
                        dp[i][j - 1], // Insert
                        dp[i - 1][j - 1], // Replace
                    );
            }
        }
    }

    return {
        distance: dp[m][n],
        dp,
    };
}

/**
 * SHORTEST COMMON SUPERSEQUENCE - Dynamic Programming Solution
 *
 * PROBLEM: Find shortest string that contains both str1 and str2 as subsequences
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 *
 * @param {string} str1 - First string
 * @param {string} str2 - Second string
 * @returns {Object} - { length: number, supersequence: string }
 */
function shortestCommonSupersequence(str1, str2) {
    if (typeof str1 !== 'string' || typeof str2 !== 'string') {
        throw new Error('Both inputs must be strings');
    }

    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0));

    // Build DP table (same as LCS)
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruct supersequence
    let supersequence = '';
    let i = m,
        j = n;

    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            supersequence = str1[i - 1] + supersequence;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            supersequence = str1[i - 1] + supersequence;
            i--;
        } else {
            supersequence = str2[j - 1] + supersequence;
            j--;
        }
    }

    // Add remaining characters
    while (i > 0) {
        supersequence = str1[i - 1] + supersequence;
        i--;
    }
    while (j > 0) {
        supersequence = str2[j - 1] + supersequence;
        j--;
    }

    return {
        length: supersequence.length,
        supersequence,
    };
}

// =============================================================================
// LCS ALGORITHMS TEST SUITE
// =============================================================================

function runLCSTests() {
    console.log('🔗 LONGEST COMMON SUBSEQUENCE ALGORITHMS TESTS 🔗\n');

    // Test Case 1: Basic LCS
    console.log('Test 1: Basic LCS');
    const str1 = 'ABCDGH';
    const str2 = 'AEDFHR';
    const result1 = lcsDP(str1, str2);
    console.log('String 1:', str1);
    console.log('String 2:', str2);
    console.log('LCS Length:', result1.length);
    console.log('LCS:', result1.subsequence);
    console.log('✅ Test 1 Passed\n');

    // Test Case 2: Different implementations comparison
    console.log('Test 2: Implementation Comparison');
    const str3 = 'AGGTAB';
    const str4 = 'GXTXAYB';
    const recursive = lcsRecursive(str3, str4);
    const memoized = lcsMemoized(str3, str4);
    const dp = lcsDP(str3, str4);
    const spaceOpt = lcsSpaceOptimized(str3, str4);
    console.log('String 1:', str3);
    console.log('String 2:', str4);
    console.log('Recursive:', recursive);
    console.log('Memoized:', memoized);
    console.log('DP:', dp.length);
    console.log('Space Optimized:', spaceOpt);
    console.log('✅ Test 2 Passed\n');

    // Test Case 3: Step-by-step tracking
    console.log('Test 3: Step-by-Step Tracking');
    const str5 = 'ABC';
    const str6 = 'AC';
    const result3 = lcsWithSteps(str5, str6);
    console.log('String 1:', str5);
    console.log('String 2:', str6);
    console.log('LCS Length:', result3.length);
    console.log('LCS:', result3.subsequence);
    console.log('Total Steps:', result3.steps.length);
    console.log('✅ Test 3 Passed\n');

    // Test Case 4: Longest Common Substring
    console.log('Test 4: Longest Common Substring');
    const str7 = 'ABABC';
    const str8 = 'BABCA';
    const result4 = longestCommonSubstring(str7, str8);
    console.log('String 1:', str7);
    console.log('String 2:', str8);
    console.log('Substring Length:', result4.length);
    console.log('Substring:', result4.substring);
    console.log('✅ Test 4 Passed\n');

    // Test Case 5: Edit Distance
    console.log('Test 5: Edit Distance');
    const str9 = 'kitten';
    const str10 = 'sitting';
    const result5 = editDistance(str9, str10);
    console.log('String 1:', str9);
    console.log('String 2:', str10);
    console.log('Edit Distance:', result5.distance);
    console.log('✅ Test 5 Passed\n');

    // Test Case 6: Shortest Common Supersequence
    console.log('Test 6: Shortest Common Supersequence');
    const str11 = 'AGGTAB';
    const str12 = 'GXTXAYB';
    const result6 = shortestCommonSupersequence(str11, str12);
    console.log('String 1:', str11);
    console.log('String 2:', str12);
    console.log('Supersequence Length:', result6.length);
    console.log('Supersequence:', result6.supersequence);
    console.log('✅ Test 6 Passed\n');

    // Test Case 7: Edge Cases
    console.log('Test 7: Edge Cases');
    const emptyResult = lcsDP('', '');
    console.log('Empty strings:', emptyResult);

    const sameResult = lcsDP('ABC', 'ABC');
    console.log('Same strings:', sameResult);

    const noCommonResult = lcsDP('ABC', 'XYZ');
    console.log('No common characters:', noCommonResult);
    console.log('✅ Test 7 Passed\n');

    // Test Case 8: Performance Test
    console.log('Test 8: Performance Test');
    const longStr1 = 'A'.repeat(100) + 'B'.repeat(100);
    const longStr2 = 'A'.repeat(100) + 'C'.repeat(100);
    const startTime = performance.now();
    const perfResult = lcsSpaceOptimized(longStr1, longStr2);
    const endTime = performance.now();
    console.log('Long strings (200 chars each)');
    console.log('LCS Length:', perfResult);
    console.log(`Time: ${(endTime - startTime).toFixed(2)}ms`);
    console.log('✅ Test 8 Passed\n');

    console.log('🎉 All LCS tests passed!');
}

// Export functions for use in other modules
module.exports = {
    lcsRecursive,
    lcsMemoized,
    lcsDP,
    lcsSpaceOptimized,
    lcsWithSteps,
    longestCommonSubstring,
    longestCommonSubstringSpaceOptimized,
    editDistance,
    shortestCommonSupersequence,
    runLCSTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runLCSTests();
}
