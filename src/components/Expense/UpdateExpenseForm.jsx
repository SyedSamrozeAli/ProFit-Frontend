import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UpdateExpenseForm({ msg, requestType, URL, initialExpense, btnText }) {
  const token = localStorage.getItem('token');
  const [updatedData, setUpdatedData] = useState({});
  const [expense, setexpense] = useState(initialExpense);
  const [paymentReceipt, setPaymentReceipt] = useState(null);


  useEffect(() => {
    console.log("Dsasdsa",initialExpense);
    setexpense(initialExpense);
  }, [initialExpense]);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prepare FormData for sending file and other data
    const formData = new FormData();
    formData.append('expense_id', expense.expense_id || updatedData.expense_id);
    formData.append('expense_category', expense.expense_category_name || updatedData.expense_category_name);
    formData.append('expense_date', updatedData.expense_date || expense.expense_date);
    formData.append('amount', expense.amount || updatedData.amount);
    formData.append('payment_method', updatedData.payment_method || expense.payment_method);
    formData.append('expense_status', updatedData.expense_status|| expense.expense_status);
    formData.append('payment_amount', updatedData.payment_amount|| expense.payment_amount);
    formData.append('due_date', updatedData.due_date|| expense.due_date);

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
        toast.error(error.response.data.errors);
      });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      // Handle file input
      setPaymentReceipt(files[0]);
    } else {
        setexpense((prevexpense) => ({
        ...prevexpense,
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
              <label className="block text-sm font-medium text-gray-600">Expense ID</label>
              <input
                type="number"
                name="expense_id"
                value={expense.expense_id || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={true}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Category Name</label>
              <input
                type="text"
                name="expense_category_name"
                value={expense.expense_category_name || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                disabled={true}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Paying Date</label>
              <input
                type="date"
                name="expense_date"
                value={expense.expense_date || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Payment Amount</label>
              <input
                type="number"
                name="payment_amount"
                value={expense.payment_amount || ''}
                onChange={handleInputChange}
                disabled={true}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Paid Amount</label>
              <input
                type="number"
                name="amount"
                value={expense.amount || ''}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Payment Method</label>
              <select
                name="payment_method"
                value={expense.payment_method || ''}
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
              disabled={expense.payment_method !== 'online'} 
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

export default UpdateExpenseForm;
