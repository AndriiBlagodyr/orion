// Promises, Async/Await, and asynchronous control flows in JavaScript.
// Run: node ./src/algotest/frequent/promises.js

// =============================================================================
// 1. BASIC PROMISE CREATION & STATUS STATES
// =============================================================================
// A Promise is a proxy for a value not necessarily known when the promise is
// created. It has 3 states: pending, fulfilled, or rejected.

const createBasicPromise = (shouldSucceed) => {
    return new Promise((resolve, reject) => {
        if (shouldSucceed) {
            resolve("Success Value!");
        } else {
            reject(new Error("Failure Error!"));
        }
    });
};

// --- Usage ---
createBasicPromise(true)
    .then((result) => console.log('Basic Success:', result)) // Output: Basic Success: Success Value!
    .catch((error) => console.error('Basic Error:', error.message));


// =============================================================================
// 2. PROMISIFY (Converting Node-style callbacks to Promises)
// =============================================================================
// Crucial Senior Frontend / Node.js Interview Question!
// Promisify takes a function that expects a callback as its last argument,
// e.g. `(arg1, arg2, (err, result) => {})`, and returns a Promise-returning function.

function promisify(originalFn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            // Call original function with provided arguments, appending a custom callback
            originalFn(...args, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    };
}

// --- Usage Example (Mock fs.readFile callback function) ---
const mockReadFile = (filename, encoding, callback) => {
    setTimeout(() => {
        if (filename === "valid.txt") {
            callback(null, "File Content: Hello World!");
        } else {
            callback(new Error("File not found"));
        }
    }, 100);
};

// Transform it:
const readFilePromise = promisify(mockReadFile);

// Run:
readFilePromise("valid.txt", "utf-8")
    .then((data) => console.log('Promisified Success:', data)) // Output: Promisified Success: File Content: Hello World!
    .catch((err) => console.error('Promisified Error:', err.message));


// =============================================================================
// 3. THE 4 PROMISE COMBINATORS (Very Hot Interview Topic!)
// =============================================================================
const pFast = new Promise((res) => setTimeout(() => resolveOrReject(res, "Fast"), 100));
const pSlow = new Promise((res) => setTimeout(() => resolveOrReject(res, "Slow"), 300));
const pError = new Promise((_, rej) => setTimeout(() => rej(new Error("Failing")), 200));

// Utility helper
function resolveOrReject(resolveFn, val) {
    resolveFn(val);
}

// ---------- A) Promise.all (All or Nothing) ----------
// - Resolves when ALL promises resolve.
// - Rejects immediately if ANY promise rejects.
// Use: Fetching interdependent data.
Promise.all([pFast, pSlow])
    .then((results) => console.log('Promise.all:', results)) // Output: Promise.all: [ 'Fast', 'Slow' ]
    .catch((err) => console.error('Promise.all error:', err.message));

Promise.all([pFast, pError, pSlow])
    .then((results) => console.log('Promise.all with failure:', results))
    .catch((err) => console.error('Promise.all with failure error:', err.message)); // Output: Promise.all with failure error: Failing


// ---------- B) Promise.allSettled (Never Rejects) ----------
// - Resolves once ALL promises have either fulfilled or rejected.
// - Returns an array of objects detailing the status of each promise.
// Use: Multiple independent API tasks where some can fail without breaking the page.
Promise.allSettled([pFast, pError, pSlow])
    .then((results) => {
        console.log('Promise.allSettled:', results);
        /* Output:
        Promise.allSettled: [
          { status: 'fulfilled', value: 'Fast' },
          { status: 'rejected', reason: Error: Failing },
          { status: 'fulfilled', value: 'Slow' }
        ]
        */
    });


// ---------- C) Promise.race (First to Settle wins) ----------
// - Resolves or rejects as soon as the FIRST promise settles (resolves or rejects).
// Use: Imposing a timeout on an API request.
Promise.race([pFast, pError])
    .then((result) => console.log('Promise.race:', result)) // Output: Promise.race: Fast (pFast finishes at 100ms, pError at 200ms)
    .catch((err) => console.error('Promise.race error:', err.message));


// ---------- D) Promise.any (First Fulfill wins) ----------
// - Resolves as soon as any promise is FULFILLED.
// - Rejects only if ALL promises reject (returns an AggregateError).
// Use: Fetching data from redundant servers (fallback resources).
Promise.any([pError, pSlow])
    .then((result) => console.log('Promise.any:', result)) // Output: Promise.any: Slow (pError fails at 200ms, pSlow fulfills at 300ms)
    .catch((err) => console.error('Promise.any error:', err.message));


// =============================================================================
// 4. SEQUENTIAL PROMISE CHAINS (Reduce Pattern)
// =============================================================================
// Executing asynchronous tasks sequentially (one after the other).

const task = (id, ms) => () => new Promise((resolve) => {
    setTimeout(() => {
        console.log(`Task ${id} completed.`);
        resolve(id);
    }, ms);
});

const tasks = [task(1, 200), task(2, 100), task(3, 150)];

// Traditional reduction approach
function runTasksSequentially(taskArray) {
    return taskArray.reduce((promiseChain, currentTask) => {
        return promiseChain.then((chainResults) => {
            return currentTask().then((result) => {
                return [...chainResults, result];
            });
        });
    }, Promise.resolve([]));
}

setTimeout(() => {
    console.log('\n--- Starting Sequential Chain ---');
    runTasksSequentially(tasks).then((results) => {
        console.log('Sequential Chain Finished. Results:', results);
        // Output sequentially:
        // Task 1 completed.
        // Task 2 completed.
        // Task 3 completed.
        // Sequential Chain Finished. Results: [ 1, 2, 3 ]
    });
}, 1000);
