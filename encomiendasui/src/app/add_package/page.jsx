"use client";
import React from "react";
import { useState } from "react";
import api from "../api";

const AddPackage = () => {
  const [formData, setFormData] = useState({
    depto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      depto: parseInt(formData.depto),
    };

    try {
      const response = await api.post("/add_package/", payload);

      if (response.status === 200) {
        alert("Package added successfully!");
        setFormData({ depto: "" });
      } else {
        alert("Failed to add package.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 w-full">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Package
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="depto"
              className="block text-sm font-medium text-gray-700"
            >
              Department Number:
            </label>
            <input
              type="number"
              name="depto"
              id="depto"
              value={formData.depto}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              placeholder="Enter department number"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Package
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
