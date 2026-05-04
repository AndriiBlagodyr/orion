// Bit manipulation cheatsheet for JavaScript interviews.
// Run: node ./src/algotest/frequent/bitManipulations.js
//
// In JavaScript, bitwise operators work on 32-bit signed integers
// (except >>> which treats the value as 32-bit unsigned).
// Numbers are converted to int32 before the operation, then back to a number.


// ---------- 1. AND & ----------
// Result bit is 1 only when BOTH input bits are 1.
// Use to: read a bit, mask out bits, check evenness.
console.log(5 & 3);            // 101 & 011 = 001 -> 1
console.log(10 & 1);           // 0 -> even
console.log(11 & 1);           // 1 -> odd


// ---------- 2. OR | ----------
// Result bit is 1 when AT LEAST ONE input bit is 1.
// Use to: set a bit, combine flags.
console.log(5 | 3);            // 101 | 011 = 111 -> 7
console.log(0b0100 | (1 << 0)); // turn on bit 0 -> 0b0101 -> 5


// ---------- 3. XOR ^ ----------
// Result bit is 1 when input bits are DIFFERENT.
// Use to: toggle a bit, find the unique number, swap without temp.
console.log(5 ^ 3);            // 101 ^ 011 = 110 -> 6
console.log(5 ^ 5);            // 0  -> a ^ a = 0
console.log(5 ^ 0);            // 5  -> a ^ 0 = a

// Swap two numbers without a temporary variable.
let a = 7, b = 12;
a = a ^ b;
b = a ^ b; // = (a ^ b) ^ b = a
a = a ^ b; // = (a ^ b) ^ a = b
console.log(a, b);             // 12 7


// ---------- 4. NOT ~ ----------
// Flips every bit. In two's complement: ~n === -(n + 1).
console.log(~5);               // -6
console.log(~-1);              // 0
// Common trick: ~x is 0 only when x === -1, useful with indexOf.
const idx = [1, 2, 3].indexOf(2);
if (~idx) console.log('found at', idx); // ~1 === -2 (truthy)


// ---------- 5. LEFT SHIFT << ----------
// Shift bits left by n. Equivalent to multiplying by 2^n (within int32).
console.log(3 << 1);           // 011 -> 110 -> 6
console.log(1 << 4);           // 1 -> 10000 -> 16
// Build a mask for the i-th bit:
const mask = 1 << 3;           // 0b1000 = 8


// ---------- 6. RIGHT SHIFT >> (arithmetic / signed) ----------
// Shift right by n. Equivalent to floor-divide by 2^n. Keeps the sign bit.
console.log(6 >> 1);           // 110 -> 011 -> 3
console.log(-8 >> 1);          // -4 (sign bit is preserved)


// ---------- 7. UNSIGNED RIGHT SHIFT >>> ----------
// Shift right by n, filling the left with 0. Treats the value as unsigned.
console.log(-1 >>> 0);         // 4294967295 -> classic way to read int as uint32
console.log(-8 >>> 1);         // 2147483644 (no sign preservation)
// Useful for "reverse bits" / "number of 1 bits" problems on negative inputs.


// ---------- COMMON INTERVIEW PATTERNS ----------

// Check if i-th bit is set (1).
function isBitSet(n, i) {
    return (n & (1 << i)) !== 0;
}

// Set i-th bit to 1.
function setBit(n, i) {
    return n | (1 << i);
}

// Clear i-th bit (set to 0).
function clearBit(n, i) {
    return n & ~(1 << i);
}

// Toggle i-th bit (0 <-> 1).
function toggleBit(n, i) {
    return n ^ (1 << i);
}

// Read i-th bit as 0 or 1.
function getBit(n, i) {
    return (n >> i) & 1;
}

console.log(isBitSet(0b1010, 1)); // true
console.log(setBit(0b1000, 0).toString(2));    // '1001'
console.log(clearBit(0b1111, 2).toString(2));  // '1011'
console.log(toggleBit(0b1010, 0).toString(2)); // '1011'
console.log(getBit(0b1010, 3));                // 1


// ---------- POWER OF TWO ----------
// Power of two has exactly one bit set, so n & (n - 1) === 0.
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

console.log(isPowerOfTwo(8));  // true   (1000 & 0111 = 0)
console.log(isPowerOfTwo(6));  // false  (0110 & 0101 = 0100)


// ---------- LOWEST SET BIT ----------
// n & -n isolates the lowest 1-bit (uses two's complement).
console.log(12 & -12);         // 1100 & ...0100 = 0100 -> 4

// n & (n - 1) clears the lowest 1-bit.
console.log((12 & (12 - 1)).toString(2)); // '1000' (the lowest 1 from 1100 is gone)


// ---------- COUNT 1-BITS (HAMMING WEIGHT) ----------
// Brian Kernighan: each iteration removes the lowest set bit.
function popcount(n) {
    n = n >>> 0; // treat as unsigned 32-bit
    let count = 0;

    while (n !== 0) {
        n &= n - 1;
        count++;
    }

    return count;
}

console.log(popcount(0b1011));  // 3
console.log(popcount(255));     // 8


// ---------- HAMMING DISTANCE ----------
// Number of bit positions where two numbers differ.
function hammingDistance(a, b) {
    return popcount(a ^ b);
}

console.log(hammingDistance(1, 4)); // 0001 vs 0100 -> 2


// ---------- SINGLE NUMBER (every other appears twice) ----------
// XOR cancels pairs because a ^ a = 0 and 0 ^ x = x.
function singleNumber(nums) {
    let result = 0;

    for (const num of nums) {
        result ^= num;
    }

    return result;
}

console.log(singleNumber([4, 1, 2, 1, 2])); // 4


// ---------- MISSING NUMBER 0..n ----------
// XOR all indexes with all values; the survivor is the missing one.
function missingNumber(nums) {
    let result = nums.length;

    for (let i = 0; i < nums.length; i++) {
        result ^= i ^ nums[i];
    }

    return result;
}

console.log(missingNumber([3, 0, 1])); // 2


// ---------- REVERSE 32-BIT INTEGER ----------
function reverseBits(n) {
    let result = 0;

    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1;
    }

    return result >>> 0; // return as unsigned
}

console.log(reverseBits(0b00000010100101000001111010011100)); // 964176192


// ---------- SUBSET ENUMERATION ----------
// Each subset of n elements maps to a number 0..(2^n - 1).
// Bit i of the mask says whether element i is included.
function allSubsets(arr) {
    const result = [];

    for (let mask = 0; mask < 1 << arr.length; mask++) {
        const subset = [];

        for (let i = 0; i < arr.length; i++) {
            if (mask & (1 << i)) subset.push(arr[i]);
        }

        result.push(subset);
    }

    return result;
}

console.log(allSubsets([1, 2, 3]));
// [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]


// ---------- TOP 5 THINGS TO REMEMBER ----------
// 1. n & 1                 -> odd / even check
// 2. 1 << i                -> mask for bit i
// 3. n & (n - 1)           -> remove lowest 1-bit (and power-of-two check)
// 4. a ^ a = 0, a ^ 0 = a  -> XOR pairs cancel (single-number, missing-number)
// 5. << and >> by k        -> multiply / divide by 2^k (within int32)
