"use client";
import { FC } from "react";

import useGetEventByslug from "@/hooks/api/Event/useGetEventBySlug";

import NoData from "@/components/NoData";
import EventDetailHeader from "./components/EventDetailHeader";
import EventDetailBody from "./components/EventDetailBody";

interface EventDetailPageProps {
  slug: string;
}

const EventDetailPage: FC<EventDetailPageProps> = ({ slug }) => {
  const { data: event, isPending } = useGetEventByslug(slug);
  console.log(event);

  if (isPending) {
    return <h1 className="text-center">Loading...</h1>;
  }

  if (!event) {
    return <NoData />;
  }

  return (
    <section className="container mx-auto max-w-6xl px-4">
      <EventDetailHeader event={event} />
      <EventDetailBody event={event} />
    </section>
  );
};

export default EventDetailPage;
