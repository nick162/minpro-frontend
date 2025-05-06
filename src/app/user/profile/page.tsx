import ProfileAppearancePage from "@/features/profile/components/ProfilUser";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminProfilPage = async () => {
  const session = await auth();
  if (session?.user.role !== "CUSTOMER") redirect("/");
  return (
    <div>
      <ProfileAppearancePage />
    </div>
  );
};

export default AdminProfilPage;
