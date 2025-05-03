"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function CreateEventPage() {
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEventImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <ProtectedRoute allowedRoles="EVENT_ORGANIZER">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6">Create New Event</h1>

        <form className="space-y-6">
          {/* Upload Event Picture */}
          <div>
            <Label htmlFor="eventPict">Event Picture</Label>
            <Input
              id="eventPict"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-60 object-cover rounded-md mt-4"
              />
            )}
          </div>

          {/* Event Name */}
          <div>
            <Label htmlFor="eventName">Event Name</Label>
            <Input id="eventName" placeholder="Enter event name" />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              placeholder="Enter category (e.g., MUSIC, TECH, ART)"
            />
          </div>

          {/* City */}
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Enter city name" />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter event description" />
          </div>

          {/* Start Date */}
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" />
          </div>

          {/* End Date */}
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" type="date" />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Create Event
            </Button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
