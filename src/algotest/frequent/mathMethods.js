// JavaScript math helpers often used in LeetCode-style algorithms.
// Run: node ./src/algotest/frequent/mathMethods.js

// ---------- BASIC MATH ----------
Math.abs(-7);                 // 7
Math.sign(-7);                // -1
Math.min(3, 1, 4);            // 1
Math.max(3, 1, 4);            // 4
Math.floor(3.9);              // 3
Math.ceil(3.1);               // 4
Math.round(3.5);              // 4
Math.trunc(-3.9);             // -3
Math.sqrt(49);                // 7
Math.pow(2, 10);              // 1024
2 ** 10;                      // 1024

Number.isInteger(10);         // true
Number.isFinite(Infinity);    // false
Number.MAX_SAFE_INTEGER;      // 9007199254740991
Number.MIN_SAFE_INTEGER;      // -9007199254740991


// ---------- RANDOM ----------
// Random float: includes min, excludes max. min <= result < max
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// Random integer: includes both min and max. min <= result <= max
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Random array item.
function randomItem(arr) {
    return arr[randomInt(0, arr.length - 1)];
}

randomFloat(5, 10);           // e.g. 7.328
randomInt(-10, 10);           // e.g. -3
randomItem(['a', 'b', 'c']);  // e.g. 'b'

// ---------- PRIME NUMBERS ----------
function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let divisor = 3; divisor * divisor <= num; divisor += 2) {
        if (num % divisor === 0) return false;
    }

    return true;
}

function primeFactors(num) {
    const factors = [];

    for (let divisor = 2; divisor * divisor <= num; divisor++) {
        while (num % divisor === 0) {
            factors.push(divisor);
            num /= divisor;
        }
    }

    if (num > 1) factors.push(num);
    return factors;
}

// ---------- DIGITS ----------
function countDigits(num) {
    num = Math.abs(num);
    if (num === 0) return 1;
    return Math.floor(Math.log10(num)) + 1;
}

function digitSum(num) {
    num = Math.abs(num);
    let sum = 0;

    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }

    return sum;
}

function reverseNumber(num) {
    const sign = Math.sign(num);
    num = Math.abs(num);
    let reversed = 0;

    while (num > 0) {
        reversed = reversed * 10 + (num % 10);
        num = Math.floor(num / 10);
    }

    return sign * reversed;
}


// ---------- RANGES ----------
function range(start, end, step = 1) {
    const result = [];

    for (let num = start; num < end; num += step) {
        result.push(num);
    }

    return result;
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}


// ---------- COMMON CONSTANTS ----------
const INF = Infinity;
const MOD = 1_000_000_007;
const EPSILON = 1e-9;

// Floating point comparison.
function almostEqual(a, b, epsilon = EPSILON) {
    return Math.abs(a - b) < epsilon;
}


// ---------- EXAMPLES ----------
isPrime(29);                  // true
primeFactors(84);             // [2, 2, 3, 7]
countDigits(12345);           // 5
digitSum(12345);              // 15
reverseNumber(-123);          // -321
range(0, 5);                  // [0, 1, 2, 3, 4]
clamp(12, 0, 10);             // 10
almostEqual(0.1 + 0.2, 0.3);  // true
