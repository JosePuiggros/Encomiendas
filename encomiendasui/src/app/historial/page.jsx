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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
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
      {/* <div>
        <strong>Retirado</strong>
      </div> */}
      <div>
        <strong>Action</strong>
      </div>
      {packages.length > 0 ? (
        packages.map((pkg) => (
          <React.Fragment key={pkg.id}>
            <div>{pkg.id}</div>
            <div>{pkg.depto}</div>
            <div>{pkg.added_at}</div>
            {/* <div>{pkg.withdrawn ? "Si" : "No"}</div> */}
            <div>
              {pkg.withdrawn ? (
                <span style={{ color: "green" }}>Retirado</span>
              ) : (
                <span style={{ color: "red" }}>Pendiente</span>
              )}
            </div>
          </React.Fragment>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Historial;