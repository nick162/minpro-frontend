// hooks/api/transaction/useWaitingTransaction.ts
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Transaction } from "@/types/transacation";
import useAxios from "@/hooks/useAxios";

export const useWaitingTransactions = () => {
  useAxios();
  return useQuery<Transaction[]>({
    queryKey: ["waiting-transactions"],
    queryFn: async () => {
      const res = await axiosInstance.get("/transaction/waiting");
      return res.data.data; // ✅ akses data langsung
    },
  });
};
