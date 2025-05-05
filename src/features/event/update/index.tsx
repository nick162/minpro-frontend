// app/admin/events/page.tsx (atau lokasi sesuai rute Next.js App Router-mu)
"use client";
import { Button } from "@/components/ui/button";
import useDeleteEvent from "@/hooks/api/Event/useDeleteEvent";
import { useGetEvent } from "@/hooks/api/Event/useGetEvent";

import { format } from "date-fns";
import { Loader2 } from "lucide-react";

import Link from "next/link";
import EventGrid from "./components/EventGrid";

const EventPage = () => {
  const { data, isLoading, isError } = useGetEvent();
  const { mutateAsync: deleteEvent, isPending } = useDeleteEvent();

  const getFormattedDate = (date: unknown): string => {
    if (!date || (typeof date !== "string" && !(date instanceof Date))) {
      return "Tanggal tidak valid";
    }
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? "Tanggal tidak valid"
      : format(parsedDate, "dd MMM yyyy");
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmed) {
      try {
        await deleteEvent(id);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Failed to load events. Please try again later.
      </div>
    );
  }

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

      {data?.data.length === 0 ? (
        <div className="text-center text-gray-500">
          No events found. Create your first event!
        </div>
      ) : (
        <EventGrid
          events={data?.data ?? []}
          onDelete={handleDelete}
          isDeleting={isPending}
          formatDate={getFormattedDate}
        />
      )}
    </div>
  );
};

export default EventPage;
