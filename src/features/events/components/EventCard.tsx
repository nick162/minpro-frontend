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
  return (
    <Link href={`event/${event.slug}`}>
      <Card>
        <CardHeader>
          <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
            <Image
              src={event.thumbnail}
              alt="thumbnail"
              fill
              className="object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="text-lg font-semibold">
          <Badge
            variant="outline"
            className="rounded-lg bg-green-100 text-green-600 capitalize"
          >
            {event.category}
          </Badge>

          <p>{event.eventName}</p>

          <p className="mt-1 text-sm font-light">{event.user?.name}</p>

          <p className="line-clamp-4">{event.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
