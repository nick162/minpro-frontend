"use client";
import useGetTransactionById from "@/hooks/api/transaction/useGetTransactionById";
import React from "react";

interface EventDetailTransactionProps {
  transactionId: string;
}

const GetTransactionById: React.FC<EventDetailTransactionProps> = ({
  transactionId,
}) => {
  const { transaction, loading, error } = useGetTransactionById(transactionId);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error || !transaction)
    return (
      <p className="p-6 text-red-600">{error || "Transaction not found."}</p>
    );

  const totalPrice = transaction.transactionDetails.reduce(
    (sum, detail) => sum + detail.ticket.price,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Order Details */}
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold">Order Detail</h1>

        <div>
          <h2 className="text-lg font-semibold">
            {transaction.event.eventName}
          </h2>
          <p className="text-sm">📍 {transaction.event.category}</p>
          {transaction.event.startDate && (
            <p className="text-sm">🗓️ {transaction.event.startDate}</p>
          )}
          {transaction.event.time && (
            <p className="text-sm">🕓 {transaction.event.time}</p>
          )}
        </div>

        <div className="space-y-2">
          {transaction.transactionDetails.map((detail, idx) => (
            <div className="flex justify-between" key={idx}>
              <span>🎟️ {detail.ticket.ticketType} (1 ticket)</span>
              <span>Rp {detail.ticket.price.toLocaleString("id-ID")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Payment Summary */}
      <div className="space-y-4">
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded">
          ⚠️ Your order will expire soon
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Total ticket price</span>
            <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          Pay
        </button>
      </div>
    </div>
  );
};

export default GetTransactionById;
