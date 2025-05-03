import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Transaction } from "@/types/transacation";

export const useWaitingTransactions = () => {
  return useQuery({
    queryKey: ["waiting-transactions"],
    queryFn: async (): Promise<Transaction[]> => {
      const { data } = await axiosInstance.get("/transaction/waiting");
      return data;
    },
  });
};
