"use client";
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

const data = [
  { month: "Jan", revenue: 1000000 },
  { month: "Feb", revenue: 6200000 },
  { month: "Mar", revenue: 3000000 },
  { month: "Apr", revenue: 6500000 },
];

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="relative">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total Revenue</CardTitle>
            <Eye className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            *** *** *** ***
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">+5</CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Total Tickets</CardTitle>
            <Ticket className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent className="text-2xl font-semibold">+8</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Vouchers</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">+1</CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Overview</CardTitle>
            <select className="text-sm border rounded px-2 py-1">
              <option>2025</option>
              <option>2024</option>
            </select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <XAxis dataKey="month" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#EA7B27" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <p className="text-sm text-muted-foreground">
              You have made 12 sales so far.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Budi Jancok", email: "budi@mail.com", amount: 700000 },
              { name: "Budi Jancok", email: "budi@mail.com", amount: 4000000 },
              { name: "joko jancok", email: "joko@mail.com", amount: 400000 },
              { name: "joko jancok", email: "joko@mail.com", amount: 250000 },
              { name: "Budi Jancok", email: "budi@mail.com", amount: 1000000 },
            ].map((sale, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-medium">{sale.name}</p>
                  <p className="text-gray-500">{sale.email}</p>
                </div>
                <p className="font-semibold text-right">
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

export default DashboardPage;
