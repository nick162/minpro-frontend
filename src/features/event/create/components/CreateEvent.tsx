"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import useAxios from "@/hooks/useAxios";

export default function CreateEvent() {
  useAxios();
  const router = useRouter();
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    eventName: "",
    category: "",
    cityId: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setEventImage(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      if (eventImage) payload.append("thumbnail", eventImage);
      payload.append("eventName", form.eventName);
      payload.append("description", form.description);
      payload.append("category", form.category);
      payload.append("startDate", form.startDate);
      payload.append("endDate", form.endDate);
      payload.append("cityId", form.cityId);

      const { data } = await axiosInstance.post("/event", payload); // ✅ BENAR

      toast.success("Event created successfully!");
      router.push("/admin/events");
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create event";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles="EVENT_ORGANIZER">
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-md shadow-md text-black dark:text-white">
        <h1 className="text-2xl font-bold mb-6">Create New Event</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Event Picture */}
          <div>
            <Label htmlFor="eventPict" className="block mb-1">
              Event Picture
            </Label>
            <Input
              id="eventPict"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-60 object-cover rounded-md mt-4 border"
              />
            )}
          </div>

          {/* Other fields (same as before) */}
          <div>
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              name="eventName"
              value={form.eventName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="cityId">City Id</Label>
            <Input
              name="cityId"
              value={form.cityId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
