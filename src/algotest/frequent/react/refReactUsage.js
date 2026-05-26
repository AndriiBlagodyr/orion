import React, {useRef, useState, useEffect, forwardRef, useImperativeHandle} from 'react';

// =============================================================================
// 1. PERSISTENT STORAGE WITHOUT RE-RENDERING
// =============================================================================
// useRef stores a mutable value in `.current` that persists across renders.
// Changing `.current` does NOT trigger a re-render (unlike useState).
// Useful for timers, intervals, state trackers, flag checks.

export const TimerComponent = () => {
    const [seconds, setSeconds] = useState(0);
    const timerIdRef = useRef(null); // Keep track of the interval ID

    const startTimer = () => {
        if (timerIdRef.current !== null) return; // Prevent duplicate timers

        timerIdRef.current = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerIdRef.current !== null) {
            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
        }
    };

    // ALWAYS clean up timers on unmount to prevent memory leaks!
    useEffect(() => {
        return () => {
            if (timerIdRef.current !== null) {
                clearInterval(timerIdRef.current);
            }
        };
    }, []);

    return (
        <div>
            <p>Time: {seconds}s</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    );
};


// =============================================================================
// 2. DOM MANIPULATION (Accessing DOM nodes)
// =============================================================================
// Passing a ref to a React element's `ref` attribute assigns the underlying
// DOM node to `ref.current` once the component mounts.

export const AutoFocusInput = () => {
    const inputRef = useRef(null);

    const handleFocus = () => {
        // Access standard HTML DOM methods directly
        inputRef.current?.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="I will be focused..." />
            <button onClick={handleFocus}>Focus Input</button>
        </div>
    );
};


// =============================================================================
// 3. CAPTURING PREVIOUS STATE (Highly Common Interview Question!)
// =============================================================================
// Since ref updates are synchronous and don't trigger re-renders,
// we can use useEffect to capture a value right after a render commits.
// This allows us to access the "previous" value on the next render cycle.

export const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value; // Stored AFTER the component renders
    }, [value]);

    return ref.current; // Returns the value from the PREVIOUS render
};

// Usage Example:
// const [count, setCount] = useState(0);
// const prevCount = usePrevious(count);


// =============================================================================
// 4. ref FORWARDING & useImperativeHandle
// =============================================================================
// forwardRef allows parent components to pass refs down to child components.
// useImperativeHandle customizes the ref value exposed to the parent component.
// This enforces encapsulation (parent can only call specific exposed methods).

const CustomInput = forwardRef((props, ref) => {
    const localInputRef = useRef();

    // Limit what the parent component can do with this ref
    useImperativeHandle(ref, () => ({
        focusAndClear: () => {
            localInputRef.current.focus();
            localInputRef.current.value = '';
        },
        shake: () => {
            console.log('Shaking input element...');
        }
    }));

    return <input ref={localInputRef} type="text" {...props} />;
});

// Avoid lint errors
CustomInput.displayName = 'CustomInput';

export const ParentComponent = () => {
    const childRef = useRef();

    const triggerChild = () => {
        childRef.current?.focusAndClear();
        childRef.current?.shake();
    };

    return (
        <div>
            <CustomInput ref={childRef} placeholder="Type something..." />
            <button onClick={triggerChild}>Expose Child Functionality</button>
        </div>
    );
};
