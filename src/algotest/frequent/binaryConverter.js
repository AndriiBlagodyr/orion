// Binary ↔ Decimal conversion for JavaScript interviews.
// Run: node ./src/algotest/frequent/binaryConverter.js

// ---------- BINARY → DECIMAL ----------

// For decimal 319
// 9 * 10^0 = 9
// 1 * 10^1 = 10
// 3 * 10^2 = 300
// 319


// For fa3c
// c (12) * 16^0 = 12
// 3 (3) * 16^1 = 48
// f (10) * 16^2 = 2560
// a (15) * 16^3 = 61440
// 64060

// Standard from Right to Left>: Decimal = (1 * 2^0) + (1 * 2^1) + (0 * 2^2) + (1 * 2^3) + ...
// Manual: process each bit left to right.

//Second Approach:
// Initial state: result = 0
// 1st char ('1'): result = 0 * 2 + 1 -> 1
// 2nd char ('0'): result = 1 * 2 + 0 -> 2
// 3rd char ('1'): result = 2 * 2 + 1 -> 5
// 4th char ('1'): result = 5 * 2 + 1 -> 11
function binaryToDecimal(binaryStr) {
    let result = 0;

    for (const char of binaryStr) {
        if (char !== '0' && char !== '1') {
            throw new Error(`Invalid binary digit: ${char}`);
        }
        result = result * 2 + Number(char);
    }

    return result;
}

// Built-in shortcut (interview mention only — know the manual way first)
function binaryToDecimalBuiltIn(binaryStr) {
    return parseInt(binaryStr, 2);
}


// ---------- DECIMAL → BINARY ----------

// Manual: collect remainders from repeated division by 2.
// Example: 11 -> 11/2 rem 1, 5/2 rem 1, 2/2 rem 0, 1/2 rem 1 -> "1011"
function decimalToBinary(num) {
    if (num === 0) return '0';
    if (num < 0) throw new Error('Use decimalToBinary for non-negative integers only');

    let result = '';

    while (num > 0) {
        result = (num % 2) + result;
        num = Math.floor(num / 2);
    }

    return result;
}

// Built-in shortcut
function decimalToBinaryBuiltIn(num) {
    return num.toString(2);
}


// ---------- EXAMPLES ----------
console.log('binaryToDecimal("1011"):', binaryToDecimal('1011'));           // 11
console.log('binaryToDecimal("11111111"):', binaryToDecimal('11111111')); // 255
console.log('binaryToDecimal("0"):', binaryToDecimal('0'));                 // 0

console.log('decimalToBinary(11):', decimalToBinary(11));     // "1011"
console.log('decimalToBinary(255):', decimalToBinary(255));   // "11111111"
console.log('decimalToBinary(0):', decimalToBinary(0));       // "0"

// Round-trip check
const n = 42;
console.log(`round-trip ${n}:`, binaryToDecimal(decimalToBinary(n))); // 42

// Binary to HEX
const hexadecimalToDecimal = [
    { number: '0', binary: '0000', decimal: 0 },
    { number: '1', binary: '0001', decimal: 1 },
    { number: '2', binary: '0010', decimal: 2 },
    { number: '3', binary: '0011', decimal: 3 },
    { number: '4', binary: '0100', decimal: 4 },
    { number: '5', binary: '0101', decimal: 5 },
    { number: '6', binary: '0110', decimal: 6 },
    { number: '7', binary: '0111', decimal: 7 },
    { number: '8', binary: '1000', decimal: 8 },
    { number: '9', binary: '1001', decimal: 9 },
    { number: 'A', binary: '1010', decimal: 10 },
    { number: 'B', binary: '1011', decimal: 11 },
    { number: 'C', binary: '1100', decimal: 12 },
    { number: 'D', binary: '1101', decimal: 13 },
    { number: 'E', binary: '1110', decimal: 14 },
    { number: 'F', binary: '1111', decimal: 15 },
];
console.table(hexadecimalToDecimal);
// ASCII stores only 7 bits, so the 8th bit is used for parity. 0111 1111 --> 127
// s --> 115 --> 0111 0011
