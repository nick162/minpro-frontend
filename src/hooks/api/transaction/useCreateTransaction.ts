import { useState } from "react";
import useAxios from "@/hooks/useAxios"; // ← pastikan path sesuai

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
}

export const useCreateTransaction = (): UseCreateTransactionResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { axiosInstance } = useAxios(); // ← gunakan custom axios

  const createTransaction = async (input: CreateTransactionInput): Promise<number | null> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axiosInstance.post("/transaction", input);
      console.log("Transaction response:", response.data);

      const transactionId = response.data.transactionId;

      setSuccess(true);
      return transactionId;
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Terjadi kesalahan saat membuat transaksi.");
      }
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
  };
};
