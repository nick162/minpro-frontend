"use client"; // This will ensure the component is rendered on the client side

import React from "react";

import { useGetTicketById } from "@/hooks/api/ticket/useGetTicketById";
import useAxios from "@/hooks/useAxios";
import EditTicketForm from "@/features/tickets/update/components/EditTicketForm";

export default function EditTicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  useAxios();
  const resolvedParams = React.use(params);
  const ticketId = parseInt(resolvedParams.id, 10);

  const { data: ticket, isLoading, error } = useGetTicketById(ticketId);

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading ticket</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Ticket</h1>
      <EditTicketForm
        ticketId={ticket.id}
        initialValues={{
          ticketType: ticket.ticketType,
          price: ticket.price,
          availableSeats: ticket.availableSeats,
          sold: ticket.sold,
        }}
      />
    </div>
  );
}
