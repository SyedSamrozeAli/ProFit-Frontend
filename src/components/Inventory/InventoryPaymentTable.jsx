import React from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function InventoryPaymentTable({ paymentData, month, year }) {
  const navigate = useNavigate();

  const data = paymentData.map((payment) => ({
    inventory_id: payment.inventory_id,
    equipment_name: payment.equipment_name,
    payment_date: payment.payment_date ? payment.payment_date.split(' ')[0] : "--",
    payment_amount: payment.total_price,
    amount_paid: payment.amount_paid || "--",
    balance: payment.balance || "--",
    due_amount: payment.due_amount || "--",
    payment_method: payment.payment_method ? payment.payment_method.charAt(0).toUpperCase() + payment.payment_method.slice(1).toLowerCase() : "--",
    payment_status: payment.payment_status.charAt(0).toUpperCase() + payment.payment_status.slice(1).toLowerCase(),
  }));

  const column = [
    { name: "Inventory ID", selector: row => row.inventory_id, sortable: true, minWidth: '150px' },
    { name: "Equipment Name", selector: row => row.equipment_name, sortable: true, minWidth: '150px' },
    { name: "Payment Date", selector: row => row.payment_date, sortable: true, minWidth: '150px' },
    { name: "Payment Amount", selector: row => row.payment_amount, sortable: true, minWidth: '150px' },
    { name: "Paid Amount", selector: row => row.amount_paid, sortable: true, minWidth: '150px' },
    { name: "Balance", selector: row => row.balance, sortable: true, minWidth: '100px', cell: row => <span style={{ color: 'blue' }}>{row.balance}</span> },
    { name: "Dues", selector: row => row.due_amount, sortable: true, minWidth: '100px', cell: row => <span style={{ color: 'red' }}>{row.due_amount}</span> },
    { name: "Payment Method", selector: row => row.payment_method, sortable: true, minWidth: '100px' },
    {
      name: "Payment Status",
      selector: row => row.payment_status,
      sortable: true,
      minWidth: '100px',
      cell: row => (
        <span
          style={{
            backgroundColor: row.payment_status.toLowerCase() === 'pending' ? '#FFE8E8' : '#DFFFD7',
            color: row.payment_status.toLowerCase() === 'pending' ? '#EB0707' : '#0D7300',
            fontWeight: 500,
            padding: '5px 10px',
            borderRadius: '5px',
            display: 'inline-block',
          }}
        >
          {row.payment_status}
        </span>
      ),
    },
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
    navigate(`/admin/inventory/inventory-payment-Update?inventoryId=${payment.inventory_id}&month=${month}&year=${year}`);
  };

  const exportToPDF = async () => {
    const input = document.getElementById('table-to-export');
    if (!input) return;

    const canvas = await html2canvas(input);
    const image = canvas.toDataURL('image/png');

    const doc = new jsPDF();
    doc.addImage(image, 'PNG', 10, 10, 180, 150);
    doc.save('inventory_payment_data.pdf');
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
      <button
        className="mb-4 px-4 py-2 bg-red-600 text-white font-semibold rounded"
        onClick={exportToPDF}
      >
        Export to PDF
      </button>
      {data.length > 0 ? (
        <div id="table-to-export">
          <DataTable
            columns={column}
            data={data}
            customStyles={customStyles}
            striped
            fixedHeader
            pagination
            onRowClicked={handleRowClick}
          />
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No Inventory Information found matching your search date.
        </div>
      )}
    </div>
  );
}

export default InventoryPaymentTable;
