"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";

export const useGetTicket = (eventId: number) => {
  return useQuery({
    queryKey: ["event-detail", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event>(`/event/${eventId}`);
      return data;
    },
    enabled: !!eventId,
  });
};
