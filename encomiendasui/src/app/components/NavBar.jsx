"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Borra el token del localStorage
    router.push("/login"); // Redirige al usuario a la página de inicio de sesión
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full shadow-md z-50 p-3 bg-gray-900">
      <div className="flex justify-between items-center">
        <div>
          <a
            href="/"
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-base no-underline transition-colors text-green-500"
          >
            Inicio
          </a>
        </div>
        <button
          className="md:hidden focus:outline-none text-green-500"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <div className="hidden md:flex flex-wrap justify-center gap-2">
          <a
            href="/para_retirar"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-base no-underline transition-colors text-green-500"
          >
            Ver paquetes por retirar
          </a>
          <a
            href="/add_package"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-base no-underline transition-colors text-green-500"
          >
            Agregar un paquete
          </a>
          <a
            href="/historial"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-base no-underline transition-colors text-green-500"
          >
            Historial
          </a>
          <button
            onClick={handleLogout}
            className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded text-base border-0 cursor-pointer transition-colors text-green-500"
          >
            Logout
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col mt-4 gap-2">
          <a
            href="/para_retirar"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-sm no-underline transition-colors text-green-500"
          >
            Ver paquetes por retirar
          </a>
          <a
            href="/add_package"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-sm no-underline transition-colors text-green-500"
          >
            Agregar un paquete
          </a>
          <a
            href="/historial"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-sm no-underline transition-colors text-green-500"
          >
            Historial
          </a>
          <button
            onClick={handleLogout}
            className="bg-gray-700 hover:bg-gray-800 px -3 py-2 rounded text-sm border-0 cursor-pointer transition-colors text-left text-green-500"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
