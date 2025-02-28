import React, { useState, useRef, useEffect } from 'react';

const DropdownSearch = ({ options, selectedOption, onSelect, disabled = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [inputValue, setInputValue] = useState('');
    const ref = useRef(null);

    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen((prev) => !prev);
        }
    };

    const handleInput = (e) => {
        const value = e.target.value.toLowerCase();
        setInputValue(value);

        const filtered = options.filter(option =>
            option.name.toLowerCase().includes(value) ||
            option.name.toLowerCase().includes(value)
        );
        setFilteredOptions(filtered);
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleOptionClick = (option) => {
        setIsOpen(false);
        setInputValue('');
        onSelect(option.name);
    };

    const selectedOptionData = options.find(option => option.name === selectedOption);

    return (
        <div className="relative z-1">
            <div className="relative">
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className={`flex items-center gap-2 cursor-pointer ${disabled ? 'pointer-events-none opacity-50' : ''}`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    disabled={disabled}
                >
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600">
                        <img
                            src={selectedOptionData ? selectedOptionData.photoURL : '/utemtrades.svg'}
                            alt={selectedOptionData ? selectedOptionData.name : 'Selected Option'}
                            className="h-full w-full rounded-full object-cover"
                            onError={
                                (e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/utemtrades.svg';
                                }
                            }
                        />
                    </div>
                    <span >{selectedOption}</span>
                </button>
            </div>
            {isOpen && !disabled && (
                <div
                    ref={ref}
                    className="absolute z-1 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                    role="listbox"
                >
                    <input
                        type="text"
                        className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-transparent text-sm font-bold"
                        value={inputValue}
                        onChange={handleInput}
                        placeholder="Buscar..."
                        aria-label="Buscar"
                    />
                    <ul className="w-40">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.name}
                                className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 gap-4 ${option.name === selectedOption ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                                onClick={() => handleOptionClick(option)}
                                role="option"
                                aria-selected={option.name === selectedOption}
                            >
                                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600">
                                    <img
                                        src={option.photoURL}
                                        alt={option.name}
                                        className="h-full w-full rounded-full object-cover"
                                        onError={
                                            (e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/utemtrades.svg';
                                            }
                                        }
                                    />
                                </div>
                                <span>{option.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownSearch;
