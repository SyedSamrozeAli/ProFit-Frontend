import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import back from "/images/backbutton.png";
import axios from 'axios';
import UpdatedTrainerForm from '../Forms/UpdatedTrainerForm';
import { toast } from 'react-toastify';
import NavBar from '../NavBar';

function UpdateTrainer() {
  const { id } = useParams(); // Get trainer ID from the URL
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleBackButton = () => {
    navigate("/admin/trainers");
  };

  const [trainer, setTrainer] = useState({
    trainer_name: '',
    trainer_email: '',
    CNIC: '',
    age: '',
    gender: '',
    DOB: '',
    phone_number: '',
    trainer_address: '',
    experience: '',
    salary: '',
    rating: ''
  });

  useEffect(() => {
    // Fetch trainer data by ID and populate the Trainerform
    axios.get(`http://profit-backend.test/api/trainer/${id}`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data.data);
        setTrainer(response.data.data);
        console.log("sdsajdha",trainer);
      })
      .catch((error) => {
        toast.error("There was an error fetching the trainer!");
      });
  }, [id]);


  return (
    <>
    <NavBar title="Update Trainer" />
      <div className="flex flex-col space-y-6 p-6 md:p-10 lg:p-14">
        <div className="flex items-center space-x-4">
          <button onClick={handleBackButton}>
            <img src={back} alt="back button" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <p className="text-xl font-semibold">Update Trainer Details</p>
        </div>
        <UpdatedTrainerForm 
          msg = "Updated"
          requestType="put" 
          URL={`http://profit-backend.test/api/trainer/${id}`} 
          profileImage={"/images/profile.png"} 
          initialTrainer={trainer} 
          btnText="Update"
        />
      </div>
    </> 
  );
}

export default UpdateTrainer;
