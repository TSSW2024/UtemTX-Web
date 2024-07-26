import React from 'react';

const HistoryCard = ({ transaction }) => {
    const { transaction_date } = transaction;
    const date = new Date(transaction_date);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();


    return (
        <div className="flex flex-row justify-between items-start p-4 rounded-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200">
            <div className="flex flex-col flex-grow">
                <span className="text-sm font-semibold">{transaction.authorization_code}</span>
                <span className="text-xs">
                    Monto: {transaction.amount} | Tipo: {transaction.payment_type_code}
                </span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-xs">{formattedDate}</span>
                <span className="text-xs">{formattedTime}</span>
            </div>
        </div>
    );
};


const History = ({ transactions }) => {
    return (
        <div className="flex flex-col gap-4 flex flex-row justify-between p-4 rounded-lg bg-zinc-200 dark:bg-gray-800 dark:text-gray-200">
            <h2 className="text-lg font-semibold text-gray-500 dark:text-gray-200">Historial de transacciones</h2>
            <div className="flex flex-col gap-4">
                {transactions.map((transaction, index) => (
                    <HistoryCard key={index} transaction={transaction} />
                ))}
            </div>
        </div>
    );
};

export default History;