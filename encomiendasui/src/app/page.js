"use client";
import React, { useState, useEffect, use } from "react";
import api from "./api";
import "./globals.css";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={() => (window.location.href = "/para_retirar")}
      >
        Ver paquetes por retirar
      </button>
      <button
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          marginLeft: "10px",
        }}
        onClick={() => (window.location.href = "/add_package")}
      >
        Agregar un paquete
      </button>
    </div>
  );
};
export default App;
