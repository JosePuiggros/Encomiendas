"use client";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    depto: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:8000/auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
          email: form.email,
          depto: parseInt(form.depto, 10),
        }),
      });
      if (res.ok) {
        setMessage("Usuario creado exitosamente.");
        setForm({ username: "", password: "", email: "", depto: "" });
      } else {
        const data = await res.json();
        setMessage(data.detail || "Error al crear usuario.");
      }
    } catch (err) {
      setMessage("Error de red o servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Registro</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="depto" className="block text-gray-700 mb-2">
            Departamento
          </label>
          <input
            type="number"
            id="depto"
            name="depto"
            value={form.depto}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Crear usuario
        </button>
      </form>
      {message && <p className="text-green-700 mt-4">{message}</p>}
      <div className="mt-4">
        <a
          href="/login"
          className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-sm no-underline transition-colors text-green-500"
        >
          ¿Ya tienes cuenta? Inicia sesión aquí
        </a>
      </div>
    </div>
  );
}
