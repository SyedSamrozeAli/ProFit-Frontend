import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UpdateMemberPaymentForm({ msg, requestType, URL, initialMember, btnText ,month , year}) {
  const token = localStorage.getItem('token');
  const [updatedData, setUpdatedData] = useState({});
  const [member, setMember] = useState(initialMember);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [dateRange, setDateRange] = useState({ min: '', max: '' });

  useEffect(() => {
    setMember(initialMember);
  }, [initialMember]);

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
    formData.append('member_id', member.member_id || updatedData.member_id);
    formData.append('payment_date', member.payment_date || updatedData.payment_date);
    formData.append('payment_amount', member.price || updatedData.price);
    formData.append('paid_amount', member.paid_amount || updatedData.paid_amount);
    formData.append('membership_type', updatedData.membership || member.membership);
    formData.append('payment_method', updatedData.payment_method || member.payment_method);
    formData.append('payment_status', updatedData.payment_status || member.payment_status);
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
      setMember((prevMember) => ({
        ...prevMember,
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
          {/* First Row: Member Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Member ID</label>
              <input
                type="number"
                name="member_id"
                value={member.member_id || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Member Name</label>
              <input
                type="text"
                name="member_name"
                value={member.member_name || ''}
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
                value={member.payment_date || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                min={dateRange.min} 
                max={dateRange.max} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Payment Amount</label>
              <input
                type="number"
                name="payment_amount"
                value={member.price || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Paid Amount</label>
              <input
                type="number"
                name="paid_amount"
                value={member.paid_amount || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Membership Type</label>
              <input
                type="text"
                name="membership"
                value={member.membership || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={true}
              />
            </div>
          </div>

          {/* Third Row: Payment Method and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Payment Method</label>
              <select
                name="payment_method"
                value={member.payment_method || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="online">Online</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Payment Status</label>
              <select
                name="payment_status"
                value={member.payment_status || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              >
                <option value="">Select Payment Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
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
              disabled={member.payment_method !== 'online'} // Disable if not online
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

export default UpdateMemberPaymentForm;
