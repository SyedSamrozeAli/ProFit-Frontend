import { FiMenu } from "react-icons/fi"; // React icon for toggle
import Logo from "/images/profit-logo.png";
import dashboard from "/images/dashboard.png";
import SideBarLink from "./SideBarLink";
import attendee from "/images/attendee.png";
import inventory from "/images/inventory.png";
import finance from "/images/finance.png";
import settings from "/images/settings.png";
import "../styles/dashboard.css";

function SideBar({ isOpen, setIsOpen }) {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-black h-screen fixed ${
        isOpen ? "w-[220px]" : "w-[50px]"
      } relative top-0 left-0 z-40 transition-all duration-300 sidebar ${
        isOpen ? "sm:relative" : "absolute"
      }  sm:relative sm:z-auto`} /* Absolute positioning on mobile */
    >
      <div className="p-4 flex flex-col justify-center">
        <button
          className="mb-3 text-white fixed z-50 top-5 left-4 sm:left-4"
          onClick={toggleSidebar}
        >
          <FiMenu size={24} />
        </button>

        {isOpen && (
          <div className="mb-4 mt-8">
            <img src={Logo} alt="Profit Logo" className="w-full h-auto" />
          </div>
        )}

        {/* Sidebar Links */}
        <div
          className="flex flex-col gap-4 sm:gap-8"
          style={{
            marginTop: isOpen ? "0.7rem" : "4rem",
            paddingLeft: !isOpen ? "0" : "1rem",
          }}
        >
          <SideBarLink
            image={dashboard}
            text="Dashboard"
            to="/admin/dashboard"
            isOpen={isOpen}
          />
          <SideBarLink
            image={attendee}
            text="Manage Members"
            to="/admin/members"
            isOpen={isOpen}
          />
          <SideBarLink
            image={attendee}
            text="Manage Trainers"
            to="/admin/trainers"
            isOpen={isOpen}
          />
          <SideBarLink
            image={inventory}
            text="Manage Attendance"
            to="/admin/attendance"
            isOpen={isOpen}
          />
          <SideBarLink
            image={inventory}
            text="Inventory"
            to="/admin/inventory"
            isOpen={isOpen}
          />
          <SideBarLink
            image={finance}
            text="Finance"
            to="/admin/finance"
            isOpen={isOpen}
          />
          <SideBarLink
            image={settings}
            text="Settings"
            to="/admin/settings"
            isOpen={isOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
