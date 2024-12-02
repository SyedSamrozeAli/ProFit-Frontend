import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { toast } from "react-toastify";
import TrainerAddAttendance from "../components/Attendance/TrainerAddAttendance";

function TrainerAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [updatedTrainers, setUpdatedTrainers] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  //taking the user given date
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Function to handle field updates and track updated trainers
  const handleAttendanceChange = (trainer_id, field, value) => {
    let formattedValue = value;

    if (field === "check_in_time" || field === "check_out_time") {
      const timeParts = value.split(":");
      if (timeParts.length === 2) {
        formattedValue = `${timeParts[0]}:${timeParts[1]}:00`; // Ensure H:i:s format
      }
    }

    setAttendanceData((prevData) =>
      prevData.map((attendance) => {
        if (attendance.trainer_id === trainer_id) {
          const updatedAttendance = { ...attendance, [field]: formattedValue };

          // Handle status-specific changes
          if (field === "attendance_status") {
            if (value === "Absent") {
              updatedAttendance.check_in_time = null;
              updatedAttendance.check_out_time = null;
            }

            // Remove trainer from updates if status is null
            if (value === null) {
              setUpdatedTrainers((prevUpdates) => {
                const newUpdates = { ...prevUpdates };
                delete newUpdates[trainer_id];
                return newUpdates;
              });
              return updatedAttendance; // Exit early without tracking
            }
          }

          // Track updates for non-null status
          setUpdatedTrainers((prevUpdates) => ({
            ...prevUpdates,
            [trainer_id]: updatedAttendance,
          }));

          return updatedAttendance;
        }
        return attendance;
      })
    );
  };

  // Function to handle saving updated attendance
  const handleSave = () => {
    // Filter out trainers with `attendance_status` set to null
    const updatedData = Object.values(updatedTrainers)
      .filter(({ attendance_status }) => attendance_status !== null)
      .map(
        ({ trainer_id, check_in_time, check_out_time, attendance_status }) => ({
          trainer_id,
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
      .post("http://profit-backend.test/api/trainer-attendance", dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Attendance updated successfully:", response.data);
        toast.success("Attendance saved successfully!");
        setUpdatedTrainers({}); // Reset updates after successful save
      })
      .catch((error) => {
        if (
          "The attendance.0.check_out_time field must be a date after attendance.0.check_in_time."
        ) {
          toast.error("Checkout Date must be after the Check In time");
        } else {
          toast.error("Failed to save attendance!");
        }
      });
  };

  useEffect(() => {
    if (!selectedDate) {
      toast.error("Please choose a date!");
      return;
    }
    setLoading(true);
    axios
      .get(
        `http://profit-backend.test/api/trainer-attendance?attendance_date=${selectedDate}`,
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedDate]);

  return (
    <>
      <NavBar title="Trainer Attendance" />
      <div className="w-full bg-white">
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
          <TrainerAddAttendance
            attendanceData={attendanceData}
            handleAttendanceChange={handleAttendanceChange}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}

export default TrainerAttendance;
