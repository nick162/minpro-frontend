"use client";

import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventQuery extends PaginationQueries {
  search?: string;
  city?:string;
}

export const useGetEvent = (queries?: GetEventQuery) => {
  return useQuery({
    queryKey: ["event", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/event",
        { params: queries }
      );
      // console.log(data);
      return data;
    },
  });
};
