import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { MdDeleteOutline, MdSecurityUpdate } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

function InventoryTable({ inventoryData = [], handleDeleteField }) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(inventoryData);

  const navigate = useNavigate();

  const handleUpdateField = (id) => {
    navigate(`/admin/inventory/update/${id}`);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    const filtered = inventoryData.filter(
      (inventory) =>
        inventory.equipment_name.toLowerCase().includes(value) ||
        inventory.supplier_name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const data = filteredData.length
    ? filteredData.map((inventory) => ({
        ID: inventory.inventory_id,
        equipment_name: inventory.equipment_name,
        cost_per_unit: inventory.cost_per_unit,
        quantity: inventory.quantity,
        purchase_date: inventory.purchase_date?.split(" ")[0] || "",
        supplier_name: inventory.supplier_name,
        warranty_period: inventory.warranty_period,
        maintenance_date: inventory.mantainance_date,
        total_price: inventory.total_price,
        action: (
          <div className="flex space-x-2">
            <button
              onClick={() => handleDeleteField(inventory.inventory_id)}
              className="p-2"
            >
              <MdDeleteOutline className="text-xl" />
            </button>
            <button
              onClick={() => handleUpdateField(inventory.inventory_id)}
              className="p-2"
            >
              <MdSecurityUpdate className="text-xl" />
            </button>
          </div>
        ),
      }))
    : [];

  const columns = [
    { name: "Inventory ID", selector: (row) => row.ID, sortable: true },
    { name: "Item Name", selector: (row) => row.equipment_name, sortable: true },
    { name: "Cost/Unit", selector: (row) => row.cost_per_unit, sortable: true },
    { name: "Total Cost", selector: (row) => row.total_price, sortable: true },
    { name: "Purchase Date", selector: (row) => row.purchase_date, sortable: true },
    { name: "Quantity", selector: (row) => row.quantity, sortable: true },
    {
      name: "Supplier Name",
      selector: (row) => row.supplier_name || "Not Available",
      sortable: true,
    },
    { name: "Warranty", selector: (row) => row.warranty_period, sortable: true },
    {
      name: "Maintenance Date",
      selector: (row) => row.maintenance_date,
      cell: (row) => {
        const maintenanceDate = new Date(row.maintenance_date);
        const currentDate = new Date();
        const daysDifference = Math.ceil(
          (maintenanceDate - currentDate) / (1000 * 60 * 60 * 24)
        );

        return (
          <span
            style={{
              color: daysDifference <= 7 ? "red" : "black",
              fontWeight: daysDifference <= 7 ? "bold" : "normal",
            }}
          >
            {row.maintenance_date}
          </span>
        );
      },
      sortable: true,
    },
    { name: "Action", selector: (row) => row.action },
  ];

  const customStyles = {
    rows: {
      style: {
        borderBottom: "1px solid #E5E7EB",
      },
      stripedStyle: {
        backgroundColor: "#F9FAFB",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        borderBottom: "2px solid #E5E7EB",
        backgroundColor: "#F3F4F6",
      },
    },
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Inventory Data", 14, 15);

    const tableColumnHeaders = columns.map((col) => col.name);
    const tableRows = data.map((row) =>
      columns.map((col) => {
        const selector = col.selector || (() => "--");
        return selector(row);
      })
    );

    doc.autoTable({
      head: [tableColumnHeaders],
      body: tableRows,
      startY: 20,
      theme: "striped",
    });

    doc.save("inventory_data.pdf");
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by Inventory Name, Supplier Name"
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
          columns={columns}
          data={data}
          customStyles={customStyles}
          striped
          fixedHeader
          pagination
        />
      ) : (
        <div className="flex justify-center items-center h-48">
          <div>Oops! No Inventory found.</div>
        </div>
      )}
    </div>
  );
}

export default InventoryTable;