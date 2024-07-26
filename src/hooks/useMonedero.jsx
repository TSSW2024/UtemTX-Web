import { useState, useEffect } from 'react';

// Define la base URL
const baseUrl = 'https://backend-transaccion.tssw.cl/';

// Hook para obtener y manejar el monedero
export function useMonedero(userId) {
    const [monedero, setMonedero] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (userId) {
            console.log('Fetching monedero...');
            const fetchMonedero = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`${baseUrl}wallet/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setMonedero(data);
                    } else {
                        throw new Error('Error al obtener monedero');
                    }
                } catch (err) {
                    setError(err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchMonedero();
        }
    }, [userId]);

    const createOrUpdateMonedero = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}wallet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuarioID: userId }),
            });

            if (response.ok) {
                const data = await response.json();
                setMonedero(data);
            } else {
                throw new Error('Error al crear o actualizar monedero');
            }
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const addMoneda = async (moneda) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}wallet/moneda`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, moneda }),
            });

            if (response.ok) {
                await fetchMonedero(); // Refetch monedero to update state
            } else {
                throw new Error('Error al agregar moneda');
            }
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        monedero,
        isLoading,
        error,
        createOrUpdateMonedero,
        addMoneda,
    };
}