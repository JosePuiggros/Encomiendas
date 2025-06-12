"use client";
import React, { useState } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

const AddPackage = () => {
  const [formData, setFormData] = useState({
    depto: "",
    urgente: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    depto: parseInt(formData.depto),
    urgente: formData.urgente,
  };

  await toast.promise(
    api.post("/add_package/", payload),
    {
      loading: "Agregando paquete...",
      success: (response) => {
        setFormData({ depto: "", urgente: false });
        return response.data.message;
      },
      error: (error) => {
        return error.response?.data?.message || "Ocurrió un error.";
      },
    }
  );
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 w-full">
      <Toaster position="top-right" />
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
          <div className="flex items-center">
            <input
              type="checkbox"
              name="urgente"
              id="urgente"
              checked={formData.urgente || false}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="urgente"
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              Urgente
            </label>
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
// "use client";
// import React from "react";
// import { useState } from "react";
// import api from "../api";

// const AddPackage = () => {
//   const [formData, setFormData] = useState({
//     depto: "",
//     urgente: false,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       depto: parseInt(formData.depto),
//       urgente: formData.urgente,
//     };

//     try {
//       const response = await api.post("/add_package/", payload);

//       if (response.status === 200) {
//         // alert("Package added successfully!");
//         alert(response.data.message)
//         setFormData({ depto: "", urgente: false });
//       } else {
//         alert("Failed to add package.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 w-full">
//       <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//           Add New Package
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <label
//               htmlFor="depto"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Department Number:
//             </label>
//             <input
//               type="number"
//               name="depto"
//               id="depto"
//               value={formData.depto}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
//               placeholder="Enter department number"
//             />
//           </div>
//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="urgente"
//               id="urgente"
//               checked={formData.urgente || false}
//               onChange={(e) => {
//                 const isChecked = e.target.checked;
//                 setFormData({ ...formData, urgente: isChecked });
//               }}
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//             />
//             <label
//               htmlFor="urgente"
//               className="ml-2 block text-sm font-medium text-gray-700"
//             >
//               Urgente
//             </label>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Add Package
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPackage;
