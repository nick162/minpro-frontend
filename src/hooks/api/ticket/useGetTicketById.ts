import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const getTicketById = async (id: number) => {
  const { data } = await axiosInstance.get(`/ticket/${id}`);
  return data.data; // asumsi responsenya berbentuk { data: {...} }
};

export const useGetTicketById = (id: number) => {
  return useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicketById(id),
    enabled: !!id, // hanya fetch kalau id-nya valid
  });
};
