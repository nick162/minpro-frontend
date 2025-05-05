"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import ProfilePage from "@/features/profile/page";

const ProfileSettingPage = () => {
  return (
    // <ProtectedRoute allowedRoles="CUSTOMER">
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Profil</h1>
      <ProfilePage />
    </div>
    //{" "}
    // </ProtectedRoute>
  );
};

export default ProfileSettingPage;
