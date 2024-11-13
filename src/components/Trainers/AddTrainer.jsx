import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import back from "/images/backbutton.png";
import profileImage from "/images/profile.png";
import TrainerForm from '../Forms/TrainerForm';
import NavBar from "../NavBar";

function AddTrainer() {
  const navigate = useNavigate();

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


  return (
    <>
      <NavBar title={"Trainer"}/>
    <div className="flex flex-col space-y-6 p-6 md:p-10 lg:p-14">
      <div className="flex items-center space-x-4">
        <button onClick={handleBackButton}>
          <img src={back} alt="back button" className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <p className="text-xl font-semibold">Add Trainer Details</p>
      </div>
      <TrainerForm  msg={"Added"}
       requestType={"post"} 
        URL={"http://profit-backend.test/api/trainer"}
        profileImage={profileImage}
        trainer={trainer}
        setTrainer={setTrainer} btnText="Save"/> 
    </div>
    </>
  );
}

export default AddTrainer;


