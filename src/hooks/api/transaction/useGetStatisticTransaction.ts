import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import useSWR from "swr";

export const useGetStatisticTransaction = ({
  year,
  range,
}: {
  year: string;
  range: "6months" | "12months";
}) => {
  useAxios();
  return useSWR(
    `/transaction/statistic?year=${year}&range=${range}`,
    (url: any) => axiosInstance.get(url).then((res) => res.data)
  );
};
