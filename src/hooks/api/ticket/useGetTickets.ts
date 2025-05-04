// hooks/api/Ticket/useGetTickets.ts
"use client";

import { axiosInstance } from "@/lib/axios";
import { Ticket } from "@/types/ticket";
import { useQuery } from "@tanstack/react-query";

export const useGetTickets = () => {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{
        message: string;
        tickets: Ticket[];
      }>("/ticket");
      return data.tickets;
    },
  });
};
