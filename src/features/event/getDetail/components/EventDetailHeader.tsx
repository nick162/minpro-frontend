import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { FC } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { useAuthStore } from "@/store/auth";

interface EventHeaderProps {
  event: Event;
}

const EventDetailHeader: FC<EventHeaderProps> = ({ event }) => {
  console.log("ini adalah event", event);

  const getFormattedDate = (date: unknown): string => {
    if (!date || (typeof date !== "string" && !(date instanceof Date))) {
      return "Tanggal tidak valid";
    }

    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? "Tanggal tidak valid"
      : format(parsedDate, "dd MMM yyyy");
  };

  return (
    <section className="space-y-2">
      <Badge
        variant="outline"
        className="rounded-sm bg-green-100 text-green-600 capitalize"
      >
        {event.category}
      </Badge>

      <h1 className="text-3xl font-bold">{event.eventName}</h1>

      <div className="flex items-center justify-between">
        <p className="font-extralight">
          {getFormattedDate(event.startDate)} -{" "}
          <span>{event.city?.cityName || "Lokasi tidak tersedia"}</span>
        </p>
      </div>

      <div className="relative h-[300px]">
        {event.thumbnail ? (
          <Image
            src={event.thumbnail}
            fill
            className="rounded-sm object-cover"
            alt="Event thumbnail"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 rounded-sm">
            <p className="text-lg text-gray-500">Thumbnail tidak tersedia</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventDetailHeader;
