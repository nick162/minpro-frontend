import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (id: number | undefined) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/user/${id}`);
      return data;
    },
    enabled: !!id, // pastikan query hanya jalan jika id tersedia
  });
};
