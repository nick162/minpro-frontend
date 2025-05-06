import AdminTransactionPage from "./components/UpdateTransaction";
import GetTransactionPage from "@/features/transaction.ts/getTransactions";

export default function TransactionsPage() {
  return (
    // <ProtectedRoute allowedRoles="EVENT_ORGANIZER">
    <div>
      <h1 className="text-2xl font-bold mb-4 dark:text-black">Transactions</h1>
      <p className="dark:text-black">Manage your transactions here</p>
      <GetTransactionPage />
      <AdminTransactionPage />
    </div>
    // </ProtectedRoute>
  );
}
