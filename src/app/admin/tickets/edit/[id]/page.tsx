"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Define the shape of the ticket data
interface Ticket {
  id: number;
  eventId: number;
  ticketType: string;
  availableSeats: number;
  price: number;
}

export default function EditTicket({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [formData, setFormData] = useState<Ticket>({
    id: 0,
    eventId: 0,
    ticketType: "",
    availableSeats: 0,
    price: 0,
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  // Unwrap the params using React.use()
  const { id } = React.use(params);

  // Fetch ticket data when the component mounts
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const response = await axios.get(`/api/tickets/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError("Failed to load ticket data.");
      }
    };
    fetchTicketData();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "eventId" || name === "availableSeats" || name === "price"
          ? parseInt(value)
          : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`/api/tickets/${id}`, formData);
      router.push("/tickets"); // Redirect to tickets list after update
    } catch (err) {
      setError("Failed to update ticket. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Ticket</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Event ID
          </label>
          <input
            type="number"
            name="eventId"
            value={formData.eventId}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ticket Type
          </label>
          <input
            type="text"
            name="ticketType"
            value={formData.ticketType}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Available Seats
          </label>
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Ticket
        </button>
      </form>
    </div>
  );
}
