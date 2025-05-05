import { auth } from "@/lib/auth";
import EventForm from "../../../../../features/event/eventForm/eventForm";
import { redirect } from "next/navigation";

const EventEdit = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const session = await auth();
  if (!session) redirect("/login");
  const slug = (await params).slug;
  return <EventForm slug={slug} />;
};

export default EventEdit;
