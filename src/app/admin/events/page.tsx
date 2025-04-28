"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const dummyEvents = [
  {
    id: 1,
    eventName: "Music Concert 2025",
    category: "MUSIC",
    startDate: "2025-06-01",
    endDate: "2025-06-02",
    eventPict: "/assets/upcoming/img/music/1-lg.png",
  },
  {
    id: 2,
    eventName: "Tech Conference",
    category: "TECHNOLOGY",
    startDate: "2025-08-10",
    endDate: "2025-08-12",
    eventPict: "/assets/upcoming/img/food/1-lg.png",
  },
];

export default function EventPage() {
  const [events, setEvents] = useState(dummyEvents);

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmed) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link href="/admin/events/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create New Event
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={event.eventPict}
              alt={event.eventName}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold">{event.eventName}</h2>
              <p className="text-sm text-gray-600">{event.category}</p>
              <p className="text-sm text-gray-600">
                {event.startDate} - {event.endDate}
              </p>

              <div className="flex gap-2 mt-4">
                <Link href={`/admin/events/edit/${event.id}`}>
                  <Button className="bg-yellow-500 hover:bg-yellow-600">
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="destructive"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
