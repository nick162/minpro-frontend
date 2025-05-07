"use client";
import { useState } from "react";
import useAxios from "@/hooks/useAxios";

interface CreateTransactionInput {
  userId: number;
  eventId: number;
  ticketId: number;
  quantity: number;
  pointsToUse?: number;
  couponId?: number;
  voucherId?: number;
}

interface UseCreateTransactionResult {
  createTransaction: (input: CreateTransactionInput) => Promise<number | null>;
  loading: boolean;
  error: string | null;
  success: boolean;
  resetState: () => void;
}

export const useCreateTransaction = (): UseCreateTransactionResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { axiosInstance } = useAxios();

  const resetState = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  const createTransaction = async (
    input: CreateTransactionInput
  ): Promise<number | null> => {
    if (!input.userId || !input.eventId || !input.ticketId || !input.quantity) {
      setError("Missing required fields for transaction");
      return null;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.post("/transaction", input);
      console.log("Full transaction response:", response);

      // Coba ambil transactionId dari berbagai kemungkinan bentuk response
      const transactionId =
        response.data?.transactionId ?? response.data?.data?.id ?? null;

      if (transactionId) {
        setSuccess(true);
        console.log("Transaction ID created:", transactionId); // Debug log

        return transactionId;
      } else {
        throw new Error("Transaction ID is missing in response");
      }
    } catch (err: any) {
      if (err.response) {
        const serverMessage =
          err.response.data?.message || err.response.statusText;
        setError(`Server error: ${serverMessage}`);
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError(
          err.message || "An error occurred while creating the transaction"
        );
      }

      console.error("Transaction error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createTransaction,
    loading,
    error,
    success,
    resetState,
  };
};
