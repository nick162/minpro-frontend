import { useQuery } from "@tanstack/react-query";
import { Transaction } from "@/types/transacation";
import { axiosInstance } from "@/lib/axios";
import useAxios from "@/hooks/useAxios";

export const useGetTransactions = () => {
  useAxios();
  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axiosInstance.get("/transaction");
      return res.data.data || []; // Kembalikan array meskipun kosong
    },
  });
};
