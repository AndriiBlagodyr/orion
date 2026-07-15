// String manipulation methods and interview-common algorithms.
// Run: node ./src/algotest/frequent/stringMethods.js

// =============================================================================
// 1. ACCESSING CHARACTERS
// =============================================================================
const str = "LeetCode";
str[0];                  // "L"
str.charAt(0);           // "L"
str.charCodeAt(0);       // 76 -> ASCII/Unicode value of "L"


// =============================================================================
// 2. SUBSTRINGS & QUERYING
// =============================================================================
str.includes("Code");    // true -> check presence
str.startsWith("Leet");  // true
str.endsWith("de");      // true
str.indexOf("e");        // 1  -> first index of "e"
str.indexOf("z");        // -1 -> not found
str.lastIndexOf("e");    // 7  -> last index of "e"


// =============================================================================
// 3. EXTRACTION
// =============================================================================
// slice(start, end)  -> standard extraction. Supports negative indices (counts from end).
// substring(start, end) -> older, does NOT support negative indices (treats them as 0).
str.slice(0, 4);         // "Leet" -> indices 0 to 3
str.slice(4);            // "Code" -> index 4 to end
str.slice(-4);           // "Code" -> last 4 characters


// =============================================================================
// 4. MODIFICATIONS (Strings are IMMUTABLE - always returns a new string!)
// =============================================================================
const text = "  hello world  ";
text.trim();             // "hello world" -> trims spaces from both ends
text.trimStart();        // "hello world  "
text.trimEnd();          // "  hello world"
text.toLowerCase();      // "  hello world  "
text.toUpperCase();      // "  HELLO WORLD  "

// padding (very useful for alignment, formatting, bin parsing)
"5".padStart(3, "0");    // "005"
"5".padEnd(3, "0");      // "500"

// repeating
"abc".repeat(3);         // "abcabcabc"


// =============================================================================
// 5. SPLITTING AND JOINING
// =============================================================================
"a-b-c".split("-");      // ["a", "b", "c"]
["a", "b", "c"].join("-"); // "a-b-c"


// =============================================================================
// 6. FREQUENT INTERVIEW STRING ALGORITHMS
// =============================================================================

// a) Reverse a String
const reverseString = (s) => [...s].reverse().join('');
console.log('Reverse "react":', reverseString("react")); // "tcaer"


// b) Check Anagram (e.g. "listen", "silent") - O(n) Time, O(1) Space
// Counts character occurrences using a frequency map / array
const isAnagram = (s, t) => {
    if (s.length !== t.length) return false;
    const count = {};

    for (const char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    for (const char of t) {
        if (!count[char]) return false; // Not present or count dropped below 0
        count[char]--;
    }

    return true;
};
console.log('isAnagram("listen", "silent"):', isAnagram("listen", "silent")); // true


// c) Check Valid Palindrome (ignoring non-alphanumeric, case-insensitive)
// Two-pointer pattern is O(1) space, whereas regex string cleaning is O(n).
const isPalindrome = (s) => {
    let left = 0;
    let right = s.length - 1;

    const isAlphanumeric = (char) => {
        const code = char.charCodeAt(0);
        return (
            (code >= 48 && code <= 57) ||  // 0-9
            (code >= 65 && code <= 90) ||  // A-Z
            (code >= 97 && code <= 122)    // a-z
        );
    };

    const sLower = s.toLowerCase();

    while (left < right) {
        while (left < right && !isAlphanumeric(sLower[left])) left++;
        while (left < right && !isAlphanumeric(sLower[right])) right--;

        if (sLower[left] !== sLower[right]) return false;
        left++;
        right--;
    }

    return true;
};
console.log('isPalindrome("A man, a plan, a canal: Panama"):', isPalindrome("A man, a plan, a canal: Panama")); // true


// d) String Compression (e.g. "aabcccccaaa" -> "a2b1c5a3")
const compressString = (s) => {
    if (!s) return "";
    let compressed = [];
    let count = 1;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === s[i + 1]) {
            count++;
        } else {
            compressed.push(s[i] + count);
            count = 1;
        }
    }

    const result = compressed.join('');
    return result.length < s.length ? result : s; // Only return compressed if it's shorter!
};
console.log('compressString("aabcccccaaa"):', compressString("aabcccccaaa")); // "a2b1c5a3"
