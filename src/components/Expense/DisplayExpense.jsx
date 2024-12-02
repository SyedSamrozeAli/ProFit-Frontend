import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import 'react-circular-progressbar/dist/styles.css';

function DisplayExpense({month , year}) {

  const [expesnseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState(false);

  // This will start the progress bar animation when the component mounts
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 100);

    return () => clearInterval(interval); 
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setLoading(true);
      axios
        .get(`http://profit-backend.test/api/other-expense-payment?month=${month}&year=${year}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if(response.data.status == false){
            console.log("hello ");
          }
          else{
            console.log(response.data.data);
            setExpenseData(response.data.data);
          }
          setLoading(false);
          setLoadingProgress(100); 
        })
        .catch((error) => {
          console.log(error.response);
          setError(true);
          setLoading(false);
          setLoadingProgress(0); // Reset progress on error

          if(error.response &&  error.response.data.status_code == 404 ){
            setError(false);
          }
          else if (error.response?.status === 401) {
            toast.error('Unauthorized access. Please log in again.');
          } else {
            toast.error('Error fetching the expense details.');
          }
        });
    } else {
      setError(true);
      setLoading(false);
    }
  }, [month,year]); // This will run only once when the component mounts
  

  return (
    <>
      {loading ? (
        // Loading state with progress bar
        <div className="flex items-center justify-center h-screen">
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={loadingProgress}
              text={`${loadingProgress}%`}
              styles={buildStyles({
                textColor: '#000', // Color of the percentage text
                pathColor: '#ff0000', // Set the path color to red (#ff0000)
                trailColor: '#ffffff', // Background color of the circular trail
              })}
            />
          </div>
        </div>
      ) : (
        // If not loading and no error occurred, render data or show "No expense data found"
        !error && (
            expesnseData.length === 0 ? (
            <div class="flex flex-col items-center justify-center pt-20 ">
                <img src='/images/notrainer.png' alt='no expense image' className='h-80'/>
            </div>
          ) : (
            <ExpenseTable
              expenseData={expesnseData}
            />
          )
        )
      )}
    </>
  );
}

export default DisplayExpense;
