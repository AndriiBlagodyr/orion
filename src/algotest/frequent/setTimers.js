// Timers, Event Loop, Macro vs Microtasks, and scheduling in JavaScript.
// Run: node ./src/algotest/frequent/setTimers.js

// =============================================================================
// 1. MACRO VS MICRO TASK QUEUES (The Event Loop)
// =============================================================================
// - Synchronous code executes immediately on the main thread stack.
// - Microtasks (Promises, queueMicrotask, MutationObserver) run next,
//   draining completely before moving to the next phase.
// - Macrotasks (setTimeout, setInterval, setImmediate, I/O) run after.
//   Only ONE macrotask runs, then the Microtask queue is checked again.

function testEventLoop() {
    console.log('--- 1. Synchronous Start ---');

    setTimeout(() => {
        console.log('--- 6. setTimeout (Macrotask) ---');
    }, 0);

    Promise.resolve().then(() => {
        console.log('--- 4. Promise 1 (Microtask) ---');
    }).then(() => {
        console.log('--- 5. Promise 2 (Microtask chain) ---');
    });

    queueMicrotask(() => {
        console.log('--- 4.5 queueMicrotask (Explicit Microtask) ---');
    });

    console.log('--- 2. Synchronous End ---');
}

// Order of execution of above:
// 1. Synchronous Start
// 2. Synchronous End
// 3. Promise 1 (Microtask)
// 4. queueMicrotask
// 5. Promise 2 (Microtask chain)
// 6. setTimeout (Macrotask)


// =============================================================================
// 2. BASIC SCHEDULING (setTimeout, setInterval)
// =============================================================================

// a) setTimeout - execute once after delay
const timerId = setTimeout((name) => {
    console.log(`Hello, ${name}!`);
}, 1000, 'Andrii'); // Extra parameters are forwarded to the callback!

clearTimeout(timerId); // Cancels the timeout


// b) setInterval - execute repeatedly
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`Interval tick ${count}`);
    if (count === 3) {
        clearInterval(intervalId); // Cancels the interval
    }
}, 500);


// =============================================================================
// 3. PROMISE-BASED SLEEP (DELAY)
// =============================================================================
// Essential for making async code wait. Very common in mock testing or APIs.

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runSleep() {
    console.log('Waiting...');
    await sleep(1000);
    console.log('Done after 1000ms!');
}


// =============================================================================
// 4. RETRY LOGIC WITH TIMEOUT (Backoff algorithm)
// =============================================================================
// Frequently asked in systems engineering and API resilience interviews.

async function fetchWithRetry(url, retries = 3, delay = 500) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Request failed');
        return await response.json();
    } catch (error) {
        if (retries <= 1) throw error;
        console.log(`Fetch failed. Retrying in ${delay}ms... (Retries left: ${retries - 1})`);
        await sleep(delay);
        return fetchWithRetry(url, retries - 1, delay * 2); // Exponential backoff
    }
}


// =============================================================================
// 5. ACCURATE TIMER: NESTED TIMEOUT vs SETINTERVAL
// =============================================================================
// Crucial Interview Concept: `setInterval` has DRIFT!
// If the callback takes 200ms to execute, and the interval is 100ms, intervals
// will "bunch up" because execution delays are not accounted for.
// Nested `setTimeout` guarantees a fixed, consistent delay between executions.

function accurateTimer(callback, delay) {
    let timerId = null;

    const tick = () => {
        callback();
        timerId = setTimeout(tick, delay); // Schedules the next run *after* execution completes
    };

    // Start
    timerId = setTimeout(tick, delay);

    // Stop
    return {
        stop: () => clearTimeout(timerId)
    };
}


// =============================================================================
// RUN TESTING SUITE
// =============================================================================
testEventLoop();
setTimeout(() => {
    console.log('\n--- 2. Starting Async Tests ---');
    runSleep();
}, 100);
