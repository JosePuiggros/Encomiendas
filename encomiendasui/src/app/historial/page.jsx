"use client";
import React, { useState, useEffect } from "react";
import api from "../api";

const Historial = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/get_packages/");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Historial de Paquetes</h1>

      <div className="hidden md:grid md:grid-cols-4 gap-33 mb-4 font-bold bg-gray-100 p-3 rounded-lg">
        <div>ID</div>
        <div>Department</div>
        <div>Added at</div>
        <div>Action</div>
      </div>

      {packages.length > 0 ? (
        <div className="space-y-4 md:space-y-2">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-2 border rounded-lg p-3 hover:bg-gray-50"
            >
              <div className="flex md:block">
                <span className="font-bold md:hidden mr-2">ID:</span>
                <span>{pkg.id}</span>
              </div>
              <div className="flex md:block">
                <span className="font-bold md:hidden mr-2">Department:</span>
                <span>{pkg.depto}</span>
              </div>
              <div className="flex md:block">
                <span className="font-bold md:hidden mr-2">Added at:</span>
                <span>{pkg.added_at}</span>
              </div>
              <div className="flex md:block">
                <span className="font-bold md:hidden mr-2">Status:</span>
                {pkg.withdrawn ? (
                  <span className="text-green-600 font-medium">Retirado</span>
                ) : (
                  <span className="text-red-600 font-medium">Pendiente</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="animate-pulse text-gray-500">Loading...</div>
        </div>
      )}
    </div>
  );
};

export default Historial;
