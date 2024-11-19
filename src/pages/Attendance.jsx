import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceTable = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Fetch initial members data
    const fetchMembers = async () => {
      try {
        const response = await axios.get("/api/members");
        setMembers(
          response.data.map((member) => ({
            ...member,
            time_in: "",
            time_out: "",
            status: "-", // Default status
          }))
        );
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSave = async () => {
    const payload = {
      attendance: members.map((member) => ({
        member_id: member.id,
        time_in: member.time_in,
        time_out: member.time_out,
        status: member.status,
      })),
    };

    try {
      await axios.post("/api/attendance/save", payload);
      alert("Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Failed to save attendance.");
    }
  };

  // Function to determine row color based on status
  const getRowStyle = (status) => {
    switch (status) {
      case "Present":
        return { backgroundColor: "rgba(144, 238, 144, 0.5)" }; // Light green
      case "Absent":
        return { backgroundColor: "rgba(255, 99, 71, 0.5)" }; // Light red
      default:
        return {}; // No color
    }
  };

  return (
    <div>
      <h3>Manage Attendance</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.id} style={getRowStyle(member.status)}>
              <td>{member.name}</td>
              <td>
                <input
                  type="time"
                  value={member.time_in}
                  onChange={(e) =>
                    handleInputChange(index, "time_in", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="time"
                  value={member.time_out}
                  onChange={(e) =>
                    handleInputChange(index, "time_out", e.target.value)
                  }
                />
              </td>
              <td>
                <select
                  value={member.status}
                  onChange={(e) =>
                    handleInputChange(index, "status", e.target.value)
                  }
                >
                  <option value="-">-</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default AttendanceTable;