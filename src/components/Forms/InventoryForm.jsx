import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function InventoryForm({ msg, requestType, URL, btnText }) {
  const [inventory, setInventory] = useState({});
  const token = localStorage.getItem("token");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios({
      method: requestType,
      url: URL,
      data: inventory,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.data.success) {
          toast.success(`Inventory ${msg} successfully`, {
            autoClose: 1500,
          });
        }
      })
      .catch((error) => {
        if (error.response?.data?.message) {
          console.log(error.response.data.message);
        }
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInventory((prevInventory) => ({
      ...prevInventory,
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
          
          {/* Description */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-black">
              Equipment Description
            </label>
            <input
              type="text"
              name="description"
              value={inventory.description || ""}
              onChange={handleInputChange}
              placeholder="Enter Equipment Description"
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

export default InventoryForm;
