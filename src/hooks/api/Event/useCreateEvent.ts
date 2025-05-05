"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Response sukses dari server
type CreateEventResponse = {
  message: string;
  event: any;
};

// Response error dari server
type ErrorResponse = {
  message: string;
};

// Tipe data form
interface FormValues {
  eventName: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  cityId: string;
  thumbnail: File | null;
}

// Hook untuk create event
const useCreateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<
    CreateEventResponse,
    AxiosError<ErrorResponse>,
    FormValues
  >({
    mutationFn: async (values: FormValues) => {
      const formData = new FormData();
      formData.append("eventName", values.eventName);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("startDate", values.startDate);
      formData.append("endDate", values.endDate);
      formData.append("cityId", values.cityId);
      if (values.thumbnail) {
        formData.append("thumbnail", values.thumbnail);
      }

      const { data } = await axiosInstance.post<CreateEventResponse>(
        "/api/events",
        formData
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Event created successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/admin/events");
    },
    onError: (error) => {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
    },
  });
};

export default useCreateEvent;
