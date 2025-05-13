"use client"

import { useContext, useState } from "react"
import AuthContext from "../context/AuthContext"

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
    const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            setErrorMessage("");
        } catch (error) {
            setErrorMessage("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            setUsername(""); 
            setPassword("");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                    <input
                        type={showPassword ? "text" : "password"} // Cambia el tipo de entrada
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} // Cambia el estado
                        className="absolute right-2 top-2 text-gray-500"
                    >
                        {showPassword ? "ocultar" : "mostrar"} {/* Icono de ojo */}
                    </button>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
            </form>
            {errorMessage && ( // Muestra el mensaje de error si existe
                <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
        </div>
    );
}

export default Login;