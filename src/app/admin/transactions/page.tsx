import AdminTransactionPage from "./components/UpdateTransaction";
import GetTransactionPage from "@/features/transaction.ts/getTransactions";

export default function TransactionsPage() {
  return (
    // <ProtectedRoute allowedRoles="EVENT_ORGANIZER">
    <div>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <p>Manage your transactions here</p>
      <GetTransactionPage />
      <AdminTransactionPage />
    </div>
    // </ProtectedRoute>
  );
}
