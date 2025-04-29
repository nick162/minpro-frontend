"use client";

import { axiosInstance } from "@/lib/axios";

import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

// interface GetBlogsQuery extends PaginationQueries {
//   search?: string;
// }

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<User>>(
        `/user/${id}`
      );
      return data;
    },
  });
};
