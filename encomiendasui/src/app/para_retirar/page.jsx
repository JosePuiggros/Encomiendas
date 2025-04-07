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

  const handleWithdraw = async (id) => {
    try {
      await api.put(`/update_package/${id}/`, { withdrawn: true });
      setPackages((prevPackages) =>
        prevPackages.map((pkg) =>
          pkg.id === id ? { ...pkg, withdrawn: true } : pkg
        )
      );
    } catch (error) {
      console.error("Error updating package:", error);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        gap: "10px",
      }}
    >
      <div>
        <strong>ID</strong>
      </div>
      <div>
        <strong>Department</strong>
      </div>
      <div>
        <strong>Added at</strong>
      </div>
      <div>
        <strong>Retirado</strong>
      </div>
      <div>
        <strong>Action</strong>
      </div>
      {packages.length > 0 ? (
        packages
          .filter((pkg) => !pkg.withdrawn)
          .map((pkg) => (
            <React.Fragment key={pkg.id}>
              <div>{pkg.id}</div>
              <div>{pkg.depto}</div>
              <div>{pkg.added_at}</div>
              <div>{pkg.withdrawn ? "Si" : "No"}</div>
              <div>
                <button onClick={() => handleWithdraw(pkg.id)}>Retirado</button>
              </div>
            </React.Fragment>
          ))
      ) : (
        <>
          <div>Loading...</div>
          <div>Loading...</div>
        </>
      )}
    </div>
  );
};
export default App;
