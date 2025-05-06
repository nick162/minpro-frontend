import EventPage from "@/features/event/update";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const EventAdminPage = async () => {
  const session = await auth();
  if (session?.user.role !== "EVENT_ORGANIZER") redirect("/");
  return (
    <div>
      <EventPage />
    </div>
  );
};

export default EventAdminPage;
