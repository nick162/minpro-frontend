"use client";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner"; // Assuming you're using react-toastify

// Only include mutable fields in the update payload
type UpdateTicketPayload = {
  id: number;
} & Partial<{
  ticketType: string;
  price: number;
  availableSeats: number;
}>;

export const useUpdateTicket = () => {
  return useMutation({
    mutationFn: async (payload: UpdateTicketPayload) => {
      const { id, ...rest } = payload;

      // Optional validation
      if (rest.price !== undefined && rest.price < 0) {
        throw new Error("Price must be non-negative");
      }
      if (rest.availableSeats !== undefined && rest.availableSeats < 0) {
        throw new Error("Available seats must be non-negative");
      }

      const { data } = await axiosInstance.patch(`/ticket/${id}`, rest);
      return data;
    },
    onSuccess: () => {
      toast.success("Event updated successfully");
    },

    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Failed to update event");
    },
  });
};
