import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Event } from "@/types/event";
import { FC } from "react";
import Link from "next/link";

interface EventCardsProps {
  event: Event;
}

const EventCard: FC<EventCardsProps> = ({ event }) => {
  if (!event) {
    return <p>Event not found</p>; // Handle missing event gracefully
  }

  const tickets = event.tickets ?? [];
  const sortedTickets = [...tickets].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedTickets[0]?.price ?? 0;
  const totalAvailable = tickets.reduce((acc, t) => acc + t.availableSeats, 0);

  return (
    <Link href={`/event/${event.slug}`}>
      <Card>
        <CardHeader>
          <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
            <Image
              src={event.thumbnail || "/default-image.jpg"} // Fallback if no thumbnail
              alt={`Thumbnail for ${event.eventName}`} // More descriptive alt text
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="text-lg font-semibold space-y-1">
          <Badge
            variant="outline"
            className="rounded-lg bg-green-100 text-green-600 capitalize"
          >
            {event.category}
          </Badge>

          <p>{event.eventName}</p>
          <p className="text-sm font-light">{event.user?.name}</p>
          <p className="line-clamp-3 text-sm text-muted-foreground">{event.description}</p>

          {tickets.length > 0 && (
            <div className="mt-2 text-sm font-normal">
              <p>Mulai dari <span className="font-semibold">Rp{lowestPrice.toLocaleString()}</span></p>
              <p>{totalAvailable} tiket tersedia</p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
