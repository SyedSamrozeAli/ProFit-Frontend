import SideBar from "../components/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/dashboard.css";

function DashboardLayout() {
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const title =
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1).toLowerCase();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar closed by default on mobile

  // Detect screen size on first load
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");

    // If screen width is less than or equal to 640px (mobile), close the sidebar
    if (mediaQuery.matches) {
      setIsSidebarOpen(false);
    }

    // Add listener to detect changes in screen size
    const handleResize = (event) => {
      setIsSidebarOpen(!event.matches); // Toggle based on screen size
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize); // Cleanup listener on unmount
    };
  }, []);

  return (
    <div
      className={`relative w-full h-screen dashboard-layout ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
    >
      {/* <NavBar title={title} /> */}
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`my-content  ${
          isSidebarOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
