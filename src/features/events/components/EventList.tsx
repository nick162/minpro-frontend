"use client";

import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { parseAsInteger, useQueryState } from "nuqs";
import { useGetEvent } from "@/hooks/api/Event/useGetEvent";
import EventCard from "./EventCard";
import PaginationSection from "@/components/PaginationSection";

const EventList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 500);

  const { data: events, isPending } = useGetEvent({
    page,
    take: 2,
    search: debounceSearch,
  });
  //   console.log("ini adalah data blog", events);

  const onChangePage = (page: number) => {
    setPage(page);
  };
  return (
    <>
      <Input
        className="m-10 mx-auto max-w-xl"
        placeholder="Search ...."
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />
      {isPending && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>Loading ...</h2>
        </div>
      )}

      {!isPending && !events?.data.length && (
        <div className="flex h-[30vh] items-center justify-center">
          <h2>No data ...</h2>
        </div>
      )}

      {!!events && !!events.data.length && (
        <>
          <section className="mt-q0 grid grid-cols-3 gap-8">
            {events.data.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </section>
          <PaginationSection
            page={events.meta.page}
            take={events.meta.take}
            total={events.meta.total}
            onChangePage={onChangePage}
          />
        </>
      )}
    </>
  );
};

export default EventList;
