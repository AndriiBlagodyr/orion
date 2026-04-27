/**
 * Sliding Window Technique
 *
 * The sliding window technique is used to solve problems involving subarrays or substrings
 * with specific conditions. It's extremely common in coding interviews.
 *
 * Common Patterns:
 * - Fixed size window
 * - Variable size window
 * - Maximum/minimum subarray problems
 * - Substring problems
 *
 * Time Complexity: Usually O(n)
 * Space Complexity: Usually O(1) or O(k) where k is window size
 */

// Maximum Sum Subarray of Size K
function maxSumSubarray(arr, k) {
    if (arr.length < k) return -1;

    let windowSum = 0;
    let maxSum = 0;

    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }

    maxSum = windowSum;

    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum;
}

// Smallest Subarray with Sum >= Target
function minSubarrayLen(target, nums) {
    let left = 0;
    let minLength = Infinity;
    let windowSum = 0;

    for (let right = 0; right < nums.length; right++) {
        windowSum += nums[right];

        while (windowSum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            windowSum -= nums[left];
            left++;
        }
    }

    return minLength === Infinity ? 0 : minLength;
}

// Longest Substring with At Most K Distinct Characters
function lengthOfLongestSubstringKDistinct(s, k) {
    if (k === 0) return 0;

    const charCount = new Map();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);

        while (charCount.size > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            if (charCount.get(leftChar) === 0) {
                charCount.delete(leftChar);
            }
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Longest Substring with At Most Two Distinct Characters
function lengthOfLongestSubstringTwoDistinct(s) {
    return lengthOfLongestSubstringKDistinct(s, 2);
}

// Maximum Number of Vowels in Substring of Given Length
function maxVowels(s, k) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let vowelCount = 0;
    let maxVowelCount = 0;

    // Count vowels in first window
    for (let i = 0; i < k; i++) {
        if (vowels.has(s[i].toLowerCase())) {
            vowelCount++;
        }
    }

    maxVowelCount = vowelCount;

    // Slide the window
    for (let i = k; i < s.length; i++) {
        // Remove left character
        if (vowels.has(s[i - k].toLowerCase())) {
            vowelCount--;
        }

        // Add right character
        if (vowels.has(s[i].toLowerCase())) {
            vowelCount++;
        }

        maxVowelCount = Math.max(maxVowelCount, vowelCount);
    }

    return maxVowelCount;
}

