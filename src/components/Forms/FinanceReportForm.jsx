"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

export default function FinanceReportForm() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    setPdfUrl(null);

    try {
      const response = await fetch(
        `/api/finance-report?startDate=${data.startDate}&endDate=${data.endDate}`
      );
      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      setError(
        "An error occurred while generating the report. Please try again."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `finance_report_${format(new Date(), "yyyy-MM-dd")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          {...form.register("startDate", {
            required: "Start date is required",
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {form.formState.errors.startDate && (
          <span className="text-red-500 text-sm">
            {form.formState.errors.startDate.message}
          </span>
        )}
      </div>

      <div>
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700"
        >
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          {...form.register("endDate", { required: "End date is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        {form.formState.errors.endDate && (
          <span className="text-red-500 text-sm">
            {form.formState.errors.endDate.message}
          </span>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {pdfUrl && (
        <div>
          <button
            onClick={handleDownload}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Download Report
          </button>
        </div>
      )}
    </form>
  );
}
