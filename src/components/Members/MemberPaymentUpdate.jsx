import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import back from "/images/backbutton.png";
import axios from 'axios';
import UpdateMemberPaymentForm from './UpdateMemberPaymentForm';
import { toast } from 'react-toastify';
import NavBar from '../NavBar';
import { useLocation } from 'react-router-dom';

function MemberPaymentUpdate() {


  const [member, setMember] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleBackButton = () => {
    navigate("/admin/member/payments");
  };

  const url = useLocation();
  const baseUrl = window.location.origin; // Gets the base URL of the current site
  const urlObj = new URL(`${baseUrl}${url.pathname}${url.search}`); // Combine base URL with pathname and search
  const params = urlObj.searchParams;

  const month = params.get("month");
  const year = params.get("year");
  const memberId = params.get("memberId");

  useEffect(() => {
    // Fetch member data by ID
    axios.get(`http://profit-backend.test/api/member-payment?month=${month}&year=${year}&memberId=${memberId}`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
      .then((response) => {
        console.log("meber:",response.data.data[0]);
        setMember(response.data.data[0]);
      })
      .catch((error) => {
        toast.error("There was an error fetching the member!");
      });
  },[memberId]);


  return (
    <>
    <NavBar title="Update Member Payment" />
      <div className="flex flex-col space-y-6 p-6 md:p-10 lg:p-14">
        <div className="flex items-center space-x-4">
          <button onClick={handleBackButton}>
            <img src={back} alt="back button" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <p className="text-xl font-semibold">Update Member Payment Details</p>
        </div>
        <UpdateMemberPaymentForm 
          msg = "Updated"
          requestType="post" 
          URL={`http://profit-backend.test/api/member-payment?month=${month}&year=${year}&memberId=${memberId}`}
          initialMember={member} 
          btnText="Update"
          month={month}
          year={year}
        />
      </div>
    </> 
  );
}

export default MemberPaymentUpdate;


