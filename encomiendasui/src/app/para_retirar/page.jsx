"use client";
import React, { useState, useEffect, use } from "react";
import api from "../api";

const App = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await api.get("/get_packages/");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    fetchPackage();
  }, []);

  // const handleWithdraw = async (id) => {
  //   try {
  //     await api.put(`/update_package/${id}/`, {
  //       withdrawn: true,
  //       urgent: false,
  //     });
  //     setPackages((prevPackages) =>
  //       prevPackages.map((pkg) =>
  //         pkg.id === id ? { ...pkg, withdrawn: true, urgente: false } : pkg
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating package:", error);
  //   }
  // };
 const handleWithdraw = async (id) => {
  const pkg = packages.find((p) => p.id === id);
  if (!pkg) return;

  let authorized = false;
  while (!authorized) {
    const inputCode = window.prompt("Ingrese el código de retiro del paquete:");
    if (inputCode === null) return; // Cancelled

    if (inputCode === String(pkg.codigo)) { // <-- Cambiado a pkg.codigo
      try {
        await api.put(`/update_package/${id}/`, {
          withdrawn: true,
          urgent: false,
        });
        setPackages((prevPackages) =>
          prevPackages.map((pkg) =>
            pkg.id === id ? { ...pkg, withdrawn: true, urgente: false } : pkg
          )
        );
        authorized = true;
      } catch (error) {
        console.error("Error updating package:", error);
        alert("Error al actualizar el paquete.");
        return;
      }
    } else {
      alert("Código incorrecto. Intente nuevamente.");
    }
  }
};

  return (
    <div className="container mx-auto p-2 lg:p-4">
      <div className="hidden lg:grid lg:grid-cols-6 gap-33 bg-gray-100 p-3 rounded-t-lg">
        <div className="font-bold text-center">ID</div>
        <div className="font-bold text-center">Department</div>
        <div className="font-bold text-center">Added at</div>
        <div className="font-bold text-center">Retirado</div>
        <div className="font-bold text-center">Urgente</div>
        <div className="font-bold text-center">Action</div>
      </div>

      {packages.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {packages
            .filter((pkg) => !pkg.withdrawn)
            .map((pkg) => (
              <div
                key={pkg.id}
                className="flex flex-col lg:grid lg:grid-cols-6 gap-2 lg:gap-4 p-3 hover:bg-gray-50"
              >
                <div className="lg:hidden flex justify-between">
                  <span className="font-bold">ID:</span> <span>{pkg.id}</span>
                </div>
                <div className="lg:hidden flex justify-between">
                  <span className="font-bold">Department:</span>{" "}
                  <span>{pkg.depto}</span>
                </div>
                <div className="lg:hidden flex justify-between">
                  <span className="font-bold">Added at:</span>{" "}
                  <span>{pkg.added_at}</span>
                </div>
                <div className="lg:hidden flex justify-between">
                  <span className="font-bold">Retirado:</span>{" "}
                  <span>{pkg.withdrawn ? "Si" : "No"}</span>
                </div>
                <div className="lg:hidden flex justify-between">
                  <span className="font-bold">Urgente:</span>{" "}
                  <span>{pkg.urgente ? "Si" : "No"}</span>
                </div>

                <div className="hidden lg:block">{pkg.id}</div>
                <div className="hidden lg:block">{pkg.depto}</div>
                <div className="hidden lg:block">{pkg.added_at}</div>
                <div className="hidden lg:block">
                  {pkg.withdrawn ? "Si" : "No"}
                </div>
                <div className="hidden lg:block">
                  {pkg.urgente ? "Si" : "No"}
                </div>

                <div className="mt-2 lg:mt-0">
                  <button
                    onClick={() => handleWithdraw(pkg.id)}
                    className="w-full lg:w-auto bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Retirado
                  </button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-6 gap-2 lg:gap-4 p-3 text-gray-500">
          <div>Loading...</div>
          <div className="hidden lg:block">Loading...</div>
          <div className="hidden lg:block">Loading...</div>
          <div className="hidden lg:block">Loading...</div>
          <div className="hidden lg:block">Loading...</div>
          <div className="hidden lg:block">Loading...</div>
        </div>
      )}
    </div>
  );
};
export default App;
