import { useNavigate } from "react-router-dom";
import DisplayExpense from "../components/Expense/DisplayExpense";
import NavBar from "../components/NavBar";
import { useState } from "react";

function OtherExpense() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setSelectedDate(e.target.value);
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear()); 
  };

  return (
    <>
      <NavBar title="Miscellaneous Expenses" />
      <div className='w-full h-screen bg-white'>
        <div className='mx-6 md:mx-10 lg:mx-20 my-4'>
          <div className="flex justify-between items-center mb-5">
            <p className="font-semibold text-lg">Gym Expenses</p>
            <div className="flex items-center space-x-4">
              <button 
                className="bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 text-white text-sm"
                onClick={() => navigate("/admin/expense/add-expense")}
              >
                + Add Expense
              </button>
              <input 
                type="month" 
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                onChange={handleDateChange}
              />
            </div>
          </div>
          <DisplayExpense month={month} year={year} />
        </div>
      </div>
    </>
  );
}

export default OtherExpense;
