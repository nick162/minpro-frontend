"use client";

import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import { useQueryState } from "nuqs";
import { useGetEvent } from "@/hooks/api/Event/useGetEvent";
import EventCard from "./EventCard";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const EventList = () => {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [city, setCity] = useQueryState("city", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", { defaultValue: "MUSIC" });
  const [debouncedCategory] = useDebounceValue(category, 500);

  const [debouncedSearch] = useDebounceValue(search, 500);
  const [debouncedCity] = useDebounceValue(city, 500);

  const { data: events, isPending } = useGetEvent({
    search: debouncedSearch,
    city: debouncedCity,

  });

  return (
    <>
      <div className="m-10 mx-auto flex max-w-xl flex-col gap-4 md:flex-row">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10"
            placeholder="Search event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <Input
            className="pl-10"
            placeholder="Search by city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="relative w-full">
  
</div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Event Pilihan</h2>

      {isPending && <div className="text-center">Loading...</div>}
      {!isPending && !events?.data.length && <div className="text-center">No data</div>}

      {!!events?.data.length && (
        <section className="relative mt-4 px-4 md:px-8">
          {/* Custom Navigation Buttons */}
          <div className="absolute top-1/2 left-2 z-10 -translate-y-1/2 swiper-button-prev-custom">
            <div className="bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <ChevronLeft className="text-gray-800" size={20} />
            </div>
          </div>
          <div className="absolute top-1/2 right-2 z-10 -translate-y-1/2 swiper-button-next-custom">
            <div className="bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
              <ChevronRight className="text-gray-800" size={20} />
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={false}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {events.data.map((event) => (
              <SwiperSlide key={event.id}>
                <EventCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </>
  );
};

export default EventList;
