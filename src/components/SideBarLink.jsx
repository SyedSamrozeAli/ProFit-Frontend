import { NavLink, useLocation } from "react-router-dom";
import React from "react";

function SideBarLink({ svg, text, to, isOpen }) {
  const location = useLocation();
  const isActive = location.pathname === to; // Check if the link is active
  return (
    <NavLink
      to={to}
      style={{
        color: isActive ? "#FF1818" : "white",
      }}
    >
      <div className="flex items-center space-x-2">
        <div>{svg}</div>

        {isOpen && <p className="text-sm ">{text}</p>}
      </div>
    </NavLink>
  );
}

//export
export default SideBarLink;
