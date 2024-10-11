import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBarLink({ image, text, to, isOpen }) {
  return (
    <NavLink to={to} className={({ isActive }) => isActive ? 'text-red-500' : 'text-white'}>
      <div className='flex items-center space-x-2'>
        <img src={image} alt='Icon' className='h-4 w-4 sm:h-5 sm:w-5' />
        {isOpen && <p className='text-s sm:text-base'>{text}</p>}
      </div>
    </NavLink>
  );
}

//export
export default SideBarLink;
