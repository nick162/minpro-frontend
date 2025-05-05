"use client";

import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload extends Omit<Event, "thumbnail"> {
  thumbnail: File | null;
}

const useUpdateEvent = (id?: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: Partial<Payload>) => {
      const {
        eventName,
        description,
        category,
        cityId,
        startDate,
        endDate,
        thumbnail,
      } = payload;

      const eventUpdated = new FormData();
      if (eventName) eventUpdated.append("eventName", eventName);
      if (description) eventUpdated.append("description", description);
      if (category) eventUpdated.append("category", category);
      if (cityId) eventUpdated.append("cityId", String(cityId));
      if (startDate)
        eventUpdated.append("startDate", new Date(startDate).toISOString());
      if (endDate)
        eventUpdated.append("endDate", new Date(endDate).toISOString());
      if (thumbnail) eventUpdated.append("thumbnail", thumbnail);

      if (!id) throw new Error("Event ID is required");

      const { data } = await axiosInstance.patch(`/event/${id}`, eventUpdated);
      return data;
    },

    onSuccess: async () => {
      toast.success("Event updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["event"] });
      router.push("/admin/events"); // or wherever your list page is
    },

    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Failed to update event");
    },
  });
};

export default useUpdateEvent;
