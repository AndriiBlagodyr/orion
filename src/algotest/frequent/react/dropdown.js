import React, {useState, useRef, useEffect} from 'react';

const options = [
    {label: 'Option 1', value: 'opt1'},
    {label: 'Option 2', value: 'opt2'},
    {label: 'Option 3', value: 'opt3'},
];

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = event => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleSelect = option => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} style={{position: 'relative', width: '200px'}}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                style={{
                    width: '100%',
                    padding: '10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                }}
            >
                {selectedOption ? selectedOption.label : 'Select an option...'}
                <span style={{float: 'right'}}>{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <ul
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        width: '100%',
                        margin: '4px 0 0 0',
                        padding: '0',
                        listStyle: 'none',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        zIndex: 10,
                    }}
                >
                    {options.map(option => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                backgroundColor: selectedOption?.value === option.value ? '#f0f0f0' : '#fff',
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
