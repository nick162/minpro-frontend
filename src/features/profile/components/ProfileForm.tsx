"use client";

import { useFormik } from "formik";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ProfileInput from "./ProfileInput";
import ProfilePasswordInput from "./ProfilePasswordInput";
import ProfileImageInput from "./ProfileImageInput";
import { updateProfileSchema } from "../schema";
import { useUpdateProfile } from "@/app/user/api/useUpdateProfile";
import { Button } from "@/components/ui/button";

// pastikan path-nya benar

const ProfileForm = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const [previewImage, setPreviewImage] = useState<string | null>(
    user?.profilePict || null
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      profilePict: null as File | null,
    },
    validationSchema: updateProfileSchema,
    onSubmit: (values) => {
      console.log("ini adalah", values);
      updateProfile(values);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("profilePict", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-5 max-w-xl mx-auto mt-8"
      encType="multipart/form-data"
    >
      <ProfileImageInput
        previewImage={previewImage}
        handleFileChange={handleFileChange}
      />

      <ProfileInput
        label="Nama Lengkap"
        name="name"
        value={formik.values.name}
        error={formik.errors.name}
        onChange={formik.handleChange}
      />

      <ProfileInput
        label="Username"
        name="username"
        value={formik.values.username}
        error={formik.errors.username}
        onChange={formik.handleChange}
      />

      <ProfileInput
        label="Email"
        name="email"
        value={formik.values.email}
        error={formik.errors.email}
        onChange={formik.handleChange}
      />

      <ProfilePasswordInput
        value={formik.values.password}
        error={formik.errors.password}
        onChange={formik.handleChange}
      />

      <Button
        disabled={isPending}
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        Simpan Perubahan
      </Button>
    </form>
  );
};

export default ProfileForm;
