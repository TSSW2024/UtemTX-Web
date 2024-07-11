import React, { useState, useEffect } from 'react';
import CriptosPopulares from './components/CriptosPopulares.jsx';
import ComprarVender from './components/ComprarVender.jsx';
import Loading from '@components/Loading'; // Asegúrate de importar Loading si no está ya importado

const BuyPage = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://backend-market.tssw.cl/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCryptoData(data.Populares); // Asegúrate de que Populares sea el nombre correcto
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="w-full flex flex-grow flex-col sm:flex-row gap-20 justify-between mx-auto max-w-screen-xl">
            <div className="mt-10 flex flex-col flex-wrap gap-8 w-full sm:w-3/6 px-4 py-2">
                <h1 className="text-6xl font-bold">
                    Comprar cripto
                </h1>
                {loading ? (
                    <Loading text="Cargando datos..." />
                ) : (
                    <CriptosPopulares criptos={cryptoData} />
                )}
            </div>

            <div className="mt-10 w-full sm:w-3/6 px-4 py-2">
                <ComprarVender />
            </div>
        </div>
    );
};

export default BuyPage;
