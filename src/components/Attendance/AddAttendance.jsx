import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function AddAttendance({ attendanceData, handleAttendanceChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(7);  
  const [filterStatus, setFilterStatus] = useState('All');

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = attendanceData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredRows = filterStatus === 'All' 
    ? currentRows 
    : currentRows.filter(row => row.attendance_status === filterStatus);

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Attendance Report', 14, 10);

    const tableData = attendanceData.map((attendance) => [
      attendance.member_name || 'N/A',
      attendance.attendance_date || 'N/A',
      attendance.attendance_status || 'N/A',
      attendance.check_in_time || 'N/A',
      attendance.check_out_time || 'N/A',
    ]);

    doc.autoTable({
      head: [
        ['Member Name', 'Date', 'Status', 'Check-In Time', 'Check-Out Time'],
      ],
      body: tableData,
    });

    doc.save('attendance-report.pdf');
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex justify-between">
        <div>
          <label htmlFor="filter" className="mr-2">Filter by Status:</label>
          <select
            id="filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-md px-2 py-1"
          >
            <option value="All">All</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <button
          onClick={exportToPDF}
          className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Export to PDF
        </button>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Member Name</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Check-In</th>
            <th className="border border-gray-300 px-4 py-2">Check-Out</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((attendance) => (
            <tr
              key={attendance.member_id}
              className={
                attendance.attendance_status === 'Present'
                  ? 'bg-green-100'
                  : attendance.attendance_status === 'Absent'
                  ? 'bg-red-100'
                  : ''
              }
            >
              <td className="border border-gray-300 px-4 py-2">{attendance.member_name}</td>
              <td className="border border-gray-300 px-4 py-2">{attendance.attendance_date}</td>
              
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={attendance.attendance_status}
                  onChange={(e) =>
                    handleAttendanceChange(attendance.member_id, 'attendance_status', e.target.value)
                  }
                  className="border rounded-md px-2 py-1"
                >
                  <option value="Null">null</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="time"
                  value={attendance.check_in_time || ''}
                  disabled={attendance.attendance_status === 'Absent' || attendance.attendance_status === 'Null'}
                  onChange={(e) =>
                    handleAttendanceChange(attendance.member_id, 'check_in_time', e.target.value)
                  }
                  className="border rounded-md px-2 py-1"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="time"
                  value={attendance.check_out_time || ''}
                  disabled={attendance.attendance_status === 'Absent' || attendance.attendance_status === 'Null'}
                  onChange={(e) =>
                    handleAttendanceChange(attendance.member_id, 'check_out_time', e.target.value)
                  }
                  className="border rounded-md px-2 py-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Prev
        </button>
        <span className="text-sm">Page {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * rowsPerPage >= attendanceData.length}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AddAttendance;
