import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi'; // React icon for toggle
import Logo from "/images/profit-logo.png";
import dashboard from "/images/dashboard.png";
import SideBarLink from './SideBarLink';
import attendee from "/images/attendee.png";
import inventory from "/images/inventory.png";
import finance from "/images/finance.png";
import settings from "/images/settings.png";

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    
    <div
      className={`bg-black h-screen ${isOpen ? 'w-[38vw] sm:w-[16vw]' : 'w-[22vw] sm:w-[12vw]'} 
      fixed sm:fixed top-0 left-0 z-40 transition-width duration-300 md:relative`}>
      <div className='p-4'>
        
        <button className="mb-6 text-white" onClick={toggleSidebar}>
          <FiMenu size={24} />
        </button>

        
        {isOpen && (
          <div className='mb-4'>
            <img src={Logo} alt='Profit Logo' className='w-full h-auto' />
          </div>
        )}

        
        <div className='flex flex-col p-4 gap-4 sm:gap-8 mt-4 sm:mt-10'>
          <SideBarLink image={dashboard} text='Dashboard' to='/admin/dashboard' isOpen={isOpen} />
          <SideBarLink image={attendee} text='Manage Members' to='/admin/members' isOpen={isOpen} />
          <SideBarLink image={attendee} text='Manage Trainers' to='/admin/trainers' isOpen={isOpen} />
          <SideBarLink image={inventory} text='Manage Attendance' to='/admin/attendance' isOpen={isOpen} />
          <SideBarLink image={inventory} text='Inventory' to='/admin/inventory' isOpen={isOpen} />
          <SideBarLink image={finance} text='Finance' to='/admin/finance' isOpen={isOpen} />
          <SideBarLink image={settings} text='Settings' to='/admin/settings' isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
}
//hello
export default SideBar;
