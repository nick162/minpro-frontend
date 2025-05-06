import { useState, useEffect } from "react";
import useAxios from "@/hooks/useAxios";

interface Ticket {
  id: number;
  ticketType: string;
  price: number;
}

interface Event {
  id: number;
  eventName: string;
  category: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  time?: string;
}

interface Transaction {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  event: Event;
  transactionDetails: {
    ticket: Ticket;
  }[];
  voucher?: {
    id: number;
    code: string;
    amount: number;
  } | null;
  coupon?: {
    id: number;
    code: string;
    amount: number;
  } | null;
}

// Define the possible structure of an error response
interface ErrorResponse {
  message?: string;
}

const useGetTransactionById = (transactionId: string) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { axiosInstance } = useAxios();

  useEffect(() => {
    if (!transactionId) return;

    const controller = new AbortController(); // ✅ cancel request if unmounted

    const fetchTransaction = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/transaction/${transactionId}`,
          {
            signal: controller.signal,
          }
        );
        console.log("ini adalah", response.data); // Lihat respons yang diterima
        setTransaction(response.data); // Set data hanya jika response sesuai

        // Check if data exists in response and set state
        if (response.data) {
          setTransaction(response.data.data);
        } else {
          setError("No transaction data found.");
        }
      } catch (err: any) {
        if (err.name !== "CanceledError") {
          // Typecast the error to a specific error response type if possible
          const errorMessage =
            (err.response?.data as ErrorResponse)?.message ||
            "Failed to fetch transaction data.";
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();

    return () => {
      controller.abort(); // ✅ prevent memory leaks on unmount
    };
  }, [transactionId, axiosInstance]);

  return { transaction, loading, error };
};

export default useGetTransactionById;