// Permutation in String
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;

    const s1Count = new Array(26).fill(0);
    const s2Count = new Array(26).fill(0);

    // Count characters in s1
    for (let i = 0; i < s1.length; i++) {
        s1Count[s1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    // Sliding window in s2
    for (let i = 0; i < s2.length; i++) {
        s2Count[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++;

        // Remove character outside window
        if (i >= s1.length) {
            s2Count[s2.charCodeAt(i - s1.length) - 'a'.charCodeAt(0)]--;
        }

        // Check if current window matches s1
        if (i >= s1.length - 1 && arraysEqual(s1Count, s2Count)) {
            return true;
        }
    }

    return false;
}

// Helper function to compare arrays
function arraysEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// Find All Anagrams in String (Sliding Window)
function findAnagrams(s, p) {
    if (s.length < p.length) return [];

    const result = [];
    const pCount = new Array(26).fill(0);
    const sCount = new Array(26).fill(0);

    // Count characters in pattern
    for (let i = 0; i < p.length; i++) {
        pCount[p.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    // Sliding window
    for (let i = 0; i < s.length; i++) {
        sCount[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;

        // Remove character outside window
        if (i >= p.length) {
            sCount[s.charCodeAt(i - p.length) - 'a'.charCodeAt(0)]--;
        }

        // Check if current window is anagram
        if (i >= p.length - 1 && arraysEqual(sCount, pCount)) {
            result.push(i - p.length + 1);
        }
    }

    return result;
}

// Maximum Average Subarray
function findMaxAverage(nums, k) {
    let windowSum = 0;

    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }

    let maxSum = windowSum;

    // Slide the window
    for (let i = k; i < nums.length; i++) {
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum / k;
}

// Subarray Product Less Than K
function numSubarrayProductLessThanK(nums, k) {
    if (k <= 1) return 0;

    let left = 0;
    let product = 1;
    let count = 0;

    for (let right = 0; right < nums.length; right++) {
        product *= nums[right];

        while (product >= k) {
            product /= nums[left];
            left++;
        }

        count += right - left + 1;
    }

    return count;
}

// Longest Repeating Character Replacement
function characterReplacement(s, k) {
    const charCount = new Map();
    let left = 0;
    let maxCount = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];
        charCount.set(rightChar, (charCount.get(rightChar) || 0) + 1);
        maxCount = Math.max(maxCount, charCount.get(rightChar));

        // If current window is invalid, shrink it
        if (right - left + 1 - maxCount > k) {
            const leftChar = s[left];
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Test Functions
function runSlidingWindowTests() {
    console.log('🪟 Sliding Window Tests\n');

    // Test 1: Maximum Sum Subarray of Size K
    console.log('Test 1: Maximum Sum Subarray of Size K');
    const arr1 = [1, 4, 2, 10, 23, 3, 1, 0, 20];
    const k1 = 4;
    console.log('Array:', arr1, 'K:', k1);
    console.log('Max sum:', maxSumSubarray(arr1, k1));
    console.log();

    // Test 2: Smallest Subarray with Sum >= Target
    console.log('Test 2: Smallest Subarray with Sum >= Target');
    const nums1 = [2, 3, 1, 2, 4, 3];
    const target1 = 7;
    console.log('Array:', nums1, 'Target:', target1);
    console.log('Min length:', minSubarrayLen(target1, nums1));
    console.log();

    // Test 3: Longest Substring with At Most K Distinct Characters
    console.log('Test 3: Longest Substring with At Most K Distinct Characters');
    const s1 = "eceba";
    const k2 = 2;
    console.log(`String: "${s1}", K: ${k2}`);
    console.log('Max length:', lengthOfLongestSubstringKDistinct(s1, k2));
    console.log();

    // Test 4: Longest Substring with At Most Two Distinct Characters
    console.log('Test 4: Longest Substring with At Most Two Distinct Characters');
    const s2 = "eceba";
    console.log(`String: "${s2}"`);
    console.log('Max length:', lengthOfLongestSubstringTwoDistinct(s2));
    console.log();

    // Test 5: Maximum Number of Vowels in Substring
    console.log('Test 5: Maximum Number of Vowels in Substring');
    const s3 = "abciiidef";
    const k3 = 3;
    console.log(`String: "${s3}", K: ${k3}`);
    console.log('Max vowels:', maxVowels(s3, k3));
    console.log();

    // Test 6: Permutation in String
    console.log('Test 6: Permutation in String');
    const s4 = "ab";
    const s5 = "eidbaooo";
    console.log(`s1: "${s4}", s2: "${s5}"`);
    console.log('Contains permutation:', checkInclusion(s4, s5));
    console.log();

    // Test 7: Find All Anagrams
    console.log('Test 7: Find All Anagrams');
    const s6 = "cbaebabacd";
    const p1 = "abc";
    console.log(`String: "${s6}", Pattern: "${p1}"`);
    console.log('Anagram indices:', findAnagrams(s6, p1));
    console.log();

    // Test 8: Maximum Average Subarray
    console.log('Test 8: Maximum Average Subarray');
    const nums2 = [1, 12, -5, -6, 50, 3];
    const k4 = 4;
    console.log('Array:', nums2, 'K:', k4);
    console.log('Max average:', findMaxAverage(nums2, k4));
    console.log();

    // Test 9: Subarray Product Less Than K
    console.log('Test 9: Subarray Product Less Than K');
    const nums3 = [10, 5, 2, 6];
    const k5 = 100;
    console.log('Array:', nums3, 'K:', k5);
    console.log('Count:', numSubarrayProductLessThanK(nums3, k5));
    console.log();

    // Test 10: Longest Repeating Character Replacement
    console.log('Test 10: Longest Repeating Character Replacement');
    const s7 = "AABABBA";
    const k6 = 1;
    console.log(`String: "${s7}", K: ${k6}`);
    console.log('Max length:', characterReplacement(s7, k6));
    console.log();
}

// Export functions
module.exports = {
    maxSumSubarray,
    minSubarrayLen,
    lengthOfLongestSubstringKDistinct,
    lengthOfLongestSubstringTwoDistinct,
    maxVowels,
    checkInclusion,
    findAnagrams,
    findMaxAverage,
    numSubarrayProductLessThanK,
    characterReplacement,
    runSlidingWindowTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runSlidingWindowTests();
}
