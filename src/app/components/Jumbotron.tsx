"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const events = [
  {
    id: 1,
    image: "/cs-1.png",
    title: "Rock Legends Live Concert",
    date: "Wed, Jan 15",
    time: "20:00",
    category: "MUSIC",
    location: "Square Garden, New York",
  },
  {
    id: 2,
    image: "/cs-2.png",
    title: "Jazz Night Live",
    date: "Wed, Feb 5",
    time: "19:00",
    category: "MUSIC",
    location: "Blue Note, New York",
  },
  {
    id: 3,
    image: "/cs-3.png",
    title: "Electronic Dance Party",
    date: "Sat, Mar 10",
    time: "22:00",
    category: "MUSIC",
    location: "Warehouse, Los Angeles",
  },
];

const Jumbotron = () => {
  return (
    <section className="container mx-auto p-4">
      {/* Carousel */}

      {/* Text Section */}
      <div className="container mx-auto text-center mt-10 md:mt-16">
        <h3 className="text-orange-400 font-semibold text-xl mb-2">
          Uncover New Moments
        </h3>
        <h1 className="text-2xl md:text-5xl font-extrabold leading-tight mb-4">
          DISCOVER EVENTS <br /> & EXPERIENCES
        </h1>
        <p className="text-lg text-black mb-10 dark:text-white">
          Join a vibrant community where you can explore global happenings and
          share memorable moments with friends and family.
        </p>
      </div>
      <div className="relative">
        {/* Custom navigation buttons */}
        <div className="absolute top-1/2 left-4 z-10 -translate-y-1/2 swiper-button-prev-custom">
          <div className="bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
            <ChevronLeft className="text-gray-800" size={20} />
          </div>
        </div>
        <div className="absolute top-1/2 right-4 z-10 -translate-y-1/2 swiper-button-next-custom">
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
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          className="rounded-xl overflow-hidden"
        >
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="relative w-full h-[100px] md:h-[350px]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Jumbotron;
