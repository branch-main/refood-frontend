import { ResponsiveContainer, AreaChart, XAxis, Tooltip, Area } from "recharts";

export const WeeklyEarningsChart = ({ data }: { data: number[] }) => {
  const chartData = ["L", "M", "M", "J", "V", "S", "D"].map((day, i) => ({
    day,
    value: data[i],
  }));

  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888", fontSize: 12 }}
          />

          <Tooltip
            cursor={false}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
            formatter={(value: number) => [`S/ ${value}`, "Ganancias"]}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={2.5}
            fill="url(#colorEarnings)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
