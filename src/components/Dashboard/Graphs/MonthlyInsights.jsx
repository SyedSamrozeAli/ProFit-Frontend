import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MonthlyInsights() {
  const currentYear = new Date().getFullYear();
  const last5Years = Array.from({ length: 5 }, (_, i) => `${currentYear - i}`);

  const [selectedYear, setSelectedYear] = useState(last5Years[0]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Reset loading state on year change
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          `http://profit-backend.test/api/monthly-revenue-expense?year=${selectedYear}`,
          config
        );

        if (response.data.success) {
          setChartData(response.data.data);
        } else {
          toast.error("Failed to retrieve monthly insights.");
        }
      } catch (error) {
        toast.error("Failed to retrieve monthly insights.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedYear]);

  return (
    <div className="bg-white p-4 rounded-lg shadow col-span-2 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Monthly Expense Revenue Insights
        </h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-gray-100 text-sm px-2 py-1 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {last5Years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="h-[300px]">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-gray-300 animate-spin" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap={30}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip cursor={false} />
              <Legend iconType={"circle"} />
              <Bar dataKey="revenue" fill="#87CEEB" barSize={13} />
              <Bar dataKey="expense" fill="#FF0000" barSize={13} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
