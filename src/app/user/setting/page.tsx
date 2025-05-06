import ProfilePage from "@/features/profile/page";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ProfileSettingPage = async () => {
  const session = await auth();
  if (session?.user.role !== "CUSTOMER") redirect("/");
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Edit Profil</h1>
      <ProfilePage />
    </div>
  );
};

export default ProfileSettingPage;
