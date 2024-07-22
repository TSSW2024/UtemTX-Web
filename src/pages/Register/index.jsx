import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import Loading from "../../components/Loading";

const Register = () => {
    const navigate = useNavigate();
    document.title = "Crear una cuenta gratis | Utem Trades";

    const { register, loading, isAuthenticated, error } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, [isAuthenticated()]);

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!validateEmail(form.email)) {
            newErrors.email = "Correo electrónico no es válido";
        }

        setErrors(newErrors);
        setIsSubmitted(true);

        if (Object.keys(newErrors).length > 0 || !termsAccepted) {
            return;
        }

        const registrationSuccessful = await register(form);
        if (registrationSuccessful.user !== null) {
            const { user } = registrationSuccessful;
            navigate("/verify", { state: { email: user.email, uid: user.uid } });
        }
    };

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked);
        setIsSubmitDisabled(!e.target.checked);
    };

    const loadingContent = () => {
        return (
            <Loading text="Registrando..." />
        )
    }

    const errorContent = () => {
        return (
            <>
                <p className="text-red-500 text-center">{error}</p>
                <button onClick={() => window.location.reload()} className="bg-primary hover:opacity-75 text-black rounded-lg p-2 font-bold mt-4">Volver a intentar</button>
            </>
        )
    }

    const renderContent = () => {
        return (
            <>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <img src="/logo192.svg" alt="Logo" className="mx-auto" />
                    <h1 className="text-3xl font-bold text-left pb-2">
                        Te damos la bienvenida a{" "}
                        <span className=" text-orange-500 dark:text-primary"> Utem Trades </span>
                    </h1>
                    <div className="relative flex flex-grow w-full">
                        <label
                            htmlFor="email"
                            className="w-fit text-left font-bold text-sm absolute top-0 left-0 -mt-2 ml-2 bg-light dark:bg-secondary px-2 text-xs text-gray-700 dark:text-gray-300"
                        >
                            Correo electrónico
                        </label>
                        <input
                            autoComplete="off"
                            type="email"
                            name="email"
                            id="email"
                            className="w-full p-2 active:outline-none focus:outline-none rounded-lg bg-transparent border border-gray-600 "
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative flex flex-grow w-full">
                        <label
                            htmlFor="password"
                            className="w-fit text-left font-bold text-sm absolute top-0 left-0 -mt-2 ml-2 bg-light dark:bg-secondary px-2 text-xs text-gray-700 dark:text-gray-300"
                        >
                            Contraseña
                        </label>
                        <input
                            autoComplete="off"
                            type="password"
                            name="password"
                            id="password"
                            className="w-full p-2 active:outline-none focus:outline-none rounded-lg bg-transparent border border-gray-600"
                            onChange={handleChange}
                        />
                    </div>
                    {isSubmitted && errors.email && (
                        <span className="text-red-500 text-sm">{errors.email}</span>
                    )}
                    <div className="flex gap-2">
                        <label
                            htmlFor="terms"
                            className="relative cursor-pointer flex items-center"
                        >
                            <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                className="w-10 h-10 cursor-pointer"
                                onChange={handleCheckboxChange}
                            />
                            <span className="ml-2 text-sm">
                                Al crear una cuenta, acepto los{" "}
                                <Link
                                    to="/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-primary text-sm"
                                >
                                    Términos de servicio
                                </Link>{" "}
                                y la{" "}
                                <Link
                                    to="/privacy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-primary text-sm"
                                >
                                    Política de privacidad
                                </Link>{" "}
                                de Utem Trades.
                            </span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={`bg-primary hover:opacity-75 text-black rounded-lg p-2 font-bold disabled:bg-disabled disabled:cursor-not-allowed ${!isSubmitDisabled ? 'dark:bg-primary-dark' : ''}`}
                        disabled={isSubmitDisabled}
                    >
                        Siguiente
                    </button>
                </form>
                <Link to="/login" className="text-orange-500 font-bold dark:text-primary hover:opacity-75 text-center block mt-2 mb-0">¿Ya tienes una cuenta? Inicia sesión</Link>
            </>
        )
    }

    return (
        <div className="bg-light dark:bg-secondary h-auto p-4 rounded-2xl shadow-xl mx-auto my-8 w-96">
            {loading && loadingContent()}
            {!loading && error && errorContent()}
            {!loading && !error && renderContent()}
        </div>
    );
};

export default Register;
