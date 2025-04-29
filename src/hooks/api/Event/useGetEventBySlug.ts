"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useGetEventBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["event", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/event/${slug}`);
      console.log("Fetched event data:", data); // Log the full response
      return data.event;
    },
  });
};

export default useGetEventBySlug;
