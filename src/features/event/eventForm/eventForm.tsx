"use client";

import { useFormik } from "formik";
import { FC, useState } from "react";

import Loading from "@/components/Loading";
import NoData from "@/components/NoData";
import { Button } from "@/components/ui/button";
import useGetEventBySlug from "@/hooks/api/Event/useGetEventBySlug";
import useUpdateEvent from "@/hooks/api/Event/useUpdateEvent";
import EventDateInput from "./components/eventDateInput";
import EventImageInput from "./components/eventImagInput";
import EventInput from "./components/eventInput";
import { updateEventSchema } from "@/app/admin/events/edit/schema";

interface EditEventProps {
  slug: string;
}

const EventForm: FC<EditEventProps> = ({ slug }) => {
  const { data: event, isPending: isPendingGetEvent } = useGetEventBySlug(slug);
  console.log("ini adalah", event);
  const { mutateAsync: eventUpdated, isPending: isPending } = useUpdateEvent(
    event?.id
  );

  const [previewImage, setPreviewImage] = useState<string | null>(
    event?.thumbnail || null
  );

  const getErrorString = (error: any) =>
    typeof error === "string" ? error : undefined;

  const getFlatErrors = (
    errors: any
  ): { [key: string]: string | undefined } => {
    const flat: { [key: string]: string | undefined } = {};
    for (const key in errors) {
      if (typeof errors[key] === "string") {
        flat[key] = errors[key];
      }
    }
    return flat;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      eventName: event?.eventName || "",
      description: event?.description || "",
      category: event?.category || "",
      startDate: event?.startDate || "",
      endDate: event?.endDate || "",
      thumbnail: null as File | null,
    },
    validationSchema: updateEventSchema,
    onSubmit: (values) => {
      console.log("tets", values);

      eventUpdated(values);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("thumbnail", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (isPendingGetEvent) {
    return <Loading />;
  }

  if (!event) {
    return <NoData />;
  }
  return (
    // <ProtectedRoute allowedRoles="EVENT_ORGANIZER">
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-5 max-w-xl mx-auto mt-8"
      encType="multipart/form-data"
    >
      <EventImageInput
        previewImage={previewImage}
        handleFileChange={handleFileChange}
      />

      <EventInput
        label="Nama Event"
        name="eventName"
        value={formik.values.eventName}
        error={getErrorString(formik.errors.eventName)}
        onChange={formik.handleChange}
      />

      <EventInput
        label="Deskripsi"
        name="description"
        value={formik.values.description}
        error={getErrorString(formik.errors.description)}
        onChange={formik.handleChange}
      />
      <EventInput
        label="Category"
        name="category"
        value={formik.values.category}
        error={getErrorString(formik.errors.category)}
        onChange={formik.handleChange}
      />

      <EventDateInput
        startDate={formik.values.startDate}
        endDate={formik.values.endDate}
        errors={getFlatErrors(formik.errors.startDate)}
        handleChange={formik.handleChange}
      />

      <Button
        disabled={isPending}
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer"
      >
        Simpan Perubahan
      </Button>
    </form>
    // </ProtectedRoute>
  );
};

export default EventForm;
