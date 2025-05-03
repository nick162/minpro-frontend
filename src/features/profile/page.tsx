"use client";

import { useSession } from "next-auth/react";
import ProfileForm from "./components/ProfileForm";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-center mt-10">Memuat data...</div>;
  }

  if (!session) {
    return (
      <div className="text-center mt-10 text-red-500">Anda belum login.</div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pengaturan Profil</h1>
      <ProfileForm />
    </main>
  );
};

export default ProfilePage;
