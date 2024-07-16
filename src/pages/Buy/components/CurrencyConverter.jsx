import React, { useState, useEffect } from 'react';
import DropdownSearch from '@components/DropdownSearch';
import criptosMockup from '@mockups/criptos';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';

const CurrencyConverter = ({ mode, isLogged = false }) => {
    const navigate = useNavigate();
    const { criptos, divisas } = criptosMockup;
    const { user } = useAuth();

    const fromOptions = mode === 'buy' ? divisas : criptos;
    const toOptions = mode === 'buy' ? criptos : divisas;

    const [fromCurrency, setFromCurrency] = useState(fromOptions[0].symbol);
    const [toCurrency, setToCurrency] = useState(toOptions[0].symbol);
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [inputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        setFromCurrency(fromOptions[0].symbol);
        setToCurrency(toOptions[0].symbol);
    }, [mode]);

    useEffect(() => {
        if (amount && fromCurrency && toCurrency) {
            convertCurrency();
        }
    }, [amount, fromCurrency, toCurrency]);

    const convertCurrency = async () => {
        if (!amount) return;

        const apiUrl = 'https://api-convertir.tssw.cl/convert';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    from: fromCurrency,
                    to: toCurrency,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error en la respuesta de la API:', errorResponse);
                throw new Error(`Error: ${errorResponse.message || response.statusText}`);
            }

            const data = await response.json();
            setConvertedAmount(data.result.toFixed(8).slice(0, 16));
        } catch (error) {
            console.error('Error al obtener la conversión:', error);
        }
    };

    const webPay = async (monto) => {
        const apiUrl = 'https://backend-webpay.tssw.cl/save-transaction'; // Asegúrate de que la URL es correcta

        if (!user) {
            console.error('Usuario no autenticado');
            return;
        }

        const payload = {
            orden_id: '123456', // Aquí deberías enviar un ID único para la orden
            session_id: user.uid, // Aquí deberías enviar el ID de la sesión del usuario
            monto: parseFloat(monto),
            url_retorno: "https://backend-webpay.tssw.cl/commit", // URL de retorno
        };

        console.log('Datos enviados a WebPay:', payload);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const responseText = await response.text();
            console.log('Respuesta de la API:', responseText);

            // Intenta analizar la respuesta como JSON
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Error al analizar la respuesta de la API como JSON:', parseError);
                throw new Error('Respuesta de la API no es un JSON válido');
            }

            if (!response.ok) {
                console.error('Error en la respuesta de la API:', data);
                throw new Error(`Error: ${data.message || response.statusText}`);
            }

            console.log('Resultado de WebPay:', data);
            window.location.href = 'https://backend-webpay.tssw.cl/';
            // Aquí podrías manejar el resultado de la conversión
        } catch (error) {
            console.error('Error en WebPay:', error);
        }
    };
    const tooltipContent = () => {
        if (convertedAmount === '' || amount === '') return;

        return (
            <div className='dark:text-gray-300 text-gray-700 text-lg'>
                <div className="flex flex-grow justify-between">
                    <span className="font-bold">Gastar:</span>
                    <span className="ml-2">{amount} {fromCurrency}</span>
                </div>
                <div className="flex flex-grow justify-between gap-8">
                    <span className="font-bold">Recibir:</span>
                    <span className="ml-2">{convertedAmount} {toCurrency}</span>
                </div>
            </div>
        );
    };

    const handleAmountChange = async (e) => {
        const inputVal = e.target.value;
        if (/^\d*\.?\d{0,8}$/.test(inputVal)) {
            setAmount(inputVal);
            // Llamar a convertCurrency() cada vez que el usuario ingrese un nuevo número
            await convertCurrency();
        }
    };

    const handleClick = async () => {
        if (isLogged) {
            try {
                await webPay(amount);
                alert(`¡${mode === 'buy' ? 'Compra' : 'Venta'} exitosa!`);
            } catch (error) {
                console.error('Error en WebPay:', error);
                alert('Hubo un problema con la transacción. Inténtalo de nuevo.');
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="p-4 flex flex-col gap-4 text-xl">
            <div className={`mb-4 relative flex flex-row items-center gap-4 border border-gray-300 dark:border-gray-700 p-4 rounded-2xl z-10 ${inputFocused ? 'outline outline-primary-light dark:outline-primary ' : ''} dark:hover:outline-primary hover:outline hover:outline-primary-light`}>
                <label className={`absolute top-0 left-0 -mt-2 ml-2 bg-zinc-200 dark:bg-gray-800 px-2 text-xs  ${inputFocused ? 'text-primary-light dark:text-primary' : 'text-gray-700 dark:text-gray-300'}`}>
                    Gastar
                </label>
                <input
                    type="text"
                    className="mt-2 w-full px-4 py-2 border-none rounded-lg text-2xl font-bold focus:outline-none"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Ingresa un monto"
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                />
                <DropdownSearch
                    options={fromOptions}
                    selectedOption={fromCurrency}
                    onSelect={(option) => setFromCurrency(option)}
                />
            </div>
            <div className="mb-4 relative flex flex-row items-center gap-4 border border-gray-300 dark:border-gray-700 p-4 rounded-2xl">
                <label className="absolute top-0 left-0 -mt-2 ml-2 bg-zinc-200 dark:bg-gray-800 px-2 text-xs text-gray-700 dark:text-gray-300 ">
                    Recibir
                    <i className='fa fa-info-circle text-gray-400 dark:text-gray-500 ml-2 my-anchor-element '> </i>
                    <Tooltip
                        anchorSelect=".my-anchor-element"
                        place="top" clickable
                        style={{ zIndex: 999, backgroundColor: 'rgb(17 24 39)' }}
                    >
                        {tooltipContent()}
                    </Tooltip>
                </label>
                <input
                    type="text"
                    className="mt-2 w-full px-4 py-2 border-none rounded-lg text-2xl font-bold"
                    value={amount.length === 0 ? '' : convertedAmount.toString()}
                    readOnly
                    placeholder="0.0"
                />

                <DropdownSearch
                    options={toOptions}
                    selectedOption={toCurrency}
                    onSelect={(option) => setToCurrency(option)}
                />
            </div>
            <button
                className="bg-primary dark:bg-primary-dark dark:text-secondary rounded-xl px-4 py-2 font-semibold hover:bg-primary-lighthover dark:hover:bg-primary-dark"
                onClick={handleClick}
            >
                {
                    isLogged ?
                        mode === 'buy' ? 'Comprar' : 'Vender'
                        : 'Iniciar sesión/Registrarse '
                }
            </button>
        </div>
    );
};

export default CurrencyConverter;
