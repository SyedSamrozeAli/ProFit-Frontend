import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
import AddAttendance from "../components/Attendance/AddAttendance";

function Attendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [updatedMembers, setUpdatedMembers] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  const token = localStorage.getItem("token");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Function to handle field updates and track updated members
  const handleAttendanceChange = (member_id, field, value) => {
    let formattedValue = value;
  
    if (field === "check_in_time" || field === "check_out_time") {
      const timeParts = value.split(":");
      if (timeParts.length === 2) {
        formattedValue = `${timeParts[0]}:${timeParts[1]}:00`; // Ensure H:i:s format
      }
    }
  
    setAttendanceData((prevData) =>
      prevData.map((attendance) => {
        if (attendance.member_id === member_id) {
          const updatedAttendance = { ...attendance, [field]: formattedValue };
  
          // Handle status-specific changes
          if (field === "attendance_status") {
            if (value === "Absent") {
              updatedAttendance.check_in_time = null;
              updatedAttendance.check_out_time = null;
            }
  
            // Remove member from updates if status is null
            if (value === null) {
              setUpdatedMembers((prevUpdates) => {
                const newUpdates = { ...prevUpdates };
                delete newUpdates[member_id];
                return newUpdates;
              });
              return updatedAttendance; // Exit early without tracking
            }
          }
  
          // Track updates for non-null status
          setUpdatedMembers((prevUpdates) => ({
            ...prevUpdates,
            [member_id]: updatedAttendance,
          }));
  
          return updatedAttendance;
        }
        return attendance;
      })
    );
  };
  
  

  // Function to handle saving updated attendance
  const handleSave = () => {
    // Filter out members with `attendance_status` set to null
    const updatedData = Object.values(updatedMembers).filter(
      ({ attendance_status }) => attendance_status !== null
    ).map(
      ({ member_id, check_in_time, check_out_time, attendance_status }) => ({
        member_id,
        check_in_time,
        check_out_time,
        attendance_status,
      })
    );
  
    if (updatedData.length === 0) {
      toast.error("No valid changes to save.");
      return;
    }
  
    const dataToSend = {
      attendance_date: selectedDate,
      attendance: updatedData,
    };
  
    console.log("Data to send:", dataToSend);
  
    axios
      .post("http://profit-backend.test/api/member-attendance", dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Attendance updated successfully:", response.data);
        toast.success("Attendance saved successfully!");
        setUpdatedMembers({}); // Reset updates after successful save
      })
      .catch((error) => {
        if('The attendance.0.check_out_time field must be a date after attendance.0.check_in_time.'){
            toast.error("Checkout Date must be after the Check In time");
        }
        else{
            toast.error("Failed to save attendance!");
        }
      });
  };
  
  

  useEffect(() => {
    if (!selectedDate) {
      toast.error("Please choose a date!");
      return;
    }

    axios
      .get(
        `http://profit-backend.test/api/member-attendance?attendance_date=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success === false) {
          setAttendanceData([]);
        } else {
          setAttendanceData(response.data.data);
          console.log(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, [selectedDate]);

  return (
    <>
      <NavBar title="Member Attendance" />
      <div className="w-full h-screen bg-white">
        <div className="mx-6 my-4">
          <div className="flex justify-between items-center mb-5">
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border px-4 py-2 rounded-lg"
            />
            <button
              onClick={handleSave}
              className="bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2 text-white text-sm"
            >
              Save
            </button>
          </div>
          <AddAttendance
            attendanceData={attendanceData}
            handleAttendanceChange={handleAttendanceChange}
          />
        </div>
      </div>
    </>
  );
}

export default Attendance;
