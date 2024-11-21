import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { MdDeleteOutline } from "react-icons/md";
import { MdSecurityUpdate } from "react-icons/md";
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate } from 'react-router-dom';

function InventoryTable({ inventoryData = [], handleDeleteField }) {
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(inventoryData);

    const navigate = useNavigate();

    const handleUpdateField = (id) => {
        navigate(`/admin/inventory/update/${id}`);
    }

    const handleSearch = (event) => {
      const value = event.target.value.toLowerCase();
      setSearch(value);
      const filtered = inventoryData.filter(inventory =>
          inventory.equipment_name.toLowerCase().includes(value) ||
          inventory.supplier_name.toLowerCase().includes(value)
      );
      setFilteredData(filtered);
  };

  const data = filteredData.length > 0 ? filteredData.map((inventory) => ({
    ID: inventory.inventory_id,
    equipment_name: inventory.equipment_name,
    cost_per_unit: inventory.cost_per_unit,
    quantity:inventory.quantity,
    purchase_date: inventory.purchase_date?.split(" ")[0] || '',
    supplier_name: inventory.supplier_name,
    warranty_period:inventory.warranty_period,
    mantainance_date: inventory.mantainance_date,
    total_price: inventory.total_price,
    action: (
      <div className="flex space-x-2">
        <button onClick={() => handleDeleteField(inventory.inventory_id)} className='p-2'>
          <MdDeleteOutline className='text-xl' />
        </button>
        <button onClick={() => handleUpdateField(inventory.inventory_id)} className='p-2 '>
          <MdSecurityUpdate className='text-xl' />
        </button>
      </div>
    ),
  })) : [];

  const column = [
    {
      name: "Inventory ID",
      selector: row => row.ID,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: "Item Name",
      selector: (row) => row.equipment_name,
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Cost/Unit",
      selector: row => row.cost_per_unit,
      sortable: true,
      minWidth: '80px',
    },
    {
        name: "Total Cost",
        selector: row => row.total_price,
        sortable: true,
        minWidth: '120px'
    },
    {
      name: "Purcahse Date",
      selector: row => row.purchase_date,
      sortable: true,
      minWidth: '120px'
    },
    {
      name: "Qunatity",
      selector: row => row.quantity,
      sortable: true,
      minWidth: '120px'
    },
    {
      name: "Supplier Name",
      selector: row => row.supplier_name ? row.supplier_name : "Not Available",
      sortable: true,
      minWidth: '100px'
    },
    {
        name: "Warranty",
        selector: row => row.warranty_period,
        sortable: true,
        minWidth: '100px'
    },
    {
      name: "Maintenance Date",
      selector: (row) => row.mantainance_date,
      cell: (row) => {
        const mantainance_date = new Date(row.mantainance_date);
        const currentDate = new Date();
        const daysDifference = Math.ceil(
          (mantainance_date - currentDate) / (1000 * 60 * 60 * 24)
        );

        return (
          <span
            style={{
              color: daysDifference <= 7 ? "red" : "black",
              fontWeight: daysDifference <= 7 ? "bold" : "normal",
            }}
          >
            {row.mantainance_date}
          </span>
        );
      },
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "Action",
      selector: row => row.action,
      minWidth: '150px',
      cell: row => <div className="flex justify-center space-x-2">{row.action}</div>
    }
  ];

  const customStyles = {
    rows: {
      style: {
        borderBottom: '1px solid #E5E7EB',
      },
      stripedStyle: {
        backgroundColor: '#F9FAFB',
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        borderBottom: '2px solid #E5E7EB',
        backgroundColor: '#F3F4F6',
      },
    },
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search by Inventory Name , Supplier Name"
                className="border border-gray-300 rounded-lg px-4 py-2 w-1/3"
              />
          </div>
      {data.length > 0 ? (
        <DataTable
          columns={column}
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
