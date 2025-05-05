import { ProtectedRoute } from "@/components/ProtectedRoute";
import AdminTransactionPage from "./components/UpdateTransaction";

export default function TransactionsPage() {
  return (
    // <ProtectedRoute allowedRoles="EVENT_ORGANIZER">
    <div>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <p>Manage your transactions here</p>
      <AdminTransactionPage />
    </div>
    // </ProtectedRoute>
  );
}
