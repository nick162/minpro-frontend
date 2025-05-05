// features/Event/components/EventGrid.tsx
import { Event } from "@/types/event";
import EventItem from "./EventItem";

type Props = {
  events: Event[];
  onDelete: (id: number) => void;
  isDeleting: boolean;
  formatDate: (date: unknown) => string;
};

const EventGrid: React.FC<Props> = ({
  events,
  onDelete,
  isDeleting,
  formatDate,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {events.map((event) => (
      <EventItem
        key={event.id}
        event={event}
        onDelete={onDelete}
        isDeleting={isDeleting}
        formatDate={formatDate}
      />
    ))}
  </div>
);

export default EventGrid;
