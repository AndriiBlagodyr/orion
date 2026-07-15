// Debounce and Throttle custom implementations for Frontend/JavaScript interviews.
// Run: node ./src/algotest/frequent/debounceThrottle.js

// =============================================================================
// 1. CUSTOM DEBOUNCE
// =============================================================================
// Debounce delays the execution of a function until a certain amount of time
// has passed since the last time it was called. Useful for search autocomplete,
// window resizing, auto-saving.
//
// Key concept: CLEAR the previous timer and START a new one on every call.

function debounce(func, delay) {
    let timeoutId = null;

    const debounced = function (...args) {
        const context = this; // Preserve the 'this' context

        // Clear any pending execution
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set a new timer
        timeoutId = setTimeout(() => {
            func.apply(context, args);
            timeoutId = null;
        }, delay);
    };

    // Advanced/Senior feature: Add a cancel method to clear pending executions
    debounced.cancel = function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    };

    return debounced;
}


// =============================================================================
// 2. CUSTOM THROTTLE
// =============================================================================
// Throttle guarantees that a function is called at most once per specified
// time interval. Useful for scroll listeners, mouse move tracking, resize events.

// --- Variant A: Simple Timestamp-based (Leading-edge execution only) ---
// This executes immediately on the first call, but completely ignores any
// trailing call that occurs during the cooldown period.
function throttleSimple(func, delay) {
    let lastTime = 0;

    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            func.apply(this, args);
        }
    };
}

// --- Variant B: Complete & Robust (Leading AND Trailing Edge execution) ---
// This is the ideal production/interview solution. It executes the first call
// immediately (leading) AND ensures the LAST call made during the quiet period
// is executed at the end of the cooldown interval (trailing).
function throttle(func, delay) {
    let timeoutId = null;
    let lastArgs = null;
    let lastContext = null;

    const throttled = function (...args) {
        const context = this;

        if (timeoutId) {
            // Save arguments of the latest call to run at the trailing edge
            lastArgs = args;
            lastContext = context;
            return;
        }

        // Execute immediately (leading edge)
        func.apply(context, args);

        // Start the cooldown timer
        const startCooldown = () => {
            timeoutId = setTimeout(() => {
                if (lastArgs) {
                    // Execute the trailing call with latest arguments
                    func.apply(lastContext, lastArgs);
                    lastArgs = null;
                    lastContext = null;
                    // Keep cooldown active since we just executed a trailing call
                    startCooldown();
                } else {
                    timeoutId = null;
                }
            }, delay);
        };

        startCooldown();
    };

    // Advanced feature: Add cancel method
    throttled.cancel = function () {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        lastArgs = null;
        lastContext = null;
    };

    return throttled;
}


// =============================================================================
// 3. TESTING THE IMPLEMENTATIONS
// =============================================================================

function testDebounce() {
    console.log('--- Testing Debounce ---');
    const log = (val) => console.log(`[Debounced] ${val} (at ${Date.now() % 10000}ms)`);
    const fn = debounce(log, 500);

    // Call rapidly
    fn('call 1'); // Cleared
    fn('call 2'); // Cleared
    setTimeout(() => fn('call 3'), 100); // Cleared
    setTimeout(() => fn('call 4'), 200); // This should execute around 700ms

    // Cancel test
    setTimeout(() => {
        fn('call 5'); // Scheduled to run in 500ms
        setTimeout(() => {
            fn.cancel(); // Aborted!
            console.log('[Debounced] Canceled pending call 5 successfully.');
        }, 100);
    }, 1000);
}

function testThrottle() {
    console.log('\n--- Testing Throttle (Leading + Trailing) ---');
    const log = (val) => console.log(`[Throttled] ${val} (at ${Date.now() % 10000}ms)`);
    const fn = throttle(log, 1000);

    // Initial call executes immediately (leading edge)
    fn('call 1'); // Executes immediately!

    // Rapid triggers during the 1000ms cooldown window
    fn('call 2'); // Ignored, but arguments saved
    setTimeout(() => fn('call 3'), 200); // Ignored, arguments overwritten
    setTimeout(() => fn('call 4'), 500); // Ignored, arguments overwritten

    // 'call 4' should execute at the 1000ms mark as the trailing edge call.
}

// Running the tests
testDebounce();
setTimeout(testThrottle, 2000);
