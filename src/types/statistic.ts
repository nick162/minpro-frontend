type StatisticTransaction = {
  totalRevenue: number;
  totalEvents: number;
  totalTickets: number;
  totalVouchers: number;
  monthlyRevenue: {
    month: string; // eg. "Jan", "Feb"
    revenue: number;
  }[];
  recentSales: {
    name: string;
    email: string;
    amount: number;
  }[];
};
