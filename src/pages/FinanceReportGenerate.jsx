import FinanceReportForm from "../components/Forms/FinanceReportForm.jsx";
import NavBar from "../components/NavBar.jsx";

export default function FinanceReportPage() {
  return (
    <>
      <NavBar title="Manage Finance" />
      <div className="container mx-auto p-4 px-12">
        <h1 className="text-2xl font-bold mb-4 ">Finance Report Generation</h1>
        <FinanceReportForm />
      </div>
    </>
  );
}
