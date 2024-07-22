import React from 'react';

const Terms = () => {
    document.title = 'Términos y Condiciones para UtemTX';
    const dateUpdate = new Date("2024-06-03 06:59");

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-left pb-2">Términos y Condiciones para <span className="text-orange-500 dark:text-primary"> UtemTX</span></h1>
            <h2 className="text-lg">Última actualización: {dateUpdate.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</h2>
            <p className="mt-8 text-left text-lg">
                Al hacer clic en el botón "Registrarse", usted acepta los siguientes términos y condiciones:
            </p>
            <ol className="mt-4 text-left text-lg list-decimal px-8">
                <li>
                    <strong>Exactitud de la Información</strong><br />
                    Usted es responsable de la precisión de la información proporcionada durante el registro y en cualquier momento posterior. Toda la información debe ser veraz y estar actualizada.
                </li>
                <li>
                    <strong>Uso de Información Personal</strong><br />
                    Su información personal se utilizará de acuerdo con nuestra Política de Privacidad. No compartiremos su información con terceros sin su consentimiento previo, salvo cuando lo exija la ley.
                </li>
                <li>
                    <strong>Seguridad de la Cuenta</strong><br />
                    Usted es responsable de mantener la seguridad de su cuenta, incluyendo la protección de su contraseña y cualquier otra información de acceso. Notifique inmediatamente a UtemTX si sospecha de cualquier actividad no autorizada en su cuenta.
                </li>
                <li>
                    <strong>Responsabilidad de Uso</strong><br />
                    Usted se compromete a utilizar la plataforma de manera legal y ética. Cualquier uso indebido, como actividades fraudulentas o ilícitas, resultará en la suspensión o terminación de su cuenta.
                </li>
                <li>
                    <strong>Cumplimiento Legal</strong><br />
                    Usted debe cumplir con todas las leyes y regulaciones aplicables en su jurisdicción al usar nuestra plataforma. Es su responsabilidad asegurarse de que su uso de los servicios de UtemTX sea legal en su país.
                </li>
                <li>
                    <strong>Modificaciones</strong><br />
                    UtemTX puede modificar estos términos y condiciones en cualquier momento. Le notificaremos de cualquier cambio a través de nuestra plataforma o por correo electrónico. Su uso continuado de la plataforma después de dichos cambios constituirá su aceptación de los nuevos términos.
                </li>
                <li>
                    <strong>Limitación de Responsabilidad</strong><br />
                    UtemTX no será responsable por cualquier pérdida o daño que resulte del uso de nuestra plataforma, incluidos pero no limitados a pérdidas financieras, daños indirectos o cualquier otra pérdida resultante de la negligencia o incumplimiento por parte del usuario.
                </li>
                <li>
                    <strong>Terminación de Servicio</strong><br />
                    UtemTX se reserva el derecho de suspender o terminar su acceso a la plataforma en cualquier momento y por cualquier motivo, sin previo aviso.
                </li>
                <li>
                    <strong>Transacciones Financieras</strong><br />
                    Al utilizar UtemTX, usted puede realizar transacciones financieras que incluyen la compra, venta, intercambio o almacenamiento de criptomonedas. UtemTX no garantiza la precisión de los precios ni la ejecución inmediata de las órdenes. Todas las transacciones son finales y no reembolsables.
                </li>
                <li>
                    <strong>Riesgos Asociados</strong><br />
                    Usted entiende y acepta que la compra, venta y el comercio de criptomonedas conllevan riesgos significativos. Las criptomonedas son volátiles y pueden experimentar fluctuaciones de precio importantes. Usted es responsable de todas las pérdidas resultantes de sus actividades de inversión y comercio.
                </li>
                <li>
                    <strong>Comisiones y Tarifas</strong><br />
                    UtemTX puede cobrar comisiones y tarifas por el uso de sus servicios. Estas tarifas pueden variar según el tipo de transacción y se detallarán en nuestra plataforma. Usted acepta pagar todas las tarifas aplicables.
                </li>
                <li>
                    <strong>No Asesoramiento Financiero</strong><br />
                    UtemTX no ofrece asesoramiento financiero, legal o de inversión. Toda la información proporcionada en la plataforma es solo para fines informativos. Usted debe realizar su propia investigación y consultar con asesores financieros antes de tomar decisiones de inversión.
                </li>
                <li>
                    <strong>Cumplimiento de AML/KYC</strong><br />
                    Para cumplir con las leyes y regulaciones de prevención de lavado de dinero (AML) y de conocimiento del cliente (KYC), UtemTX puede solicitar información adicional para verificar su identidad y la fuente de sus fondos. Usted se compromete a proporcionar información precisa y completa cuando sea solicitada.
                </li>
                <li>
                    <strong>Sin Seguro</strong><br />
                    No somos un banco u otra institución depositaria. Su cuenta y activos en UtemTX no están asegurados contra pérdidas.
                </li>
                <li>
                    <strong>Resolución de Disputas</strong><br />
                    Esperamos evitar disputas, pero si hay una disputa, usted está obligado a arbitrar disputas con nosotros y la forma en que puede buscar reparación puede ser limitada.
                </li>
            </ol>
            <p className="mt-8 text-left text-lg">
                Gracias por elegir UtemTX.
            </p>
        </div>
    );
}

export default Terms;
