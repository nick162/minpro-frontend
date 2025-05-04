"use client";

import { Button } from "@/components/ui/button";
import { useGetTickets } from "@/hooks/api/ticket/useGetTickets";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type TicketPageProps = {
  eventId: number;
};

export default function TicketPage({ eventId }: TicketPageProps) {
  const router = useRouter();
  const { data: tickets = [], isLoading, isError } = useGetTickets(eventId);
  const [deletedTickets, setDeletedTickets] = useState<number[]>([]);

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (confirmed) {
      // Tambahkan ke daftar lokal yang dihapus
      setDeletedTickets((prev) => [...prev, id]);

      // Jika kamu punya API delete, panggil disini:
      // await deleteTicket(id).then(() => refetchTickets());
    }
  };

  if (isLoading) return <p className="p-6">Loading tickets...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Failed to load tickets.</p>;

  const filteredTickets = tickets.filter(
    (ticket) => !deletedTickets.includes(ticket.id)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <Link href={`/admin/tickets/create?eventId=${eventId}`}>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create New Ticket
          </Button>
        </Link>
      </div>

      {filteredTickets.length === 0 ? (
        <p>No tickets found for this event.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border rounded-lg shadow-md p-4 flex flex-col gap-2"
            >
              <h2 className="text-lg font-semibold">{ticket.ticketType}</h2>
              <p className="text-sm text-gray-600">
                Event: {ticket.event?.eventName || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Available Seats: {ticket.availableSeats}
              </p>
              <p className="text-sm text-gray-600">Sold: {ticket.sold}</p>
              <p className="text-sm text-gray-600">
                Price: Rp {ticket.price.toLocaleString()}
              </p>

              <div className="flex gap-2 mt-4">
                <Link href={`/admin/tickets/edit/${ticket.id}`}>
                  <Button className="bg-yellow-500 hover:bg-yellow-600">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(ticket.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
