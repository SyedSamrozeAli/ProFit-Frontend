import React from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function TrainerPaymentTable({ paymentData, month, year }) {
  const navigate = useNavigate();

  const data = paymentData.map((payment) => ({
    trainer_id: payment.trainer_id,
    trainer_name: payment.trainer_name,
    payment_date: payment.payment_date ? payment.payment_date.split(' ')[0] : "--",
    paid_amount: payment.paid_amount || "--",
    balance: payment.balance || "--",
    dues: payment.dues || "--",
    salary: parseInt(payment.salary, 10),
    payment_method: payment.payment_method ? payment.payment_method.charAt(0).toUpperCase() + payment.payment_method.slice(1).toLowerCase() : "--",
    payment_status: payment.payment_status.charAt(0).toUpperCase() + payment.payment_status.slice(1).toLowerCase(),
  }));

  const column = [
    { name: "Trainer ID", selector: row => row.trainer_id, sortable: true, minWidth: '150px' },
    { name: "Trainer Name", selector: row => row.trainer_name, sortable: true, minWidth: '150px' },
    { name: "Payment Date", selector: row => row.payment_date, sortable: true, minWidth: '150px' },
    { name: "Balance", selector: row => row.balance, sortable: true, minWidth: '100px', cell: row => (<span style={{ color: 'blue' }}>{row.balance}</span>) },
    { name: "Dues", selector: row => row.dues, sortable: true, minWidth: '100px', cell: row => (<span style={{ color: 'red' }}>{row.dues}</span>) },
    { name: "Salary", selector: row => row.salary, sortable: true, minWidth: '100px' },
    { name: "Payment Method", selector: row => row.payment_method, sortable: true, minWidth: '100px' },
    { name: "Payment Status", selector: row => row.payment_status, sortable: true, minWidth: '100px', cell: row => (
      <span style={{
        backgroundColor: row.payment_status.toLowerCase() === 'pending' ? '#FFE8E8' : '#DFFFD7',
        color: row.payment_status.toLowerCase() === 'pending' ? '#EB0707' : '#0D7300',
        fontWeight: 500,
        padding: '5px 10px',
        borderRadius: '5px',
        display: 'inline-block',
      }}>
        {row.payment_status}
      </span>
    )},
  ];

  const customStyles = {
    rows: { style: { borderBottom: '1px solid #E5E7EB' } },
    headCells: {
      style: {
        fontWeight: 'bold',
        borderBottom: '2px solid #E5E7EB',
        backgroundColor: '#F3F4F6',
      },
    },
  };

  const handleRowClick = (payment) => {
    navigate(`/admin/trainer/trainer-payment-Update?trainerId=${payment.trainer_id}&month=${month}&year=${year}`);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Trainer Payment Report - ${month}/${year}`, 14, 10);

    const tableColumn = ["Trainer ID", "Trainer Name", "Payment Date", "Balance", "Dues", "Salary", "Payment Method", "Payment Status"];
    const tableRows = data.map(payment => [
      payment.trainer_id,
      payment.trainer_name,
      payment.payment_date,
      payment.balance,
      payment.dues,
      payment.salary,
      payment.payment_method,
      payment.payment_status,
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 10 },
    });

    doc.save(`TrainerPaymentReport_${month}_${year}.pdf`);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
      <button
        onClick={exportToPDF}
        className="mb-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-blue-600"
      >
        Export to PDF
      </button>
      {/* Data Table */}
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
        <div className="text-center py-8 text-gray-500">
          No Trainers found matching your search query.
        </div>
      )}
    </div>
  );
}

export default TrainerPaymentTable;
