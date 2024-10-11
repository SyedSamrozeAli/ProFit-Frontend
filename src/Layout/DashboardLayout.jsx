import React from 'react'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import { Outlet, useLocation } from 'react-router-dom'

function DashboardLayout() {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  const title = currentPath.charAt(0).toUpperCase() + currentPath.slice(1).toLowerCase();

  return (
    <div className='relative flex w-full h-screen'>
        {/* Sidebar - now fixed for small screens */}
        <SideBar />
        
        {/* Main content container */}
        <div className='flex-1'>
          {/* Navbar */}
          <NavBar title={title} />
          
          {/* Main Content */}
          <div className='p-4 sm:p-8'>
            <Outlet />
          </div>
        </div>
    </div>
  );
}

export default DashboardLayout;