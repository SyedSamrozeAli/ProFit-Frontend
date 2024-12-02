import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UpdateInventoryPaymentForm({ msg, requestType, URL, initialInventory, btnText ,month , year}) {
  const token = localStorage.getItem('token');
  const [updatedData, setUpdatedData] = useState({});
  const [inventory, setinventory] = useState(initialInventory);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [dateRange, setDateRange] = useState({ min: '', max: '' });

  useEffect(() => {
    setinventory(initialInventory);
  }, [initialInventory]);

  useEffect(() => {
    if (month && year) {
      const firstDay = new Date(year, month - 1, 1).toISOString().split('T')[0];
      const lastDay = new Date(year, month, 0).toISOString().split('T')[0];
      setDateRange({ min: firstDay, max: lastDay });
    }
  }, [month, year]);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prepare FormData for sending file and other data
    const formData = new FormData();
    formData.append('inventory_id', inventory.inventory_id || updatedData.inventory_id);
    formData.append('payment_date', inventory.payment_date || updatedData.payment_date);
    formData.append('total_price', updatedData.total_price || inventory.total_price);
    formData.append('amount_paid', inventory.amount_paid || updatedData.amount_paid);
    formData.append('payment_method', updatedData.payment_method || inventory.payment_method);
    formData.append('payment_amount', updatedData.total_price|| inventory.total_price);

    if (paymentReceipt) {
      formData.append('payment_receipt', paymentReceipt); // Append the file
    }

    axios({
      method: requestType,
      url: URL,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Required for file upload
      },
    })
      .then((response) => {
        toast.success(`${msg} successfully`);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.errors[0]);
      });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // Handle file input
      setPaymentReceipt(files[0]);
    } else {
      setinventory((prevInventory) => ({
        ...prevInventory,
        [name]: value,
      }));

      setUpdatedData((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="flex-grow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Inventory ID</label>
              <input
                type="number"
                name="inventory_id"
                value={inventory.inventory_id || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Inventory Name</label>
              <input
                type="text"
                name="inventory_name"
                value={inventory.equipment_name || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={true}
              />
            </div>
          </div>

          {/* Second Row: Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Payment Date</label>
              <input
                type="date"
                name="payment_date"
                value={inventory.payment_date || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                min={dateRange.min} 
                max={dateRange.max} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Total Price</label>
              <input
                type="number"
                name="total_price"
                value={inventory.total_price || ''}
                onChange={handleInputChange}
                disabled={true}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Paid Amount</label>
              <input
                type="number"
                name="amount_paid"
                value={inventory.amount_paid || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Payment Method</label>
              <select
                name="payment_method"
                value={inventory.payment_method || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          </div>

          {/* File Input: Payment Receipt */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Payment Receipt</label>
            <input
              type="file"
              name="payment_receipt"
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              disabled={inventory.payment_method !== 'online'} // Disable if not online
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-5">
        <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
          {btnText}
        </button>
      </div>
    </form>
  );
}

export default UpdateInventoryPaymentForm;
