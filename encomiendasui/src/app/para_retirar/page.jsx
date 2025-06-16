// "use client";
// import React, { useState, useEffect, use } from "react";
// import api from "../api";
// import toast, { Toaster } from "react-hot-toast";


// const App = () => {
//   const [packages, setPackages] = useState([]);

//   useEffect(() => {
//     const fetchPackage = async () => {
//       try {
//         const response = await api.get("/get_packages/");
//         setPackages(response.data);
//       } catch (error) {
//         console.error("Error fetching package:", error);
//       }
//     };

//     fetchPackage();
//   }, []);

//  const handleWithdraw = async (id) => {
//   const pkg = packages.find((p) => p.id === id);
//   if (!pkg) return;

//   let authorized = false;
//   while (!authorized) {
//     const inputCode = window.prompt("Ingrese el código de retiro del paquete:");
//     if (inputCode === null) return; 

//     if (inputCode === String(pkg.codigo)) { 
//       try {
//         const response = await api.put(`/update_package/${id}/`, {
//           withdrawn: true,
//           urgent: false,
//         });
//         setPackages((prevPackages) =>
//           prevPackages.map((pkg) =>
//             pkg.id === id ? { ...pkg, withdrawn: true, urgente: false } : pkg
//           )
//         );
//         toast.success(response.data.message);
//         authorized = true;
//       } catch (error) {
//         console.error("Error updating package:", error);
//         alert("Error al actualizar el paquete.");
//         return;
//       }
//     } else {
//       toast.error("Código incorrecto. Intente nuevamente.");
//     }
//   }
// };

//   return (
//     <div className="container mx-auto p-2 lg:p-4">
//       <Toaster position="top-right" />
//       <div className="hidden lg:grid lg:grid-cols-6 gap-33 bg-gray-100 p-3 rounded-t-lg">
//         <div className="font-bold text-center">ID</div>
//         <div className="font-bold text-center">Department</div>
//         <div className="font-bold text-center">Added at</div>
//         <div className="font-bold text-center">Retirado</div>
//         <div className="font-bold text-center">Urgente</div>
//         <div className="font-bold text-center">Action</div>
//       </div>

//       {packages.length > 0 ? (
//         <div className="divide-y divide-gray-200">
//           {packages
//             .filter((pkg) => !pkg.withdrawn)
//             .map((pkg) => (
//               <div
//                 key={pkg.id}
//                 className="flex flex-col lg:grid lg:grid-cols-6 gap-2 lg:gap-4 p-3 hover:bg-gray-50"
//               >
//                 <div className="lg:hidden flex justify-between">
//                   <span className="font-bold">ID:</span> <span>{pkg.id}</span>
//                 </div>
//                 <div className="lg:hidden flex justify-between">
//                   <span className="font-bold">Department:</span>{" "}
//                   <span>{pkg.depto}</span>
//                 </div>
//                 <div className="lg:hidden flex justify-between">
//                   <span className="font-bold">Added at:</span>{" "}
//                   <span>{pkg.added_at}</span>
//                 </div>
//                 <div className="lg:hidden flex justify-between">
//                   <span className="font-bold">Retirado:</span>{" "}
//                   <span>{pkg.withdrawn ? "Si" : "No"}</span>
//                 </div>
//                 <div className="lg:hidden flex justify-between">
//                   <span className="font-bold">Urgente:</span>{" "}
//                   <span>{pkg.urgente ? "Si" : "No"}</span>
//                 </div>

//                 <div className="hidden lg:block">{pkg.id}</div>
//                 <div className="hidden lg:block">{pkg.depto}</div>
//                 <div className="hidden lg:block">{pkg.added_at}</div>
//                 <div className="hidden lg:block">
//                   {pkg.withdrawn ? "Si" : "No"}
//                 </div>
//                 <div className="hidden lg:block">
//                   {pkg.urgente ? "Si" : "No"}
//                 </div>

//                 <div className="mt-2 lg:mt-0">
//                   <button
//                     onClick={() => handleWithdraw(pkg.id)}
//                     className="w-full lg:w-auto bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                   >
//                     Retirado
//                   </button>
//                 </div>
//               </div>
//             ))}
//         </div>
//       ) : (
//         <div className="flex flex-col lg:grid lg:grid-cols-6 gap-2 lg:gap-4 p-3 text-gray-500">
//           <div>Loading...</div>
//           <div className="hidden lg:block">Loading...</div>
//           <div className="hidden lg:block">Loading...</div>
//           <div className="hidden lg:block">Loading...</div>
//           <div className="hidden lg:block">Loading...</div>
//           <div className="hidden lg:block">Loading...</div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default App;

"use client";
import React, { useState, useEffect } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPkg, setCurrentPkg] = useState(null);
  const [inputCode, setInputCode] = useState("");

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

  const openModal = (pkg) => {
    setCurrentPkg(pkg);
    setInputCode("");
    setShowModal(true);
  };

  const handleModalConfirm = async () => {
    if (!currentPkg) return;
    if (inputCode === String(currentPkg.codigo)) {
      try {
        const response = await api.put(`/update_package/${currentPkg.id}/`, {
          withdrawn: true,
          urgent: false,
        });
        setPackages((prevPackages) =>
          prevPackages.map((pkg) =>
            pkg.id === currentPkg.id ? { ...pkg, withdrawn: true, urgente: false } : pkg
          )
        );
        toast.success(response.data.message);
        setShowModal(false);
        setCurrentPkg(null);
        setInputCode("");
      } catch (error) {
        console.error("Error updating package:", error);
        toast.error("Error al actualizar el paquete.");
      }
    } else {
      toast.error("Código incorrecto. Intente nuevamente.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentPkg(null);
    setInputCode("");
  };

  return (
    <div className="container mx-auto p-2 lg:p-4">
      <Toaster position="top-right" />
      {/* Modal para ingresar código */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-xs">
            <h3 className="text-lg font-semibold mb-4">Ingrese el código de retiro</h3>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              placeholder="Código"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleModalConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

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
                    onClick={() => openModal(pkg)}
                    className="w-full lg:w-auto bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Retirar
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