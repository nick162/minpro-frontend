import CreateTicketPage from "@/features/tickets/create";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const AdminCreateTicketPage = async () => {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <div>
      <CreateTicketPage />
    </div>
  );
};

export default AdminCreateTicketPage;
