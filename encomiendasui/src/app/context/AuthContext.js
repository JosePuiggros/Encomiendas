"use client"

import { createContext, useContext, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const login = async (username, password) => {
    try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        const response = await axios.post("http://localhost:8000/auth/token/", formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        localStorage.setItem('token', response.data.access_token);
        setUser(response.data);
        router.push("/");
    } catch (error) {
        console.error("Login error:", error);
        // Lanza un error explícito para que el componente Login lo capture
        throw new Error("Credenciales incorrectas");
    }
  };

  const logout = () => {
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;