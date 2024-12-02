import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function ExpenseForm({ msg ,  requestType, URL , btnText}) {
  const token = localStorage.getItem('token');
    const [expense , setExpense] = useState({});
  
  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios({
      method: requestType,
      url: URL,
      data: expense,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response);
        const successToast = toast.success(`Expense ${msg} successfully`);
        toast.update(successToast, {
          autoClose: 1000,
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

  // for handling the input through forms
    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex flex-col md:flex-row md:space-x-10">
        <div className="flex-grow space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Expense Category</label>
                          <select
                              name="expense_category"
                              value={expense.expense_category|| ''}
                              onChange={handleInputChange}
                              className="mt-1 p-2 w-full border rounded-md"
                          >
                              <option value="">Select Category</option>
                              <option value="utilities">utilities</option>
                              <option value="rent">rent</option>
                              <option value="mantainance and repair">mantainance and repair</option>
                              <option value="advertising">advertising</option>
                              <option value="taxes">taxes</option>
                          </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Due Date</label>
                            <input
                                type="date"
                                name="due_date"
                                value={expense.due_date|| '' } 
                                onChange={handleInputChange}
                                className="mt-1 p-2 w-full border rounded-md"
                            />
                    </div>
                  </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600">Amount To Pay</label>
                        <input
                            type="text"
                            name="payment_amount"
                            value={expense.payment_amount|| ''}  // Ensure the value is updated correctly
                            onChange={handleInputChange}
                            placeholder="Enter contact"
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                </div>
              </div>
            </div>
          </div>

      <div className="flex justify-end mt-5 mb-4">
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
          {btnText}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm;
