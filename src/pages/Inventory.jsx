import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import DisplayInventory from '../components/Inventory/DisplayInventory';

function Inventory() {
const navigate = useNavigate();
  return (
    <>
    <NavBar title="Inventory" />
    <div className='w-full h-screen bg-white'>
        <div className='mx-6 md:mx-10 lg:mx-20 my-4'>
            <div className='flex justify-between items-center mb-5'>
            <p className='font-semibold text-lg'>Inventory Page</p>
            <button 
            className='bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 text-white text-sm '
            onClick={() => navigate("/admin/inventory/addinventory")}>+  Add Inventory</button>
            </div>
            <DisplayInventory />
        </div>
    </div>
    </>
  )
}

export default Inventory;