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

      const formData = new FormData();
      if (eventName) formData.append("name", eventName);
      if (description) formData.append("description", description);
      if (category) formData.append("category", category);
      if (cityId) formData.append("cityId", String(cityId));
      if (startDate) formData.append("startDate", startDate.toString());
      if (endDate) formData.append("endDate", endDate.toString());
      if (thumbnail) formData.append("thumbnail", thumbnail);

      if (!id) throw new Error("Event ID is required");

      const { data } = await axiosInstance.patch(`/events/${id}`, formData);
      return data;
    },

    onSuccess: async () => {
      toast.success("Event updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/events"); // or wherever your list page is
    },

    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Failed to update event");
    },
  });
};

export default useUpdateEvent;
