import {useRef, useEffect, useMemo, useState} from 'react';
import {debounce} from 'lodash'; // or your preferred debounce utility

import React, {useState, useEffect} from 'react';

// 1. Custom Debounce Hook
function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set a timer to update debouncedValue after the specified delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cancel the timer if 'value' or 'delay' changes (clears previous stroke)
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

// 2. Usage in a React Component
export default function DebounceSearchInput() {
    const [searchTerm, setSearchTerm] = useState('');

    // Get debounced value (updates 500ms after user stops typing)
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // 3. Trigger API call or heavy operation when debounced value updates
    useEffect(() => {
        if (debouncedSearchTerm) {
            console.log(`📡 Fetching API results for: "${debouncedSearchTerm}"`);
            // fetch(`https://api.example.com/search?q=${debouncedSearchTerm}`)
        }
    }, [debouncedSearchTerm]);

    return (
        <div style={{padding: '20px', fontFamily: 'sans-serif'}}>
            <h3>Debounced Search</h3>
            <input
                type="text"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{padding: '8px', width: '250px'}}
            />

            <div style={{marginTop: '15px'}}>
                <p>
                    <strong>Immediate input state:</strong> {searchTerm}
                </p>
                <p>
                    <strong>Debounced value (API Trigger):</strong> {debouncedSearchTerm}
                </p>
            </div>
        </div>
    );
}

const useDebounce = (callback, delay = 1000) => {
    const ref = useRef(callback);

    // Sync the ref with the latest callback on every render
    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    // Create the debounced function once and keep it stable
    const debouncedCallback = useMemo(() => {
        const func = (...args) => {
            ref.current?.(...args);
        };

        return debounce(func, delay);
    }, [delay]); // Only re-create if the delay duration changes

    // Cancel pending execution on unmount
    useEffect(() => {
        return () => {
            debouncedCallback.cancel();
        };
    }, [debouncedCallback]);

    return debouncedCallback;
};

const Input = () => {
    const [value, setValue] = useState('');

    const sendRequest = () => {
        // This will always have the latest 'value' because
        // the hook updates the ref whenever this function is redefined
        console.log('Sending request with:', value);
    };

    // The hook returns a stable function that won't change between renders
    const debouncedSendRequest = useDebounce(sendRequest, 1000);

    const onChange = e => {
        const newValue = e.target.value;
        setValue(newValue);

        // Trigger the debounced version
        debouncedSendRequest();
    };

    return <input type="text" value={value} onChange={onChange} placeholder="Type to search..." />;
};
