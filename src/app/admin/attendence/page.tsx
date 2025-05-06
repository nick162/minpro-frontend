import AttendancePage from "@/features/event/getAttendantelist";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminAttendancePage = async () => {
  const session = await auth();
  if (session?.user.role !== "EVENT_ORGANIZER") redirect("/");
  return (
    <div>
      <AttendancePage />
    </div>
  );
};

export default AdminAttendancePage;
