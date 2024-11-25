import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import back from "/images/backbutton.png";
import axios from 'axios';
import UpdateTrainerPaymentForm from './UpdateTrainerPaymentForm';
import { toast } from 'react-toastify';
import NavBar from '../NavBar';
import { useLocation } from 'react-router-dom';

function TrainerPaymentUpdate() {


  const [trainer, settrainer] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleBackButton = () => {
    navigate("/admin/trainer/payments");
  };

  const url = useLocation();
  const baseUrl = window.location.origin; // Gets the base URL of the current site
  const urlObj = new URL(`${baseUrl}${url.pathname}${url.search}`); // Combine base URL with pathname and search
  const params = urlObj.searchParams;

  const month = params.get("month");
  const year = params.get("year");
  const trainerId = params.get("trainerId");

  useEffect(() => {
    // Fetch trainer data by ID
    axios.get(`http://profit-backend.test/api/trainer-payment?month=${month}&year=${year}&trainerId=${trainerId}`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log("trainer:",response.data.data[0]);
        settrainer(response.data.data[0]);
      })
      .catch((error) => {
        toast.error("There was an error fetching the trainer!");
      });
  },[trainerId]);


  return (
    <>
    <NavBar title="Update Trainer Payment" />
      <div className="flex flex-col space-y-6 p-6 md:p-10 lg:p-14">
        <div className="flex items-center space-x-4">
          <button onClick={handleBackButton}>
            <img src={back} alt="back button" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <p className="text-xl font-semibold">Update Trainer Payment Details</p>
        </div>
        <UpdateTrainerPaymentForm 
          msg = "Updated"
          requestType="post" 
          URL={`http://profit-backend.test/api/trainer-payment?month=${month}&year=${year}&trainerId=${trainerId}`}
          initialTrainer={trainer} 
          btnText="Update"
          month={month}
          year={year}
        />
      </div>
    </> 
  );
}

export default TrainerPaymentUpdate;


