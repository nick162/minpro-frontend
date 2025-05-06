"use client";

import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { useUpdateTicket } from "@/hooks/api/ticket/useUpdateTicket";

type EditTicketFormProps = {
  ticketId: number;
  initialValues: {
    ticketType: string;
    price: number;
    availableSeats: number;
    sold: number;
  };
};

export default function EditTicketForm({
  ticketId,
  initialValues,
}: EditTicketFormProps) {
  const { mutate, isPending } = useUpdateTicket();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate({ id: ticketId, ...values });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1 font-medium">Ticket Type</label>
        <input
          name="ticketType"
          type="text"
          value={formik.values.ticketType}
          onChange={formik.handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Price</label>
        <input
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Available Seats</label>
        <input
          name="availableSeats"
          type="number"
          value={formik.values.availableSeats}
          onChange={formik.handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Sold</label>
        <input
          name="sold"
          type="number"
          value={formik.values.sold}
          onChange={formik.handleChange}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      <Button type="submit" disabled={isPending} className="cursor-pointer">
        {isPending ? "Updating..." : "Update Ticket"}
      </Button>
    </form>
  );
}
