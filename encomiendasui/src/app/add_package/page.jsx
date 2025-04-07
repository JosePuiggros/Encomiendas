"use client";
import React from "react";
import { useState } from "react";

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
    try {
      const response = await fetch("http://localhost:8000/add_package/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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
          id="2"
          depto="depto"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Package</button>
    </form>
  );
};

export default AddPackage;
