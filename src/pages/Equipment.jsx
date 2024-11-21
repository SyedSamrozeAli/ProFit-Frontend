import React from 'react';
import NavBar from '../components/NavBar';
import DisplayEquipment from '../components/Equipment/DisplayEquipment';

function Equipment() {
  return (
    <>
    <NavBar title="Equipment" />
    <div className='w-full h-screen bg-white'>
        <div className='mx-6 md:mx-10 lg:mx-20 my-4'>
            <div className='flex justify-between items-center mb-5'>
                <p className='font-semibold text-lg'>Equipment Page</p>       
            </div>
            <DisplayEquipment />
        </div>
    </div>
    </>
  )
}

export default Equipment;