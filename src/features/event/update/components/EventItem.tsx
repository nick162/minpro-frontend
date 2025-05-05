// features/Event/components/EventItem.tsx
"use client";
import { Event } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  event: Event;
  onDelete: (id: number) => void;
  isDeleting: boolean;
  formatDate: (date: unknown) => string;
};

const EventItem: React.FC<Props> = ({
  event,
  onDelete,
  isDeleting,
  formatDate,
}) => (
  <div className="border rounded-lg shadow-md overflow-hidden">
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
        {formatDate(event.startDate)} -{" "}
        <span>{event.city?.cityName || "Lokasi tidak tersedia"}</span>
      </p>

      <div className="flex gap-2 mt-4">
        <Link href={`/admin/events/edit/${event.slug}`}>
          <Button className="bg-yellow-500 hover:bg-yellow-600">Edit</Button>
        </Link>
        <Button
          variant="destructive"
          onClick={() => onDelete(event.id)}
          disabled={isDeleting}
        >
          {isDeleting ? (
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
);

export default EventItem;
