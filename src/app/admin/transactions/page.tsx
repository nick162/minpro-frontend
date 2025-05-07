import { auth } from "@/lib/auth";
import AdminTransactionPage from "./components/UpdateTransaction";
import GetTransactionPage from "@/features/transaction.ts/getTransactions";
import { redirect } from "next/navigation";

const TransactionsPage = async () => {
  const session = await auth();
  if (session?.user.role !== "EVENT_ORGANIZER") redirect("/login");
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 dark:text-black">Transactions</h1>
      <p className="dark:text-black">Manage your transactions here</p>
      <GetTransactionPage />
      <AdminTransactionPage />
    </div>
  );
};

export default TransactionsPage;
