import { ArrowUpIcon, ArrowDownIcon, Loader2 } from "lucide-react";

export default function StatsCard({
  title,
  value,
  change,
  up = false,
  loading,
}) {
  const isPositive = change >= 0;
 
  return (
    <div className="bg-white p-4 rounded-lg shadow relative min-h-[120px]">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-gray-300 animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{title}</p>
              <h3 className="text-2xl font-bold mt-1">{value}</h3>
            </div>
            <div
              className={`flex items-center ${
                isPositive ? "text-green-500 " : "text-red-500"
              }`}
            >
              {up || isPositive ? (
                <ArrowUpIcon size={16} />
              ) : (
                <ArrowDownIcon size={16} />
              )}
              <span className="ml-1 font-semibold">{Math.abs(change)}%</span>
            </div>  
          </div>
          <p className="text-xs text-gray-400 mt-2">Since last month</p>
        </>
      )}
    </div>
  );
}
