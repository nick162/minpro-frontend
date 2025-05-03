import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRejectTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.patch(`/transaction/reject/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Transaksi ditolak.");
      queryClient.invalidateQueries({ queryKey: ["waiting-transactions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Gagal menolak transaksi");
    },
  });
};
