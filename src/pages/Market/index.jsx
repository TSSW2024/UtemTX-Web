import React, { useState, useEffect } from 'react';
import CryptoSearch from './components/CryptoSearch';
import MarketPrices from './components/MarketPrices';
import MarketSummary from './components/MarketSummary';
import Loading from '@components/Loading'; // Asegúrate de importar Loading si no está ya importado
import { useNavigate } from 'react-router-dom';

const Market = () => {
    const [cryptoData, setCryptoData] = useState({
        Populares: [],
        Ganadores: [],
        Perdedores: [],
        MayorVolumen: []
    });
    const [currentCategory, setCurrentCategory] = useState('Ganadores');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async (category) => {
        try {
            const response = await fetch(`http://localhost:8080/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCryptoData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentCategory);
        const interval = setInterval(() => {
            fetchData(currentCategory);
        }, 2500);

        return () => clearInterval(interval);
    }, [currentCategory]);

    const handleClick = (category) => {
        setCurrentCategory(category);
    };

    const handleListClick = (name) => {
        navigate(`/market/${name}USDT`);
    };

    return (
            <div className="flex flex-col flex-grow text-2xl sm:text-4xl items-center gap-8 mb-4 px-4 pb-4">
                <div className="flex justify-center items-center w-full mt-4"> {/* Contenedor ajustado para flex */}
                    <h1 className="font-bold">Explora las Criptomonedas</h1>
                    <img
                        src="/gift_svgrepo.com.svg"
                        alt="coin"
                        className="h-fit w-8 md:w-16 ml-4 cursor-pointer" // Ajustado para eliminar posición absoluta y agregar margen
                    />
                </div>
                <CryptoSearch />
                <div className="text-base w-full flex-grow flex flex-col sm:flex-row flex-wrap p-4 justify-between">
                    {loading ? (
                        <Loading text="Cargando datos..." />
                    ) : (
                        <>
                            <div className="w-full sm:w-2/3">
                                <MarketPrices
                                    cryptoData={cryptoData}
                                    currentCategory={currentCategory}
                                    handleClick={handleClick}
                                    handleListClick={handleListClick}
                                />
                            </div>
                            <div className="w-full sm:w-1/3">
                                <MarketSummary cryptoData={cryptoData} handleListClick={handleListClick} />
                            </div>
                        </>
                    )}
                </div>
            </div>
    );
};

export default Market;
