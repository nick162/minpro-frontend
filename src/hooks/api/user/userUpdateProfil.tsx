"use client";

import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UpdateProfil {
  name: string;
  profilePict: File | null;
  username: string;
}

const useCreateBlog = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, accessToken, onAuthSuccess } = useAuthStore();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: UpdateProfil) => {
      const updateProfilFrom = new FormData();

      updateProfilFrom.append("name", payload.name);
      updateProfilFrom.append("username", payload.username);
      if (payload.profilePict)
        updateProfilFrom.append("profilePict", payload.profilePict);

      const { data } = await axiosInstance.patch(
        "/user/:id",
        updateProfilFrom,
        {
          headers: {
            Authorization: `Bearer ${accessToken ?? ""}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Edit Profil Success");
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/user/profile");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateBlog;
