// Character Code (charCodeAt) cheat sheet for interviews and algorithms.
// Run: node ./src/algotest/frequent/charCodes.js

// ---------- 1. ALPHANUMERIC CHECK ----------
// High performance check without Regex. Essential for Palindrome problems.
function isAlphanumeric(char) {
    if (!char) return false;
    const code = char.charCodeAt(0);
    return (
        (code >= 48 && code <= 57) ||  // 0-9
        (code >= 65 && code <= 90) ||  // A-Z
        (code >= 97 && code <= 122)    // a-z
    );
}

console.log('isAlphanumeric("a"):', isAlphanumeric("a")); // true
console.log('isAlphanumeric("?"):', isAlphanumeric("?")); // false


// ---------- 2. CONVERSIONS ----------
// Char to Code:
const codeOfA = "a".charCodeAt(0); // 97
const codeOfCapA = "A".charCodeAt(0); // 65

// Code to Char:
const charOf97 = String.fromCharCode(97); // "a"
const charOf65 = String.fromCharCode(65); // "A"


// ---------- 3. CASE CONVERSION MANUALLY ----------
// Difference between 'A' and 'a' is 32 (65 - 97 = -32)
// This is because the 5th bit (value 32) is set for lowercase and cleared for uppercase!
const toUpper = (char) => {
    const code = char.charCodeAt(0);
    if (code >= 97 && code <= 122) {
        return String.fromCharCode(code - 32);
    }
    return char;
};

const toLower = (char) => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
        return String.fromCharCode(code + 32);
    }
    return char;
};

console.log('toUpper("g"):', toUpper("g")); // "G"
console.log('toLower("R"):', toLower("R")); // "r"


// ---------- 4. FREQUENCY MAP INDEXING ----------
// Map a-z to index 0-25 (used in Tries, Anagrams, custom Sorting)
const getAlphabetIndex = (char) => {
    return char.toLowerCase().charCodeAt(0) - 97;
};

console.log('getAlphabetIndex("a"):', getAlphabetIndex("a")); // 0
console.log('getAlphabetIndex("z"):', getAlphabetIndex("z")); // 25


// ---------- 5. CAESAR CIPHER (Alphabet Shifts) ----------
// Shift letters by k positions within a-z (handling wrap-around)
const shiftChar = (char, k) => {
    const code = char.charCodeAt(0);
    if (code >= 97 && code <= 122) {
        // Shift within 0..25, apply modulo, then shift back to a-z range (97..122)
        return String.fromCharCode(((code - 97 + k) % 26 + 26) % 26 + 97);
    }
    if (code >= 65 && code <= 90) {
        // Shift within 0..25, apply modulo, then shift back to A-Z range (65..90)
        return String.fromCharCode(((code - 65 + k) % 26 + 26) % 26 + 65);
    }
    return char; // Non-alphabetic characters remain unchanged
};

console.log('shiftChar("y", 3):', shiftChar("y", 3)); // "b"
console.log('shiftChar("B", -1):', shiftChar("B", -1)); // "A"


// ---------- KEY CHAR CODES TO MEMORIZE ----------
// "0" -> 48, "9" -> 57
// "A" -> 65, "Z" -> 90
// "a" -> 97, "z" -> 122

