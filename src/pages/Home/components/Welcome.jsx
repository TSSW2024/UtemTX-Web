import React from 'react';

const Welcome = () => {
    return (
        <div className="flex flex-col w-full md:w-5/12 p-8">
            <h1 className="text-4xl md:text-7xl font-bold mb-8">Compra <span className="dark:text-primary text-primary-light">Bitcoin</span> fácil y seguro</h1>
            <div className="flex flex-row items-center">
                <input
                    type="email" placeholder="Ingresa tu correo electrónico"
                    className="w-full sm:w-auto flex-grow p-2 rounded-lg border border-gray-400 dark:border-gray-600 active:outline-none focus:outline-none bg-transparent" />
                <button className="bg-primary-light dark:bg-primary text-black p-2 rounded-lg font-bold ml-2">Continuar</button>
            </div>
            <div className="flex flex-col sm:flex-row items-center mt-8 md:mt-[12rem] gap-8 cursor-default">
                <div className="flex flex-row items-center justify-between w-full sm:w-auto">
                    <div className="flex flex-col mt-4">
                        <span className="text-sm text-gray-500">
                            O <span className='text-primary-light dark:text-primary'> regístrate con </span>
                        </span>
                        <div className="flex gap-2 mt-2">
                            <button className="bg-light dark:bg-secondary text-black p-2 rounded-lg font-bold border border-gray-300 dark:border-gray-700 hover:bg-light-dark hover:dark:bg-secondary-dark">
                                <img src="/google.svg" alt="Google" className="w-8" />
                            </button>
                            <button className="bg-light dark:bg-secondary text-black p-2 rounded-lg font-bold border border-gray-300 dark:border-gray-700 hover:bg-light-dark hover:dark:bg-secondary-dark">
                                <img src="/github.svg" alt="Github" className="w-8" />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-4 ml-8"> 
                        <span className="text-sm text-gray-500 text-primary-light dark:text-primary">
                            Descargar aplicación
                        </span>
                        <div className="flex gap-2 mt-2 justify-center"> 
                            <button className="bg-light dark:bg-secondary text-black p-2 rounded-lg font-bold border border-gray-300 dark:border-gray-700 hover:bg-light-dark hover:dark:bg-secondary-dark">
                                <img src="/utemtrades.svg" alt="Utem Trades" className="w-8" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
