"use client";
import { useAcceptTransaction } from "@/hooks/api/transaction/useAcceptedTransaction";
import { useRejectTransaction } from "@/hooks/api/transaction/useRejectTransaction";
import { useWaitingTransactions } from "@/hooks/api/transaction/useWaitingTransaction";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminTransactionPage = () => {
  const { data: transactions, isLoading } = useWaitingTransactions();
  const { mutate: acceptTx } = useAcceptTransaction();
  const { mutate: rejectTx } = useRejectTransaction();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (!Array.isArray(transactions)) return <p>Data is invalid</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-black">
        Transaksi Menunggu Konfirmasi
      </h1>
      {transactions.length === 0 ? (
        <p className="text-gray-500">Tidak ada transaksi menunggu.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          {transactions.map((tx) => (
            <Card key={tx.id} className="shadow-md">
              <CardContent className="p-4 space-y-2">
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
                <div className="flex gap-2 mt-3">
                  <Button
                    onClick={() => acceptTx(tx.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Terima
                  </Button>
                  <Button
                    onClick={() => rejectTx(tx.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Tolak
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTransactionPage;
