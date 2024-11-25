import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UpdateTrainerPaymentForm({ msg, requestType, URL, initialTrainer, btnText ,month , year}) {
  const token = localStorage.getItem('token');
  const [updatedData, setUpdatedData] = useState({});
  const [trainer, setTrainer] = useState(initialTrainer);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [dateRange, setDateRange] = useState({ min: '', max: '' });

  useEffect(() => {
    setTrainer(initialTrainer);
  }, [initialTrainer]);

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
    formData.append('trainer_id', trainer.trainer_id || updatedData.trainer_id);
    formData.append('payment_date', trainer.payment_date || updatedData.payment_date);
    formData.append('payment_amount', trainer.salary || trainer.salary);
    formData.append('paid_amount', trainer.paid_amount || updatedData.paid_amount);
    formData.append('payment_method', updatedData.payment_method || trainer.payment_method);
    formData.append('payment_status', updatedData.payment_status || trainer.payment_status);
    formData.append('salary', updatedData.salary || trainer.salary);
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
        toast.error('An error occurred while updating the payment.');
      });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // Handle file input
      setPaymentReceipt(files[0]);
    } else {
      setTrainer((prevTrainer) => ({
        ...prevTrainer,
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
          {/* First Row: Trainer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Trainer ID</label>
              <input
                type="number"
                name="trainer_id"
                value={trainer.trainer_id || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Trainer Name</label>
              <input
                type="text"
                name="trainer_name"
                value={trainer.trainer_name || ''}
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
                value={trainer.payment_date || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                min={dateRange.min} 
                max={dateRange.max} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Salary</label>
              <input
                type="number"
                name="salary"
                value={trainer.salary || ''}
                onChange={handleInputChange}
                disabled={true}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Paid Amount</label>
              <input
                type="number"
                name="paid_amount"
                value={trainer.paid_amount || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Payment Status</label>
              <select
                name="payment_status"
                value={trainer.payment_status || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select Payment Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

          </div>

          {/* Third Row: Payment Method and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Payment Method</label>
              <select
                name="payment_method"
                value={trainer.payment_method || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
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
              disabled={trainer.payment_method !== 'online'} // Disable if not online
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

export default UpdateTrainerPaymentForm;
