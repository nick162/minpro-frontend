import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: { username: string; password: string }) => {
      const res = await signIn("credentials", {
        ...payload,
        redirect: false,
      });

      if (!res?.ok) {
        throw new Error("Login gagal");
      }
    },
    onSuccess: () => {
      toast.success("Login berhasil");
      router.push("/");
    },
    onError: (err: any) => {
      toast.error(err.message || "Gagal login");
    },
  });
};

export default useLogin;
