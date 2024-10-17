import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import back from "/images/backbutton.png";
import profileImage from "/images/profile.png";
import axios from 'axios';
import { toast } from 'react-toastify';

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
    salary: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainer((prevTrainer) => ({
      ...prevTrainer,
      [name]: value,
    }));
  };

  const handleFormSubmmit = (e) =>{
    e.preventDefault();
    console.log(trainer);
    axios.post("http://profit-backend.test/api/trainer",trainer)
    .then((response) => {
      const successToast = toast.success("Trainer Added successfully ");
                toast.update(successToast, {
                    autoClose:1500,
                })
    })
    .catch((error) => {
      if(error.response.data && error.response.data.errors){
        const errorList = error.response.data.errors;
        errorList.forEach(msg => {
          console.log("Error",msg)
          toast.error(msg);
        });
      }
      
    })
  }

  return (
    <div className="flex flex-col space-y-6 p-6 md:p-10 lg:p-14">
      <div className="flex items-center space-x-4">
        <button onClick={handleBackButton}>
          <img src={back} alt="back button" className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <p className="text-xl font-semibold">Add Member Details</p>
      </div>

      <form onSubmit={handleFormSubmmit}>
        <div className="flex flex-col md:flex-row md:space-x-10">
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <img
              src={profileImage}
              alt="profile"
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-2 border-gray-300"
            />
            <button type="button" className="mt-4 text-blue-500">Upload Photo</button>
          </div>

          <div className="flex-grow space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="trainer_name"
                  value={trainer.trainer_name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Age</label>
                <input
                  type="number"
                  name="age"
                  value={trainer.age}
                  onChange={handleInputChange}
                  placeholder="Enter age"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                <input
                  type="date"
                  name="DOB"
                  value={trainer.DOB}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Contact</label>
                <input
                  type="text"
                  name="phone_number"
                  value={trainer.phone_number}
                  onChange={handleInputChange}
                  placeholder="Enter contact"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  name="trainer_email"
                  value={trainer.trainer_email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Gender</label>
                <select
                  name="gender"
                  value={trainer.gender}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="Other">other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">CNIC</label>
                <input
                  type="text"
                  name="CNIC"
                  value={trainer.CNIC}
                  onChange={handleInputChange}
                  placeholder="Enter CNIC"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={trainer.experience}
                  onChange={handleInputChange}
                  placeholder="Enter experience in years"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Address</label>
                <input
                  type="text"
                  name="trainer_address"
                  value={trainer.trainer_address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Salary (Rs)</label>
                <input
                  type="text"
                  name="salary"
                  value={trainer.salary}
                  onChange={handleInputChange}
                  placeholder="Enter salary"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTrainer;


