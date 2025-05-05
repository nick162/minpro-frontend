"use client";

import { useGetTransactions } from "@/hooks/api/transaction/useGetTransaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const GetTransactions = () => {
  const { data, isLoading, isError } = useGetTransactions();

  if (isLoading)
    return <p className="text-center py-4">Loading transactions...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 py-4">
        Failed to fetch transactions
      </p>
    );

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
        Transaction List
      </h1>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
          {data.map((tx) => (
            <Card
              key={tx.id}
              className="shadow-md border border-gray-200 hover:shadow-lg transition duration-200"
            >
              <CardHeader>
                <CardTitle className="text-base break-words">
                  Transaction ID: {tx.id}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">User:</span> {tx.user?.name} (
                  {tx.user?.email})
                </p>
                <p>
                  <span className="font-semibold">Event:</span>{" "}
                  {tx.event?.eventName}
                </p>
                <p>
                  <span className="font-semibold">Total:</span> Rp{" "}
                  {tx.totalPrice.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {tx.status}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No transactions available</p>
      )}
    </div>
  );
};

export default GetTransactions;
