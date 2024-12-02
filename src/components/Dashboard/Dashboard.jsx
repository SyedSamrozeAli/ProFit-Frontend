import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import MonthlyInsights from "./Graphs/MonthlyInsights.jsx";
import ActiveMembers from "./Graphs/ActiveMembers";
import ExpenseDistribution from "./Graphs/ExpenseDistribution";
import NavBar from "../NavBar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeMembers: { value: 0, change: 0 },
    totalTrainers: { value: 0, change: 0 },
    totalRevenue: { value: 0, change: 0 },
    attendanceRate: { value: 0, change: 0 },
    totalExpense: { value: 0, change: 0 },
    totalProfit: { value: 0, change: 0 },
  });

  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [activeMembersData, activeMembersChange] = await Promise.all([
          axios.get("http://profit-backend.test/api/active-members", config),
          axios.get("http://profit-backend.test/api/members-growth", config),
        ]);

        const [trainersData, trainersChange] = await Promise.all([
          axios.get("http://profit-backend.test/api/active-trainers", config),
          axios.get("http://profit-backend.test/api/trainers-growth", config),
        ]);

        const [revenueData, revenueChange] = await Promise.all([
          axios.get("http://profit-backend.test/api/total-revenue", config),
          axios.get("http://profit-backend.test/api/revenue-growth", config),
        ]);

        const [attendanceRateData, attendanceRateChange] = await Promise.all([
          axios.get("http://profit-backend.test/api/attendance-rate", config),
          axios.get(
            "http://profit-backend.test/api/attendance-growth-rate",
            config
          ),
        ]);

        const [expenseData, expenseChange] = await Promise.all([
          axios.get("http://profit-backend.test/api/monthly-expense", config),
          axios.get(
            "http://profit-backend.test/api/expense-growth-rate",
            config
          ),
        ]);

        const [incomeData, incomeChange] = await Promise.all([
          axios.get("http://profit-backend.test/api/monthly-profit", config),
          axios.get(
            "http://profit-backend.test/api/monthly-profit-growth-rate",
            config
          ),
        ]);

        setStats({
          activeMembers: {
            value: activeMembersData.data.data.total_active_members,
            change: activeMembersChange.data.data.growth_percentage,
          },
          totalTrainers: {
            value: trainersData.data.data.total_active_trainers,
            change: trainersChange.data.data.growth_percentage,
          },
          totalRevenue: {
            value: revenueData.data.data.total_revenue,
            change: revenueChange.data.data.growth_percentage,
          },
          attendanceRate: {
            value: attendanceRateData.data.data.attendance_rate,
            change: attendanceRateChange.data.data.growth_percentage,
          },
          totalExpense: {
            value: expenseData.data.data.total_expenses,
            change: expenseChange.data.data.growth_rate,
          },
          totalProfit: {
            value: incomeData.data.data.total_profit,
            change: incomeChange.data.data.growth_rate_percentage,
          },
        });
      } catch (error) {
        toast.error("error in dahboard");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <NavBar title={"Dashboard"} />
      <div className="space-y-6 px-4 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Analytics</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatsCard
            title="Total Active Members"
            value={stats.activeMembers?.value || 0}
            change={stats.activeMembers?.change || 0}
            loading={loading}
          />
          <StatsCard
            title="Total Trainers"
            value={stats.totalTrainers?.value || 0}
            change={stats.totalTrainers?.change || 0}
            loading={loading}
          />
          <StatsCard
            title="Total Revenue"
            value={stats.totalRevenue?.value || 0}
            change={stats.totalRevenue?.change || 0}
            loading={loading}
          />
          <StatsCard
            title="Member Attendance Rate"
            value={stats.attendanceRate?.value || 0}
            change={stats.attendanceRate?.change || 0}
            loading={loading}
          />
          <StatsCard
            title="Total Expense"
            value={stats.totalExpense?.value || 0}
            change={stats.totalExpense?.change || 0}
            up={stats.totalExpense?.change < 0}
            loading={loading}
          />
          <StatsCard
            title="Total Profit"
            value={stats.totalProfit?.value || 0}
            change={stats.totalProfit?.change || 0}
            loading={loading}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          <MonthlyInsights />
          <div className="flex w-full flex-col justify-between gap-4 my-2 py-4 lg:flex-row">
            <ActiveMembers />
            <ExpenseDistribution />
          </div>
        </div>
      </div>
    </>
  );
}
