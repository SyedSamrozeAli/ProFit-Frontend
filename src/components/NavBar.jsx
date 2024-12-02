import React, { useState } from "react";
import profile from "/images/profile.png";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

function NavBar({ title }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");
    sessionStorage.clear();

    // Redirect to login page
    navigate("/", { replace: true });
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState); // Toggles dropdown state
  };

  return (
    <div className="bg-gray-50 h-12 flex-1 py-2 px-4 sm:px-12 dashboard-navbar">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg sm:text-xl font-semibold">{title}</p>
        </div>
        <div className="relative flex items-center">
          <img
            src={profile}
            alt="User Avatar"
            className="ml-4 rounded-full h-6 w-6 sm:h-8 sm:w-8 cursor-pointer"
            onClick={toggleDropdown}
          />
          {dropdownOpen && (
            <div
              className="absolute right-0 bg-white border border-gray-300 shadow-md rounded-lg w-40"
              style={{ top: "2.5rem", zIndex: 10 }} // Positions dropdown below the avatar
            >
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium">Edit Profile</p>
              </div>
              <ul>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
