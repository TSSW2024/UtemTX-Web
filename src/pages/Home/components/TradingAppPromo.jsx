import React from 'react';

const TradingAppPromo = () => {
    const handleAppLinkClick = (platform) => {
        if (platform === 'iOS') {
            window.location.href = 'https://example.com/ios-app-link';
        } else if (platform === 'Android') {
            window.location.href = 'https://example.com/android-app-link';
        }
    };

    return (
        <div className="flex flex-col p-4 md:p-8 w-full md:w-[54rem] justify-center items-center gap-4 md:gap-8">
            <span className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-center">
                Haz trading sobre la marcha. <br />
                En cualquier lugar <br /> y momento.
            </span>
            <div className="flex flex-col md:flex-row gap-4">
                <img src="/qr-inprogress.png" alt="QR" className="h-fit w-full md:w-80 border rounded-2xl p-2 border-gray-300 dark:border-gray-700 shadow-lg drop-shadow-lg dark:bg-light-dark" />
                <div className="flex flex-col items-center justify-center gap-4">
                    <span className="text-center text-sm md:text-lg">
                        Nuestra app está en construcción por ahora, por eso no tenemos un QR disponible.
                    </span>
                    <span className="text-center text-sm md:text-lg">
                        Pero pronto estará disponible para <br />
                        <span
                            className="text-primary-light dark:text-primary cursor-pointer hover:opacity-75"
                            onClick={() => handleAppLinkClick('iOS')}
                        >
                            iOS
                        </span>{' '}
                        y{' '}
                        <span
                            className="text-primary-light dark:text-primary cursor-pointer hover:opacity-75"
                            onClick={() => handleAppLinkClick('Android')}
                        >
                            Android
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TradingAppPromo;