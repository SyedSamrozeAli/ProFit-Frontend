import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import back from "/images/backbutton.png";
import NavBar from "../NavBar";
import InventoryForm from '../Forms/InventoryForm';

function AddInventory() {
const navigate = useNavigate();
  
const handleBackButton = () => {
    navigate("/admin/inventory");
};

return (
    <>
        <NavBar title={"Inventory"} />
        <div className="flex flex-col space-y-6 p-6 md:p-10 lg:p-14">
            <div className="flex items-center space-x-4">
            <button onClick={handleBackButton}>
                <img
                src={back}
                alt="back button"
                className="w-6 h-6 md:w-8 md:h-8"
                />
            </button>
            <p className="text-xl font-semibold">Add Inventory Details</p>
            </div>
            <InventoryForm
            msg={"Added"}
            requestType={"post"}
            URL={"http://profit-backend.test/api/inventory"}
            btnText ={"Add Inventory"}
            />
        </div>
    </>
)
}

export default AddInventory
