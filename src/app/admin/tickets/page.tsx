import TicketPage from "@/features/tickets/get/page";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const TicketAdminPage = async () => {
  const session = await auth();
  if (session?.user.role !== "EVENT_ORGANIZER") redirect("/");
  return (
    <div>
      <TicketPage />
    </div>
  );
};

export default TicketAdminPage;
