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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">depto:</label>
        <input
          type="number"
          name="depto"
          value={formData.depto}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Package</button>
    </form>
  );
};

export default AddPackage;
