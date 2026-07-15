// Infinite Currying and Generic Currying patterns for JavaScript interviews.
// Run: node ./src/algotest/frequent/infiniteCurrying.js

// =============================================================================
// Variant 1: Explicit Terminator (Call with no args to finish)
// =============================================================================
// Key idea: Accumulate arguments inside a closure. If the returned function
// is called with NO arguments, return the accumulated sum. Otherwise, accumulate
// and keep returning the inner function.

function func(x = 0) {
    let sum = x;

    function inner(y) {
        if (arguments.length === 0) {
            return sum;
        }
        sum += y;
        return inner;
    }

    return inner;
}

// --- Usage & Output ---
const r1 = func(1)(2)(3)();
const r2 = func(1)(2)(3)(4)();

console.log(`Variant 1 (r1): ${r1}`); // Output: Variant 1 (r1): 6
console.log(`Variant 1 (r2): ${r2}`); // Output: Variant 1 (r2): 10


// =============================================================================
// Variant 2: Implicit Primitive Coercion (valueOf / toString)
// =============================================================================
// Key idea: Every call returns a new curried function. However, we override
// the prototype methods `valueOf` and `toString` on the returned function.
// When JavaScript tries to convert the function to a primitive (e.g., in math
// operations or template string templates), it implicitly calls these methods.

function add(x) {
    function inner(y) {
        return add(x + y);
    }
    
    inner.valueOf = () => x;       // Triggered by math: +f, f - 0, f == 6
    inner.toString = () => String(x); // Triggered by strings: `${f}`, f + ""
    
    return inner;
}

// --- Usage & Output ---
const a1 = add(1)(2)(3);
const a2 = add(1)(2)(3)(4);

console.log(`Variant 2 (a1): ${a1}`); // Output: Variant 2 (a1): 6
console.log(`Variant 2 (a2): ${a2}`); // Output: Variant 2 (a2): 10
console.log(`Variant 2 (addition): ${+a1 + +a2}`); // Output: Variant 2 (addition): 16


// =============================================================================
// Variant 3: Generic Currying based on Function Arity (N-arguments limit)
// =============================================================================
// Crucial Senior / Staff Level Interview Question!
// Write a general-purpose `curry` function that converts any function of length N
// (e.g., `const sum = (a, b, c) => a + b + c`) into a curried version.
//
// Key concept: Check if the number of accumulated arguments is greater than or
// equal to the original function's arity (`fn.length`).
// - If yes: Call the original function.
// - If no: Return a curried function to collect more arguments.

function curry(fn) {
    return function curried(...args) {
        // fn.length returns the number of expected parameters (arity) of fn
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function (...nextArgs) {
                return curried.apply(this, [...args, ...nextArgs]);
            };
        }
    };
}

// --- Usage Example ---
const sumThree = (a, b, c) => a + b + c;
const curriedSum = curry(sumThree);

// All of these different combinations work!
const res1 = curriedSum(1)(2)(3);
const res2 = curriedSum(1, 2)(3);
const res3 = curriedSum(1)(2, 3);
const res4 = curriedSum(1, 2, 3);

console.log('Variant 3 (res1):', res1); // Output: Variant 3 (res1): 6
console.log('Variant 3 (res2):', res2); // Output: Variant 3 (res2): 6
console.log('Variant 3 (res3):', res3); // Output: Variant 3 (res3): 6
console.log('Variant 3 (res4):', res4); // Output: Variant 3 (res4): 6
