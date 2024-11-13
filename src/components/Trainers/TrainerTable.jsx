import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { MdDeleteOutline } from "react-icons/md";
import { MdSecurityUpdate } from "react-icons/md";
import StarRatings from 'react-star-ratings';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate } from 'react-router-dom';

function TrainerTable({ trainerData = [], handleDeleteField }) {
    
    const navigate = useNavigate();
    
    const handleUpdateField = (id) => {
        navigate(`/admin/trainers/update/${id}`);
    }

  const data = trainerData.length > 0 ? trainerData.map((trainer) => ({
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
        <button onClick={() => handleDeleteField(trainer.trainer_id)} className='p-2'>
          <MdDeleteOutline className='text-xl' />
        </button>
        <button onClick={() => handleUpdateField(trainer.trainer_id)} className='p-2 '>
          <MdSecurityUpdate className='text-xl' />
        </button>
      </div>
    ),
  })) : [];

  const column = [
    {
      name: "ID",
      selector: row => row.ID,
      sortable: true,
      minWidth: '80px'
    },
    {
      name: "Name",
      selector: row => row.Name,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: "Age",
      selector: row => row.Age,
      sortable: true,
      minWidth: '80px'
    },
    {
      name: "Hire Date",
      selector: row => row.Hire_Date.split(' ')[0],
      sortable: true,
      minWidth: '120px'
    },
    {
      name: "Salary",
      selector: row => row.Salary,
      sortable: true,
      minWidth: '100px'
    },
    {
      name: "Rating",
      selector: row => row.Rating,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: "Status",
      selector: row => row.status,
      cell: row => (
        <span style={{
          color: row.status === 'Active' ? '#0D7300' : '#EB0707',
          background: row.status === 'Active' ? '#DFFFD7' : '#FFE8E8',
          padding: '4px',
          borderRadius: '6px',
          display: 'inline-block'
        }}>
          {row.status}
        </span>
      ),
      minWidth: '120px'
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
          <div style={{ width: '80px', height: '80px' }}>
            <CircularProgressbar
              value={loadingProgress}
              text={`${loadingProgress}%`}
              styles={buildStyles({
                pathColor: '#FF0000',
                textColor: '#09f',
                trailColor: '#FFFFFF',
                textSize: '12px',
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainerTable;
