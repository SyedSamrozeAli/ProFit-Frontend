import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { MdDeleteOutline } from "react-icons/md";
import { MdSecurityUpdate } from "react-icons/md";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate } from 'react-router-dom';

function MemberTable({ memberData = [], handleDeleteField }) {
    
    const navigate = useNavigate();
    
    const handleUpdateField = (id) => {
        navigate(`/admin/member/update/${id}`);
    }

  const data = memberData.length > 0 ? memberData.map((member) => ({
    // ID: member.member_id,
    member_name: member.member_name,
    membership_Type: member.membership_type,
    start_date: member.start_date?.split(" ")[0] || '',
    trainer_name: member.trainer_name,
    status: "Active",
    action: (
      <div className="flex space-x-2">
        <button onClick={() => handleDeleteField(member.member_id)} className='p-2'>
          <MdDeleteOutline className='text-xl' />
        </button>
        <button onClick={() => handleUpdateField(member.member_id)} className='p-2 '>
          <MdSecurityUpdate className='text-xl' />
        </button>
      </div>
    ),
  })) : [];

  const column = [
    {
      name: "Name",
      selector: row => row.member_name,
      sortable: true,
      minWidth: '150px'
    },
    {
      name: "Membership Type",
      selector: row => row.membership_Type,
      sortable: true,
      minWidth: '80px',
      cell: row => (
        <span style={{
          color: row.membership_Type === 'Premium' ? '#FFD700' : '#00796B',
        }}>
          {row.membership_Type}
        </span>
      ),
    },
    {
      name: "Admission Date",
      selector: row => row.start_date,
      sortable: true,
      minWidth: '120px'
    },
    {
      name: "Trainer Name",
      selector: row => row.trainer_name ? row.trainer_name : "Not Available",
      sortable: true,
      minWidth: '100px'
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

export default MemberTable;
