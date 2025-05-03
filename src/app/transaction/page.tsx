"use client"
import React from "react";
import { useParams } from "next/navigation";
import TransactionPage from "@/features/transaction";

const TransactionDetailPage = () => {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="text-white p-4">
      <h1>Detail Transaksi</h1>
      <p>ID Transaksi: {id}</p>
      <TransactionPage/>
    </div>
  );
};

export default TransactionDetailPage;
