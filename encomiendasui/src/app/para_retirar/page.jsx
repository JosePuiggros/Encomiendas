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

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
    >
      <div>
        <strong>ID</strong>
      </div>
      <div>
        <strong>Department</strong>
      </div>
      {packages.length > 0 ? (
        packages.map((pkg) => (
          <React.Fragment key={pkg.id}>
            <div>{pkg.id}</div>
            <div>{pkg.depto}</div>
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
