import React, { useState } from 'react';
import { stringToPrice } from '@utils/helpers';
import PieChartComponent from './PieChart';

const DataTable = ({ data }) => {
    return (
        <table className="table-auto border-collapse border border-gray-400">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-4 py-2">Nombre</th>
                    <th className="border border-gray-300 px-4 py-2">Valor</th>
                    <th className="border border-gray-300 px-4 py-2">Porcentaje</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry, index) => (
                    <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">{entry.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{entry.value}</td>
                        <td className="border border-gray-300 px-4 py-2">{`${((entry.value / data.reduce((acc, item) => acc + item.value, 0)) * 100).toFixed(2)}%`}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

// TODO: Parsear la plata que está en numeros como CLP
const Wallet = ({ saldoTotal, chartData }) => {
    const [showBalance, setShowBalance] = useState(true);

    // Manejar el cambio para mostrar/ocultar el balance
    const toggleShowBalance = () => {
        setShowBalance(!showBalance);
    };



    return (
        <div className="flex flex-row p-4 rounded-2xl shadow-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200 drop-shadow-lg relative z-10 justify-between">
            <div className="flex flex-col w-64">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-4">
                        <span className="text-lg font-semibold text-gray-500 dark:text-gray-200">
                            Saldo Total
                        </span>
                        <button
                            onClick={toggleShowBalance}
                            className="text-sm text-gray-500 dark:text-gray-400 focus:outline-none"
                        >
                            {showBalance ? (
                                <i className="fas fa-eye-slash text-amber-800 dark:text-amber-600"></i>
                            ) : (
                                <i className="fas fa-eye"></i>
                            )}
                        </button>
                    </div>

                </div>

                <div className="mt-4 text-gray-700 dark:text-white">
                    <span className="text-2xl font-semibold">
                        {showBalance ? (
                            stringToPrice(saldoTotal, true) || '0'
                        ) : (
                            '******'
                        )}
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-start">
                <PieChartComponent data={chartData} />
                <DataTable data={chartData} />
            </div>

        </div>
    );
};

export default Wallet;

