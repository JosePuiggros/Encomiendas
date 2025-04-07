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
