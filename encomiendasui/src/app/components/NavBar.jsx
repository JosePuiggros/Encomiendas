"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    if (logout) logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full shadow-md z-50 p-3 bg-gray-900">
      <div className="flex justify-between items-center">
        <div>
          <Link
            href="/"
            className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded text-base no-underline transition-colors text-green-500"
          >
            Inicio
          </Link>
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
          <Link
            href="/para_retirar"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-base no-underline transition-colors text-green-500"
          >
            Ver paquetes por retirar
          </Link>
          <Link
            href="/add_package"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-base no-underline transition-colors text-green-500"
          >
            Agregar un paquete
          </Link>
          <Link
            href="/historial"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-base no-underline transition-colors text-green-500"
          >
            Historial
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded text-base border-0 cursor-pointer transition-colors text-green-500"
            >
              Salir
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded text-base no-underline transition-colors text-green-500"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col mt-4 gap-2">
          <Link
            href="/para_retirar"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-sm no-underline transition-colors text-green-500"
          >
            Ver paquetes por retirar
          </Link>
          <Link
            href="/add_package"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-sm no-underline transition-colors text-green-500"
          >
            Agregar un paquete
          </Link>
          <Link
            href="/historial"
            className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-sm no-underline transition-colors text-green-500"
          >
            Historial
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded text-sm cursor-pointer transition-colors text-left text-green-500"
            >
              Salir
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-gray-700 hover:bg-gray-800 px-3 py-2 rounded text-sm no-underline transition-colors text-green-500"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
