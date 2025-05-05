import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import useAxios from "@/hooks/useAxios";

export const useAcceptTransaction = () => {
  useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.post(`/transaction/accept/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Transaksi berhasil diterima");
      queryClient.invalidateQueries({ queryKey: ["waiting-transactions"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Gagal menerima transaksi");
    },
  });
};
