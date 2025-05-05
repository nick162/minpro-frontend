// src/hooks/api/tickets/useCreateTicket.ts
"use client";

import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Tipe response sukses dari server
type CreateTicketResponse = {
  message: string;
  ticket: any;
};

// Tipe response error dari server
type ErrorResponse = {
  message: string;
};

// Tipe data form untuk ticket
interface CreateTicketPayload {
  eventId: number;
  ticketType: string;
  availableSeats: number;
  price: number;
}

const useCreateTicket = () => {
  useAxios();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<
    CreateTicketResponse,
    AxiosError<ErrorResponse>,
    CreateTicketPayload
  >({
    mutationFn: async (payload: CreateTicketPayload) => {
      const { data } = await axiosInstance.post<CreateTicketResponse>(
        "/ticket",
        payload
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Ticket created successfully");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      router.push("/admin/ticketsw");
    },
    onError: (error) => {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
    },
  });
};

export default useCreateTicket;
