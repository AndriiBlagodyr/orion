import {useRef, useEffect, useMemo} from 'react';
import {debounce} from 'lodash'; // or your preferred debounce utility

const useDebounce = (callback, delay = 1000) => {
    const ref = useRef(callback);

    // Sync the ref with the latest callback on every render
    useEffect(() => {
        ref.current = callback;
    }, [callback]);

    // Create the debounced function once and keep it stable
    const debouncedCallback = useMemo(() => {
        const func = () => {
            ref.current?.();
        };

        return debounce(func, delay);
    }, [delay]); // Only re-create if the delay duration changes

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

// Without a hook!
// const Input = () => {
//     const [value, setValue] = useState();

//     const sendRequest = () => {
//         // send request to the backend here
//         // value is coming from state
//         console.log(value);
//     };

//     // creating ref and initializing it with the sendRequest function
//     const ref = useRef(sendRequest);

//     useEffect(() => {
//         // updating ref when state changes
//         // now, ref.current will have the latest sendRequest with
//         // access to the latest state
//         ref.current = sendRequest;
//     }, [value]);

//     // creating debounced callback only once - on mount
//     const debouncedCallback = useMemo(() => {
//         // func will be created only once - on mount
//         const func = () => {
//             // ref is mutable! ref.current is a reference to the latest sendRequest
//             ref.current?.();
//         };

//         // debounce the func that was created once, but has access to
//         // the latest sendRequest
//         return debounce(func, 1000);
//         // no dependencies! never gets updated
//     }, []);

//     const onChange = e => {
//         const value = e.target.value;
//         setValue(value);

//         // calling the debounced function
//         debouncedCallback();
//     };
// };

// export default Input;
