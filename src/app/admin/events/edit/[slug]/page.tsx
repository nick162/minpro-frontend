import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import EventForm from "../../form-event/components/eventForm";
import useAxios from "@/hooks/useAxios";

const EventEdit = async ({ params }: { params: { slug: string } }) => {
  const slug = (await params).slug;
  return <EventForm slug={slug} />;
};

export default EventEdit;
