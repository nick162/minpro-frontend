"use client";

import useAxios from "@/hooks/useAxios";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useDeleteTicket = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/ticket/${id}`);
      return data;
    },
    onSuccess: async () => {
      toast.success("Delete Ticket succes");
      await queryClient.invalidateQueries({ queryKey: ["ticket"] });
      router.push("/admin/tickets");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useDeleteTicket;
