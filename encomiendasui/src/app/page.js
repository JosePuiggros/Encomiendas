"use client";
import React, { useState, useEffect, use, useContext } from "react";
import api from "./api";
import "./globals.css";
import AuthContext from "./context/AuthContext";

const App = () => {

  const {user} = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token); // Verifica si el token está disponible
  }, []);

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
