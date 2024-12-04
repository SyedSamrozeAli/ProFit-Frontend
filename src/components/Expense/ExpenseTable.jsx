import DataTable from "react-data-table-component";
import { MdDeleteOutline } from "react-icons/md";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

function ExpenseTable({ expenseData = [], handleDeleteField }) {
  const navigate = useNavigate();

  const data = expenseData.map((expense) => ({
    expense_id: expense.expense_id,
    expense_category_name:
      expense.expense_category_name.charAt(0).toUpperCase() +
      expense.expense_category_name.slice(1),
    payment_amount: expense.payment_amount,
    due_date: expense.due_date,
    payment_method: expense.payment_method || "--",
    expense_status:
      expense.expense_status.charAt(0).toUpperCase() +
      expense.expense_status.slice(1),
    paid_amount: expense.amount || "--",
    action: (
      <div className="flex space-x-2">
        <button
          onClick={() => handleDeleteField(expense.expense_id)}
          className="p-2"
        >
          <MdDeleteOutline className="text-xl" />
        </button>
      </div>
    ),
  }));

  const column = [
    {
      name: "Expense ID",
      selector: (row) => row.expense_id,
      sortable: true,
      minWidth: "80px",
    },
    {
      name: "Expense Name",
      selector: (row) => row.expense_category_name,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Due Amount",
      selector: (row) => parseInt(row.payment_amount, 10),
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Paid Amount",
      selector: (row) => row.paid_amount,
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Due Date",
      selector: (row) => row.due_date,
      sortable: true,
      minWidth: "120px",
    },
    {
      name: "Payment Method",
      selector: (row) => row.payment_method,
      sortable: true,
      minWidth: "100px",
    },
    {
      name: "Status",
      selector: (row) => row.expense_status,
      cell: (row) => (
        <span
          style={{
            backgroundColor:
              row.expense_status.toLowerCase() === "pending"
                ? "#FFE8E8"
                : "#DFFFD7",
            color:
              row.expense_status.toLowerCase() === "pending"
                ? "#EB0707"
                : "#0D7300",
            padding: "5px",
            borderRadius: "6px",
            display: "inline-block",
            fontWeight: "500",
          }}
        >
          {row.expense_status}
        </span>
      ),
      minWidth: "120px",
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

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Expense Data", 14, 15);

    const tableColumnHeaders = column.map((col) => col.name);
    const tableRows = data.map((row) =>
      column.map((col) => {
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

    doc.save("expense_data.pdf");
  };

  const handleRowClick = (row) => {
    console.log(row);
    navigate(`/admin/other/expense/details/${row.expense_id}`);
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Expense Data</h2>
        <button
          onClick={exportToPDF}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Export to PDF
        </button>
      </div>
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
  );
}

export default ExpenseTable;
