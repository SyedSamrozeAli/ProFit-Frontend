import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import back from "/images/backbutton.png";
import axios from 'axios';
import UpdatedMemberForm from '../Forms/UpdatedMemberForm';
import { toast } from 'react-toastify';
import NavBar from '../NavBar';

function UpdateMember() {
  const { id } = useParams(); // Get trainer ID from the URL
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const handleBackButton = () => {
    navigate("/admin/members");
  };

  const [member, setMember] = useState({});

  useEffect(() => {
    // Fetch trainer data by ID and populate the Trainerform
    axios.get(`http://profit-backend.test/api/member/${id}`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log(response.data.data);
        setMember(response.data.data);
      })
      .catch((error) => {
        toast.error("There was an error fetching the member!");
      });
  }, [id]);


  return (
    <>
    <NavBar title="Update Member" />
      <div className="flex flex-col space-y-6 p-6 md:p-10 lg:p-14">
        <div className="flex items-center space-x-4">
          <button onClick={handleBackButton}>
            <img src={back} alt="back button" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <p className="text-xl font-semibold">Update Member Details</p>
        </div>
        <UpdatedMemberForm 
          msg = "Updated"
          requestType="put" 
          URL={`http://profit-backend.test/api/member/${id}`}
          initialMember={member} 
          btnText="Update"
        />
      </div>
    </> 
  );
}

export default UpdateMember;
