/**
 * Two Pointers Technique
 *
 * The two pointers technique is a common pattern used to solve array and string problems.
 * It's one of the most frequently used techniques in coding interviews.
 *
 * Common Patterns:
 * - Opposite direction pointers (start/end)
 * - Same direction pointers (slow/fast)
 * - Fixed window sliding
 * - Variable window sliding
 *
 * Time Complexity: Usually O(n)
 * Space Complexity: Usually O(1)
 */

// Two Sum (Sorted Array)
function twoSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return []; // No solution found
}

// Three Sum
function threeSum(arr, target) {
    arr.sort((a, b) => a - b);
    const result = [];

    for (let i = 0; i < arr.length - 2; i++) {
        // Skip duplicates
        if (i > 0 && arr[i] === arr[i - 1]) continue;

        let left = i + 1;
        let right = arr.length - 1;

        while (left < right) {
            const sum = arr[i] + arr[left] + arr[right];

            if (sum === target) {
                result.push([arr[i], arr[left], arr[right]]);

                // Skip duplicates
                while (left < right && arr[left] === arr[left + 1]) left++;
                while (left < right && arr[right] === arr[right - 1]) right--;

                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

// Remove Duplicates from Sorted Array
function removeDuplicates(arr) {
    if (arr.length === 0) return 0;

    let slow = 0;

    for (let fast = 1; fast < arr.length; fast++) {
        if (arr[fast] !== arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }

    return slow + 1;
}

// Move Zeros to End
function moveZeros(arr) {
    let slow = 0;

    // Move all non-zero elements to the front
    for (let fast = 0; fast < arr.length; fast++) {
        if (arr[fast] !== 0) {
            arr[slow] = arr[fast];
            slow++;
        }
    }

    // Fill remaining positions with zeros
    while (slow < arr.length) {
        arr[slow] = 0;
        slow++;
    }

    return arr;
}

// Valid Palindrome
function isPalindrome(s) {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}

// Container With Most Water
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;

    while (left < right) {
        const width = right - left;
        const minHeight = Math.min(height[left], height[right]);
        const currentArea = width * minHeight;

        maxWater = Math.max(maxWater, currentArea);

        // Move the pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
}

// Trapping Rain Water
function trapRainWater(height) {
    if (height.length < 3) return 0;

    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }

    return water;
}

// Find All Anagrams in String
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
        // Add current character
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

// Helper function to compare arrays
function arraysEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

// Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
    const seen = new Set();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }

        seen.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Minimum Window Substring
function minWindow(s, t) {
    if (s.length < t.length) return '';

    const tCount = new Map();
    for (let char of t) {
        tCount.set(char, (tCount.get(char) || 0) + 1);
    }

    let left = 0;
    let minStart = 0;
    let minLength = Infinity;
    let matched = 0;

    for (let right = 0; right < s.length; right++) {
        const rightChar = s[right];

        if (tCount.has(rightChar)) {
            tCount.set(rightChar, tCount.get(rightChar) - 1);
            if (tCount.get(rightChar) >= 0) {
                matched++;
            }
        }

        while (matched === t.length) {
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                minStart = left;
            }

            const leftChar = s[left];
            if (tCount.has(leftChar)) {
                tCount.set(leftChar, tCount.get(leftChar) + 1);
                if (tCount.get(leftChar) > 0) {
                    matched--;
                }
            }
            left++;
        }
    }

    return minLength === Infinity ? '' : s.substring(minStart, minStart + minLength);
}

// Test Functions
function runTwoPointersTests() {
    console.log('👆 Two Pointers Tests\n');

    // Test 1: Two Sum
    console.log('Test 1: Two Sum');
    const arr1 = [2, 7, 11, 15];
    console.log('Array:', arr1, 'Target: 9');
    console.log('Result:', twoSum(arr1, 9)); // [0, 1]
    console.log();

    // Test 2: Three Sum
    console.log('Test 2: Three Sum');
    const arr2 = [-1, 0, 1, 2, -1, -4];
    console.log('Array:', arr2, 'Target: 0');
    console.log('Result:', threeSum(arr2, 0));
    console.log();

    // Test 3: Remove Duplicates
    console.log('Test 3: Remove Duplicates');
    const arr3 = [1, 1, 2, 2, 3, 4, 4, 5];
    console.log('Original:', arr3);
    const newLength = removeDuplicates(arr3);
    console.log('New length:', newLength);
    console.log('Modified array:', arr3.slice(0, newLength));
    console.log();

    // Test 4: Move Zeros
    console.log('Test 4: Move Zeros');
    const arr4 = [0, 1, 0, 3, 12];
    console.log('Original:', arr4);
    console.log('Result:', moveZeros([...arr4]));
    console.log();

    // Test 5: Valid Palindrome
    console.log('Test 5: Valid Palindrome');
    const str1 = "A man, a plan, a canal: Panama";
    const str2 = "race a car";
    console.log(`"${str1}" is palindrome:`, isPalindrome(str1));
    console.log(`"${str2}" is palindrome:`, isPalindrome(str2));
    console.log();

    // Test 6: Container With Most Water
    console.log('Test 6: Container With Most Water');
    const height1 = [1, 8, 6, 2, 5, 4, 8, 3, 7];
    console.log('Heights:', height1);
    console.log('Max area:', maxArea(height1));
    console.log();

    // Test 7: Trapping Rain Water
    console.log('Test 7: Trapping Rain Water');
    const height2 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
    console.log('Heights:', height2);
    console.log('Trapped water:', trapRainWater(height2));
    console.log();

    // Test 8: Find Anagrams
    console.log('Test 8: Find Anagrams');
    const s1 = "cbaebabacd";
    const p1 = "abc";
    console.log(`String: "${s1}", Pattern: "${p1}"`);
    console.log('Anagram indices:', findAnagrams(s1, p1));
    console.log();

    // Test 9: Longest Substring Without Repeating Characters
    console.log('Test 9: Longest Substring Without Repeating Characters');
    const str3 = "abcabcbb";
    const str4 = "bbbbb";
    console.log(`"${str3}" longest length:`, lengthOfLongestSubstring(str3));
    console.log(`"${str4}" longest length:`, lengthOfLongestSubstring(str4));
    console.log();

    // Test 10: Minimum Window Substring
    console.log('Test 10: Minimum Window Substring');
    const s2 = "ADOBECODEBANC";
    const t2 = "ABC";
    console.log(`String: "${s2}", Target: "${t2}"`);
    console.log('Minimum window:', minWindow(s2, t2));
    console.log();
}

// Export functions
module.exports = {
    twoSum,
    threeSum,
    removeDuplicates,
    moveZeros,
    isPalindrome,
    maxArea,
    trapRainWater,
    findAnagrams,
    lengthOfLongestSubstring,
    minWindow,
    runTwoPointersTests
};

// Run tests if this file is executed directly
if (require.main === module) {
    runTwoPointersTests();
}
