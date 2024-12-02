import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import back from "/images/backbutton.png";
import axios from 'axios';
import UpdateExpenseForm from './UpdateExpenseForm';
import { toast } from 'react-toastify';
import NavBar from '../NavBar';

function UpdateExpense() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleBackButton = () => {
    navigate("/admin/expense/payments");
  };

  const [expense, setExpense] = useState({});

  useEffect(() => {
    axios.get(`http://profit-backend.test/api/other-expense-payment?expenseId=${id}`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
      .then((response) => {
        setExpense(response.data.data[0]);
      })
      .catch((error) => {
        toast.error("There Was An Error Fetchsg The Expense Details!");
      });
  }, [id]);


  return (
    <>
    <NavBar title="Update Other Expenses" />
      <div className="flex flex-col space-y-6 p-6 md:p-10 lg:p-14">
        <div className="flex items-center space-x-4">
          <button onClick={handleBackButton}>
            <img src={back} alt="back button" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <p className="text-xl font-semibold">Update Other Expenses Details</p>
        </div>
        <UpdateExpenseForm 
          msg = "Updated"
          requestType="post" 
          URL={`http://profit-backend.test/api/other-expense-payment?expenseId=${id}`}
          initialExpense={expense} 
          btnText="Update"
        />
      </div>
    </> 
  );
}

export default UpdateExpense;
