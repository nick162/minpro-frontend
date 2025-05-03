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
  const { data: event, isLoading, isError } = useGetEventByslug(slug);

  // Check if it's still loading
  if (isLoading) {
    return <h1 className="text-center">Loading...</h1>;
  }

  // Check if the data couldn't be fetched
  if (isError || !event) {
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
