import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import back from "/images/backbutton.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import NavBar from '../NavBar';
import { useLocation } from 'react-router-dom';
import UpdateInventoryPaymentForm from './UpdateInventoryPaymentForm';

function InventoryPaymentUpdate() {


  const [inventory, setinventory] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleBackButton = () => {
    navigate("/admin/inventory/payments");
  };

  const url = useLocation();
  const baseUrl = window.location.origin;
  const urlObj = new URL(`${baseUrl}${url.pathname}${url.search}`); 
  const params = urlObj.searchParams;

  const month = params.get("month");
  const year = params.get("year");
  const inventory_id = params.get("inventoryId");

  useEffect(() => {
    // Fetch inventory data by ID
    axios.get(`http://profit-backend.test/api/inventory-payment?month=${month}&year=${year}&inventoryId=${inventory_id}`,{
      headers:{
        Authorization : `Bearer ${token}`
      }
    })
      .then((response) => {
        setinventory(response.data.data[0]);
        console.log(response.data.data);
      })
      .catch((error) => {
        toast.error("There was an error fetching the inventory!");
      });
  },[inventory_id]);


  return (
    <>
    <NavBar title="Update Inventory Payment" />
      <div className="flex flex-col space-y-6 p-6 md:p-10 lg:p-14">
        <div className="flex items-center space-x-4">
          <button onClick={handleBackButton}>
            <img src={back} alt="back button" className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          <p className="text-xl font-semibold">Update Inventory Payment Details</p>
        </div>
        <UpdateInventoryPaymentForm 
          msg = "Updated"
          requestType="post" 
          URL={`http://profit-backend.test/api/inventory-payment?month=${month}&year=${year}&inventory_id=${inventory_id}`}
          initialInventory={inventory} 
          btnText="Update"
          month={month}
          year={year}
        />
      </div>
    </> 
  );
}

export default InventoryPaymentUpdate;


