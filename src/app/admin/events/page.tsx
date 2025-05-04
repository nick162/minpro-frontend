"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Event } from "@/types/event";
import { useGetEvent } from "@/hooks/api/Event/useGetEvent";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import useDeleteEvent from "@/hooks/api/Event/useDeleteEvent";

export default function EventPage() {
  const { data, isLoading, isError } = useGetEvent();
  const { mutateAsync: deleteEvent, isPending } = useDeleteEvent();
  const session = useSession();

  console.log("ini adalah", session.data?.user.role);

  const getFormattedDate = (date: unknown): string => {
    if (!date || (typeof date !== "string" && !(date instanceof Date))) {
      return "Tanggal tidak valid";
    }

    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? "Tanggal tidak valid"
      : format(parsedDate, "dd MMM yyyy");
  };

  // Fixed delete function to use the deleteEvent mutation
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmed) {
      try {
        await deleteEvent(id);
        // The rest is handled in the onSuccess callback of the mutation
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
    <ProtectedRoute allowedRoles="EVENT_ORGANIZER">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data.map((event: Event) => (
              <div
                key={event.id}
                className="border rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={event.thumbnail || "/placeholder.jpg"}
                  alt={event.eventName}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold">{event.eventName}</h2>
                  <p className="text-sm text-gray-600">{event.category}</p>
                  <p className="font-extralight">
                    {getFormattedDate(event.startDate)} -{" "}
                    <span>
                      {event.city?.cityName || "Lokasi tidak tersedia"}
                    </span>
                  </p>

                  <div className="flex gap-2 mt-4">
                    <Link href={`/admin/events/edit/${event.slug}`}>
                      <Button className="bg-yellow-500 hover:bg-yellow-600">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(event.id)}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
