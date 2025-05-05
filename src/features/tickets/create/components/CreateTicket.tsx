"use client";

import { useState } from "react";
import { toast } from "sonner"; // Pastikan kamu menggunakan toast untuk notifikasi
import { useRouter } from "next/navigation";
import useCreateTicket from "@/hooks/api/ticket/useCreateTicket";

export default function CreateTicket() {
  const [formData, setFormData] = useState({
    eventId: "",
    ticketType: "",
    availableSeats: "",
    price: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const createTicket = useCreateTicket(); // Inisialisasi hook createTicket dari React Query

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error message when user starts typing
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      eventId: Number(formData.eventId),
      ticketType: formData.ticketType,
      availableSeats: Number(formData.availableSeats),
      price: Number(formData.price),
    };

    // Panggil mutasi createTicket dari React Query
    createTicket.mutate(payload, {
      onSuccess: () => {
        toast.success("Ticket created successfully");
        setFormData({
          eventId: "",
          ticketType: "",
          availableSeats: "",
          price: "",
        }); // Clear the form upon successful submission
        // router.push("/tickets"); // Redirect ke daftar ticket setelah berhasil
      },
      onError: (err) => {
        setError("Failed to create ticket. Please try again.");
        toast.error(err.response?.data?.message || "Failed to create ticket");
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Ticket</h1>
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
          Create Ticket
        </button>
      </form>
    </div>
  );
}
