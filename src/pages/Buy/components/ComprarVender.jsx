import React, { useState } from 'react';
import CurrencyConverter from './CurrencyConverter.jsx';
import { useAuth } from '@context/AuthProvider.jsx';

const ComprarVender = () => {
    const { isAuthenticated } = useAuth();
    const auntenticado = isAuthenticated();
    const [mode, setMode] = useState('buy');

    const handleModeChange = (mode) => {
        setMode(mode);
    };

    return (
<div className="border-gray-300 dark:border-gray-700 border flex flex-col gap-4 rounded-2xl shadow-lg bg-light dark:bg-secondary-dark dark:text-gray-200 drop-shadow-lg ">
    <div className="flex flex-row mb-4 text-center relative  ">
        <div className={`absolute h-full w-[24px]  z-10 right-1/2 transform  rounded-lg ${mode === 'buy' ? 'dark:bg-secondary-dark bg-primary skew-x-[12deg]' : 'bg-light dark:bg-gray-600 skew-x-[-12deg]'}`}>
            {/* after */}
        </div>
        <div className={`absolute h-full w-[24px]  z-10 left-1/2 transform  rounded-lg ${mode === 'buy' ? 'dark:bg-gray-600 bg-light skew-x-[12deg]' : 'bg-primary dark:bg-secondary-dark skew-x-[-12deg]'}`}>
            {/* before */}
        </div>
        <div className="absolute h-full w-[48px]  left-1/2 transform -translate-x-1/2 flex flex-col">
            <div className={`h-1/2 ${mode === 'buy' ? 'bg-light dark:bg-gray-600' : ''}`}></div>
            <div className={`h-1/2 ${mode === 'buy' ? 'bg-primary dark:bg-secondary-dark' : 'dark:bg-secondary-dark bg-primary'}`}></div>
        </div>
        <div
            onClick={() => handleModeChange('buy')}
            className={` flex items-center justify-center flex-grow h-14 hover:cursor-pointer rounded-l-2xl text-2xl ${mode === 'buy' ? 'bg-primary dark:bg-secondary-dark' : ' dark:bg-gray-600'
                }`}
        >
            Comprar
        </div>
        <div
            onClick={() => handleModeChange('sell')}
            className={` flex items-center justify-center flex-grow h-14 hover:cursor-pointer rounded-r-2xl text-2xl ${mode === 'sell' ? 'bg-primary dark:bg-secondary-dark' : ' dark:bg-gray-600'
                }`}
        >
            Vender
        </div>
    </div>
    <CurrencyConverter mode={mode} isLogged={auntenticado} />
</div>
    );
};

export default ComprarVender;