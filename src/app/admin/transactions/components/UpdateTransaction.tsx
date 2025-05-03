"use client";
import { useAcceptTransaction } from "@/hooks/api/transaction/useAcceptedTransaction";
import { useRejectTransaction } from "@/hooks/api/transaction/useRejectTransaction";
import { useWaitingTransactions } from "@/hooks/api/transaction/useWaitingTransaction";

const AdminTransactionPage = () => {
  const { data: transactions, isLoading } = useWaitingTransactions();
  const { mutate: acceptTx } = useAcceptTransaction();
  const { mutate: rejectTx } = useRejectTransaction();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Transaksi Menunggu Konfirmasi</h1>
      {transactions?.length === 0 && <p>Tidak ada transaksi menunggu.</p>}
      <ul className="space-y-4">
        {transactions?.map((tx) => (
          <li key={tx.id} className="p-4 border rounded-md shadow-sm">
            <p>
              <strong>Nama:</strong> {tx.user?.name}
            </p>
            <p>
              <strong>Email:</strong> {tx.user?.email}
            </p>
            <p>
              <strong>Event ID:</strong> {tx.eventId}
            </p>
            <p>
              <strong>Harga:</strong> Rp{tx.totalPrice.toLocaleString()}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => acceptTx(tx.id)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Terima
              </button>
              <button
                onClick={() => rejectTx(tx.id)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Tolak
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTransactionPage;
