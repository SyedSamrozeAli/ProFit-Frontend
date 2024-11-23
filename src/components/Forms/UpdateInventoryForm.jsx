import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";


function UpdateInventoryForm({ msg , requestType, URL, initialInventory ,btnText}) {
  const token = localStorage.getItem('token');  

  //this is the state for the updated data.
   const [updatedData , setUpdatedData] = useState({});
   const [inventory , setInventory] = useState(initialInventory);

   useEffect(() => {
    setInventory(initialInventory);
  }, [initialInventory]);


  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios({
      method: requestType,
      url: URL,
      data: updatedData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
        const successToast = toast.success(`Inventory ${msg} successfully`);
        toast.update(successToast, {
          autoClose: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data && error.response.data.errors) {
          const errorList = error.response.data.errors;
          errorList.forEach(msg => {
            console.log("Error", msg);
            toast.error(msg);
          });
        }
      });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInventory((prevInventory) => ({
      ...prevInventory,
      [name]: value,
    }));
    // Update only changed fields
    setUpdatedData((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-lg shadow-lg"
    >
      <form
        onSubmit={handleFormSubmit}
        className="space-y-6"
      >
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Equipment Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-black">
              Equipment Name
            </label>
            <input
              type="text"
              name="equipment_name"
              value={inventory.equipment_name || ""}
              onChange={handleInputChange}
              placeholder="Enter Equipment Name"
              className="w-full p-3 rounded-md bg-white border border-black focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </motion.div>

          {/* Category */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-black">
              Category
            </label>
            <select
              name="category"
              value={inventory.category || ""}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-white border border-black focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option>Select Category</option>
              <option>Free Weights</option>
              <option>Cardio Equipment</option>
              <option>Resistance Machine</option>
              <option>Accessories</option>
            </select>
          </motion.div>

          {/* Cost Per Unit */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-black">
              Cost Per Unit
            </label>
            <input
              type="number"
              name="cost_per_unit"
              value={inventory.cost_per_unit || ""}
              onChange={handleInputChange}
              placeholder="Enter Cost Per Unit"
              className="w-full p-3 rounded-md bg-white border border-black focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </motion.div>

          {/* Quantity */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-black">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={inventory.quantity || ""}
              onChange={handleInputChange}
              placeholder="Enter Quantity"
              className="w-full p-3 rounded-md bg-white border border-black focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </motion.div>

          {/* Maintenance Date */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-black">
              Purchase Date
            </label>
            <input
              type="date"
              name="purchase_date"
              value={inventory.purchase_date || ""}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-white border border-black focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-black">
              Maintenance Date
            </label>
            <input
              type="date"
              name="mantainance_date"
              value={inventory.mantainance_date || ""}
              onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-white border border-black focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-black">
              Warranty (in months)
            </label>
            <input
              type="number"
              name="warranty_period"
              value={inventory.warranty_period || ""}
              onChange={handleInputChange}
              placeholder="Enter Warranty Period"
              className="w-full p-3 rounded-md bg-white border border-black focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </motion.div>

          {/* Supplier Name */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-black">
              Supplier Name
            </label>
            <input
              type="text"
              name="supplier_name"
              value={inventory.supplier_name || ""}
              onChange={handleInputChange}
              placeholder="Enter Supplier Name"
              className="w-full p-3 rounded-md bg-white border border-black focus:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </motion.div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md text-lg font-semibold shadow-md text-white"
          >
            {btnText}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default UpdateInventoryForm;
