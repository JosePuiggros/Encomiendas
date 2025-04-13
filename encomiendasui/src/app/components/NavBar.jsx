import React from "react";

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 0",
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#f8f9fa",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "10px",
          top: "10px",
        }}
      >
        <a
          href="/"
          style={{
            backgroundColor: "gray",
            color: "white",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: "5px",
            fontSize: "16px",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          Inicio
        </a>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <a
          href="/para_retirar"
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: "5px",
            fontSize: "16px",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          Ver paquetes por retirar
        </a>
        <a
          href="/add_package"
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: "5px",
            fontSize: "16px",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          Agregar un paquete
        </a>
        <a
          href="/historial"
          style={{
            backgroundColor: "purple",
            color: "white",
            padding: "10px 20px",
            textDecoration: "none",
            borderRadius: "5px",
            fontSize: "16px",
            display: "inline-block",
            textAlign: "center",
          }}
        >
          Historial
        </a>
      </div>
    </div>
  );
};

export default NavBar;
