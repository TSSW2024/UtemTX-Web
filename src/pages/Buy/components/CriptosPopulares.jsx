import React from 'react';
import PorcentajeSpan from '@components/PorcentajeSpan.jsx';
import { Link, useNavigate } from 'react-router-dom';

const CriptosPopulares = ({ criptos, isLogged }) => {
    const navigate = useNavigate();

    const handleBuyClick = (imagen, name) => {
        // Aquí puedes implementar la lógica para comprar la criptomoneda
        if (isLogged != false) {
            alert(`¡Compra exitosa!${imagen} ${name}`);
            // Aquí podrías añadir más acciones después de la compra, como actualizar datos, etc.
        } else {
            navigate('/login');

        }
    };

    return (
        <div className="border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 p-4 flex flex-col gap-2">
            <h2 className="font-bold text-xl mb-4">Criptos populares</h2>
            {criptos.map((cripto, index) => (
                <div key={index} className="flex flex-row items-center justify-between gap-4 p-4 border border-gray-300 dark:border-gray-700 rounded-2xl hover:bg-zinc-300 dark:hover:bg-gray-700">
                    <Link to={`/market/${cripto.name}USDT`} className="flex flex-row items-center justify-between gap-4 w-full">
                        <img
                            className="w-12 h-12 rounded-full shadow-lg"
                            src={cripto.image}
                            alt={`${cripto.name} logo`}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/utemtrades.svg';
                            }}
                        />
                        <div className="flex-1 flex justify-between items-center">
                            <div className="font-medium">
                                {cripto.name}
                            </div>
                            <div className="text-right flex ml-4 font-bold">
                                {cripto.price}
                            </div>
                            {/* Aseguramos que el cambio de 24h es un número antes de pasarlo a PorcentajeSpan */}
                            <PorcentajeSpan porcentaje={parseFloat(cripto.change_24h)} />
                        </div>
                    </Link>
                    <button
                        className="bg-orange-500 dark:bg-primary dark:text-secondary rounded-xl px-4 py-2 font-semibold hover:bg-orange-600 dark:hover:bg-primary-dark"
                        onClick={() => handleBuyClick(cripto.image, cripto.name)}
                    >
                        Añadir
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CriptosPopulares;
