import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { MdDeleteOutline } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";

function EquipmentTable({ equipmentData = [], handleDeleteField }) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Update filteredData whenever equipmentData or search changes
  useEffect(() => {
    const filtered = equipmentData.filter((equipment) => {
      const equipmentName = equipment.equipment_name?.toLowerCase() || "";
      const price = String(equipment.price || ""); // Convert price to string
      return (
        equipmentName.includes(search.toLowerCase()) ||
        price.includes(search)
      );
    });
    setFilteredData(filtered);
  }, [equipmentData, search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const data = filteredData.map((equipment) => ({
    ID: equipment.equipment_id,
    equipment_name: equipment.equipment_name,
    category: equipment.category,
    quantity: equipment.quantity,
    price: equipment.price,
    description: equipment.description,
    status: equipment.status || "Out of Stock",
    action: (
      <div className="flex space-x-2">
        <button
          onClick={() => handleDeleteField(equipment.equipment_id)}
          className="p-2"
        >
          <MdDeleteOutline className="text-xl" />
        </button>
      </div>
    ),
  }));

  const columns = [
    {
      name: "Equipment ID",
      selector: (row) => row.ID,
      sortable: true,
    },
    {
      name: "Equipment Name",
      selector: (row) => row.equipment_name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          style={{
            color: row.status === "In Stock" ? "#0D7300" : "#EB0707",
            background: row.status === "In Stock" ? "#DFFFD7" : "#FFE8E8",
            padding: "4px",
            borderRadius: "6px",
            display: "inline-block",
          }}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  const customStyles = {
    rows: {
      style: {
        padding: "8px",
        borderBottom: "1px solid #E5E7EB",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        textAlign: "center",
        padding: "8px",
        borderBottom: "2px solid #E5E7EB",
        backgroundColor: "#F3F4F6",
      },
    },
    cells: {
      style: {
        padding: "8px",
        textAlign: "center",
      },
    },
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Equipment List", 14, 10);

    const tableData = filteredData.map((equipment) => [
      equipment.equipment_id,
      equipment.equipment_name,
      equipment.category,
      equipment.quantity,
      equipment.price,
      equipment.description,
      equipment.status || "Out of Stock",
    ]);

    doc.autoTable({
      head: [
        [
          "Equipment ID",
          "Name",
          "Category",
          "Quantity",
          "Price",
          "Description",
          "Status",
        ],
      ],
      body: tableData,
    });

    doc.save("equipment-list.pdf");
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by Equipment Name or Price"
          className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
        />
        <button
          onClick={exportToPDF}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Export PDF
        </button>
      </div>
      {data.length > 0 ? (
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          striped
          fixedHeader
          pagination
        />
      ) : (
        <div className="flex justify-center items-center h-48">
          <div>Oops! No Equipment found.</div>
        </div>
      )}
    </div>
  );
}

export default EquipmentTable;
