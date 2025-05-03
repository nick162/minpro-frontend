"use client";

import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";

interface Props {
  category: string;
}

export const useEventByCategory = ({ category }: Props) => {
  return useQuery({
    queryKey: ["events-by-category", category],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ data: Event[] }>(
        `/event/category/${category}`
      );
      return data; // Return data directly since it is the array of events
    },
  });
};
