"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import ProfilePage from "@/features/profile/page";
import { useSession } from "next-auth/react";

const ProfileSettingPage = () => {
  const session = useSession();
  console.log("jjs", session.data?.user.accessToken);
  console.log("jjs", session.data?.user.role);
  return (
    <ProtectedRoute allowedRoles="EVENT_ORGANIZER">
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-6">Edit Profil</h1>
        <ProfilePage />
      </div>
      //{" "}
    </ProtectedRoute>
  );
};

export default ProfileSettingPage;
