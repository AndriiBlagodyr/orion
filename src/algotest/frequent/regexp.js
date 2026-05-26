// RegExp cheat sheet for JavaScript interviews and algorithms.
// Run: node ./src/algotest/frequent/regexp.js

// ---------- 1. CLEANING STRINGS (LeetCode Palindromes, etc.) ----------
const cleanString = (str) => {
    // Keep only alphanumeric characters (a-z, A-Z, 0-9)
    return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
};

const cleanStringWithUnderscoreRemoval = (str) => {
    // \W matches any non-word character (equivalent to [^a-zA-Z0-9_]).
    // Since \W includes underscore _, we also strip underscores separately:
    return str.replace(/[\W_]/g, '').toLowerCase();
};

console.log(cleanString("A man, a plan, a canal: Panama")); // "amanaplanacanalpanama"
console.log(cleanStringWithUnderscoreRemoval("ab_c_d!!")); // "abcd"


// ---------- 2. MANAGING SPACES ----------
const trimAndSingleSpace = (str) => {
    // Replace multiple spaces/tabs/newlines with a single space and trim the ends
    return str.trim().replace(/\s+/g, ' ');
};

console.log(trimAndSingleSpace("   Hello     world!   this   is  JS.  ")); // "Hello world! this is JS."


// ---------- 3. COMMON INTERVIEW VALIDATIONS ----------
// a) Is Integer (signed / unsigned)
const isInteger = (str) => /^[+-]?\d+$/.test(str);

// b) Is Float/Decimal
const isFloat = (str) => /^[+-]?(\d+\.\d+|\.\d+|\d+)$/.test(str);

// c) Is Valid Email (simple but standard)
const isValidEmail = (str) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(str);

// d) Is Valid Hex Color (#fff or #ffffff)
const isValidHexColor = (str) => /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/.test(str);

console.log('isInteger("123"):', isInteger("123")); // true
console.log('isFloat("-0.45"):', isFloat("-0.45")); // true
console.log('isValidEmail("test@domain.com"):', isValidEmail("test@domain.com")); // true


// ---------- 4. CAPTURING GROUPS & MATCHING ----------
// Extracting parts of a string
const url = "https://github.com/facebook/react";
const repoRegex = /https:\/\/github\.com\/([^/]+)\/([^/]+)/;
const match = url.match(repoRegex);

if (match) {
    const [fullUrl, owner, repo] = match;
    console.log(`Owner: ${owner}, Repo: ${repo}`); // Owner: facebook, Repo: react
}


// ---------- 5. ITERATIVE MATCHING (matchAll) ----------
// Finding all instances with their groups (essential for parsers)
const text = "error:404, warning:500, error:503";
const regex = /error:(\d+)/g;
const matches = [...text.matchAll(regex)];

for (const m of matches) {
    console.log(`Found error code: ${m[1]} at index ${m.index}`);
}


// ---------- TOP 5 REGEXP SYMBOLS TO REMEMBER ----------
// 1. ^ and $               -> anchor to start and end of string
// 2. \d, \w, \s            -> digit ([0-9]), word ([a-zA-Z0-9_]), space ([ \t\n\r\f\v])
// 3. \D, \W, \S            -> negate: non-digit, non-word, non-space
// 4. *, +, ?               -> quantifier: 0 or more, 1 or more, 0 or 1
// 5. [^...]                -> negated character class (matches anything NOT in brackets)

