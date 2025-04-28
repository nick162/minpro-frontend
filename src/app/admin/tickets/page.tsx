"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const dummyTickets = [
  {
    id: 1,
    ticketType: "VIP",
    sold: 50,
    availableSeats: 100,
    price: 1500000,
    eventName: "Music Concert 2025",
  },
  {
    id: 2,
    ticketType: "General Admission",
    sold: 200,
    availableSeats: 300,
    price: 500000,
    eventName: "Tech Conference",
  },
];

export default function TicketPage() {
  const [tickets, setTickets] = useState(dummyTickets);

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (confirmed) {
      setTickets(tickets.filter((ticket) => ticket.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <Link href="/admin/tickets/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create New Ticket
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="border rounded-lg shadow-md p-4 flex flex-col gap-2"
          >
            <h2 className="text-lg font-semibold">{ticket.ticketType}</h2>
            <p className="text-sm text-gray-600">Event: {ticket.eventName}</p>
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
    </div>
  );
}
