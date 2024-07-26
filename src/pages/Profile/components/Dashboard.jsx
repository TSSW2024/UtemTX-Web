import React, { useState, useEffect } from "react";
import Wallet from "./Wallet.jsx";
import ProfileResume from "./ProfileResume.jsx";
import History from "./History.jsx";


import { useMonedero } from "@hooks/useMonedero";
import { useCryptoConversion } from "@hooks/useCryptoConversion";

const Dashboard = ({ user }) => {
    const userId = user.uid;
    const { monedero, isLoading, error } = useMonedero(userId);
    const { convertCryptoToCLP } = useCryptoConversion();

    const [saldoTotal, setSaldoTotal] = useState('0');
    const [dataMap, setDataMap] = useState({});
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        var response = fetch('https://backend-transaccion.tssw.cl/log/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(data => {
                console.log('Lista de transacciones:', data);
                setTransactions(data);
            }).catch((error) => {
                console.error('Error:', error);
            });
    }, [userId]);

    useEffect(() => {
        const calculateSaldoTotal = async () => {
            if (monedero && monedero.monedas) {
                try {
                    const conversionPromises = monedero.monedas.map(async (moneda) => {
                        const valorEnCLP = await convertCryptoToCLP(moneda.nombre, moneda.cantidad);
                        return valorEnCLP;
                    });

                    const valoresEnCLP = await Promise.all(conversionPromises);
                    const total = valoresEnCLP.reduce((acc, valor) => acc + valor, 0);
                    setSaldoTotal(total.toFixed(2));
                } catch (error) {
                    console.error('Error al calcular el saldo total:', error);
                }
            }
        };

        const fetchDataMap = async () => {
            if (monedero && monedero.monedas) {
                const newDataMap = {};
                for (const moneda of monedero.monedas) {
                    try {
                        const valorEnCLP = await convertCryptoToCLP(
                            moneda.nombre, moneda.cantidad
                        );
                        newDataMap[moneda.nombre] = valorEnCLP;
                    } catch (e) {
                        console.error(`Error al convertir ${moneda.nombre} a CLP: ${e}`);
                    }
                }
                setDataMap(newDataMap);
            }
        };

        calculateSaldoTotal();
        fetchDataMap();
    }, [monedero]);

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    // Convertir `dataMap` a un formato adecuado para `PieChart`
    const chartData = Object.entries(dataMap).map(([name, value]) => ({
        name,
        value
    }));

    return (
        <div className="p-4 flex flex-col gap-6 flex-grow max-w-screen-xl mx-auto">
            <ProfileResume user={user} />
            <Wallet saldoTotal={saldoTotal} chartData={chartData} />
            <History transactions={transactions} />
        </div>
    );
};

export default Dashboard;

