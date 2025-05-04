import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import EventForm from "../../form-event/components/eventForm";

const EventEdit = async ({ params }: { params: { slug: string } }) => {
  // const session = await auth();
  // if (!session) return redirect("/login");

  const slug = (await params).slug;
  return <EventForm slug={slug} />;
};

export default EventEdit;
