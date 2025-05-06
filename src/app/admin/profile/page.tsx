import ProfileAppearancePage from "@/features/profile/components/ProfilUser";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminProfilPage = async () => {
  const session = await auth();
  if (session?.user.role !== "EVENT_ORGANIZER") redirect("/");
  return (
    <div>
      <ProfileAppearancePage />
    </div>
  );
};

export default AdminProfilPage;
