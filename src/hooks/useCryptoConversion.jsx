import { useState, useEffect } from 'react';

const binanceBaseUrl = 'https://api.binance.com';
const exchangeRateApiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

// Hook para la conversión de criptomonedas
export function useCryptoConversion() {
    const [error, setError] = useState(null);

    const getCryptoPrice = async (symbol) => {
        try {
            const response = await fetch(`${binanceBaseUrl}/api/v3/ticker/price?symbol=${symbol}`);
            if (response.ok) {
                const data = await response.json();
                return parseFloat(data.price);
            } else {
                throw new Error(`Error al obtener el precio de ${symbol}`);
            }
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const getUSDTToCLPRate = async () => {
        try {
            const response = await fetch(exchangeRateApiUrl);
            if (response.ok) {
                const data = await response.json();
                return data.rates.CLP;
            } else {
                throw new Error('Error al obtener la tasa de cambio USDT a CLP');
            }
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const convertCryptoToCLP = async (symbol, amount) => {
        try {
            const cryptoPriceInUSDT = await getCryptoPrice(symbol);
            const usdtToClpRate = await getUSDTToCLPRate();

            const amountInUSDT = cryptoPriceInUSDT * amount;
            const amountInCLP = amountInUSDT * usdtToClpRate;

            return amountInCLP;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const convertCLPToCrypto = async (symbol, amount) => {
        try {
            const usdtToClpRate = await getUSDTToCLPRate();
            const cryptoPriceInUSDT = await getCryptoPrice(symbol);

            const amountInUSDT = amount / usdtToClpRate;
            const amountInCrypto = amountInUSDT / cryptoPriceInUSDT;

            return amountInCrypto;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    return {
        convertCryptoToCLP,
        convertCLPToCrypto,
        error
    };
}
