import React from 'react'
import profile from "/images/profile.png"
function NavBar({title}) {
  return (
    <div className='bg-gray-50 h-12 flex-1 py-2 px-4 sm:px-12 relative'>
        <div className="flex items-center justify-between">
          <div>
            <p className='text-lg sm:text-xl font-semibold'>{title}</p>
          </div>
          <div className='flex items-center'>
            <img
                src={profile}
                alt="User Avatar"
                className="ml-4 rounded-full h-6 w-6 sm:h-8 sm:w-8"
            />
            <p className='sm:block ml-2'>John Doe</p>
          </div>
        </div>
    </div>
  )
}

export default NavBar
