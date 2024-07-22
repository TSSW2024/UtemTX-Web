import React, { useState } from 'react';
import { useAuth } from '../../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

const HomeAuth = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-dark">
            <div className="flex-grow flex flex-col items-center justify-center gap-8 p-4 sm:p-8">
                <div className="p-4 sm:p-8 flex flex-col gap-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-4xl">
                    <div className="flex flex-col items-center gap-4">
                        <img src={user.photoURL} alt="Foto de perfil" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-primary-light dark:border-primary" />
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 text-center">Bienvenido, {user.displayName}</h1>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 text-center">¿Qué deseas hacer hoy?</p>
                    <div className="flex flex-col sm:flex-row gap-8 justify-around w-full">
                        <div className="flex flex-col items-center gap-4 w-full sm:w-1/2 cursor-pointer" onClick={() => navigate('/market')}>
                            <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-inner w-full">
                                <img src="/mercados_light.jpg" alt="Vista previa del mercado" className="w-full h-40 rounded-lg mb-2 dark:hidden object-cover" />
                                <img src="/mercados_dark.jpg" alt="Vista previa del mercado oscuro" className="w-full h-40 rounded-lg mb-2 hidden dark:block object-cover" />
                                <p className="text-gray-700 dark:text-gray-300">Explora el mercado para comprar y vender cripto.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4 w-full sm:w-1/2 cursor-pointer" onClick={() => navigate('/buy')}>
                            <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-inner w-full">
                                <img src="/comprarcripto_light.jpg" alt="Vista previa de comprar cripto" className="w-full h-40 rounded-lg mb-2 dark:hidden object-cover" />
                                <img src="/comprarcripto_dark.jpg" alt="Vista previa de comprar cripto oscuro" className="w-full h-40 rounded-lg mb-2 hidden dark:block object-cover" />
                                <p className="text-gray-700 dark:text-gray-300">Compra criptomonedas de forma segura y sencilla.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeAuth;
