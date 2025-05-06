import CreateEventPage from "@/features/event/create/page";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminCreateEvent = async () => {
  const session = await auth();
  if (session?.user.role !== "EVENT_ORGANIZER") redirect("/");
  return (
    <div>
      <CreateEventPage />
    </div>
  );
};

export default AdminCreateEvent;
