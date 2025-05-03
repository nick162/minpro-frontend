// hooks/api/Ticket/useGetTickets.ts
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Ticket } from "@/types/ticket";

export const fetchTicketsByEventId = async (eventId: number): Promise<Ticket[]> => {
  const { data } = await axiosInstance.get<Ticket[]>(`/event/${eventId}/tickets`);
  return data;
};

export const useGetTickets = (eventId: number) => {
  return useQuery({
    queryKey: ["event-tickets", eventId],
    queryFn: () => fetchTicketsByEventId(eventId),
    enabled: !!eventId,
  });
};
