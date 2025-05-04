// hooks/api/Ticket/useGetTickets.ts

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Ticket } from "@/types/ticket";

// Fetcher function
export const fetchTicketsByEventId = async (
  eventId: number
): Promise<Ticket[]> => {
  const { data } = await axiosInstance.get(`/event/${eventId}/tickets`);
  return data;
};

// Custom hook
export const useGetTickets = (eventId: number) => {
  return useQuery<Ticket[], Error>({
    queryKey: ["event-tickets", eventId],
    queryFn: () => fetchTicketsByEventId(eventId),
    enabled: !!eventId,
  });
};
