import { axiosInstance } from "@/lib/axios";
import { UpdateProfilePayload } from "@/types/updateProfile";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export const useUpdateProfile = () => {
  const { data: session, update } = useSession();

  return useMutation({
    mutationFn: async (values: UpdateProfilePayload) => {
      if (!session?.user) throw new Error("User not authenticated");

      const user = session.user as {
        accessToken: string;
        role: string;
      };

      const token = user.accessToken;
      const role = user.role;

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("username", values.username);
      formData.append("email", values.email);
      if (values.password) formData.append("password", values.password);
      if (values.profilePict)
        formData.append("profilePict", values.profilePict);

      let endpoint = "";

      if (role === "CUSTOMER" || role === "EVENT_ORGANIZER") {
        endpoint = "/user/profile/update";
      } else {
        throw new Error("Role tidak dikenali");
      }

      const { data } = await axiosInstance.patch(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return data; // { user, token }
    },

    onSuccess: async (data) => {
      toast.success("Profil berhasil diperbarui");

      // Simpan token baru ke localStorage
      localStorage.setItem("accessToken", data.token);

      // Update session user data
      await update({ user: data.user });
    },

    onError: () => {
      toast.error("Gagal memperbarui profil");
    },
  });
};
