import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const COLORS = ["#FF0000", "#FFD700", "#87CEEB", "#98FB98"];

export default function ExpenseDistribution() {
  const currentYear = new Date().getFullYear();
  const last5Years = Array.from({ length: 5 }, (_, i) => `${currentYear - i}`);

  const [selectedYear, setSelectedYear] = useState(last5Years[0]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const response = await axios.get(
          `http://profit-backend.test/api/monthly-expense-distribution?year=${selectedYear}`,
          config
        );

        if (response.data.success) {
          // Transform the object into an array of { name, value } objects
          const transformedData = Object.entries(response.data.data).map(
            ([key, value]) => ({ name: key, value: parseFloat(value) })
          );
          setChartData(transformedData);
        } else {
          toast.error("Failed to retrieve data.");
        }
      } catch (error) {
        toast.error("Error loading data. Please try again.");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedYear]);

  return (
    <div className="bg-white p-4 rounded-lg shadow col-span-2 relative w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Expense Distribution</h2>
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
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType={"circle"} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
