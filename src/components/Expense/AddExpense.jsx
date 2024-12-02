import React from 'react';
import { useNavigate } from 'react-router-dom';
import back from "/images/backbutton.png";
import ExpenseForm from '../Forms/ExpenseForm';
import NavBar from "../NavBar";

function AddExpense() {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/admin/expense/payments");
  };

  return (
    <>
      <NavBar title={"Expenses"}/>
        <div className="flex flex-col space-y-6 p-6 md:p-10 lg:p-14">
            <div className="flex items-center space-x-4">
                <button onClick={handleBackButton}>
                <img src={back} alt="back button" className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <p className="text-xl font-semibold">Add Gym Expense</p>
            </div>
            <ExpenseForm  
                msg={"Recorded"}
                requestType={"post"} 
                URL={"http://profit-backend.test/api/other-expense-payment"}
                btnText="Save"
            /> 
        </div>
    </>
  );
}

export default AddExpense;


