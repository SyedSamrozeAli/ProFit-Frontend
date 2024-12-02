import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const FinanceReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token"); // Replace with your actual token retrieval method

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://profit-backend.test/api/finance-report-generation`,
        {
          params: {
            start_date: startDate,
            end_date: endDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Handle binary data
        }
      );

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `finance_report_${startDate}_to_${endDate}.pdf`
      );

      // Append the link to the document, trigger click, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Report generated succesfully");
    } catch (err) {
      console.error(err);
      toast.error("An error occured while generating report.");
      setError(
        "An error occurred while generating the report. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-4 flex-col w-72">
        <div>
          <label
            htmlFor="start-date"
            className="block text-sm font-medium text-gray-600"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="end-date"
            className="block text-sm font-medium text-gray-600"
          >
            End Date:
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-red-600 hover:bg-red-700 text-md text-white px-4 py-2  rounded-lg cursor-pointer transition-colors duration-300 flex items-center justify-center"
        >
          {isLoading ? "Generating..." : "Generate Report"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FinanceReport;
