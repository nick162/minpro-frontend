import { Event } from "@/types/event";
import { format } from "date-fns";
import { FC } from "react";

interface EventDetailBodyProps {
  event: Event;
}

const EventDetailBody: FC<EventDetailBodyProps> = ({ event }) => {
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
    <section className="space-y-4 mt-4">
      <p className="text-lg font-semibold">Deskripsi</p>
      <p>{event.description || "Deskripsi acara belum tersedia."}</p>

      <div className="mt-6">
        <p className="font-semibold">Waktu Acara</p>
        <p>
          {getFormattedDate(event.startDate)} -{" "}
          {getFormattedDate(event.endDate)}
        </p>
      </div>
    </section>
  );
};

export default EventDetailBody;
