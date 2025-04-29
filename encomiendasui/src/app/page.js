"use client";
import React, { useState, useEffect, use, useContext } from "react";
import api from "./api";
import "./globals.css";
import AuthContext from "./context/AuthContext";
import { useRouter } from "next/navigation";

const App = () => {

  const {user} = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token no encontrado. Redirigiendo al login...");
        router.push("/login"); // Redirige al login si no hay token
      } else {
        console.log("Token en localStorage:", token); // Verifica si el token está disponible
      }
    } catch (error) {
      console.error("Error al obtener el token:", error);
      router.push("/login"); // Redirige al login si ocurre un error
    }
  }, [router]);


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          textAlign: "center",
        }}
      >
        Bienvenido a la app de Encomiendas
      </h1>
    </div>
  );
};
export default App;
