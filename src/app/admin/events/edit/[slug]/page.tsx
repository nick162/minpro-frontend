import EventForm from "../../form-event/components/eventForm";

const EventEdit = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  return <EventForm slug={slug} />;
};

export default EventEdit;
