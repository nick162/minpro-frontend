"use client";

import { useState, use } from "react"; // <- import 'use' dari React
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

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

export default function EditEventPage({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const params = use(paramsPromise); // <- di-unwrap dulu pakai use()

  const eventId = Number(params.id);
  const event = dummyEvents.find((e) => e.id === eventId);

  const [eventName, setEventName] = useState(event?.eventName || "");
  const [category, setCategory] = useState(event?.category || "");
  const [startDate, setStartDate] = useState(event?.startDate || "");
  const [endDate, setEndDate] = useState(event?.endDate || "");
  const [eventPict, setEventPict] = useState(event?.eventPict || "");

  if (!event) return <div>Event not found.</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      eventName,
      category,
      startDate,
      endDate,
      eventPict,
    });
    router.push("/admin/events");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="eventName">Event Name</Label>
          <Input
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Event Picture</Label>
          <Image
            src={eventPict}
            alt="Event"
            width={400}
            height={200}
            className="rounded-md object-cover mt-2"
          />
        </div>

        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 w-full mt-4"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
}
