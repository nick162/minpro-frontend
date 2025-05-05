"use client";
import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLogin = () => {
  const router = useRouter();

  // const { onAuthSuccess } = useAuthStore();
  return useMutation({
    mutationFn: async (payload: Pick<User, "username" | "password">) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: async (data) => {
      console.log("data to sign in in login");
      console.log(data);
      await signIn("credentials", { ...data, redirect: false });
      toast.success("Login success");
      // onAuthSuccess({ user: data, accessToken: data.accessToken });
      // Redirect based on role
      if (data.role === "EVENT_ORGANIZER") {
        router.push("/admin/profile");
      } else {
        router.push("/");
      }
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.massage);
    },
  });
};

export default useLogin;
