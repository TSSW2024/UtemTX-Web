import CryptoList from './components/CryptoList.jsx';
import Welcome from './components/Welcome.jsx';
import DeviceMockup from './components/DeviceMockup.jsx';
import TradingAppPromo from './components/TradingAppPromo.jsx';
import FaqAccordion from './components/FaqAccordion.jsx';

const Guest = () => {
    return (
        <div className="flex flex-col">
            <div className="flex-grow flex flex-col items-center justify-center gap-8 p-4 sm:p-8">
                <div className="p-4 sm:p-8 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 flex-grow justify-around">
                    <Welcome />
                    <CryptoList />
                </div>

                <div className="p-4 sm:p-8 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 flex-grow justify-around">
                    <DeviceMockup />
                    <TradingAppPromo />
                    <FaqAccordion />
                </div>
            </div>
        </div>
    );
}

export default Guest;