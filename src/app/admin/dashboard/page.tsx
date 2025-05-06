"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye, Ticket, Gift, Calendar } from "lucide-react";
import { useGetStatisticTransaction } from "@/hooks/api/transaction/useGetStatisticTransaction";

const DashboardPage = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());
  const [range, setRange] = useState<"6months" | "12months">("6months");

  const { data, isLoading } = useGetStatisticTransaction({ year, range });

  if (isLoading || !data) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          icon={<Eye className="w-5 h-5 text-muted-foreground" />}
          value={`Rp ${data.totalRevenue.toLocaleString()}`}
        />
        <StatCard
          title="Total Events"
          icon={<Calendar className="w-5 h-5 text-muted-foreground" />}
          value={data.totalEvents}
        />
        <StatCard
          title="Total Tickets"
          icon={<Ticket className="w-5 h-5 text-muted-foreground" />}
          value={data.totalTickets}
        />
        <StatCard
          title="Total Vouchers"
          icon={<Gift className="w-5 h-5 text-muted-foreground" />}
          value={data.totalVouchers}
        />
      </div>

      {/* Chart & Sales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <Card className="col-span-2 bg-card">
          <CardHeader className="flex items-center justify-between gap-2">
            <CardTitle>Monthly Revenue Overview</CardTitle>
            <div className="flex gap-2">
              <select
                className="text-sm border bg-background border-border rounded px-2 py-1"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {[currentYear, currentYear - 1, currentYear - 2].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                className="text-sm border bg-background border-border rounded px-2 py-1"
                value={range}
                onChange={(e) =>
                  setRange(e.target.value as "6months" | "12months")
                }
              >
                <option value="6months">6 Bulan</option>
                <option value="12months">1 Tahun</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.overview}>
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#EA7B27" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 space-y-2">
              <h3 className="font-semibold text-primary">
                Statistik Per Bulan
              </h3>
              <ul className="text-sm space-y-1">
                {data.overview.map((item: any) => {
                  const isMax =
                    item.revenue ===
                    Math.max(...data.overview.map((d: any) => d.revenue));
                  return (
                    <li
                      key={item.month}
                      className="flex justify-between items-center border-b pb-1 text-muted-foreground"
                    >
                      <span>
                        {item.month}
                        {isMax && (
                          <span className="ml-2 text-yellow-500 font-semibold">
                            ⭐️ Tertinggi
                          </span>
                        )}
                      </span>
                      <span className="font-medium text-primary">
                        Rp {item.revenue.toLocaleString()}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Recent Sales */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <p className="text-sm text-muted-foreground">
              {data.recentSales.length} sales in total
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.recentSales.map((sale: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-medium text-primary">{sale.name}</p>
                  <p className="text-muted-foreground">{sale.email}</p>
                </div>
                <p className="font-semibold text-right text-primary">
                  +Rp {sale.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  icon,
  value,
}: {
  title: string;
  icon: React.ReactNode;
  value: number | string;
}) => (
  <Card className="bg-card">
    <CardHeader className="flex items-center justify-between">
      <CardTitle>{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent className="text-2xl font-semibold text-primary">
      {value}
    </CardContent>
  </Card>
);

export default DashboardPage;
