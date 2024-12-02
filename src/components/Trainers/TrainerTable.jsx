import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { MdDeleteOutline } from "react-icons/md";
import { MdSecurityUpdate } from "react-icons/md";
import StarRatings from "react-star-ratings";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

function TrainerTable({ trainerData = [], handleDeleteField }) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(trainerData);
  const navigate = useNavigate();

  const handleUpdateField = (id) => {
    navigate(`/admin/trainers/update/${id}`);
  };

  // Filter data based on search input
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    const filtered = trainerData.filter(
      (trainer) =>
        trainer.trainer_name.toLowerCase().includes(value) ||
        trainer.trainer_id.toString().includes(value) ||
        trainer.hire_date.includes(value)
    );
    setFilteredData(filtered);
  };

  // Export table data to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "ID",
      "Name",
      "Age",
      "Hire Date",
      "Salary",
      "Rating",
      "Status",
    ];
    const tableRows = [];

    filteredData.forEach((trainer) => {
      const row = [
        trainer.trainer_id,
        trainer.trainer_name,
        trainer.age,
        trainer.hire_date.split(" ")[0],
        Math.floor(trainer.salary),
        trainer.rating,
        "Active",
      ];
      tableRows.push(row);
    });

    doc.text("Trainer Data", 14, 10);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("trainer_data.pdf");
  };

  // Map the filtered data
  const data =
    filteredData.length > 0
      ? filteredData.map((trainer) => ({
          ID: trainer.trainer_id,
          Name: trainer.trainer_name,
          Age: trainer.age,
          Hire_Date: trainer.hire_date,
          status: "Active",
          Rating: (
            <StarRatings
              rating={parseFloat(trainer.rating)}
              starRatedColor="gold"
              starEmptyColor="gray"
              numberOfStars={5}
              starDimension="20px"
              starSpacing="1px"
            />
          ),
          Salary: Math.floor(trainer.salary),
          action: (
            <div className="flex space-x-2">
              <button
                onClick={() => handleDeleteField(trainer.trainer_id)}
                className="p-2"
              >
                <MdDeleteOutline className="text-xl" />
              </button>
              <button
                onClick={() => handleUpdateField(trainer.trainer_id)}
                className="p-2 "
              >
                <MdSecurityUpdate className="text-xl" />
              </button>
            </div>
          ),
        }))
      : [];

  const column = [
    {
      name: "ID",
      selector: (row) => row.ID,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Age",
      selector: (row) => row.Age,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Hire Date",
      selector: (row) => row.Hire_Date.split(" ")[0],
      sortable: true,
      minWidth: "120px",
    },
    {
      name: "Salary",
      selector: (row) => row.Salary,
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Rating",
      selector: (row) => row.Rating,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          style={{
            color: row.status === "Active" ? "#0D7300" : "#EB0707",
            background: row.status === "Active" ? "#DFFFD7" : "#FFE8E8",
            padding: "4px",
            borderRadius: "6px",
            display: "inline-block",
          }}
        >
          {row.status}
        </span>
      ),
      minWidth: "120px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      minWidth: "150px",
      cell: (row) => (
        <div className="flex justify-center space-x-2">{row.action}</div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        borderBottom: "1px solid #E5E7EB",
      },
      stripedStyle: {
        backgroundColor: "#F9FAFB",
      },
      "&:hover": {
        backgroundColor: "#f3f4f6",
      },
      cursor: "pointer",
    },
    headCells: {
      style: {
        fontWeight: "bold",
        borderBottom: "2px solid #E5E7EB",
        backgroundColor: "#F3F4F6",
      },
    },
  };

  const handleRowClick = (row) => {
    navigate(`/admin/trainer/details/${row.ID}`);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by Trainer Name, ID, Hire Date."
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
        />
        <button
          onClick={exportToPDF}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Export to PDF
        </button>
      </div>
      {data.length > 0 ? (
        <DataTable
          columns={column}
          data={data}
          customStyles={customStyles}
          striped
          fixedHeader
          pagination
          onRowClicked={handleRowClick}
        />
      ) : (
        <div className="flex justify-center items-center h-48">
          <div>No trainers found.</div>
        </div>
      )}
    </div>
  );
}

export default TrainerTable;
