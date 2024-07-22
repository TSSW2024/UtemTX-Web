import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const LootBox = () => {
  const [data, setData] = useState([]);
  const [uniqueData, setUniqueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSimulation, setIsSimulation] = useState(false);
  const [showList, setShowList] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const carouselRef = useRef(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const boxImages = {
    caja1: "/Caja1.svg",
    caja2: "/Caja2.svg",
  };

  const boxCosts = {
    caja1: 55000,
    caja2: 100000,
  };

  useEffect(() => {
    if (selectedBox) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api-loot.tssw.cl/${selectedBox}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          let data = await response.json();
          data = data.sort((a, b) => a.Probabilidad - b.Probabilidad);
          setData([...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data, ...data]);
          setUniqueData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [selectedBox]);

  const getRandomItem = () => {
    const totalProbability = uniqueData.reduce((acc, item) => acc + item.Probabilidad, 0);
    const random = Math.random() * totalProbability;

    let cumulativeProbability = 0;
    for (const item of uniqueData) {
      cumulativeProbability += item.Probabilidad;
      if (random < cumulativeProbability) {
        return item;
      }
    }
    return uniqueData[0];
  };

  const openLootBox = () => {
    if (!isSimulation) {
      if (!user) {
        alert('Debes estar logueado para abrir la caja.');
        navigate('/login');
        return;
      }
    }

    if (uniqueData.length === 0 || spinning) return;

    setSpinning(true);
    setShowConfirmation(false);
    setTimeout(() => {
      const item = getRandomItem();
      setSelectedItem(item);
      setSpinning(false);
    }, 5000);
  };

  const handleOpenClick = (isSimulation = false) => {
    setIsSimulation(isSimulation);
    setShowConfirmation(true);
  };

  const resetSelection = () => {
    setSelectedBox(null);
    setData([]);
    setUniqueData([]);
    setSelectedItem(null);
    setError(null);
    setShowConfirmation(false);
  };

  const getColorClass = (index) => {
    if (index < 2) return 'bg-orange-500';
    if (index < 4) return 'bg-purple-500';
    if (index < 6) return 'bg-blue-500';
    if (index < 8) return 'bg-green-500';
    return 'bg-gray-500';
  };

  const formatGanancia = (ganancia) => {
    return parseFloat(ganancia).toFixed(7);
  };

  const getConfirmationMessage = () => {
    if (isSimulation) {
      return 'Esta es una simulación, no presentará ganancia alguna. ¿Quieres simular la apertura de la caja?';
    }
    return `¿Quieres abrir esta caja por $${boxCosts[selectedBox]}?`;
  };

  return (
    <div className="text-center min-h-screen relative pb-32" style={{ marginTop: '20px' }}>
      <div className="relative">
        {!selectedBox ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold mb-4">Elige una Caja de Botín</h1>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <img
                    src="/Caja1.svg"
                    alt="Caja 1"
                    className="cursor-pointer w-60 h-60 object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
                    onClick={() => setSelectedBox('caja1')}
                  />
                  <p className="text-2xl font-bold mb-1">Caja Básica</p>
                  <p className="text-2xl text-blue-800 dark:text-yellow-500">Valor: ${boxCosts.caja1.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <img
                    src="/Caja2.svg"
                    alt="Caja 2"
                    className="cursor-pointer w-60 h-60 object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
                    onClick={() => setSelectedBox('caja2')}
                  />
                  <p className="text-2xl font-bold mb-1">Caja Premium</p>
                  <p className="text-2xl text-blue-800 dark:text-yellow-500">Valor: ${boxCosts.caja2.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={resetSelection}
              className="px-4 py-2 mb-4 bg-primary-light dark:bg-secondary text-white rounded shadow hover:bg-gray-600 dark:hover:bg-secondary-hover block absolute top-4 left-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a elegir caja
            </button>

            {loading ? (
              <p className="text-center">Cargando...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error cargando datos: {error.message}</p>
            ) : (
              <div>
                <h1 className="text-2xl font-bold mb-4">Caja {selectedBox === 'caja1' ? 'Básica' : 'Premium'}</h1>

                <div className="flex flex-col items-center space-y-4">
                  {!spinning && (
                    <>
                      <img
                        src={boxImages[selectedBox]}
                        alt={`Caja ${selectedBox === 'caja1' ? '1' : '2'}`}
                        className="cursor-pointer w-60 h-60 object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
                        onClick={() => handleOpenClick(false)}
                      />
                      <button
                        onClick={() => handleOpenClick(true)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
                      >
                        Simular Apertura
                      </button>
                    </>
                  )}
                </div>

                {spinning && (
                  <div className="relative mt-8 overflow-hidden w-full h-40">
                    <div
                      className={`flex absolute whitespace-nowrap ${spinning ? 'animate-carrusel-spin' : ''}`}
                      ref={carouselRef}
                    >
                      {data.map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-32 mx-2">
                          <div className="w-full h-32 relative">
                            <img src={item.Icono} alt={item.Nombre} className="w-full h-full object-cover rounded-xl mx-auto my-auto" />
                          </div>
                          <p className="text-sm mt-2">{item.Nombre}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {!spinning && selectedItem && (
                  <div className="mt-4 p-4 text-black dark:text-white animate-fade-in">
                    <h2 className="text-xl font-bold mb-2">¡Ganaste {selectedItem.Nombre}!</h2>
                    <img
                      src={selectedItem.Icono}
                      alt={selectedItem.Nombre}
                      className="w-32 mx-auto my-2 rounded-full"
                    />
                    <p>Ganancia: {formatGanancia(selectedItem.Ganancia)}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {selectedBox && uniqueData.length > 0 && (
          <button
            onClick={() => setShowList(!showList)}
            className="absolute top-4 right-4 bg-primary-light dark:bg-secondary text-white p-3 rounded-full shadow-lg hover:bg-gray-600 dark:hover:bg-secondary-hover transition"
          >
            {showList ? 'Ocultar Lista' : 'Mostrar Lista'}
          </button>
        )}

        {selectedBox && uniqueData.length > 0 && (
          <div className={`fixed bottom-0 left-0 w-full bg-white dark:bg-secondary text-black dark:text-white p-4 transition-transform duration-300 ${showList ? 'transform translate-y-0' : 'transform translate-y-full'}`}>
            <h2 className="text-xl font-bold mb-2">Esta Caja contiene:</h2>
            <div className="flex justify-around">
              <div className="text-left">
                <p className="bg-orange-500 text-white p-2 rounded mb-1">Legendarias</p>
                <p className="bg-purple-500 text-white p-2 rounded mb-1">UltraRaras</p>
                <p className="bg-blue-500 text-white p-2 rounded mb-1">Raras</p>
                <p className="bg-green-500 text-white p-2 rounded mb-1">Infrecuentes</p>
                <p className="bg-gray-500 text-white p-2 rounded">Comunes</p>
              </div>
              <div className="flex justify-around flex-wrap w-full">
                {uniqueData.map((item, index) => (
                  <div
                    key={index}
                    className={`p-2 m-2 rounded-md ${getColorClass(index)} transition duration-300 relative`}
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <img src={item.Icono} alt={item.Nombre} className="w-12 h-12 mx-auto" />

                    {hoveredItem === item && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg">
                        <p>{item.Nombre}</p>
                        <p>Probabilidad: {item.Probabilidad}%</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">
                {getConfirmationMessage()}
              </h2>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={openLootBox}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LootBox;
