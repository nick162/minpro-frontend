import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getAttendanceTransactions = async () => {
  const res = await axiosInstance.get("/transaction/attendance");
  return res.data;
};

export const useAttendanceTransactions = () => {
  useAxios();
  return useQuery({
    queryKey: ["transaction", "attendance"],
    queryFn: getAttendanceTransactions,
  });
};
